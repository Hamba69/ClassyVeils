"use client";

import { useEffect, useRef, useState } from "react";
import { voice } from "@/content/voice";
import { PearlPin } from "./ui/Stickers";

const paths = [
  "M96 150 C90 70 128 40 160 40 C192 40 230 70 224 150",
  "M224 150 C232 210 214 246 178 270 C150 288 120 292 96 300",
  "",
  "M96 150 C82 200 84 250 104 296 C120 330 150 352 176 372",
];
export default function DrapeLesson() {
  const [step, setStep] = useState(0);
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setStep(Number((visible.target as HTMLElement).dataset.step));
    }, { rootMargin: "-45% 0px -45% 0px" });
    section.current?.querySelectorAll("[data-step]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <section className="cv-shell" ref={section}>
    <div className="cv-section-heading"><h2>{voice.style.lessonTitle}</h2><p>{voice.style.lessonIntro}</p></div>
    <div className="cv-lesson">
      <div className="cv-figure">
        <svg viewBox="0 0 320 400" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" role="img" aria-label={voice.style.lessonTitle}>
          <path d="M28 400 C34 318 92 284 160 284 C228 284 286 318 292 400 M160 78 C190 78 206 104 206 134 C206 168 186 196 160 196 C134 196 114 168 114 134 C114 104 130 78 160 78Z" />
          {paths.map((path, i) => path ? <path key={i} className="cv-fabric-path" data-drawn={i <= step} d={path} pathLength="1" /> : <circle key={i} className="cv-pin-point" data-drawn={i <= step} cx="206" cy="190" r="4" stroke="#b9902f" />)}
        </svg>
        <p>{voice.style.stepLabel(step + 1, 4)}</p>
      </div>
      <div className="cv-steps">{voice.style.steps.map((item, i) => <article key={item.title} data-step={i} data-active={step === i}>
        <p className="cv-small">{voice.style.stepLabel(i + 1, 4)}</p>
        <h3><button onClick={() => setStep(i)} aria-pressed={step === i}>{item.title}</button></h3>
        {i === 2 && <PearlPin />}
        <p>{item.body}</p>
      </article>)}</div>
    </div>
  </section>;
}
