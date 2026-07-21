import Link from "next/link";
import Image from "next/image";
import { getCategories, getSiteText } from "@/lib/data";
import { photoUrl } from "@/lib/types";
import FabricFold from "@/components/FabricFold";

export default async function HomePage() {
  const [categories, siteText] = await Promise.all([getCategories(), getSiteText()]);

  return (
    <main>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-ink/50">Classyveils.ug</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink md:text-5xl">
          {siteText.hero_headline || "Classy and luxurious veils"}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink/70">
          {siteText.hero_subhead ||
            "Jersey, chiffon, silk, and cotton ninja veils — made for everyday elegance."}
        </p>
      </section>

      <FabricFold className="max-w-3xl mx-auto" />

      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2">
          {categories.map((c) => (
            <Link key={c.slug} href={`/veils/${c.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-line">
                {c.header_photo ? (
                  <Image
                    src={photoUrl(c.header_photo)}
                    alt={c.label}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-ink/30">
                    {c.label}
                  </div>
                )}
              </div>
              <h2 className="mt-4 font-display text-2xl text-ink">{c.label}</h2>
              <p className="mt-1 text-sm text-ink/60">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
