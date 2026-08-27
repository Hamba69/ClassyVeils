import Image from "next/image";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { editorialPhotoUrl, photoUrl, Veil } from "@/lib/types";
import { deleteEditorialPhoto, deletePhoto, moveVeilPhoto, updateVeil } from "@/app/admin/actions";
import ImageUploadPreview from "@/components/admin/ImageUploadPreview";

export default async function EditVeilPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: veil } = await supabase.from("veils").select("*").eq("id", id).single<Veil>();

  if (!veil) notFound();

  const boundUpdate = updateVeil.bind(null, veil.id);

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="font-display text-2xl text-ink">Edit {veil.name}</h1>

      {veil.photos.length > 0 && (
        <div>
          <p className="text-sm font-medium text-ink">Photos</p>
          <p className="mt-1 text-xs leading-5 text-ink/50">Use the arrows to set the gallery order. The selected cover follows the image when it moves.</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {veil.photos.map((path, index) => (
              <div key={path} className="space-y-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-line">
                  <Image src={photoUrl(path)} alt={`Product photo ${index + 1}`} fill className="object-contain" sizes="(min-width: 640px) 200px, 45vw" />
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <form action={moveVeilPhoto.bind(null, veil.id, veil.category_slug, "product", path, "up")}>
                    <button type="submit" disabled={index === 0} className="grid min-h-11 w-full place-items-center rounded-lg border border-line disabled:opacity-30" aria-label={`Move product photo ${index + 1} earlier`}>↑</button>
                  </form>
                  <form action={moveVeilPhoto.bind(null, veil.id, veil.category_slug, "product", path, "down")}>
                    <button type="submit" disabled={index === veil.photos.length - 1} className="grid min-h-11 w-full place-items-center rounded-lg border border-line disabled:opacity-30" aria-label={`Move product photo ${index + 1} later`}>↓</button>
                  </form>
                  <form action={deletePhoto.bind(null, veil.id, veil.category_slug, path)}>
                  <button
                    type="submit"
                    className="min-h-11 w-full rounded-lg border border-line text-xs text-ink/60 hover:border-plum hover:text-plum"
                    aria-label={`Remove product photo ${index + 1}`}
                  >
                    ×
                  </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(veil.model_photos ?? []).length > 0 && (
        <div>
          <p className="text-sm font-medium text-ink">Editorial model photography</p>
          <p className="mt-1 text-xs leading-5 text-ink/50">Stored separately from real product photos so the provenance stays clear.</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {veil.model_photos.map((path, index) => (
              <div key={path} className="space-y-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-line">
                  <Image src={editorialPhotoUrl(path)} alt={`Editorial photo ${index + 1}`} fill className="object-cover" sizes="(min-width: 640px) 200px, 45vw" />
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <form action={moveVeilPhoto.bind(null, veil.id, veil.category_slug, "editorial", path, "up")}>
                    <button type="submit" disabled={index === 0} className="grid min-h-11 w-full place-items-center rounded-lg border border-line disabled:opacity-30" aria-label={`Move editorial photo ${index + 1} earlier`}>↑</button>
                  </form>
                  <form action={moveVeilPhoto.bind(null, veil.id, veil.category_slug, "editorial", path, "down")}>
                    <button type="submit" disabled={index === veil.model_photos.length - 1} className="grid min-h-11 w-full place-items-center rounded-lg border border-line disabled:opacity-30" aria-label={`Move editorial photo ${index + 1} later`}>↓</button>
                  </form>
                  <form action={deleteEditorialPhoto.bind(null, veil.id, veil.category_slug, path)}>
                    <button type="submit" className="min-h-11 w-full rounded-lg border border-line text-xs text-ink/60 hover:border-plum hover:text-plum" aria-label={`Remove editorial photo ${index + 1}`}>×</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <form action={boundUpdate} className="space-y-5 rounded-2xl border border-line bg-white/35 p-4 sm:p-6">
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
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {veil.photos.map((path, index) => (
              <label key={path} className="cursor-pointer space-y-2 rounded-xl border border-line p-2 text-xs text-ink/70 has-[:checked]:border-plum has-[:checked]:bg-plum/5">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-line">
                  <Image src={photoUrl(path)} alt="" fill className="object-contain" sizes="150px" />
                </div>
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cover_index"
                    value={index}
                    defaultChecked={index === veil.cover_index}
                  />
                  Product cover
                </span>
              </label>
            ))}
          </div>
        </div>
        {(veil.model_photos ?? []).length > 0 && (
          <div>
            <label className="text-sm font-medium text-ink">Editorial cover</label>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {veil.model_photos.map((path, index) => (
                <label key={path} className="cursor-pointer space-y-2 rounded-xl border border-line p-2 text-xs text-ink/70 has-[:checked]:border-plum has-[:checked]:bg-plum/5">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-line">
                    <Image src={editorialPhotoUrl(path)} alt="" fill className="object-cover" sizes="150px" />
                  </div>
                  <span className="flex min-h-11 items-center gap-2">
                    <input type="radio" name="editorial_cover_index" value={index} defaultChecked={index === veil.editorial_cover_index} className="h-5 w-5" />
                    Editorial cover
                  </span>
                </label>
              ))}
            </div>
            <label className="mt-3 flex min-h-11 items-center gap-3 rounded-xl border border-line bg-white px-3 text-sm text-ink/70">
              <input type="checkbox" name="use_editorial_cover" defaultChecked={veil.use_editorial_cover} className="h-5 w-5" />
              Use the selected editorial image on cards
            </label>
          </div>
        )}
        <label className="flex min-h-11 items-center gap-3 rounded-xl border border-line bg-white px-3 text-sm text-ink/70">
          <input type="checkbox" name="is_featured" defaultChecked={veil.is_featured} className="h-5 w-5" />
          Feature on homepage
        </label>
        <ImageUploadPreview name="photos" label="Add product photos" />
        <ImageUploadPreview name="editorial_photos" label="Add editorial model photos" />
        <div className="sticky bottom-3 z-10 rounded-2xl border border-line bg-linen/95 p-2 shadow-lg backdrop-blur">
          <button type="submit" className="min-h-12 w-full rounded-xl bg-ink px-4 text-sm font-medium text-linen hover:bg-plum">Save changes</button>
        </div>
      </form>
    </div>
  );
}
