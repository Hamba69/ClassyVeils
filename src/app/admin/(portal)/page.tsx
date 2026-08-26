import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { photoUrl, Category, Veil } from "@/lib/types";
import { createVeil, deleteVeil, moveVeil, toggleVisible } from "@/app/admin/actions";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const [{ data: categories }, { data: veils }] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order", { ascending: true }),
    supabase.from("veils").select("*").order("sort_order", { ascending: true }),
  ]);

  const byCategory = (slug: string) => (veils as Veil[] | null)?.filter((v) => v.category_slug === slug) ?? [];

  return (
    <div className="space-y-16">
      <div>
        <h1 className="font-display text-2xl text-ink">Veils</h1>
        <p className="mt-1 text-sm text-ink/60">
          Add new veils, hide ones that are sold out, reorder, or remove them.
        </p>
      </div>

      {(categories as Category[] | null)?.map((category) => (
        <section key={category.slug}>
          <h2 className="font-display text-xl text-ink">{category.label}</h2>

          <div className="mt-4 divide-y divide-line rounded-md border border-line">
            {byCategory(category.slug).length === 0 && (
              <p className="p-4 text-sm text-ink/50">No veils yet in this category.</p>
            )}
            {byCategory(category.slug).map((veil, i, arr) => (
              <div key={veil.id} className="flex items-center gap-4 p-4">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-sm bg-line">
                  {veil.photos[0] && (
                    <Image
                      src={photoUrl(veil.photos[0])}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-ink">{veil.name}</p>
                  <p className="text-sm text-ink/50">
                    {veil.price != null ? `UGX ${veil.price.toLocaleString()}` : "Price on request"}
                    {!veil.visible && " · hidden"}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-ink/50">
                  <form action={moveVeil.bind(null, veil.id, category.slug, "up")}>
                    <button
                      type="submit"
                      disabled={i === 0}
                      className="rounded px-2 py-1 hover:bg-line disabled:opacity-30"
                      aria-label="Move up"
                    >
                      ↑
                    </button>
                  </form>
                  <form action={moveVeil.bind(null, veil.id, category.slug, "down")}>
                    <button
                      type="submit"
                      disabled={i === arr.length - 1}
                      className="rounded px-2 py-1 hover:bg-line disabled:opacity-30"
                      aria-label="Move down"
                    >
                      ↓
                    </button>
                  </form>
                </div>

                <form action={toggleVisible.bind(null, veil.id, category.slug, !veil.visible)}>
                  <button
                    type="submit"
                    className="rounded-full border border-line px-3 py-1 text-xs text-ink/70 hover:border-plum hover:text-plum"
                  >
                    {veil.visible ? "Hide" : "Show"}
                  </button>
                </form>

                <Link
                  href={`/admin/veils/${veil.id}/edit`}
                  className="rounded-full border border-line px-3 py-1 text-xs text-ink/70 hover:border-plum hover:text-plum"
                >
                  Edit
                </Link>

                <form action={deleteVeil.bind(null, veil.id, category.slug)}>
                  <button
                    type="submit"
                    className="rounded-full border border-line px-3 py-1 text-xs text-ink/70 hover:border-plum hover:text-plum"
                  >
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>

          <details className="mt-4 rounded-md border border-line p-4">
            <summary className="cursor-pointer text-sm font-medium text-ink">
              + Add a {category.label.replace(/s$/, "").toLowerCase()}
            </summary>
            <form action={createVeil} className="mt-4 space-y-3">
              <input type="hidden" name="category_slug" value={category.slug} />
              <input
                name="name"
                placeholder="Name (e.g. Rosewood Silk Veil)"
                required
                className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
              />
              <input
                name="price"
                placeholder="Price in UGX (leave blank to say 'ask on WhatsApp')"
                className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
              />
              <input
                name="video_url"
                placeholder="Video URL (optional)"
                className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
              />
              <textarea
                name="description"
                placeholder="Short description"
                rows={2}
                className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
              />
              <label className="flex items-center gap-2 text-sm text-ink/70">
                <input type="checkbox" name="is_featured" className="h-4 w-4" />
                Feature on homepage
              </label>
              <input
                type="file"
                name="photos"
                multiple
                accept="image/*"
                className="w-full text-sm"
              />
              <button
                type="submit"
                className="rounded-md bg-ink px-4 py-2 text-sm text-linen hover:bg-plum"
              >
                Add veil
              </button>
            </form>
          </details>
        </section>
      ))}
    </div>
  );
}
