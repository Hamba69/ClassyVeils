import assert from "node:assert/strict";
import { sourceLoader } from "./source-loader.mjs";

const load = sourceLoader();
const { collection } = load("src/lib/collection.ts");
const { SHADE_OF, SHADES, VIEW, PAIR } = load("src/lib/shades.ts");
const { buildCatalogue, lineFor } = load("src/lib/catalogue.ts");
const { parseRequestedLines, orderItems } = load("src/lib/cart/order-request.ts");
const { buildPicksWhatsAppUrl } = load("src/lib/cart/buildWhatsAppMessage.ts");
assert.equal(collection.length, 51);
assert.deepEqual(Object.keys(SHADE_OF).sort(), collection.map((p) => p.id).sort());
assert.equal(Object.keys(SHADES).length, 11);
for (const [ref, pair] of Object.entries(PAIR)) { assert.equal(PAIR[pair], ref); assert.notEqual(VIEW[pair], VIEW[ref]); }
const id = "11111111-1111-4111-8111-111111111111";
const base = { id, visible: true, name: "Owner named veil", price: 45000, photos: ["/collection/img-9833.webp"], cover_index: 0, category_slug: "silk" };
const plain = buildCatalogue([]);
const mapped = buildCatalogue([base]);
assert.equal(mapped.length, 51);
assert.equal(mapped.find((p) => p.ref === "9833").price, 45000);
assert.equal(mapped.find((p) => p.ref === "9833").categorySlug, "silk");
assert.equal(buildCatalogue([{ ...base, visible: false }]).find((p) => p.ref === "9833").price, null);
assert.equal(buildCatalogue([{ ...base, photos: [] }]).length, 51);
const added = buildCatalogue([{ ...base, photos: ["/collection/img-9833.webp?new=1"] }]);
assert.equal(added.length, 52);
assert.equal(added[0].label, base.name);
assert.equal(new Set(mapped.map((p) => p.key)).size, mapped.length);
for (const payload of ["null", "{}", "[]", "[null]", JSON.stringify([{ id: "ref:0000", qty: 1 }]), JSON.stringify([{ id: "ref:9833", qty: 21 }]), JSON.stringify([{ id: "ref:9833", qty: 1.5 }]), JSON.stringify([{ id: "ref:9833", qty: 0 }]), JSON.stringify([{ id: "ref:9833", qty: 1 }, { id: "ref:9833", qty: 1 }])]) assert.equal(parseRequestedLines(payload), null);
const lines = parseRequestedLines(JSON.stringify([{ id: "ref:9833", qty: 2 }, { id: "veil:" + id, qty: 1 }]));
assert.equal(orderItems(lines, []), null);
const stored = orderItems(lines, [base]);
assert.deepEqual(Object.keys(stored[0]), ["id", "qty", "name", "price", "category_slug"]);
assert.equal(stored[0].price, null);
assert.equal(stored[1].price, 45000);
const url = new URL(buildPicksWhatsAppUrl("+25678960004", [{ ...lineFor(plain.find((p) => p.ref === "9833")), qty: 2 }], { name: "A", contact: "a@example.com", notes: "Ivory\u2014white" }));
assert.equal(url.origin, "https://wa.me");
assert.match(url.searchParams.get("text"), /Reference 9833 x2/);
assert.doesNotMatch(url.searchParams.get("text"), /[\u2013\u2014]|UGX/);

let inserts = 0, lookups = 0, saved;
let lookupData = [base], failInsert = false, throwClient = false;
const mocked = sourceLoader({ "@/lib/supabase/server": { createClient: async () => {
  if (throwClient) throw new Error("offline");
  return { from: (table) => table === "veils" ? { select: () => ({ in: () => ({ eq: async () => { lookups++; return { data: lookupData, error: null }; } }) }) } : { insert: async (row) => { inserts++; saved = row; return { error: failInsert ? { message: "offline" } : null }; } } };
} } });
const { submitOrderRequest } = mocked("src/app/order-actions.ts");
function form(items, website = "") {
  const data = new FormData();
  data.set("customer_name", "Local fixture"); data.set("contact", "fixture@example.test");
  data.set("items", JSON.stringify(items)); data.set("website", website);
  return data;
}
const previous = { status: "idle", message: "" };
let result = await submitOrderRequest(previous, form([{ id: "ref:9833", qty: 2 }]));
assert.equal(result.status, "success"); assert.match(result.reference, /^[A-F0-9]{8}$/); assert.equal(lookups, 0); assert.equal(inserts, 1); assert.equal(saved.items[0].name, "Reference 9833");
result = await submitOrderRequest(previous, form([{ id: "veil:" + id, qty: 1 }]));
assert.equal(result.status, "success"); assert.equal(lookups, 1); assert.equal(saved.items[0].price, 45000);
lookupData = [];
assert.equal((await submitOrderRequest(previous, form([{ id: "veil:" + id, qty: 1 }]))).status, "error");
failInsert = true;
assert.equal((await submitOrderRequest(previous, form([{ id: "ref:9833", qty: 1 }]))).status, "error");
throwClient = true;
assert.equal((await submitOrderRequest(previous, form([{ id: "ref:9833", qty: 1 }]))).status, "error");
const before = inserts;
assert.equal((await submitOrderRequest(previous, form([{ id: "ref:9833", qty: 1 }], "bot"))).status, "success");
assert.equal(inserts, before);
console.log("PASS catalogue, shade coverage, message encoding, validation, server action success/failure, honeypot. No live writes.");
