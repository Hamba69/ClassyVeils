import Image from "next/image";
import { collection, enquiryUrl } from "@/lib/collection";
import { Veil, photoUrl } from "@/lib/types";
import Reveal from "./Reveal";

export default function CollectionGallery({
  whatsappNumber,
  limit,
  veils = [],
  category,
}: {
  whatsappNumber: string;
  limit?: number;
  veils?: Veil[];
  category?: string;
}) {
  // Only exact photo paths establish a product relationship, never visual guesses.
  const published = veils.filter((veil) => veil.visible);
  const gallery = collection.map((photo) => ({
    ...photo,
    veil: published.find((veil) =>
      veil.photos.some((path) => photoUrl(path) === photo.src),
    ),
  }));
  const matchedIds = new Set(gallery.map((photo) => photo.veil?.id));
  const added = published
    .filter((veil) => !matchedIds.has(veil.id))
    .flatMap((veil) => {
      const cover = veil.photos[veil.cover_index] ?? veil.photos[0];
      return cover
        ? [{ id: veil.id, src: photoUrl(cover), alt: veil.name, veil }]
        : [];
    });
  const allPhotos = [...added, ...gallery];
  const eligible = category
    ? allPhotos.filter((photo) => photo.veil?.category_slug === category)
    : allPhotos;
  const photos = limit ? eligible.slice(0, limit) : eligible;
  if (!photos.length)
    return (
      <p className="catalogue-empty">
        I’m still building this edit. Browse the full collection while I prepare
        more in this fabric.
      </p>
    );
  return (
    <div
      className={`grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 ${limit === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
    >
      {photos.map((photo) => (
        <article
          id={`photo-${photo.id}`}
          key={photo.id}
          className="group scroll-mt-28 collection-card"
        >
          <Reveal>
            <a
              href={photo.src}
              target="_blank"
              rel="noreferrer"
              aria-label={`View veil reference ${photo.id}`}
              className="relative block aspect-[3/4] overflow-hidden rounded-t-[5rem] rounded-b-xl bg-line"
            >
              <Image
                unoptimized
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.025]"
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
            </a>
          </Reveal>
          <div className="photo-details">
            <p>{photo.veil?.name ?? `Reference ${photo.id}`}</p>
            <p className="photo-price">
              {photo.veil?.price != null
                ? `UGX ${photo.veil.price.toLocaleString("en-UG")}`
                : "Price not yet listed"}
            </p>
            <p className="photo-availability">
              Availability: I’ll confirm this for you
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <a
              className="text-sm text-plum underline decoration-plum/30 underline-offset-4 hover:decoration-plum"
              href={enquiryUrl(whatsappNumber, photo.id)}
            >
              Enquire on WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
