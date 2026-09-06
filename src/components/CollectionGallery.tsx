import Image from 'next/image';
import { collection, enquiryUrl } from '@/lib/collection';

export default function CollectionGallery({ whatsappNumber, limit }: { whatsappNumber: string; limit?: number }) {
  const photos = limit ? collection.slice(0, limit) : collection;
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
      {photos.map((photo) => (
        <article id={`photo-${photo.id}`} key={photo.id} className="group scroll-mt-28">
          <a href={photo.src} target="_blank" rel="noreferrer" aria-label={`View full photograph ${photo.id}`} className="relative block aspect-[3/4] overflow-hidden rounded-t-[5rem] rounded-b-xl bg-line">
            <Image unoptimized src={photo.src} alt={photo.alt} fill className="object-cover transition duration-500 group-hover:scale-[1.025]" sizes="(min-width: 1024px) 33vw, 50vw" />
          </a>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs tracking-widest text-ink/55">PHOTO {photo.id}</p>
            <a className="text-sm text-plum underline decoration-plum/30 underline-offset-4 hover:decoration-plum" href={enquiryUrl(whatsappNumber, photo.id)}>Enquire on WhatsApp <span aria-hidden="true">↗</span></a>
          </div>
        </article>
      ))}
    </div>
  );
}
