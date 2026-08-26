import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategory, getSiteText, getVeils } from "@/lib/data";
import { photoUrl } from "@/lib/types";
import VeilCard from "@/components/VeilCard";
import FabricFold from "@/components/FabricFold";
import EditorialVideo from "@/components/EditorialVideo";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const [veils, siteText] = await Promise.all([getVeils(slug), getSiteText()]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-ink/50 sm:text-xs">
            {category.label}
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl leading-[0.98] tracking-[-0.03em] text-ink sm:text-5xl">
            {category.tagline}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/70 sm:text-base">
            {category.intro}
          </p>

          {category.bullets.length > 0 && (
            <ul className="mt-6 grid max-w-2xl gap-2 sm:grid-cols-2">
              {category.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink/70">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-plum" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-line bg-line">
          {category.header_photo ? (
            <Image
              src={photoUrl(category.header_photo)}
              alt={`${category.label} veils`}
              width={1200}
              height={1500}
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          ) : (
            <div className="flex min-h-[24rem] items-center justify-center text-ink/30">
              Header photo coming soon
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto mt-10 max-w-4xl">
        <FabricFold />
      </div>

      {category.video_url && (
        <section className="mt-10 overflow-hidden rounded-[2rem] border border-line bg-black/5">
          <EditorialVideo src={category.video_url} poster={category.header_photo ? photoUrl(category.header_photo) : null} alt={`${category.label} fabric in motion`} className="aspect-video w-full" />
        </section>
      )}

      {veils.length === 0 ? (
        <p className="mt-8 text-ink/50 sm:mt-10">New {category.label.toLowerCase()} are on the way.</p>
      ) : (
        <section className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {veils.map((veil) => (
            <div key={veil.id} className="mb-6 break-inside-avoid">
              <VeilCard veil={veil} whatsappNumber={siteText.whatsapp_number} />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
