import { getSiteText } from "@/lib/data";

export default async function AboutPage() {
  const siteText = await getSiteText();

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-ink/50 sm:text-xs">About</p>
      <h1 className="mt-3 font-display text-3xl leading-[1.05] text-ink sm:text-4xl">
        Anisha B Yusurah
      </h1>
      <p className="mt-5 whitespace-pre-line text-sm leading-7 text-ink/80 sm:mt-6 sm:text-base">
        {siteText.about_bio}
      </p>
    </main>
  );
}
