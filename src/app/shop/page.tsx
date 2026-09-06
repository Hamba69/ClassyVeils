import type { Metadata } from 'next';
import CollectionGallery from '@/components/CollectionGallery';
import { getSiteText } from '@/lib/data';

export const metadata: Metadata = {
  title: 'The new collection | ClassyVeils',
  description: 'Explore the latest ClassyVeils photography and enquire with Anisha about your favourite veil.',
};

export default async function ShopPage() {
  const text = await getSiteText();
  return (
    <main>
      <header className="page-intro">
        <p className="text-xs uppercase tracking-[0.3em] text-sage">Discover ClassyVeils</p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">Find the veil that<br /><span className="italic text-plum">feels like you.</span></h1>
        <p className="mt-5 text-base leading-8 text-ink/65">Beautiful colours, graceful drapes and effortless styling. Browse our latest photographs and enquire with Anisha to confirm the fabric, price and availability.</p>
      </header><section className="section-shell"><div className="mb-8 flex flex-wrap justify-between gap-3 border-b border-line pb-5 text-xs text-plum"><p>51 photographs · The real collection</p><p>Choose a photo → Share its reference → Confirm with Anisha</p></div>
      <CollectionGallery whatsappNumber={text.whatsapp_number} />
    </section></main>
  );
}
