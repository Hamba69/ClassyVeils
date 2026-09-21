import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;
function Sticker({ children, ...props }: Props) {
  return <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>;
}
export function Heart(props: Props) {
  return <Sticker {...props}><path d="M24 39C18 34 6 27 6 17C6 6 20 5 24 14C28 5 42 6 42 17C42 27 30 35 24 39Z" /></Sticker>;
}
export function Petal(props: Props) {
  return <Sticker {...props}><path d="M9 39C5 18 20 7 39 9C42 28 27 42 9 39Z" fill="#c4667a" fillOpacity=".18" /><path d="M13 35Q23 22 34 15" /></Sticker>;
}
export function Sparkle(props: Props) {
  return <Sticker {...props}><path d="M23 6Q24 21 39 24Q24 25 22 42Q20 26 6 24Q21 21 23 6Z" /><path d="M37 6v8m-4-4h8" stroke="#b9902f" strokeWidth="1" /></Sticker>;
}
export function PearlPin(props: Props) {
  return <Sticker {...props}><circle cx="30" cy="12" r="6" fill="#c4667a" fillOpacity=".18" /><path d="M27 18L13 41M14 37l-1 4 3-3" /><path d="M28 10q2-2 4 0" stroke="#b9902f" strokeWidth="1" /></Sticker>;
}
export function HandMirror(props: Props) {
  return <Sticker {...props}><ellipse cx="23" cy="17" rx="12" ry="14" /><path d="M21 31l-2 12q5 4 8 0l-2-12M17 15q0-6 5-7" /><path d="M27 9l3 4" stroke="#b9902f" strokeWidth="1" /></Sticker>;
}
export function Hanger(props: Props) {
  return <Sticker {...props}><path d="M19 13q0-9 7-8q9 3 1 12l-3 3v4L5 36q-3 4 4 4h31q5-1 2-4L24 24" /></Sticker>;
}
export function Bow(props: Props) {
  return <Sticker {...props}><path d="M22 22Q5 3 5 18Q4 30 22 25M26 22Q44 4 43 18Q44 30 26 25M21 27Q21 38 13 42M27 27Q28 37 36 40" fill="#c4667a" fillOpacity=".18" /><ellipse cx="24" cy="24" rx="3" ry="4" /></Sticker>;
}
export function ArchWindow(props: Props) {
  return <Sticker {...props}><path d="M9 42V20C9 0 39 0 39 20v22ZM24 7v35M9 26h30" /><path d="M15 20q0-9 6-10" stroke="#b9902f" strokeWidth="1" /></Sticker>;
}
