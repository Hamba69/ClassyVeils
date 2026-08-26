import Link from "next/link";

const categories = [
  { slug: "jersey", label: "Jersey" },
  { slug: "chiffon", label: "Chiffon" },
  { slug: "silk", label: "Silk" },
  { slug: "cotton-ninja", label: "Cotton Ninja" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-line/80 bg-linen/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:py-5">
        <Link href="/" className="font-display text-lg tracking-tight text-ink sm:text-xl">
          Classyveils<span className="text-plum">.</span>ug
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm md:justify-end">
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
            className="shrink-0 rounded-full border border-ink bg-ink px-3 py-2 text-linen transition hover:bg-plum hover:border-plum"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
