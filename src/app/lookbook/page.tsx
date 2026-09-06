import Link from 'next/link';
import EditorialImage from '@/components/EditorialImage';
import Reveal from '@/components/Reveal';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'The lookbook | ClassyVeils', description: 'Colour, mood and modest fashion inspiration from the ClassyVeils illustrated lookbook.' };
const stories = [
  { id: 'golden', image: 'gold', title: 'A golden state of mind.', mood: '01 / Warm & radiant', copy: 'Let one warm colour do the talking. Pair a golden veil with an understated outfit and give the drape room to shine.' },
  { id: 'quiet', image: 'taupe', title: 'The quiet kind of lovely.', mood: '02 / Soft & effortless', copy: 'There is beauty in keeping things simple. Tonal neutrals and a softly framed face create an easy, considered look.' },
  { id: 'romantic', image: 'rose', title: 'A little romance.', mood: '03 / Rose-tinted moments', copy: 'Soft pinks and delicate floral details bring a feminine note to a simple silhouette. Keep everything else light and let the colour lead.' },
  { id: 'bold', image: 'ombre', title: 'Make an entrance.', mood: '04 / A confident contrast', copy: 'A deeper palette brings its own kind of drama. Balance a statement veil with clean lines for a look that feels beautifully composed.' },
];
export default function LookbookPage() {
  return <main><header className="page-intro"><p className="eyebrow">The Classy edit</p><h1>A mood for<br /><em>every version of you.</em></h1><p>An illustrated love letter to colour, confidence and the art of the drape. These AI-generated editorials are styling inspiration, not photographs of products for sale.</p><nav className="button-row" aria-label="Lookbook stories">{stories.map(s => <a className="text-link" href={`#${s.id}`} key={s.id}>{s.mood.split(' / ')[1]}</a>)}</nav></header><div className="section-shell lookbook-stories">{stories.map(s => <Reveal key={s.id}><section id={s.id} className="lookbook-story"><EditorialImage name={s.image} alt={`AI styling illustration: ${s.title}`} /><div><p className="eyebrow">{s.mood}</p><h2>{s.title}</h2><p>{s.copy}</p><Link className="text-link" href="/shop">Find your own favourite ↗</Link></div></section></Reveal>)}</div></main>;
}
