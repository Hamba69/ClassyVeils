"use client";
import { voice } from "@/content/voice";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="cv-intro"><h1>{voice.system.errorTitle}</h1><p>{voice.system.errorBody}</p><button className="cv-pill" onClick={reset}>{voice.system.errorRetry}</button></main>;
}
