"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { voice, ui } from "@/content/voice";
import { ArchWindow } from "./ui/Stickers";

export default function StyleFilm({ src }: { src?: string | null }) {
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  return <section className="cv-film-section"><div className="cv-shell cv-film">
    <div><h2>{voice.style.filmTitleLine}<br /><em>{voice.style.filmTitleAccent}</em></h2><p>{voice.style.filmBody}</p>
      {src && <ol className="cv-chapters">{voice.style.filmChapters.map((chapter) => <li key={chapter}>{chapter}</li>)}</ol>}
    </div>
    <div className="cv-film-window">
      {src ? <>
        <video ref={video} controls={started} playsInline preload="none" poster="/collection/img-9778.webp" src={src} onError={() => setFailed(true)} aria-label={voice.style.filmPlay} />
        {!started && <button className="cv-play" aria-label={voice.style.filmPlay} onClick={() => {
          setStarted(true);
          void video.current?.play().catch(() => setFailed(true));
        }}><svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path d="M11 6L26 16L11 26Z" fill="currentColor" /></svg></button>}
        {failed && <p role="status">{ui.filmUnavailable}</p>}
      </> : <>
        <Image src="/collection/img-9778.webp" alt="" fill unoptimized sizes="(max-width: 767px) 90vw, 500px" />
        <div className="cv-film-empty"><ArchWindow /><h3>{voice.style.filmEmptyTitle}</h3><p>{voice.style.filmEmptyBody}</p></div>
      </>}
    </div>
  </div></section>;
}
