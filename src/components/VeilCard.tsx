import Image from "next/image";
import { Veil, photoUrl } from "@/lib/types";
import WhatsAppOrderButton from "./WhatsAppOrderButton";

export default function VeilCard({
  veil,
  whatsappNumber,
}: {
  veil: Veil;
  whatsappNumber: string;
}) {
  const cover = veil.photos[0];

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-line">
        {cover ? (
          <Image
            src={photoUrl(cover)}
            alt={veil.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-ink/30">
            Photo coming soon
          </div>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg text-ink">{veil.name}</h3>
          {veil.price != null && (
            <p className="text-sm text-ink/60">UGX {veil.price.toLocaleString()}</p>
          )}
        </div>
      </div>
      {veil.description && (
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{veil.description}</p>
      )}
      <div className="mt-3">
        <WhatsAppOrderButton veilName={veil.name} whatsappNumber={whatsappNumber} />
      </div>
    </div>
  );
}
