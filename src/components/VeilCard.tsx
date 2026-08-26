import Image from "next/image";
import Link from "next/link";
import { Veil, editorialPhotoUrl, photoUrl } from "@/lib/types";
import WhatsAppOrderButton from "./WhatsAppOrderButton";
import AddToCartButton from "@/components/cart/AddToCartButton";

export default function VeilCard({
  veil,
  whatsappNumber,
}: {
  veil: Veil;
  whatsappNumber: string;
}) {
  const realCover = veil.photos[veil.cover_index] ?? veil.photos[0];
  const realCoverUrl = realCover ? photoUrl(realCover) : null;
  const editorialCover = veil.model_photos?.[veil.editorial_cover_index] ?? veil.model_photos?.[0];
  const usesEditorial = Boolean(veil.use_editorial_cover && editorialCover);
  const cover = usesEditorial ? editorialCover : realCover;
  const coverUrl = cover ? (usesEditorial ? editorialPhotoUrl(cover) : photoUrl(cover)) : null;
  const hover = veil.photos[1];

  return (
    <article className="group">
      <Link href={`/veils/${veil.category_slug}/${veil.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-line">
          {coverUrl ? (
            <>
              <Image
                src={coverUrl}
                alt={veil.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03] group-hover:opacity-0"
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              {hover && (
                <Image
                  src={photoUrl(hover)}
                  alt=""
                  fill
                  aria-hidden="true"
                  className="object-cover opacity-0 transition duration-500 group-hover:opacity-100 group-hover:scale-[1.03]"
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-ink/30">
              Photo coming soon
            </div>
          )}
          {veil.is_featured && (
            <span className="absolute left-3 top-3 rounded-full bg-linen/90 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-ink shadow-sm">
              Signature edit
            </span>
          )}
          <span className="absolute right-3 top-3 rounded-full bg-sage/90 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-white shadow-sm">
            Available
          </span>
          {usesEditorial && realCoverUrl && (
            <span className="absolute bottom-3 right-3 h-20 w-16 overflow-hidden rounded-xl border-2 border-linen bg-linen shadow-lg sm:h-24 sm:w-20">
              <Image
                src={realCoverUrl}
                alt={`${veil.name} actual product`}
                fill
                className="object-cover"
                sizes="80px"
              />
              <span className="absolute inset-x-0 bottom-0 bg-ink/72 py-1 text-center text-[0.5rem] uppercase tracking-[0.08em] text-white">
                Actual
              </span>
            </span>
          )}
        </div>
      </Link>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base leading-tight text-ink sm:text-lg">
            {veil.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-plum">
            {veil.price != null ? `UGX ${veil.price.toLocaleString()}` : "Price on request"}
          </p>
        </div>
      </div>
      {veil.description && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/68">{veil.description}</p>
      )}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <AddToCartButton item={{ id: veil.id, name: veil.name, price: veil.price, photo: coverUrl }} />
        <WhatsAppOrderButton veilName={veil.name} whatsappNumber={whatsappNumber} />
      </div>
    </article>
  );
}
