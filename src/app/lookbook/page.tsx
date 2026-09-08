import Link from "next/link";
import CollectionPhoto from "@/components/CollectionPhoto";
import Reveal from "@/components/Reveal";
import DrapeLine from "@/components/DrapeLine";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The lookbook | ClassyVeils",
  description:
    "Anisha’s styling notes for colour, texture, and drape across the ClassyVeils edit.",
};
const stories = [
  {
    id: "golden",
    image: "9678",
    title: "Let mustard lead.",
    mood: "Mustard & white",
    copy: "Mustard 9678 brings a confident warmth to white. I’d keep the pairing simple and let the long end sit over one shoulder.",
  },
  {
    id: "quiet",
    image: "9773",
    title: "Keep the details in view.",
    mood: "Ivory, up close",
    copy: "Ivory 9773 is all about the small details along the edge. Leave them visible against white rather than tuck them into the fold.",
  },
  {
    id: "romantic",
    image: "9853",
    title: "A rose-coloured fold.",
    mood: "Rose & white",
    copy: "Rose 9853 has a softer presence from the front; 9833 shows its longer fall at the back. Together, they give you a better sense of the shape.",
  },
  {
    id: "bold",
    image: "9403",
    title: "Try a deeper blue.",
    mood: "Navy contrast",
    copy: "Navy 9403 gives a pale outfit a clean, defined frame. Send me this reference if you’re considering a deeper shade for your own look.",
  },
];
export default function LookbookPage() {
  return (
    <main>
      <header className="page-intro">
        <p className="eyebrow">Anisha’s lookbook</p>
        <h1>
          Let’s start with
          <br />
          <em>
            these colour stories.
            <DrapeLine underline />
          </em>
        </h1>
        <p>
          I’ve picked four colour stories from the collection and noted the
          details I’d keep in view when styling each veil.
        </p>
        <nav className="button-row" aria-label="Lookbook stories">
          {stories.map((story) => (
            <a className="text-link" href={`#${story.id}`} key={story.id}>
              {story.mood}
            </a>
          ))}
        </nav>
      </header>
      <div className="section-shell lookbook-stories">
        {stories.map((story) => (
          <Reveal key={story.id}>
            <section id={story.id} className="lookbook-story">
              <CollectionPhoto
                reference={story.image}
                alt={`${story.mood}, ClassyVeils veil reference ${story.image}`}
              />
              <div>
                <p className="eyebrow">{story.mood}</p>
                <h2>{story.title}</h2>
                <p>{story.copy}</p>
                <Link className="text-link" href={`/shop#photo-${story.image}`}>
                  See reference {story.image} ↗
                </Link>
              </div>
            </section>
            <DrapeLine />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
