import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategory, getSiteText, getVeils } from "@/lib/data";
import { editorialPhotoUrl, photoUrl } from "@/lib/types";
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
  const campaignVeil = veils.find((veil) => veil.model_photos.length > 0);
  const campaignPath = campaignVeil?.model_photos[campaignVeil.editorial_cover_index]
    ?? campaignVeil?.model_photos[0];
  const heroUrl = campaignPath
    ? editorialPhotoUrl(campaignPath)
    : category.header_photo
      ? photoUrl(category.header_photo)
      : null;

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
          <p className="mt-5 inline-flex rounded-full border border-line bg-white/65 px-3 py-2 text-xs font-medium text-plum">
            {veils.length} {veils.length === 1 ? "edit" : "edits"} available to order
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

        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-line">
          {heroUrl ? (
            <Image
              src={heroUrl}
              alt={`${category.label} styled campaign portrait`}
              width={1200}
              height={1500}
              className="aspect-[4/5] h-full w-full object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          ) : (
            <div className="flex min-h-[24rem] items-center justify-center text-ink/30">
              Header photo coming soon
            </div>
          )}
          {campaignPath && (
            <span className="absolute left-4 top-4 rounded-full bg-linen/90 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.2em] text-ink shadow-sm">
              Styled editorial
            </span>
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
        <section className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {veils.map((veil) => (
            <div key={veil.id}>
              <VeilCard veil={veil} whatsappNumber={siteText.whatsapp_number} />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
