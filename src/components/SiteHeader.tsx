import Link from "next/link";
import CartLauncher from "@/components/cart/CartLauncher";
import BrandLogo from "@/components/BrandLogo";

const categories = [
  { slug: "jersey", label: "Jersey" },
  { slug: "chiffon", label: "Chiffon" },
  { slug: "silk", label: "Silk" },
  { slug: "cotton-ninja", label: "Cotton Ninja" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-linen/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-4 py-4 sm:px-6 md:py-5">
        <Link href="/" className="flex items-center gap-2.5 text-ink" aria-label="Classy Veils home">
          <BrandLogo variant="mark" priority />
          <span className="font-display text-lg tracking-tight sm:text-xl">
            Classyveils<span className="text-plum">.</span>ug
          </span>
        </Link>
        <nav className="hidden items-center gap-2 text-sm md:flex md:justify-end">
          <Link
            href="/shop"
            className="shrink-0 rounded-full border border-ink bg-ink px-3 py-2 text-linen transition hover:border-plum hover:bg-plum"
          >
            Shop all
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/veils/${c.slug}`}
              className="shrink-0 rounded-full border border-line bg-white/50 px-3 py-2 text-ink/75 transition hover:border-plum hover:text-plum"
            >
              {c.label}
            </Link>
          ))}
          <Link
            href="/about"
            className="shrink-0 rounded-full border border-line bg-white/50 px-3 py-2 text-ink/75 transition hover:border-plum hover:text-plum"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="shrink-0 rounded-full border border-line bg-white/50 px-3 py-2 text-ink/75 transition hover:border-plum hover:text-plum"
          >
            Contact
          </Link>
          <CartLauncher />
        </nav>
      </div>
    </header>
  );
}
