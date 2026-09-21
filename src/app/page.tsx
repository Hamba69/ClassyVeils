import { connection } from "next/server";
import Link from "next/link";
import HeroShade from "@/components/HeroShade";
import ShopExperience from "@/components/ShopExperience";
import StyleFilm from "@/components/StyleFilm";
import StoryRail from "@/components/StoryRail";
import CategoryCircles from "@/components/CategoryCircles";
import DrapeLine from "@/components/DrapeLine";
import { getSiteText, getAllVisibleVeils, getCategories } from "@/lib/data";
import { buildCatalogue } from "@/lib/catalogue";
import { SHADES, type ShadeId } from "@/lib/shades";
import { voice, ui } from "@/content/voice";

export default async function HomePage() {
  await connection();
  const [text, veils, categories] = await Promise.all([getSiteText(), getAllVisibleVeils(), getCategories()]);
  const items = buildCatalogue(veils);
  const shades = (Object.entries(SHADES) as [ShadeId, (typeof SHADES)[ShadeId]][]).map(([id, shade]) => ({
    id, label: shade.label, hex: shade.hex, note: voice.shades.notes[id],
    count: items.filter((item) => item.shade === id).length, heroSrc: "/collection/img-" + shade.hero + ".webp", ref: shade.hero,
  }));
  const fabrics = categories.filter((category) => items.some((item) => item.categorySlug === category.slug));
  return <main>
    <HeroShade shades={shades} />
    <section className="cv-shell cv-center cv-fabric-section"><h2>{voice.home.fabricHeading}</h2><p>{voice.home.fabricHint}</p>
      {fabrics.length ? <CategoryCircles categories={fabrics} /> : <p className="cv-small">{ui.fabricEmpty}</p>}
    </section>
    <DrapeLine />
    <section className="cv-shell"><div className="cv-section-heading"><h2>{voice.home.editHeadingLine}<br /><em>{voice.home.editHeadingAccent}</em></h2><Link className="cv-text-link" href="/shop">{voice.home.editLink}</Link></div>
      <p className="cv-intro-copy">{voice.home.editNote}</p>
      <ShopExperience preview items={items.filter((item) => ["9833", "9773", "9678", "9403"].includes(item.ref))} number={text.whatsapp_number} />
    </section>
    <StyleFilm src={categories.find((category) => category.video_url)?.video_url} />
    <section className="cv-shell"><div className="cv-section-heading"><h2>{voice.home.lookbookHeadingLine}<br /><em>{voice.home.lookbookHeadingAccent}</em></h2><p>{voice.home.lookbookNote}</p></div><StoryRail items={items} number={text.whatsapp_number} limit={2} /></section>
    <section className="cv-anisha"><h2>{voice.home.askHeadingLine}<br /><em>{voice.home.askHeadingAccent}</em></h2><p>{voice.home.askBody}</p><Link className="cv-text-link" href="/contact">{voice.home.askLink}</Link><p className="cv-signature">{voice.brand.signature}</p></section>
  </main>;
}
