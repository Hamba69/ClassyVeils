"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) throw new Error("Authentication required");
  const { data: allowed } = await supabase
    .from("allowed_admins")
    .select("email")
    .eq("email", user.email)
    .maybeSingle();
  if (!allowed) throw new Error("Administrator access required");
  return supabase;
}

async function uploadPhotos(files: File[], categorySlug: string, bucket = "veil-photos") {
  const supabase = await createClient();
  const paths: string[] = [];

  for (const file of files) {
    if (!file || file.size === 0) continue;
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${categorySlug}/${crypto.randomUUID()}.${ext.toLowerCase()}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (!error) paths.push(path);
  }
  return paths;
}

export async function createVeil(formData: FormData) {
  const supabase = await requireAdmin();
  const categorySlug = String(formData.get("category_slug"));
  const files = formData.getAll("photos").filter((f): f is File => f instanceof File);
  const photos = await uploadPhotos(files, categorySlug);

  const priceRaw = String(formData.get("price") || "").trim();

  await supabase.from("veils").insert({
    category_slug: categorySlug,
    name: String(formData.get("name") || "Untitled veil"),
    description: String(formData.get("description") || ""),
    price: priceRaw ? Number(priceRaw) : null,
    photos,
    cover_index: 0,
    is_featured: formData.get("is_featured") === "on",
    video_url: String(formData.get("video_url") || "") || null,
    visible: true,
    sort_order: Date.now(),
  });

  revalidatePath(`/admin`);
  revalidatePath(`/veils/${categorySlug}`);
}

