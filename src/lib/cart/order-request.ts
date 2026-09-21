import { collection } from "@/lib/collection";
import { voice, shopperText } from "@/content/voice";

export type RequestedLine = { id: string; qty: number };
export type OrderVeil = { id: string; name: string; price: number | null; category_slug: string };
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const references = new Set(collection.map((photo) => photo.id));

export function parseRequestedLines(input: string): RequestedLine[] | null {
  try {
    const parsed: unknown = JSON.parse(input);
    if (!Array.isArray(parsed) || !parsed.length || parsed.length > 50) return null;
    const seen = new Set<string>();
    const lines: RequestedLine[] = [];
    for (const value of parsed) {
      if (!value || typeof value !== "object") return null;
      const { id, qty } = value as Partial<RequestedLine>;
      if (typeof id !== "string" || typeof qty !== "number" || !Number.isInteger(qty) || qty < 1 || qty > 20) return null;
      const ref = id.startsWith("ref:") && references.has(id.slice(4));
      const veilId = id.replace(/^veil:/, "");
      if (!ref && !uuid.test(veilId)) return null;
      const normalised = ref ? id : "veil:" + veilId.toLowerCase();
      if (seen.has(normalised)) return null;
      seen.add(normalised);
      lines.push({ id: normalised, qty });
    }
    return lines;
  } catch { return null; }
}

export function orderItems(lines: RequestedLine[], veils: OrderVeil[]) {
  const byId = new Map(veils.map((veil) => [veil.id.toLowerCase(), veil]));
  if (lines.some((line) => line.id.startsWith("veil:") && !byId.has(line.id.slice(5)))) return null;
  return lines.map((line) => {
    const veil = byId.get(line.id.slice(5));
    return {
      id: line.id, qty: line.qty, name: veil ? shopperText(veil.name) : voice.shop.reference(line.id.slice(4)),
      price: veil?.price ?? null, category_slug: veil?.category_slug ?? null,
    };
  });
}
