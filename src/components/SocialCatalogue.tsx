import Image from "next/image";
import QRCode from "qrcode";
import { voice } from "@/content/voice";
import { enquiryUrl } from "@/lib/collection";

export default async function SocialCatalogue({ whatsappNumber, phone, instagramHandle }: { whatsappNumber: string; phone?: string; instagramHandle?: string }) {
  const url = enquiryUrl(whatsappNumber);
  const handle = instagramHandle?.trim().replace(/^@+/, "").replace(/[^a-zA-Z0-9._]/g, "");
  const instagramUrl = handle ? `https://www.instagram.com/${encodeURIComponent(handle)}/` : null;
  const qr = url ? await QRCode.toDataURL(url, {
    width: 360, margin: 4, errorCorrectionLevel: "M",
    color: { dark: "#5b2438", light: "#fbf5ef" },
  }) : null;
  return <section className="social-catalogue section-shell">
    {url && qr ? <a className="qr-card" href={url} target="_blank" rel="noopener noreferrer">
      <Image unoptimized src={qr} width={180} height={180} alt={voice.contact.scan} />
      <span>{voice.contact.scan}</span>
    </a> : <p className="cv-contact-unavailable" role="status">{voice.contact.whatsappUnavailable}</p>}
    <div><h2>{voice.contact.catalogueTitleLine}<br /><em>{voice.contact.catalogueTitleAccent}</em></h2>
      <p>{url ? voice.contact.catalogueBody : voice.contact.whatsappUnavailable}</p>
      <div className="button-row">
        {url && <a className="cv-pill" href={url} target="_blank" rel="noopener noreferrer">{voice.contact.open}</a>}
        {instagramUrl && <a className="cv-text-link" href={instagramUrl} target="_blank" rel="noopener noreferrer">{voice.contact.instagram} @{handle}</a>}
        {phone && <a className="cv-text-link" href={"tel:" + phone.replace(/[^+\d]/g, "")}>{voice.contact.call}</a>}
      </div>
    </div>
  </section>;
}
