import Link from "next/link";
import Image from "next/image";
import { getCategories, getFeaturedVeils, getSiteText } from "@/lib/data";
import { photoUrl } from "@/lib/types";
import FabricFold from "@/components/FabricFold";
import VeilCard from "@/components/VeilCard";

export default async function HomePage() {
  const [categories, featuredVeils, siteText] = await Promise.all([
    getCategories(),
    getFeaturedVeils(),
    getSiteText(),
  ]);
  const jerseyCategory = categories.find((c) => c.slug === "jersey");
  const heroImages = categories.flatMap((c) => (c.header_photo ? [c.header_photo] : [])).slice(0, 3);

  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-8 pt-8 sm:px-6 sm:pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:pt-14">
        <div className="max-w-2xl">
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-ink/50 sm:text-xs">
            Classyveils.ug
          </p>
          <h1 className="mt-3 font-display text-4xl leading-[0.98] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl">
            {siteText.hero_headline || "Classy and luxurious veils"}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-ink/72 sm:text-base">
            {siteText.hero_subhead ||
              "Jersey, chiffon, silk, and cotton ninja veils - made for everyday elegance."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/veils/silk" className="rounded-full bg-ink px-5 py-3 text-sm text-linen">
              Shop silk
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-line bg-white/70 px-5 py-3 text-sm text-ink/75"
            >
              Contact Anisha
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3">
          {heroImages.map((path, i) => (
            <div
              key={path}
              className={`relative overflow-hidden rounded-3xl bg-line ${
                i === 0 ? "col-span-12 aspect-[4/5]" : i === 1 ? "col-span-7 aspect-[3/4]" : "col-span-5 aspect-[4/5] translate-y-6"
              }`}
            >
              <Image
                src={photoUrl(path)}
                alt="Classyveils featured photography"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 36vw, 100vw"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-4xl">
        <FabricFold />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-ink/50 sm:text-xs">
              Loved lately
            </p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              Featured veils
            </h2>
          </div>
          <Link href="/veils/jersey" className="text-sm text-plum underline underline-offset-4">
            Browse all
          </Link>
        </div>
        <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {featuredVeils.map((veil) => (
            <VeilCard key={veil.id} veil={veil} whatsappNumber={siteText.whatsapp_number} />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-4xl">
        <FabricFold />
      </div>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {categories.map((c) => (
            <Link key={c.slug} href={`/veils/${c.slug}`} className="group block">
              <div className="relative aspect-[5/6] overflow-hidden rounded-2xl bg-line sm:aspect-[16/10]">
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
              <h2 className="mt-3 font-display text-xl text-ink sm:mt-4 sm:text-2xl">
                {c.label}
              </h2>
              <p className="mt-1 text-sm text-ink/60">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-4xl">
        <FabricFold />
      </div>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-ink/50 sm:text-xs">
            See it drape
          </p>
          <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
            Jersey styling clip
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink/70">
            A short motion preview helps show stretch, movement, and fall more clearly than stills alone.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-line bg-black/5">
          {jerseyCategory?.video_url ? (
            <video
              src={jerseyCategory.video_url}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex min-h-[280px] items-center justify-center bg-gradient-to-br from-linen to-white text-sm text-ink/40">
              Jersey video coming soon
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-4xl">
        <FabricFold />
      </div>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-white/60 px-5 py-5">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-ink/50 sm:text-xs">
              Stay close
            </p>
            <p className="mt-2 font-display text-xl text-ink">WhatsApp and Instagram</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            {siteText.whatsapp_number && (
              <a
                className="rounded-full bg-ink px-4 py-2 text-linen"
                href={`https://wa.me/${siteText.whatsapp_number.replace(/[^\d]/g, "")}`}
              >
                WhatsApp
              </a>
            )}
            {siteText.instagram_handle && (
              <a
                className="rounded-full border border-line px-4 py-2 text-ink/75"
                href={`https://instagram.com/${siteText.instagram_handle.replace("@", "")}`}
              >
                Instagram
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
