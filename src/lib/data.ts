import { createClient } from "@/lib/supabase/server";
import { Category, Veil } from "@/lib/types";

export async function getSiteText(): Promise<Record<string, string>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_text").select("key, value");
  if (error) {
    console.error("getSiteText failed:", error.message);
    throw new Error(`Could not load site text: ${error.message}`);
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
    throw new Error(`Could not load categories: ${error.message}`);
  }
  return (data as Category[]) ?? [];
}

export async function getCategory(slug: string): Promise<Category | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).maybeSingle();
  if (error) {
    console.error(`getCategory(${slug}) failed:`, error.message);
    throw new Error(`Could not load category "${slug}": ${error.message}`);
  }
  return (data as Category) ?? null;
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
    throw new Error(`Could not load veils for "${categorySlug}": ${error.message}`);
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
    throw new Error(`Could not load featured veils: ${error.message}`);
  }
  return (data as Veil[]) ?? [];
}

export async function getVeilById(id: string): Promise<Veil | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("veils").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error(`getVeilById(${id}) failed:`, error.message);
    throw new Error(`Could not load veil "${id}": ${error.message}`);
  }
  return (data as Veil) ?? null;
}
