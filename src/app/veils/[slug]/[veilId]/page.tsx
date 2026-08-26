import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getSiteText, getVeilById, getVeils } from "@/lib/data";
import { photoUrl } from "@/lib/types";
import WhatsAppOrderButton from "@/components/WhatsAppOrderButton";
import FabricFold from "@/components/FabricFold";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; veilId: string }>;
}) {
  const { slug, veilId } = await params;
  const [category, veil] = await Promise.all([getCategory(slug), getVeilById(veilId)]);
  if (!category || !veil) return {};
  const cover = veil.photos[veil.cover_index] ?? veil.photos[0];

  return {
    title: `${veil.name} - ${category.label} | Classyveils.ug`,
    description: veil.description,
    openGraph: cover ? { images: [photoUrl(cover)] } : undefined,
  };
}

export default async function VeilDetailPage({
  params,
}: {
  params: Promise<{ slug: string; veilId: string }>;
}) {
  const { slug, veilId } = await params;
  const [category, veil, siteText, peers] = await Promise.all([
    getCategory(slug),
    getVeilById(veilId),
    getSiteText(),
    getVeils(slug),
  ]);
  if (!category || !veil) notFound();

  const cover = veil.photos[veil.cover_index] ?? veil.photos[0];
  const more = peers.filter((item) => item.id !== veil.id).slice(0, 4);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link href={`/veils/${slug}`} className="text-sm text-plum underline underline-offset-4">
        Back to {category.label}
      </Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section>
          <div className="overflow-hidden rounded-[2rem] border border-line bg-line">
            {cover ? (
              <Image
                src={photoUrl(cover)}
                alt={`${veil.name} - ${category.label}, Classyveils.ug`}
                width={1400}
                height={1750}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 52vw, 100vw"
              />
            ) : (
              <div className="flex min-h-[28rem] items-center justify-center text-ink/30">
                Photo coming soon
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {veil.photos.map((path) => (
              <div key={path} className="overflow-hidden rounded-2xl border border-line bg-line">
                <Image
                  src={photoUrl(path)}
                  alt={`${veil.name} - ${category.label}, Classyveils.ug`}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 16vw, 30vw"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="lg:pt-2">
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-ink/50 sm:text-xs">
            {category.label}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-[0.98] tracking-[-0.03em] text-ink sm:text-5xl">
            {veil.name}
          </h1>
          <p className="mt-3 text-lg text-ink/70">
            {veil.price != null ? `UGX ${veil.price.toLocaleString()}` : "Ask on WhatsApp"}
          </p>
          <p className="mt-5 text-sm leading-7 text-ink/75 sm:text-base">{veil.description}</p>
          <p className="mt-5 text-sm leading-7 text-ink/75 sm:text-base">
            {category.intro}
          </p>
          {category.bullets.length > 0 && (
            <ul className="mt-5 grid gap-2">
              {category.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink/70">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-plum" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6">
            <WhatsAppOrderButton veilName={veil.name} whatsappNumber={siteText.whatsapp_number} />
          </div>
          {veil.video_url && (
            <video src={veil.video_url} autoPlay loop muted playsInline className="mt-6 w-full rounded-3xl border border-line" />
          )}
        </section>
      </div>

      {more.length > 0 && (
        <>
          <div className="mx-auto mt-12 max-w-4xl">
            <FabricFold />
          </div>
          <section className="mt-10">
            <h2 className="font-display text-2xl text-ink">More {category.label} veils</h2>
            <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {more.map((item) => (
                <Link key={item.id} href={`/veils/${slug}/${item.id}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-line">
                    {item.photos[0] && (
                      <Image
                        src={photoUrl(item.photos[item.cover_index] ?? item.photos[0])}
                        alt={`${item.name} - ${category.label}, Classyveils.ug`}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <p className="mt-3 font-display text-lg text-ink">{item.name}</p>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
