import { getSiteText, getAllVisibleVeils, getCategories } from "@/lib/data";
import { buildCatalogue } from "@/lib/catalogue";
import ShopExperience from "@/components/ShopExperience";
import DrapeLine from "@/components/DrapeLine";
import { voice } from "@/content/voice";

export const metadata = { title: voice.nav.shop, description: voice.shop.intro };
export default async function ShopPage({ searchParams }: { searchParams: Promise<{ shade?: string; mode?: string; category?: string; a?: string; b?: string }> }) {
  const [text, veils, categories, query] = await Promise.all([getSiteText(), getAllVisibleVeils(), getCategories(), searchParams]);
  return <main><header className="cv-intro"><h1>{voice.shop.titleLine}<br /><em>{voice.shop.titleAccent}<DrapeLine underline /></em></h1><p>{voice.shop.intro}</p></header>
    <ShopExperience key={[query.mode, query.shade, query.category, query.a, query.b].join(":")} items={buildCatalogue(veils)} number={text.whatsapp_number} categories={categories} initialShade={query.shade} initialMode={query.mode} category={query.category} a={query.a} b={query.b} />
  </main>;
}
