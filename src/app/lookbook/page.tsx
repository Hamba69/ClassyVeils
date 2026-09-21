import { voice } from "@/content/voice";
import { buildCatalogue } from "@/lib/catalogue";
import { getAllVisibleVeils, getSiteText } from "@/lib/data";
import StoryRail from "@/components/StoryRail";
import DrapeLine from "@/components/DrapeLine";

export const metadata = { title: voice.nav.lookbook, description: voice.lookbook.intro };
export default async function LookbookPage() {
  const [veils, text] = await Promise.all([getAllVisibleVeils(), getSiteText()]);
  return <main><header className="cv-intro"><h1>{voice.lookbook.titleLine}<br /><em>{voice.lookbook.titleAccent}<DrapeLine underline /></em></h1><p>{voice.lookbook.intro}</p></header>
    <section className="cv-shell"><StoryRail items={buildCatalogue(veils)} number={text.whatsapp_number} /></section>
  </main>;
}
