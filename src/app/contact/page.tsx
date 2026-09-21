import { voice } from "@/content/voice";
import { getSiteText } from "@/lib/data";
import SocialCatalogue from "@/components/SocialCatalogue";
import DrapeLine from "@/components/DrapeLine";

export const metadata = { title: voice.nav.contact, description: voice.contact.intro };
export default async function ContactPage() {
  const text = await getSiteText();
  return <main><header className="cv-intro"><h1>{voice.contact.titleLine}<br /><em>{voice.contact.titleAccent}<DrapeLine underline /></em></h1><p>{voice.contact.intro}</p></header>
    <p className="cv-shell cv-contact-note">{voice.contact.include}</p>
    <SocialCatalogue whatsappNumber={text.whatsapp_number} phone={text.contact_phone} />
  </main>;
}
