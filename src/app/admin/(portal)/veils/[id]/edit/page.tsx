import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { photoUrl, Veil } from "@/lib/types";
import { updateVeil, deletePhoto } from "@/app/admin/actions";

export default async function EditVeilPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: veil } = await supabase.from("veils").select("*").eq("id", id).single<Veil>();

  if (!veil) notFound();

  const boundUpdate = updateVeil.bind(null, veil.id);

  return (
    <div className="max-w-lg space-y-8">
      <h1 className="font-display text-2xl text-ink">Edit {veil.name}</h1>

      {veil.photos.length > 0 && (
        <div>
          <p className="text-sm font-medium text-ink">Photos</p>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {veil.photos.map((path) => (
              <div key={path} className="space-y-2">
                <div className="relative aspect-square overflow-hidden rounded-sm bg-line">
                  <Image src={photoUrl(path)} alt="" fill className="object-cover" sizes="150px" />
                </div>
                <form action={deletePhoto.bind(null, veil.id, veil.category_slug, path)}>
                  <button
                    type="submit"
                    className="w-full rounded border border-line py-1 text-xs text-ink/60 hover:border-plum hover:text-plum"
                  >
                    Remove
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}

      <form action={boundUpdate} className="space-y-3">
        <input type="hidden" name="category_slug" value={veil.category_slug} />
        <div>
          <label className="text-sm font-medium text-ink">Name</label>
          <input
            name="name"
            defaultValue={veil.name}
            required
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Price (UGX, blank = ask on WhatsApp)</label>
          <input
            name="price"
            defaultValue={veil.price ?? ""}
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Description</label>
          <textarea
            name="description"
            defaultValue={veil.description}
            rows={3}
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Video URL (optional)</label>
          <input
            name="video_url"
            defaultValue={veil.video_url ?? ""}
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Cover photo</label>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {veil.photos.map((path, index) => (
              <label key={path} className="cursor-pointer space-y-2 text-xs text-ink/70">
                <div className="relative aspect-square overflow-hidden rounded-sm bg-line">
                  <Image src={photoUrl(path)} alt="" fill className="object-cover" sizes="150px" />
                </div>
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cover_index"
                    value={index}
                    defaultChecked={index === veil.cover_index}
                  />
                  Use as cover
                </span>
              </label>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input type="checkbox" name="is_featured" defaultChecked={veil.is_featured} className="h-4 w-4" />
          Feature on homepage
        </label>
        <div>
          <label className="text-sm font-medium text-ink">Add more photos</label>
          <input type="file" name="photos" multiple accept="image/*" className="mt-1 w-full text-sm" />
        </div>
        <button
          type="submit"
          className="rounded-md bg-ink px-4 py-2 text-sm text-linen hover:bg-plum"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
