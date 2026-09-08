import Link from "next/link";
import { connection } from "next/server";
import CollectionPhoto from "@/components/CollectionPhoto";
import Reveal from "@/components/Reveal";
import DrapeLine from "@/components/DrapeLine";
import CollectionGallery from "@/components/CollectionGallery";
import CategoryCircles from "@/components/CategoryCircles";
import SocialCatalogue from "@/components/SocialCatalogue";
import StylingVideo from "@/components/StylingVideo";
import { getCategories, getSiteText, getAllVisibleVeils } from "@/lib/data";

export default async function HomePage() {
  await connection();
  const [text, categories, veils] = await Promise.all([
    getSiteText(),
    getCategories(),
    getAllVisibleVeils(),
  ]);
  const video = categories.find((category) => category.video_url)?.video_url;
  return (
    <main>
      <section className="photo-hero">
        <CollectionPhoto
          reference="9833"
          alt="A rose-coloured ClassyVeils scarf draped over a white outfit, shown from behind"
          priority
        />
        <div className="photo-hero-copy">
          <p className="eyebrow">Anisha’s edit / Classyveils.ug</p>
          <h1>
            Find your
            <br />
            shade{" "}
            <em>
              of the day.
              <DrapeLine underline />
            </em>
          </h1>
          <p>
            I’m Anisha. I choose each veil for its colour, hand-feel, and the way
            it settles on the shoulder. Browse the edit, note the reference that
            speaks to you, and message me when you’d like to talk it through.
          </p>
          <Link className="pill" href="/shop">
            Explore the edit <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <a className="hero-reference" href="/shop#photo-9833">
          Rose edit · 9833 ↗
        </a>
      </section>
      <section className="category-section section-shell">
        <p className="eyebrow">Browse by fabric</p>
        <CategoryCircles categories={categories} />
      </section>
      <DrapeLine />
      <section className="section-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A considered edit</p>
            <h2>
              A closer look at
              <br />
              <em>
                the right fall.
                <DrapeLine underline />
              </em>
            </h2>
          </div>
          <Link className="text-link" href="/shop">
            Browse the full edit ↗
          </Link>
        </div>
        <p className="collection-note">
          Every veil has a reference number. Include it in your WhatsApp message
          and I’ll know exactly which colour, fabric, and finish you mean.
        </p>
        <CollectionGallery
          whatsappNumber={text.whatsapp_number}
          veils={veils}
          limit={4}
        />
      </section>
      <DrapeLine />
      <section className="film-section">
        <div className="film-inner">
          <div>
            <p className="eyebrow">Styling with Anisha</p>
            <h2>
              Let me show you
              <br />
              <em>how it falls.</em>
            </h2>
            <p>
              Colour gives you the first impression. The short film shows the
              quieter details: the weight of the fabric, the first fold, and the
              way it settles at the shoulder.
            </p>
          </div>
          <StylingVideo src={video} />
        </div>
      </section>
      <DrapeLine />
      <section className="section-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Notes from my lookbook</p>
            <h2>
              Two colours I’d
              <br />
              <em>
                start with.
                <DrapeLine underline />
              </em>
            </h2>
          </div>
          <p>
            With white, I’d begin in two different directions: warm mustard for
            presence, or ivory when you want the detail to stay close and quiet.
          </p>
        </div>
        <div className="mood-grid">
          <Reveal>
            <Link href="/lookbook#golden" className="mood-card">
              <CollectionPhoto
                reference="9678"
                alt="Mustard veil styled over a white outfit, ClassyVeils reference 9678"
              />
              <div>
                <span>Mustard & white</span>
                <h3>Let mustard lead</h3>
                <span aria-hidden="true">↗</span>
              </div>
            </Link>
          </Reveal>
          <Reveal className="offset-card">
            <Link href="/lookbook#quiet" className="mood-card">
              <CollectionPhoto
                reference="9773"
                alt="Ivory veil with small embellishments, ClassyVeils reference 9773"
              />
              <div>
                <span>Ivory, up close</span>
                <h3>Keep the details in view</h3>
                <span aria-hidden="true">↗</span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>
      <DrapeLine />
      <SocialCatalogue
        whatsappNumber={text.whatsapp_number}
        phone={text.contact_phone}
      />
      <section className="anisha-panel">
        <p className="eyebrow">A note from Anisha</p>
        <h2>
          Not sure which
          <br />
          <em>shade to choose?</em>
        </h2>
        <p>
          Send me the reference numbers you’re deciding between and a note about
          what you’ll be wearing. We can start with the colours already in front
          of us.
        </p>
        <Link className="text-link" href="/contact">
          Let’s talk it through ↗
        </Link>
        <span className="signature">With love, Anisha</span>
      </section>
    </main>
  );
}
