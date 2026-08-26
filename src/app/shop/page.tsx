import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FabricFold from "@/components/FabricFold";
import VeilCard from "@/components/VeilCard";
import { getAllVisibleVeils, getCategories, getSiteText } from "@/lib/data";
import { editorialPhotoUrl, photoUrl } from "@/lib/types";

export const metadata: Metadata = {
  title: "Shop all veils | Classyveils.ug",
  description: "Shop the complete Classyveils edit across jersey, chiffon, silk, and cotton ninja veils.",
};

export default async function ShopPage() {
  const [categories, veils, siteText] = await Promise.all([
    getCategories(),
    getAllVisibleVeils(),
    getSiteText(),
  ]);

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-16">
        <div className="max-w-3xl">
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-plum sm:text-xs">
            {veils.length} available edits · four signature fabrics
          </p>
          <h1 className="mt-3 font-display text-5xl leading-[0.94] tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl">
            Find the veil that feels like you.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-ink/68 sm:text-base">
            Shop every available piece by fabric. Campaign portraits show the styling; inset photographs show the actual product you will order.
          </p>
        </div>

        <nav aria-label="Shop by fabric" className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              className="shrink-0 rounded-full border border-line bg-white/70 px-4 py-2.5 text-sm text-ink/72 transition hover:border-plum hover:text-plum"
            >
              {category.label}
            </a>
          ))}
        </nav>
      </section>

      {categories.map((category, categoryIndex) => {
        const categoryVeils = veils.filter((veil) => veil.category_slug === category.slug);
        const campaignVeil = categoryVeils.find((veil) => veil.model_photos.length > 0);
        const campaignPath = campaignVeil?.model_photos[campaignVeil.editorial_cover_index]
          ?? campaignVeil?.model_photos[0];
        const campaignUrl = campaignPath
          ? editorialPhotoUrl(campaignPath)
          : category.header_photo
            ? photoUrl(category.header_photo)
            : null;

        return (
          <div key={category.slug}>
            {categoryIndex > 0 && (
              <div className="mx-auto max-w-4xl">
                <FabricFold />
              </div>
            )}
            <section id={category.slug} className="scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16">
              <div className="mx-auto max-w-6xl">
                <div className="grid overflow-hidden rounded-[2rem] border border-line bg-white/55 lg:grid-cols-[0.88fr_1.12fr]">
                  <div className={`relative min-h-[30rem] bg-line ${categoryIndex % 2 === 1 ? "lg:order-2" : ""}`}>
                    {campaignUrl && (
                      <Image
                        src={campaignUrl}
                        alt={`${category.label} styled campaign portrait`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 42vw, 100vw"
                      />
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-linen/90 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.2em] text-ink shadow-sm">
                      Styled by Classyveils
                    </span>
                  </div>
                  <div className="flex flex-col justify-end p-6 sm:p-9 lg:p-12">
                    <p className="text-[0.65rem] uppercase tracking-[0.24em] text-plum">
                      {categoryVeils.length} available to order
                    </p>
                    <h2 className="mt-3 font-display text-4xl leading-none text-ink sm:text-5xl">
                      {category.label}
                    </h2>
                    <p className="mt-4 font-display text-xl italic text-ink/65">{category.tagline}</p>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-ink/68">{category.intro}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {category.bullets.slice(0, 3).map((bullet) => (
                        <span key={bullet} className="rounded-full border border-line bg-linen px-3 py-2 text-xs text-ink/62">
                          {bullet}
                        </span>
                      ))}
                    </div>
                    <Link href={`/veils/${category.slug}`} className="mt-8 inline-flex w-fit items-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-linen transition hover:bg-plum">
                      Explore this fabric
                    </Link>
                  </div>
                </div>

                <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categoryVeils.map((veil) => (
                    <VeilCard key={veil.id} veil={veil} whatsappNumber={siteText.whatsapp_number} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </main>
  );
}
