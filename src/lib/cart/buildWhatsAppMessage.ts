import type { CartLine } from "./CartContext";
import { voice, ui, shopperText } from "@/content/voice";
import { normalizeWhatsAppNumber } from "@/lib/collection";

export function buildPicksWhatsAppUrl(number: string, lines: CartLine[], details: { name?: string; contact?: string; notes?: string } = {}) {
  const recipient = normalizeWhatsAppNumber(number);
  if (!recipient) return null;
  const body = [
    voice.picks.whatsappHello,
    ...lines.map((line) => "• " + (line.label || line.name) + " x" + line.qty + (line.price !== null ? ", " + ui.price(line.price) : "")),
    details.name?.trim() ? ui.nameLine + ": " + details.name.trim() : "",
    details.contact?.trim() ? ui.contactLine + ": " + details.contact.trim() : "",
    details.notes?.trim() ? ui.wearingLine + ": " + details.notes.trim() : "",
    voice.picks.whatsappClose,
  ].filter(Boolean).join("\n");
  return "https://wa.me/" + recipient + "?text=" + encodeURIComponent(shopperText(body));
}
export const buildCartWhatsAppUrl = buildPicksWhatsAppUrl;
