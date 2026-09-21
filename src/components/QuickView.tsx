"use client";

import { useId, useState } from "react";
import type { CatalogueItem } from "@/lib/catalogue";
import { voice, ui } from "@/content/voice";
import { SHADES } from "@/lib/shades";
import { enquiryUrl } from "@/lib/collection";
import Modal from "./ui/Modal";
import CataloguePhoto from "./ui/CataloguePhoto";
import HeartButton from "./ui/HeartButton";

export default function QuickView({ item, items, number, onClose }: {
  item: CatalogueItem; items: CatalogueItem[]; number: string; onClose: () => void;
}) {
  const [current, setCurrent] = useState(item);
  const id = useId();
  const pair = items.find((candidate) => candidate.ref === current.pairRef);
  return <Modal open onClose={onClose} labelledBy={id} className="cv-quick-sheet" dragToClose>
    <div className="cv-quick">
      <CataloguePhoto key={current.ref} item={current} eager sizes="(max-width: 767px) 85vw, 380px" />
      <div>
        <h2 id={id}>{current.label}</h2>
        {current.shade && <><p className="cv-shade-label"><span style={{ backgroundColor: SHADES[current.shade].hex }} />{SHADES[current.shade].label}</p><p>{voice.shades.notes[current.shade]}</p></>}
        <p>{current.price !== null ? ui.price(current.price) : voice.shop.priceOnRequest}</p>
        <p>{voice.shop.availability}</p>
        <p className="cv-small">{voice.shades.screenNote}</p>
        <div className="cv-controls"><HeartButton item={current} />{pair && <button className="cv-button" onClick={() => setCurrent(pair)}>{current.view === "front" ? voice.quickView.seeBack : voice.quickView.seeFront}</button>}</div>
        <a className="cv-pill" href={enquiryUrl(number, current.ref, current.label)} target="_blank" rel="noopener noreferrer">{voice.quickView.ask}</a>
      </div>
    </div>
  </Modal>;
}
