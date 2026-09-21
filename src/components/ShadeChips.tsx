"use client";

import { useRef } from "react";
import { SHADES, SHADE_ORDER } from "@/lib/shades";
import { voice } from "@/content/voice";

export default function ShadeChips({ value, onChange, all = false, onEngage }: {
  value: string; onChange: (value: string) => void; all?: boolean; onEngage?: () => void;
}) {
  const row = useRef<HTMLDivElement>(null);
  const choices = [...(all ? [""] : []), ...SHADE_ORDER];
  return <div ref={row} className="cv-shades" role="radiogroup" aria-label={voice.shop.shadeLabel}
    onPointerEnter={onEngage} onFocus={onEngage} onTouchStart={onEngage}
    onKeyDown={(event) => {
      const index = choices.indexOf(value);
      const next = event.key === "Home" ? 0 : event.key === "End" ? choices.length - 1
        : ["ArrowRight", "ArrowDown"].includes(event.key) ? (index + 1) % choices.length
        : ["ArrowLeft", "ArrowUp"].includes(event.key) ? (index - 1 + choices.length) % choices.length : -1;
      if (next < 0) return;
      event.preventDefault();
      onChange(choices[next]);
      const target = row.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next];
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
    }}>
    {choices.map((id) => {
      const shade = id ? SHADES[id as keyof typeof SHADES] : null;
      return <button type="button" key={id} role="radio" aria-checked={value === id} tabIndex={value === id ? 0 : -1} onClick={() => onChange(id)}>
        <span className={shade ? "cv-petal" : "cv-all-shades"} style={shade ? { backgroundColor: shade.hex } : undefined} aria-hidden="true" />
        <span>{shade?.label ?? voice.shop.allShades}</span>
      </button>;
    })}
  </div>;
}
