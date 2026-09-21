import assert from "node:assert/strict";
import fs from "node:fs";
import { gzipSync } from "node:zlib";
import { sourceLoader } from "./source-loader.mjs";

const { voice, ui } = sourceLoader()("src/content/voice.ts");
const base = process.env.CV_SMOKE_URL || "http://localhost:3123";
const routes = ["/", "/shop", "/shop?mode=swipe&shade=rose", "/shop?mode=compare", "/shop?category=silk", "/lookbook", "/styling", "/about", "/contact", "/nope"];
const decode = (s) => s.replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const results = [];
let failures = 0;
for (const route of routes) {
  try {
    const response = await fetch(base + route);
    const html = await response.text();
    assert.equal(response.status, route === "/nope" ? 404 : 200);
    const markup = html.replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<style\b[\s\S]*?<\/style>/gi, "");
    const visible = decode(markup.replace(/<[^>]*>/g, " "));
    assert.equal((markup.match(/<h1[ >]/g) || []).length, 1, "one h1");
    assert.doesNotMatch(visible, /undefined|NaN|\[object|lorem|[\u2013\u2014]/i);
    assert.ok(!/<img\b(?![^>]*\balt=)[^>]*>/i.test(markup), "all images have alt");
    assert.doesNotMatch(decode(markup), /[\u2013\u2014]/, "no dashes in shopper attributes");
    let count;
    if (route === "/shop") { count = (markup.match(/data-ref=/g) || []).length; assert.ok(count >= 51, "full catalogue in server HTML"); }
    if (route === "/") Object.values(ui.shadeNames).forEach((label) => assert.ok(visible.includes(label), label));
    if (route === "/styling") {
      voice.style.steps.forEach((step) => assert.ok(visible.includes(step.title), step.title));
      voice.style.faq.forEach((faq) => assert.ok(visible.includes(faq.q), faq.q));
    }
    if (route === "/nope") assert.ok(visible.includes(voice.system.notFoundTitle));
    const scripts = [...new Set([...html.matchAll(/<script[^>]+src="([^"?]+)/g)].map((m) => m[1]))];
    let gzip = 0;
    for (const src of scripts) {
      const file = src.startsWith("/_next/") ? ".next/" + src.slice(7) : "public" + src;
      if (fs.existsSync(file)) gzip += gzipSync(fs.readFileSync(file)).length;
    }
    const number = route === "/" ? html.match(/https:\/\/wa.me\/(\d+)/)?.[1] : undefined;
    results.push({ route, status: response.status, gzip, ...(count ? { count } : {}), ...(number ? { whatsapp: number } : {}) });
    console.log("PASS", route, "gzip bytes", gzip, count ? "references " + count : "", number ? "WhatsApp " + number : "");
  } catch (error) { failures++; console.error("FAIL", route, error.message); }
}
fs.mkdirSync("docs/experience-v2", { recursive: true });
fs.writeFileSync("docs/experience-v2/smoke-results.json", JSON.stringify({ failures, results }, null, 2));
process.exitCode = failures ? 1 : 0;
