import { createClient } from "@/lib/supabase/server";
import { Category, Veil } from "@/lib/types";

export async function getSiteText(): Promise<Record<string, string>> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_text").select("key, value");
  const map: Record<string, string> = {};
  (data ?? []).forEach((row) => (map[row.key] = row.value));
  return map;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data as Category[]) ?? [];
}

export async function getCategory(slug: string): Promise<Category | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*").eq("slug", slug).maybeSingle();
  return (data as Category) ?? null;
}

export async function getVeils(categorySlug: string): Promise<Veil[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("veils")
    .select("*")
    .eq("category_slug", categorySlug)
    .eq("visible", true)
    .order("sort_order", { ascending: true });
  return (data as Veil[]) ?? [];
}
