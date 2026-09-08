import { getSiteText } from "@/lib/data";
import SocialCatalogue from "@/components/SocialCatalogue";
import DrapeLine from "@/components/DrapeLine";

export default async function ContactPage() {
  const text = await getSiteText();
  return (
    <main>
      <header className="page-intro">
        <p className="eyebrow">Talk to Anisha</p>
        <h1>
          Send me the
          <br />
          <em>
            photo reference.
            <DrapeLine underline />
          </em>
        </h1>
        <p>
          Choosing between two veils? Send both reference numbers and tell me
          what you’ll wear with them. I’ll help you compare the options.
        </p>
      </header>
      <SocialCatalogue
        whatsappNumber={text.whatsapp_number}
        phone={text.contact_phone}
      />
    </main>
  );
}
