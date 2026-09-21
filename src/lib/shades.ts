import { ui } from "@/content/voice";
export type ShadeId =
  | "sky" | "periwinkle" | "red" | "navy" | "ivory" | "rose"
  | "lilac" | "azure" | "turquoise" | "teal" | "mustard";

export const SHADES: Record<ShadeId, { label: string; hex: string; hero: string }> = {
  rose:       { label: ui.shadeNames.rose,       hex: "#c98a84", hero: "9833" },
  mustard:    { label: ui.shadeNames.mustard,    hex: "#e0a41a", hero: "9678" },
  ivory:      { label: ui.shadeNames.ivory,      hex: "#f1e6d2", hero: "9773" },
  navy:       { label: ui.shadeNames.navy,       hex: "#1f2f66", hero: "9403" },
  sky:        { label: ui.shadeNames.sky,        hex: "#a9cfe8", hero: "9342" },
  periwinkle: { label: ui.shadeNames.periwinkle, hex: "#8e9ad0", hero: "9578" },
  red:        { label: ui.shadeNames.red,        hex: "#c0283a", hero: "9884" },
  lilac:      { label: ui.shadeNames.lilac,      hex: "#a98bd3", hero: "9262" },
  azure:      { label: ui.shadeNames.azure,      hex: "#1f86d0", hero: "2205" },
  turquoise:  { label: ui.shadeNames.turquoise,  hex: "#1aa3c8", hero: "9645" },
  teal:       { label: ui.shadeNames.teal,       hex: "#1f6b67", hero: "9434" },
};

// Reference number to shade. Assigned by eye from the 51 photographs. Shade is the only fact these carry.
const groups: Record<ShadeId, string[]> = {
  sky:        ["3184", "3195", "3197", "3203", "3205", "9317", "9337", "9342"],
  periwinkle: ["9524", "9533", "9546", "9564", "9578", "9589"],
  red:        ["2206", "2220", "5794", "9863", "9872", "9884"],
  navy:       ["3189", "3190", "9395", "9402", "9403"],
  ivory:      ["2208", "3182", "9763", "9773", "9778"],
  rose:       ["9833", "9840", "9853"],
  lilac:      ["2204", "3177", "3179", "9253", "9262", "9274"],
  azure:      ["2205", "3229", "3231"],
  turquoise:  ["9640", "9645", "9659"],
  teal:       ["9414", "9426", "9434"],
  mustard:    ["9678", "9687", "9701"],
};

export const SHADE_OF: Record<string, ShadeId> = Object.fromEntries(
  (Object.entries(groups) as [ShadeId, string[]][]).flatMap(([id, refs]) => refs.map((r) => [r, id])),
);

// Only pairs the existing copy describes: 9773 front and 9778 back (ivory), 9853 front and 9833 back (rose).
export const VIEW: Record<string, "front" | "back"> = { "9773": "front", "9778": "back", "9853": "front", "9833": "back" };
export const PAIR: Record<string, string> = { "9773": "9778", "9778": "9773", "9853": "9833", "9833": "9853" };

export const SHADE_ORDER = (Object.keys(groups) as ShadeId[]).sort((a, b) => groups[b].length - groups[a].length);
