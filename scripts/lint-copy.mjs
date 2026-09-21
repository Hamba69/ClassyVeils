// Copy lint for src/content/voice.ts. Pure Node, no dependencies.
import { readFileSync } from "node:fs";

const file = process.argv[2] ?? "src/content/voice.ts";
const src = readFileSync(file, "utf8");

// Strip comments, then pull every string literal and template literal chunk.
const body = src.replace(/\/\/.*$/gm, "");
const strings = [];
for (const m of body.matchAll(/"((?:\\.|[^"\\])*)"|`((?:\\.|[^`\\])*)`/g)) {
  strings.push((m[1] ?? m[2]).replace(/\$\{[^}]*\}/g, "X"));
}

const banned = [
  /[\u2014\u2013]/,                       // em and en dashes
  /!/,                                     // exclamation marks
  /\p{Extended_Pictographic}/u,            // emoji
  /\b(elevate|curated?|seamless(ly)?|unlock|journey|game-?changer|transform(ative|ing)?|stunning|effortless(ly)?|discover the|dive into|embark|tapestry|testament|delve|vital|crucial|realm)\b/i,
  /\bnot just\b|\bmore than just\b|\bnot only\b/i,
  /\bit(’|')s not\b[^.]*\bit(’|')s\b/i,   // "it's not X, it's Y"
  /\b[A-Z]{4,}\b/,                         // shouting
];

let failures = 0;
strings.forEach((s) => {
  banned.forEach((re) => {
    if (re.test(s)) {
      failures++;
      console.log(`FAIL ${re}  ->  ${s.slice(0, 90)}`);
    }
  });
});

// Rhythm: any string with 3+ sentences should not have near-uniform lengths.
strings.forEach((s) => {
  const parts = s.split(/(?<=[.?])\s+/).filter(Boolean);
  if (parts.length < 3) return;
  const lens = parts.map((p) => p.split(/\s+/).length);
  const mean = lens.reduce((a, b) => a + b, 0) / lens.length;
  const sd = Math.sqrt(lens.reduce((a, b) => a + (b - mean) ** 2, 0) / lens.length);
  if (sd < 2.5) {
    failures++;
    console.log(`FAIL uniform rhythm (sd ${sd.toFixed(1)}): ${s.slice(0, 90)}`);
  }
});

// Tricolons: "a, b and c" patterns. A few are normal; many are a fingerprint.
const tri = strings.filter((s) => /\b[\w’'-]+, [\w’'-]+,? and [\w’'-]+\b/.test(s));
console.log(`tricolon strings: ${tri.length} (limit 8)`);
if (tri.length > 8) failures++;

// Exact duplicate lines usually mean copy pasted twice.
const seen = new Map();
strings.filter((s) => s.length > 40).forEach((s) => seen.set(s, (seen.get(s) ?? 0) + 1));
[...seen].filter(([, n]) => n > 1).forEach(([s]) => console.log(`WARN duplicate: ${s.slice(0, 70)}`));

console.log(`${strings.length} strings checked, ${failures} failures`);
process.exit(failures ? 1 : 0);
