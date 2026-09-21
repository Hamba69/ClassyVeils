import fs from "node:fs";
import { gzipSync } from "node:zlib";
const current = JSON.parse(fs.readFileSync("docs/experience-v2/smoke-results.json", "utf8"));
const result = [];
for (const route of ["/", "/shop", "/lookbook", "/styling", "/about", "/contact"]) {
  const html = await (await fetch("http://localhost:3124" + route)).text();
  const urls = [...new Set([...html.matchAll(/<script[^>]+src="([^"?]+)/g)].map((m) => m[1]))];
  let baseline = 0;
  for (const url of urls) {
    const bytes = Buffer.from(await (await fetch("http://localhost:3124" + url)).arrayBuffer());
    baseline += gzipSync(bytes).length;
  }
  const updated = current.results.find((r) => r.route === route).gzip;
  result.push({ route, baseline, updated, added: updated - baseline });
  console.log(route, "baseline", baseline, "updated", updated, "added", updated - baseline);
}
fs.writeFileSync("docs/experience-v2/bundle-comparison.json", JSON.stringify({ base: "a9d4b01", routes: result }, null, 2));
if (result.some((r) => r.added > 45000)) process.exitCode = 1;
