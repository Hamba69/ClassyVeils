import Image from 'next/image';
import Link from 'next/link';
import { getSiteText } from '@/lib/data';
import { enquiryUrl } from '@/lib/collection';
import CollectionGallery from '@/components/CollectionGallery';

export default async function HomePage() {
  const text = await getSiteText();
  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-sage">Classy and luxurious veils & scarves</p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">Celebrate<br /><span className="italic text-plum">your veil.</span></h1>
          <p className="mt-6 max-w-md text-base leading-8 text-ink/70">Elegance, comfort and everyday confidence. Thoughtfully selected veils to help you express your style and embrace the beauty of modest fashion.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="rounded-full bg-plum px-6 py-3.5 text-sm text-white transition hover:bg-ink">Explore the collection</Link>
            <a href={enquiryUrl(text.whatsapp_number)} className="rounded-full border border-line bg-white px-6 py-3.5 text-sm text-ink">Talk to Anisha <span aria-hidden="true">↗</span></a>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-ink/45">Everyday elegance · Special moments</p>
        </div>
        <div className="relative pb-8 pr-9 sm:pr-14">
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-[10rem] rounded-b-2xl bg-line">
            <Image unoptimized src="/collection/img-3177.webp" alt="Pale pink veil styled with a soft blue dress" fill preload sizes="(min-width: 1024px) 45vw, 85vw" className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-[38%] overflow-hidden rounded-t-[4rem] rounded-b-xl border-4 border-white shadow-lg">
            <Image unoptimized src="/collection/img-9833.webp" alt="A softly draped rose-coloured veil" width={480} height={640} className="aspect-[3/4] w-full object-cover" sizes="(min-width: 1024px) 18vw, 33vw" />
          </div>
        </div>
      </section>
      <section className="border-y border-line bg-white/75 px-5 py-7 text-center">
        <p className="font-display text-xl italic text-ink/75 sm:text-2xl">Where elegance meets everyday comfort.</p>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs uppercase tracking-[0.25em] text-sage">In the spotlight</p><h2 className="mt-3 font-display text-3xl sm:text-4xl">Find your next favourite.</h2></div>
          <Link href="/shop" className="text-sm text-plum underline underline-offset-4">View the full collection ↗</Link>
        </div>
        <CollectionGallery whatsappNumber={text.whatsapp_number} limit={6} />
      </section>
      <section className="mx-auto mb-10 max-w-6xl px-5 sm:px-8">
        <div className="rounded-[2rem] border border-line bg-white px-6 py-12 text-center sm:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-sage">A personal touch</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">Let’s find your perfect drape.</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-ink/65">From a comfortable everyday look to a special occasion, Anisha can help you choose. Send your favourite photo to confirm the fabric, colour, price and availability.</p>
          <a href={enquiryUrl(text.whatsapp_number)} className="mt-7 inline-block rounded-full bg-plum px-6 py-3 text-sm text-white">Enquire on WhatsApp</a>
        </div>
      </section>
    </main>
  );
}
