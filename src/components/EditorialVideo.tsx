import Image from "next/image";

export default function EditorialVideo({ src, poster, alt, className = "" }: { src: string; poster?: string | null; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-line ${className}`}>
      {poster ? <Image src={poster} alt={alt} fill className="object-cover" sizes="100vw" /> : null}
      <video
        src={src}
        poster={poster ?? undefined}
        autoPlay
        loop
        muted
        playsInline
        data-motion-media
        className="relative h-full w-full object-cover motion-reduce:hidden"
      />
    </div>
  );
}
