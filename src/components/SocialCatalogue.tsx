import Image from "next/image";
import QRCode from "qrcode";
import { voice } from "@/content/voice";
import { enquiryUrl } from "@/lib/collection";

export default async function SocialCatalogue({ whatsappNumber, phone }: { whatsappNumber: string; phone?: string }) {
  const url = enquiryUrl(whatsappNumber);
  const qr = await QRCode.toDataURL(url, {
    width: 360, margin: 4, errorCorrectionLevel: "M",
    color: { dark: "#5b2438", light: "#fbf5ef" },
  });
  return <section className="social-catalogue section-shell">
    <a className="qr-card" href={url}>
      <Image unoptimized src={qr} width={180} height={180} alt={voice.contact.scan} />
      <span>{voice.contact.scan}</span>
    </a>
    <div><h2>{voice.contact.catalogueTitleLine}<br /><em>{voice.contact.catalogueTitleAccent}</em></h2>
      <p>{voice.contact.catalogueBody}</p>
      <div className="button-row">
        <a className="cv-pill" href={url}>{voice.contact.open}</a>
        <a className="cv-text-link" href="https://www.instagram.com/classy.veils/" target="_blank" rel="noreferrer">{voice.contact.instagram}</a>
        {phone && <a className="cv-text-link" href={"tel:" + phone.replace(/[^+\d]/g, "")}>{voice.contact.call}</a>}
      </div>
    </div>
  </section>;
}
