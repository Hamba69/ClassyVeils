import { notFound } from "next/navigation";
import { getCategory, getVeils, getSiteText } from "@/lib/data";
import VeilCard from "@/components/VeilCard";
import FabricFold from "@/components/FabricFold";

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
    <main className="mx-auto max-w-5xl px-6 py-14">
      <p className="text-xs uppercase tracking-[0.2em] text-ink/50">{category.label}</p>
      <h1 className="mt-3 font-display text-3xl text-ink md:text-4xl">{category.tagline}</h1>
      <p className="mt-4 max-w-2xl text-ink/70">{category.intro}</p>

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

      <FabricFold className="mt-10 max-w-md" />

      {veils.length === 0 ? (
        <p className="mt-10 text-ink/50">New {category.label.toLowerCase()} are on the way.</p>
      ) : (
        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
          {veils.map((veil) => (
            <VeilCard key={veil.id} veil={veil} whatsappNumber={siteText.whatsapp_number} />
          ))}
        </div>
      )}
    </main>
  );
}
