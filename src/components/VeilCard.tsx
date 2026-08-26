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
  const editorialCover = veil.model_photos?.[veil.editorial_cover_index] ?? veil.model_photos?.[0];
  const usesEditorial = Boolean(veil.use_editorial_cover && editorialCover);
  const cover = usesEditorial ? editorialCover : realCover;
  const coverUrl = cover ? (usesEditorial ? editorialPhotoUrl(cover) : photoUrl(cover)) : null;
  const hover = veil.photos[1];

  return (
    <div className="group">
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
              Loved lately
            </span>
          )}
        </div>
      </Link>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base leading-tight text-ink sm:text-lg">
            {veil.name}
          </h3>
          {veil.price != null && (
            <p className="text-sm text-ink/60">UGX {veil.price.toLocaleString()}</p>
          )}
        </div>
      </div>
      {veil.description && (
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{veil.description}</p>
      )}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <AddToCartButton item={{ id: veil.id, name: veil.name, price: veil.price, photo: coverUrl }} />
        <WhatsAppOrderButton veilName={veil.name} whatsappNumber={whatsappNumber} />
      </div>
    </div>
  );
}
