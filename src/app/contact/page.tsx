import { voice } from "@/content/voice";
import { getSiteText } from "@/lib/data";
import SocialCatalogue from "@/components/SocialCatalogue";
import DrapeLine from "@/components/DrapeLine";
import { publicPageMetadata } from "@/lib/seo";

export const metadata = publicPageMetadata(voice.nav.contact, voice.contact.intro, "/contact");
export default async function ContactPage() {
  const text = await getSiteText();
  return <main><header className="cv-intro"><h1>{voice.contact.titleLine}<br /><em>{voice.contact.titleAccent}<DrapeLine underline /></em></h1><p>{voice.contact.intro}</p></header>
    <p className="cv-shell cv-contact-note">{voice.contact.include}</p>
    <SocialCatalogue whatsappNumber={text.whatsapp_number} phone={text.contact_phone} instagramHandle={text.instagram_handle} />
  </main>;
}
