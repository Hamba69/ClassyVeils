import { getSiteText } from "@/lib/data";

export default async function AboutPage() {
  const siteText = await getSiteText();

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-ink/50">About</p>
      <h1 className="mt-3 font-display text-3xl text-ink">Anisha B Yusurah</h1>
      <p className="mt-6 whitespace-pre-line text-ink/80 leading-relaxed">
        {siteText.about_bio}
      </p>
    </main>
  );
}
