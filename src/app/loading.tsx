import { voice } from "@/content/voice";
export default function Loading() {
  return <div className="cv-loading" role="status" aria-label={voice.system.loading}><div className="cv-skeleton" /><span className="cv-sr">{voice.system.loading}</span></div>;
}
