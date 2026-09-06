import Image from 'next/image';

export default function EditorialImage({ name, alt, priority = false, className = '' }: { name: string; alt: string; priority?: boolean; className?: string }) {
  return <figure className={`editorial-image ${className}`}><Image unoptimized src={`/editorial/${name}.webp`} alt={alt} fill preload={priority} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /><figcaption>AI styling illustration</figcaption></figure>;
}
