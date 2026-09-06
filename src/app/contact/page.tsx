import { getSiteText } from "@/lib/data";

export default async function ContactPage() {
  const siteText = await getSiteText();
  const digits = (siteText.whatsapp_number || "").replace(/[^\d]/g, "");

  return (
    <main><header className="page-intro"><p className="eyebrow">A personal touch</p><h1>Let’s talk <em>veils.</em></h1><p>Found a colour you love? Share the photo reference with Anisha and ask about fabric, price and availability.</p></header><section className="section-shell grid gap-10 md:grid-cols-2"><div>
      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-ink/50 sm:text-xs">
        Contact
      </p>
      <h2 className="mt-3 font-display text-3xl leading-[1.05] text-ink sm:text-4xl">
        Get in touch
      </h2>
      <p className="mt-5 max-w-md text-sm leading-8 text-ink/70">From a comfortable everyday look to a special occasion, we’re here to help you choose.</p></div><div className="rounded-3xl border border-line bg-white p-8">

      <div className="mt-6 space-y-4 text-sm leading-7 text-ink/80 sm:mt-8 sm:text-base">
        {siteText.whatsapp_number && (
          <p>
            WhatsApp:{" "}
            <a className="text-plum underline underline-offset-4" href={`https://wa.me/${digits}`}>
              {siteText.whatsapp_number}
            </a>
          </p>
        )}
        {siteText.contact_phone && <p>Phone: {siteText.contact_phone}</p>}
        {siteText.instagram_handle && (
          <p>
            Instagram:{" "}
            <a
              className="text-plum underline underline-offset-4"
              href={`https://instagram.com/${siteText.instagram_handle.replace("@", "")}`}
            >
              {siteText.instagram_handle}
            </a>
          </p>
        )}
      </div>
    </div></section></main>
  );
}
