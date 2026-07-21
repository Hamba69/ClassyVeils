import { getSiteText } from "@/lib/data";

export default async function ContactPage() {
  const siteText = await getSiteText();
  const digits = (siteText.whatsapp_number || "").replace(/[^\d]/g, "");

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-ink/50">Contact</p>
      <h1 className="mt-3 font-display text-3xl text-ink">Get in touch</h1>

      <div className="mt-8 space-y-4 text-ink/80">
        {siteText.whatsapp_number && (
          <p>
            WhatsApp:{" "}
            <a className="text-plum underline" href={`https://wa.me/${digits}`}>
              {siteText.whatsapp_number}
            </a>
          </p>
        )}
        {siteText.contact_phone && <p>Phone: {siteText.contact_phone}</p>}
        {siteText.instagram_handle && (
          <p>
            Instagram:{" "}
            <a
              className="text-plum underline"
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
