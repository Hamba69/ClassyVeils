import Link from "next/link";
import { voice } from "@/content/voice";
import { getAllVisibleVeils, getSiteText } from "@/lib/data";
import { buildCatalogue } from "@/lib/catalogue";
import ShopExperience from "@/components/ShopExperience";
import DrapeLine from "@/components/DrapeLine";

export const metadata = { title: voice.nav.about, description: voice.about.intro };
export default async function AboutPage() {
  const [veils, text] = await Promise.all([getAllVisibleVeils(), getSiteText()]);
  const items = buildCatalogue(veils);
  return <main><header className="cv-intro"><h1>{voice.about.titleLine}<br /><em>{voice.about.titleAccent}<DrapeLine underline /></em></h1><p>{voice.about.intro}</p></header>
    <section className="cv-shell cv-about"><ShopExperience preview items={items.filter((item) => item.ref === "9840")} number={text.whatsapp_number} />
      <div><h2>{voice.about.noteTitleLine}<br /><em>{voice.about.noteTitleAccent}</em></h2><p>{voice.about.noteOne(items.length)}</p><p>{voice.about.noteTwo}</p><p className="cv-signature">{voice.brand.signature}</p><Link className="cv-pill" href="/contact">{voice.about.cta}</Link></div>
    </section>
  </main>;
}
