import Link from 'next/link';
import EditorialImage from '@/components/EditorialImage';
import Reveal from '@/components/Reveal';
import CollectionGallery from '@/components/CollectionGallery';
import { getSiteText } from '@/lib/data';
import { enquiryUrl } from '@/lib/collection';

export default async function HomePage() {
  const text = await getSiteText();
  return <main>
    <section className="hero-grid">
      <div className="hero-copy"><p className="eyebrow">Classy and luxurious veils & scarves</p><h1>A beautiful<br />way to be<br /><em>yourself.</em></h1><p className="hero-description">A graceful drape. A colour you love. That quiet feeling of confidence. Celebrate the beauty of modest fashion, your way.</p><div className="button-row"><Link className="pill" href="/shop">Discover the collection <span>↗</span></Link><Link className="text-link" href="/lookbook">Find your inspiration</Link></div><div className="hero-note"><span className="gold-star" aria-hidden="true">✳</span><span>Everyday elegance.<br />Extraordinary little moments.</span></div></div>
      <div className="hero-art"><EditorialImage name="rose" alt="AI editorial: a rose-coloured floral veil in a sunlit ivory interior" priority /><span className="hero-script" aria-hidden="true">softly, beautifully you</span><span className="edition-tag">THE CLASSY EDIT / 01</span></div>
    </section>
    <div className="statement-strip"><span>Made for your everyday</span><span aria-hidden="true">✧</span><span>Styled for your own story</span><span aria-hidden="true">✧</span><span>Celebrate your veil</span></div>
    <Reveal className="section-shell"><div className="section-heading"><div><p className="eyebrow">The art of getting dressed</p><h2>Different moods.<br /><em>Always you.</em></h2></div><p>Let colour set the tone. Explore our illustrated style stories, then find your own expression in the collection.</p></div><div className="mood-grid"><Link href="/lookbook#golden" className="mood-card"><EditorialImage name="gold" alt="AI editorial styling in mustard gold" /><div><span>01 / Warm & radiant</span><h3>A golden state of mind</h3><span aria-hidden="true">↗</span></div></Link><Link href="/lookbook#quiet" className="mood-card offset-card"><EditorialImage name="taupe" alt="AI editorial styling in soft taupe" /><div><span>02 / Soft & effortless</span><h3>The quiet kind of lovely</h3><span aria-hidden="true">↗</span></div></Link></div></Reveal>
    <Reveal className="rose-story"><div className="story-type"><p className="eyebrow">More than a finishing touch</p><h2>Your veil.<br />Your mood.<br /><em>Your moment.</em></h2><p>Elegance and everyday comfort belong together. Discover a little inspiration for the way you like to wear yours.</p><Link href="/styling" className="pill ivory-pill">Explore styling notes ↗</Link></div><EditorialImage name="blue" alt="AI editorial: an ice-blue veil styled for a light, graceful look" /><span className="story-flower" aria-hidden="true">✳</span></Reveal>
    <Reveal className="section-shell"><div className="section-heading"><div><p className="eyebrow">The real collection</p><h2>Something <em>catch your eye?</em></h2></div><Link className="text-link" href="/shop">See all 51 photographs ↗</Link></div><p className="collection-note">Actual collection photography. Ask Anisha to confirm fabric, price and availability for your favourite reference.</p><CollectionGallery whatsappNumber={text.whatsapp_number} limit={3} /></Reveal>
    <Reveal className="anisha-panel"><p className="eyebrow">A note from ClassyVeils</p><h2>Class is in the details.<br /><em>Care is in the conversation.</em></h2><p>A beautiful veil should feel like you. Whether you’re drawn to a soft neutral or a little more colour, let’s find your next favourite together.</p><div className="button-row"><a className="pill" href={enquiryUrl(text.whatsapp_number)}>Talk to Anisha ↗</a><Link href="/about" className="text-link">Our story</Link></div><span className="signature">With love, ClassyVeils</span></Reveal>
  </main>;
}
