import { getSiteText } from "@/lib/data";

export default async function ContactPage() {
  const siteText = await getSiteText();
  const digits = (siteText.whatsapp_number || "").replace(/[^\d]/g, "");

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-ink/50 sm:text-xs">
        Contact
      </p>
      <h1 className="mt-3 font-display text-3xl leading-[1.05] text-ink sm:text-4xl">
        Get in touch
      </h1>

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
    </main>
  );
}
