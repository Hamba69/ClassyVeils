import Link from "next/link";

const categories = [
  { slug: "jersey", label: "Jersey" },
  { slug: "chiffon", label: "Chiffon" },
  { slug: "silk", label: "Silk" },
  { slug: "cotton-ninja", label: "Cotton Ninja" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-xl tracking-tight text-ink">
          Classyveils<span className="text-plum">.</span>ug
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/veils/${c.slug}`}
              className="text-ink/70 transition hover:text-plum"
            >
              {c.label}
            </Link>
          ))}
          <Link href="/about" className="text-ink/70 transition hover:text-plum">
            About
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-ink/20 px-4 py-1.5 text-ink transition hover:border-plum hover:text-plum"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
