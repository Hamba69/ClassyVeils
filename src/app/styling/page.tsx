import type { Metadata } from "next";
import Link from "next/link";
import CollectionPhoto from "@/components/CollectionPhoto";
import DrapeLine from "@/components/DrapeLine";

export const metadata: Metadata = {
  title: "Styling notes | ClassyVeils",
  description:
    "Compare colours, fabrics, and drapes in Anisha’s ClassyVeils edit.",
};
export default function StylingPage() {
  return (
    <main>
      <header className="page-intro">
        <p className="eyebrow">Styling with Anisha</p>
        <h1>
          Look at the fold,
          <br />
          <em>
            then the whole outfit.
            <DrapeLine underline />
          </em>
        </h1>
        <p>
          Some veils have more than one view. Use them together when you’re
          deciding how you’d like the fabric to sit.
        </p>
      </header>
      <section className="styling-grid section-shell">
        <CollectionPhoto
          reference="9778"
          alt="Back view of an ivory ClassyVeils scarf over a white outfit, reference 9778"
        />
        <div className="styling-notes">
          {[
            [
              "Compare both sides",
              "Compare ivory references 9773 and 9778. One shows the front details; the other shows the length down the back. I’d look at both before choosing a fold.",
            ],
            [
              "Bring your outfit into the conversation",
              "Send me a note about your outfit alongside a ClassyVeils reference. Mustard in 9678 and navy in 9403 give us two very different starting points against white.",
            ],
            [
              "Keep the reference handy",
              "Use the enquiry link below a veil. It adds the reference number to your message, so you don’t have to describe which pink or blue you mean.",
            ],
          ].map(([title, copy]) => (
            <article key={title}>
              <div>
                <h2>{title}</h2>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="anisha-panel">
        <p className="eyebrow">Before you choose</p>
        <h2>
          What would you like
          <br />
          <em>to ask me?</em>
        </h2>
        <div className="styling-faq">
          {[
            [
              "Which fabric is in my chosen veil?",
              "Send me the reference number so I can confirm the fabric and finish. I’m happy to tell you how it feels and how it wears.",
            ],
            [
              "Is the veil I like available?",
              "The card shows availability as unconfirmed until I have checked it. Send the reference before making plans around a particular colour.",
            ],
            [
              "How do I care for it?",
              "Ask me for care instructions with your chosen ClassyVeils reference. I need to confirm the fabric and finish before advising you about washing or ironing.",
            ],
          ].map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
        <Link className="pill" href="/contact">
          Ask Anisha ↗
        </Link>
      </section>
    </main>
  );
}
