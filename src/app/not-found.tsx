import Link from "next/link";
import { voice } from "@/content/voice";
import { Petal } from "@/components/ui/Stickers";
export default function NotFound() {
  return <main className="cv-intro cv-not-found"><Petal /><h1>{voice.system.notFoundTitle}</h1><p>{voice.system.notFoundBody}</p><Link className="cv-pill" href="/shop">{voice.system.notFoundCta}</Link></main>;
}
