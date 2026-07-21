import { getSiteText } from "@/lib/data";
import { updateSiteText } from "@/app/admin/actions";

export default async function SiteTextPage() {
  const siteText = await getSiteText();

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-2xl text-ink">Site text</h1>
      <p className="mt-1 text-sm text-ink/60">
        Everything here shows up somewhere on the public site.
      </p>

      <form action={updateSiteText} className="mt-8 space-y-5">
        <div>
          <label className="text-sm font-medium text-ink">Homepage headline</label>
          <input
            name="hero_headline"
            defaultValue={siteText.hero_headline}
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Homepage subheading</label>
          <input
            name="hero_subhead"
            defaultValue={siteText.hero_subhead}
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">About page bio</label>
          <textarea
            name="about_bio"
            defaultValue={siteText.about_bio}
            rows={4}
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">
            WhatsApp number (with country code, e.g. +2567...)
          </label>
          <input
            name="whatsapp_number"
            defaultValue={siteText.whatsapp_number}
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-ink/50">
            This is the number every &quot;Order on WhatsApp&quot; button uses.
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Contact phone (shown on Contact page)</label>
          <input
            name="contact_phone"
            defaultValue={siteText.contact_phone}
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Instagram handle</label>
          <input
            name="instagram_handle"
            defaultValue={siteText.instagram_handle}
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-ink px-4 py-2 text-sm text-linen hover:bg-plum"
        >
          Save
        </button>
      </form>
    </div>
  );
}
