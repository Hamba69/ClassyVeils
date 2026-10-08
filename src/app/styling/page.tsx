import { voice, shopperText } from "@/content/voice";
import { getCategories, getSiteText, getAllVisibleVeils } from "@/lib/data";
import { buildCatalogue } from "@/lib/catalogue";
import DrapeLesson from "@/components/DrapeLesson";
import DrapeLine from "@/components/DrapeLine";
import PhotoRail from "@/components/PhotoRail";
import StoryRail from "@/components/StoryRail";
import StyleFilm from "@/components/StyleFilm";
import { enquiryUrl } from "@/lib/collection";
import { publicPageMetadata } from "@/lib/seo";

export const metadata = publicPageMetadata(voice.nav.style, voice.style.intro, "/styling");
export default async function StylingPage() {
  const [categories, text, veils] = await Promise.all([getCategories(), getSiteText(), getAllVisibleVeils()]);
  const items = buildCatalogue(veils);
  const askUrl = enquiryUrl(text.whatsapp_number);
  return <main>
    <header className="cv-intro"><h1>{voice.style.titleLine}<br /><em>{voice.style.titleAccent}<DrapeLine underline /></em></h1><p>{voice.style.intro}</p></header>
    <DrapeLesson />
    <section className="cv-shell"><h2>{voice.style.photosTitle}</h2><PhotoRail items={items} number={text.whatsapp_number} /></section>
    <StyleFilm src={categories.find((category) => category.video_url)?.video_url} />
    {!!categories.length && <section className="cv-shell cv-faq"><h2>{voice.style.fabricTitle}</h2><p>{voice.style.fabricIntro}</p>
      {categories.map((category) => <details key={category.slug}><summary>{shopperText(category.label)}<span aria-hidden="true">+</span></summary><p>{shopperText(category.intro)}</p><ul>{category.bullets.map((bullet) => <li key={bullet}>{shopperText(bullet)}</li>)}</ul></details>)}
    </section>}
    <section className="cv-shell"><h2>{voice.style.pairTitle}</h2><p>{voice.style.pairIntro}</p><StoryRail items={items} number={text.whatsapp_number} compact /></section>
    <section className="cv-shell cv-faq"><h2>{voice.style.faqTitleLine}<br /><em>{voice.style.faqTitleAccent}</em></h2>
      {voice.style.faq.map((faq) => <details key={faq.q}><summary>{faq.q}<span aria-hidden="true">+</span></summary><p>{faq.a}</p></details>)}
    </section>
    <section className="cv-anisha"><p>{voice.home.askBody}</p>{askUrl && <a className="cv-pill" href={askUrl} target="_blank" rel="noopener noreferrer">{voice.style.askLink}</a>}</section>
  </main>;
}
