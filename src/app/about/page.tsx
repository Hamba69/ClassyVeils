import CollectionPhoto from "@/components/CollectionPhoto";
import DrapeLine from "@/components/DrapeLine";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      <header className="page-intro">
        <p className="eyebrow">Meet Anisha</p>
        <h1>
          I’m Anisha.
          <br />
          <em>
            Welcome to ClassyVeils.
            <DrapeLine underline />
          </em>
        </h1>
        <p>
          My full name is Anisha B Yusurah. Classyveils.ug is my edit of veils and
          scarves chosen for colour, comfort, and an easy sense of occasion.
          WhatsApp is the easiest way to ask me about one.
        </p>
      </header>
      <section className="section-shell styling-grid">
        <CollectionPhoto
          reference="9840"
          alt="Rose veil in the ClassyVeils collection, reference 9840"
        />
        <div>
          <p className="eyebrow">A note about this collection</p>
          <h2 className="story-heading">
            The right veil is a
            <br />
            starting point.
          </h2>
          <p className="story-copy">
            I’ve brought 51 ClassyVeils references together here. Each one gives
            us something specific to talk about: a shade, an edge detail, a
            fabric, or the way it falls from the shoulder.
          </p>
          <p className="story-copy">
            When you message me, include the reference you have in mind. I’ll
            confirm the piece, availability, and delivery details with you before
            you order.
          </p>
          <p className="signature">With love, Anisha</p>
          <Link href="/contact" className="pill mt-8">
            Say hello ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
