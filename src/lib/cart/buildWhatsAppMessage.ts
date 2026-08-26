import type { CartLine } from "./CartContext";

export function buildCartWhatsAppUrl(whatsappNumber: string, lines: CartLine[]) {
  const digits = whatsappNumber.replace(/[^\d]/g, "");
  const header = "Hi! I'd love to order the following:";
  const body = lines
    .map((line) => {
      const priceTag = line.price != null
        ? ` — UGX ${line.price.toLocaleString()}`
        : " — price on request";
      return `• ${line.qty}x ${line.name}${priceTag}`;
    })
    .join("\n");
  const knownTotal = lines
    .filter((line) => line.price != null)
    .reduce((sum, line) => sum + (line.price as number) * line.qty, 0);
  const totalLine = lines.some((line) => line.price != null)
    ? `\n\nSubtotal (known prices only): UGX ${knownTotal.toLocaleString()}`
    : "";
  const message = `${header}\n\n${body}${totalLine}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
