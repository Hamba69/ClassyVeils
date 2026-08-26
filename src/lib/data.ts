import { createClient } from "@/lib/supabase/server";
import { Category, Veil } from "@/lib/types";

const fallbackSiteText: Record<string, string> = {
  hero_headline: "Classy and luxurious veils",
  hero_subhead: "Jersey, chiffon, silk, and cotton ninja veils — made for everyday elegance.",
  about_bio: "Founded by Anisha B Yusurah, Classyveils.ug brings together veils selected for comfort, elegance, and quality.",
  whatsapp_number: "",
  contact_phone: "",
  instagram_handle: "",
};

const fallbackCategories: Category[] = [
  { slug: "jersey", label: "Jersey Veils", tagline: "Where elegance meets everyday comfort.", intro: "Soft, breathable jersey with a smooth stretch and an easy, secure drape.", bullets: ["Soft premium jersey", "Breathable all-day comfort", "Secure non-slip fit"], header_photo: "/Jersey Veils/303fd6ae68457b8704af986640dc797e-1280.webp", video_url: null, sort_order: 1 },
  { slug: "chiffon", label: "Chiffon Veils", tagline: "Where elegance meets effortless beauty.", intro: "Lightweight, airy chiffon that drapes beautifully for a soft, refined look.", bullets: ["Lightweight and airy", "Soft graceful drape", "Ideal for elegant layering"], header_photo: "/Chiffon Veils/29f79ee91b4862f75e76d8a14ca908f5-1280.webp", video_url: null, sort_order: 2 },
  { slug: "silk", label: "Silk Veils", tagline: "Where luxury meets timeless elegance.", intro: "Smooth silk with an elegant sheen for special occasions and elevated everyday styling.", bullets: ["Soft luxurious feel", "Elegant natural sheen", "Beautiful occasion-ready drape"], header_photo: "/Silk Veils/1e9cbaeaa4dcfab51a69a69a079b378c-1280.webp", video_url: null, sort_order: 3 },
  { slug: "cotton-ninja", label: "Cotton Ninja Veils", tagline: "Where comfort meets everyday coverage.", intro: "Breathable cotton ninja veils designed for full coverage and all-day comfort.", bullets: ["Soft breathable blend", "Full everyday coverage", "Easy all-day styling"], header_photo: "/Cotton Ninja Veils/1f12c2e4dcfd62d8a24cae0ff9aabcff-1280.webp", video_url: null, sort_order: 4 },
];

function withFallbackPhoto(category: Category): Category {
  if (category.header_photo) return category;
  const fallback = fallbackCategories.find((item) => item.slug === category.slug);
  return { ...category, header_photo: fallback?.header_photo ?? null };
}

export async function getSiteText(): Promise<Record<string, string>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_text").select("key, value");
  if (error) {
    console.error("getSiteText failed:", error.message);
    return { ...fallbackSiteText };
  }
  const map: Record<string, string> = {};
  (data ?? []).forEach((row) => (map[row.key] = row.value));
  return map;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("getCategories failed:", error.message);
    return fallbackCategories;
  }
  return ((data as Category[]) ?? []).map(withFallbackPhoto);
}

export async function getCategory(slug: string): Promise<Category | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).maybeSingle();
  if (error) {
    console.error(`getCategory(${slug}) failed:`, error.message);
    return fallbackCategories.find((category) => category.slug === slug) ?? null;
  }
  return data ? withFallbackPhoto(data as Category) : null;
}

export async function getVeils(categorySlug: string): Promise<Veil[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("veils")
    .select("*")
    .eq("category_slug", categorySlug)
    .eq("visible", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error(`getVeils(${categorySlug}) failed:`, error.message);
    return [];
  }
  return (data as Veil[]) ?? [];
}

export async function getAllVisibleVeils(): Promise<Veil[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("veils")
    .select("*")
    .eq("visible", true)
    .order("category_slug", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("getAllVisibleVeils failed:", error.message);
    return [];
  }
  return (data as Veil[]) ?? [];
}

export async function getFeaturedVeils(limit = 4): Promise<Veil[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("veils")
    .select("*")
    .eq("visible", true)
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .limit(limit);
  if (error) {
    console.error("getFeaturedVeils failed:", error.message);
    return [];
  }
  return (data as Veil[]) ?? [];
}

export async function getVeilById(id: string): Promise<Veil | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("veils").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error(`getVeilById(${id}) failed:`, error.message);
    return null;
  }
  return (data as Veil) ?? null;
}
