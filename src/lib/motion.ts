import { flushSync } from "react-dom";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Runs a React state update inside a view transition when the browser supports it. */
export function withViewTransition(update: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (!doc.startViewTransition || prefersReducedMotion()) return update();
  doc.startViewTransition(() => flushSync(update));
}

/** The kept photo flies to whichever My picks target is visible, then the badge pops. */
export function flyToPicks(from: HTMLElement, src: string) {
  if (prefersReducedMotion()) return;
  const target = [...document.querySelectorAll<HTMLElement>("[data-picks-target]")].find((n) => n.offsetParent !== null);
  if (!target) return;
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const ghost = document.createElement("img");
  ghost.src = src;
  ghost.alt = "";
  Object.assign(ghost.style, {
    position: "fixed", left: `${a.left}px`, top: `${a.top}px`, width: `${a.width}px`, height: `${a.height}px`,
    objectFit: "cover", borderRadius: "40% 40% 12px 12px", zIndex: "80", pointerEvents: "none",
  });
  document.body.appendChild(ghost);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  ghost
    .animate(
      [{ transform: "translate(0,0) scale(1)", opacity: 1 }, { transform: `translate(${dx}px, ${dy}px) scale(.12)`, opacity: 0.4 }],
      { duration: 520, easing: "cubic-bezier(.5,0,.2,1)" },
    )
    .onfinish = () => {
      ghost.remove();
      target.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }],
        { duration: 300, easing: "cubic-bezier(.34,1.56,.64,1)" },
      );
    };
}

/** Six rose petals radiate from the heart. */
export function burst(el: HTMLElement) {
  if (prefersReducedMotion()) return;
  const r = el.getBoundingClientRect();
  for (let i = 0; i < 6; i++) {
    const p = document.createElement("span");
    Object.assign(p.style, {
      position: "fixed", left: `${r.left + r.width / 2 - 3}px`, top: `${r.top + r.height / 2 - 4}px`,
      width: "6px", height: "9px", borderRadius: "100% 0 100% 0", background: "#c4667a", zIndex: "80", pointerEvents: "none",
    });
    document.body.appendChild(p);
    const angle = (Math.PI * 2 * i) / 6;
    const dist = 26 + (i % 3) * 5;
    p.animate(
      [{ transform: "translate(0,0) rotate(0deg)", opacity: 1 }, { transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${i * 60}deg)`, opacity: 0 }],
      { duration: 420, easing: "cubic-bezier(.2,.7,.2,1)" },
    ).onfinish = () => p.remove();
  }
}
