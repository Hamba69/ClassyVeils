import Image from "next/image";

export default function CollectionPhoto({
  reference,
  alt,
  className = "",
  priority = false,
}: {
  reference: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`editorial-image collection-photo ${className}`}>
      <Image
        unoptimized
        src={`/collection/img-${reference}.webp`}
        alt={alt}
        fill
        preload={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </figure>
  );
}