export async function updateVeil(veilId: string, formData: FormData) {
  const supabase = await requireAdmin();
  const categorySlug = String(formData.get("category_slug"));
  const files = formData.getAll("photos").filter((f): f is File => f instanceof File);
  const newPhotos = await uploadPhotos(files, categorySlug);
  const editorialFiles = formData.getAll("editorial_photos").filter((f): f is File => f instanceof File);
  const newEditorialPhotos = await uploadPhotos(editorialFiles, categorySlug, "veil-editorial");

  const priceRaw = String(formData.get("price") || "").trim();

  const { data: existing } = await supabase
    .from("veils")
    .select("photos, model_photos")
    .eq("id", veilId)
    .single();

  await supabase
    .from("veils")
    .update({
      name: String(formData.get("name") || "Untitled veil"),
      description: String(formData.get("description") || ""),
      price: priceRaw ? Number(priceRaw) : null,
      photos: [...(existing?.photos ?? []), ...newPhotos],
      model_photos: [...(existing?.model_photos ?? []), ...newEditorialPhotos],
      cover_index: Number(formData.get("cover_index") ?? 0) || 0,
      editorial_cover_index: Number(formData.get("editorial_cover_index") ?? 0) || 0,
      use_editorial_cover: formData.get("use_editorial_cover") === "on",
      is_featured: formData.get("is_featured") === "on",
      video_url: String(formData.get("video_url") || "") || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", veilId);

  revalidatePath(`/admin`);
  revalidatePath(`/admin/veils/${veilId}/edit`);
  revalidatePath(`/veils/${categorySlug}`);
}

export async function deletePhoto(veilId: string, categorySlug: string, path: string) {
  const supabase = await requireAdmin();
  const { data: existing } = await supabase
    .from("veils")
    .select("photos, cover_index")
    .eq("id", veilId)
    .single();

  const remaining = (existing?.photos ?? []).filter((p: string) => p !== path);
  const currentCover = existing?.photos?.[existing?.cover_index ?? 0];
  const nextCoverIndex = Math.max(0, currentCover && currentCover !== path ? remaining.indexOf(currentCover) : 0);

  await supabase.from("veils").update({ photos: remaining, cover_index: nextCoverIndex }).eq("id", veilId);
  await supabase.storage.from("veil-photos").remove([path]);

  revalidatePath(`/admin/veils/${veilId}/edit`);
  revalidatePath(`/veils/${categorySlug}`);
}

export async function deleteEditorialPhoto(veilId: string, categorySlug: string, path: string) {
  const supabase = await requireAdmin();
  const { data: existing } = await supabase
    .from("veils")
    .select("model_photos, editorial_cover_index")
    .eq("id", veilId)
    .single();
  const remaining = (existing?.model_photos ?? []).filter((photo: string) => photo !== path);
  const currentCover = existing?.model_photos?.[existing?.editorial_cover_index ?? 0];
  const editorialCoverIndex = Math.max(0, currentCover && currentCover !== path ? remaining.indexOf(currentCover) : 0);
  await supabase.from("veils").update({
    model_photos: remaining,
    editorial_cover_index: editorialCoverIndex,
    ...(remaining.length === 0 ? { use_editorial_cover: false } : {}),
  }).eq("id", veilId);
  await supabase.storage.from("veil-editorial").remove([path]);
  revalidatePath(`/admin/veils/${veilId}/edit`);
  revalidatePath(`/veils/${categorySlug}`);
}

export async function moveVeilPhoto(
  veilId: string,
  categorySlug: string,
  kind: "product" | "editorial",
  path: string,
  direction: "up" | "down"
) {
  const supabase = await requireAdmin();
  const column = kind === "product" ? "photos" : "model_photos";
  const indexColumn = kind === "product" ? "cover_index" : "editorial_cover_index";
  const { data: existing } = await supabase.from("veils").select(`${column}, ${indexColumn}`).eq("id", veilId).single();
  const row = existing as unknown as Record<string, string[] | number> | null;
  const photos = [...((row?.[column] as string[] | undefined) ?? [])];
  const index = photos.indexOf(path);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= photos.length) return;
  const selectedCover = photos[(row?.[indexColumn] as number | undefined) ?? 0];
  [photos[index], photos[swapIndex]] = [photos[swapIndex], photos[index]];
  const nextCoverIndex = Math.max(0, photos.indexOf(selectedCover));
  await supabase.from("veils").update({ [column]: photos, [indexColumn]: nextCoverIndex }).eq("id", veilId);
  revalidatePath(`/admin/veils/${veilId}/edit`);
  revalidatePath(`/veils/${categorySlug}`);
}

export async function deleteVeil(veilId: string, categorySlug: string) {
  const supabase = await requireAdmin();
  const { data: existing } = await supabase
    .from("veils")
    .select("photos, model_photos")
    .eq("id", veilId)
    .single();

  if (existing?.photos?.length) {
    await supabase.storage.from("veil-photos").remove(existing.photos);
  }
  if (existing?.model_photos?.length) {
    await supabase.storage.from("veil-editorial").remove(existing.model_photos);
  }
  await supabase.from("veils").delete().eq("id", veilId);

  revalidatePath(`/admin`);
  revalidatePath(`/veils/${categorySlug}`);
}

export async function toggleVisible(veilId: string, categorySlug: string, visible: boolean) {
  const supabase = await requireAdmin();
  await supabase.from("veils").update({ visible }).eq("id", veilId);
  revalidatePath(`/admin`);
  revalidatePath(`/veils/${categorySlug}`);
}

export async function moveVeil(
  veilId: string,
  categorySlug: string,
  direction: "up" | "down"
) {
  const supabase = await requireAdmin();
  const { data: veils } = await supabase
    .from("veils")
    .select("id, sort_order")
    .eq("category_slug", categorySlug)
    .order("sort_order", { ascending: true });

  if (!veils) return;
  const index = veils.findIndex((v) => v.id === veilId);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= veils.length) return;

  const a = veils[index];
  const b = veils[swapIndex];

  await supabase.from("veils").update({ sort_order: b.sort_order }).eq("id", a.id);
  await supabase.from("veils").update({ sort_order: a.sort_order }).eq("id", b.id);

  revalidatePath(`/admin`);
  revalidatePath(`/veils/${categorySlug}`);
}

export async function updateCategoryText(formData: FormData) {
  const supabase = await requireAdmin();
  const slug = String(formData.get("slug"));

  await supabase
    .from("categories")
    .update({
      tagline: String(formData.get("tagline") || ""),
      intro: String(formData.get("intro") || ""),
      bullets: String(formData.get("bullets") || "")
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean),
      video_url: String(formData.get("video_url") || "") || null,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);

  revalidatePath(`/admin/categories`);
  revalidatePath(`/veils/${slug}`);
}

export async function updateSiteText(formData: FormData) {
  const supabase = await requireAdmin();
  const keys = [
    "hero_headline",
    "hero_subhead",
    "about_bio",
    "whatsapp_number",
    "contact_phone",
    "instagram_handle",
  ];

  for (const key of keys) {
    const value = formData.get(key);
    if (value !== null) {
      await supabase.from("site_text").upsert({ key, value: String(value) });
    }
  }

  revalidatePath(`/admin/site-text`);
  revalidatePath(`/`);
  revalidatePath(`/about`);
  revalidatePath(`/contact`);
}

export async function updateOrderStatus(orderId: string, status: string) {
  const allowedStatuses = new Set(["new", "contacted", "completed", "cancelled"]);
  if (!allowedStatuses.has(status)) throw new Error("Invalid order status");
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("order_requests")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId);
  if (error) throw new Error(`Could not update order: ${error.message}`);
  revalidatePath("/admin/orders");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
