import { getSiteText } from "@/lib/data";
import EditorialImage from '@/components/EditorialImage';
import Link from 'next/link';

export default async function AboutPage() {
  const siteText = await getSiteText();

  return (
    <main><header className="page-intro"><p className="eyebrow">Our story</p><h1>Elegance is personal.<br /><em>So are we.</em></h1><p>A celebration of modest fashion, beautiful colour and the confidence to be yourself.</p></header><section className="section-shell styling-grid"><EditorialImage name="rose" alt="AI editorial illustration reflecting the soft rose ClassyVeils palette" /><div>
      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-ink/50 sm:text-xs">About</p>
      <h1 className="mt-3 font-display text-3xl leading-[1.05] text-ink sm:text-4xl">
        Anisha B Yusurah
      </h1>
      <p className="mt-5 whitespace-pre-line text-sm leading-7 text-ink/80 sm:mt-6 sm:text-base">
        {siteText.about_bio}
      </p>
      <p className="mt-6 text-sm leading-8 text-ink/70 sm:text-base">At ClassyVeils, we believe every woman deserves a veil that combines elegance, comfort and quality. Our collection celebrates modest fashion, from easy everyday styling to graceful looks for special occasions.</p>
      <p className="mt-6 font-display text-2xl italic text-plum">Celebrate your veil. Wear it with confidence.</p>
      <Link href="/contact" className="pill mt-8">Say hello to Anisha ↗</Link>
      </div></section></main>
  );
}
