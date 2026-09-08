import { createClient } from "@/lib/supabase/server";
import { Category, Veil } from "@/lib/types";

const fallbackSiteText: Record<string, string> = {
  hero_headline: "Find your shade of the day",
  hero_subhead: "A considered edit of jersey, chiffon, silk, and cotton veils, chosen by Anisha for colour, comfort, and an easy sense of occasion.",
  about_bio: "Anisha B Yusurah’s edit brings together veils and scarves chosen for their colour, comfort, and the way they make an outfit feel.",
  whatsapp_number: "+256705019297",
  contact_phone: "",
  instagram_handle: "",
};

const fallbackCategories: Category[] = [
  { slug: "jersey", label: "Jersey", tagline: "Soft structure for everyday wear.", intro: "Matte, breathable jersey with gentle stretch and an easy drape that stays comfortable through the day.", bullets: ["Soft, breathable jersey", "Gentle stretch", "Easy everyday drape"], header_photo: null, video_url: null, sort_order: 1 },
  { slug: "chiffon", label: "Chiffon", tagline: "Light, sheer, and easy to layer.", intro: "Airy chiffon with a fine texture and a graceful fall, lovely when you want movement around the face and shoulder.", bullets: ["Lightweight texture", "Airy movement", "A soft layered finish"], header_photo: null, video_url: null, sort_order: 2 },
  { slug: "silk", label: "Silk", tagline: "A little sheen, beautifully held.", intro: "Smooth silk with a quiet sheen and fluid folds for days when the fabric should carry the look.", bullets: ["Smooth hand", "Subtle natural sheen", "Fluid folds"], header_photo: null, video_url: null, sort_order: 3 },
  { slug: "cotton-ninja", label: "Cotton ninja", tagline: "Comfort with a clean, covered shape.", intro: "Breathable cotton pieces with a secure shape and full coverage for simple, considered everyday dressing.", bullets: ["Breathable cotton blend", "Full everyday coverage", "A secure, simple shape"], header_photo: null, video_url: null, sort_order: 4 },
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
  return { ...fallbackSiteText, ...map };
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
