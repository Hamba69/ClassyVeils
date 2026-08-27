import { createAdminClient } from "@/lib/supabase/admin";
import { Category } from "@/lib/types";
import { updateCategoryText } from "@/app/admin/actions";

export default async function CategoriesPage() {
  const supabase = createAdminClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-2xl text-ink">Category pages</h1>
        <p className="mt-1 text-sm text-ink/60">
          This is the story text on each fabric&apos;s page — not the individual veil listings.
        </p>
      </div>

      {(categories as Category[] | null)?.map((c) => (
        <form key={c.slug} action={updateCategoryText} className="max-w-xl space-y-4 rounded-2xl border border-line bg-white/35 p-4 sm:p-6">
          <input type="hidden" name="slug" value={c.slug} />
          <h2 className="font-display text-lg text-ink">{c.label}</h2>

          <div>
            <label className="text-sm font-medium text-ink">Tagline</label>
            <input
              name="tagline"
              defaultValue={c.tagline}
              className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink">Intro paragraph</label>
            <textarea
              name="intro"
              defaultValue={c.intro}
              rows={3}
              className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink">
              Bullet points (one per line)
            </label>
            <textarea
              name="bullets"
              defaultValue={c.bullets.join("\n")}
              rows={5}
              className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink">Video URL (optional)</label>
            <input
              name="video_url"
              defaultValue={c.video_url ?? ""}
              className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
            />
          </div>
          <div className="sticky bottom-3 z-10 rounded-2xl border border-line bg-linen/95 p-2 shadow-lg backdrop-blur">
            <button type="submit" className="min-h-12 w-full rounded-xl bg-ink px-4 text-sm font-medium text-linen hover:bg-plum">Save {c.label}</button>
          </div>
        </form>
      ))}
    </div>
  );
}
