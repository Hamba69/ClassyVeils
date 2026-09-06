import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="ClassyVeils home"><BrandLogo variant="mark" priority /><span className="hidden font-display text-xl sm:inline">ClassyVeils</span></Link>
        <nav aria-label="Main navigation" className="flex items-center gap-4 text-sm sm:gap-7">
          <Link href="/shop" className="text-plum">Collection</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
