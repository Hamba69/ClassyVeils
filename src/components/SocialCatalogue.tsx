import Image from "next/image";
import QRCode from "qrcode";
import { enquiryUrl } from "@/lib/collection";

export default async function SocialCatalogue({
  whatsappNumber,
  phone,
}: {
  whatsappNumber: string;
  phone?: string;
}) {
  const url = enquiryUrl(whatsappNumber);
  const qr = await QRCode.toDataURL(url, {
    width: 360,
    margin: 4,
    errorCorrectionLevel: "M",
    color: { dark: "#5B2438", light: "#FBF5EF" },
  });
  return (
    <section
      className="social-catalogue section-shell"
      aria-labelledby="catalogue-heading"
    >
      <a
        className="qr-card"
        href={url}
        aria-label="Open Anisha’s WhatsApp catalogue chat"
      >
        <Image
          unoptimized
          src={qr}
          width={180}
          height={180}
          alt="QR code for Anisha’s WhatsApp catalogue chat"
        />
        <span>Scan to chat with Anisha ↗</span>
      </a>
      <div>
        <p className="eyebrow">Keep in touch</p>
        <h2 id="catalogue-heading">
          The edit, in
          <br />
          <em>our conversation.</em>
        </h2>
        <p>
          Send me a ClassyVeils reference number on WhatsApp. I can tell you more
          about the shade, fabric, and delivery before you order.
        </p>
        <div className="button-row">
          <a className="pill" href={url}>
            Open WhatsApp ↗
          </a>
          <a
            className="text-link"
            href="https://www.instagram.com/classy.veils/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram @classy.veils ↗
          </a>
          {phone ? (
            <a
              className="text-link"
              href={`tel:${phone.replace(/[^+\d]/g, "")}`}
            >
              Call Anisha
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
