import type { CartLine } from "./CartContext";
import { voice, ui, shopperText } from "@/content/voice";

export function buildPicksWhatsAppUrl(number: string, lines: CartLine[], details: { name?: string; contact?: string; notes?: string } = {}) {
  const body = [
    voice.picks.whatsappHello,
    ...lines.map((line) => "? " + (line.label || line.name) + " x" + line.qty + (line.price !== null ? ", " + ui.price(line.price) : "")),
    details.name?.trim() ? ui.nameLine + ": " + details.name.trim() : "",
    details.contact?.trim() ? ui.contactLine + ": " + details.contact.trim() : "",
    details.notes?.trim() ? ui.wearingLine + ": " + details.notes.trim() : "",
    voice.picks.whatsappClose,
  ].filter(Boolean).join("\n");
  return "https://wa.me/" + number.replace(/\D/g, "") + "?text=" + encodeURIComponent(shopperText(body));
}
export const buildCartWhatsAppUrl = buildPicksWhatsAppUrl;
