import assert from "node:assert/strict";
const luminance = (hex) => {
  const rgb = hex.match(/\w\w/g).map((n) => parseInt(n, 16) / 255).map((v) => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2];
};
const pairs = [["5b2438", "fbf5ef", 4.5], ["5b2438", "f3d3d9", 4.5], ["5b2438", "f9e8dc", 4.5], ["fbf5ef", "5b2438", 4.5], ["c4667a", "fbf5ef", 3]];
for (const [foreground, background, threshold] of pairs) {
  const [a, b] = [luminance(foreground), luminance(background)].sort((x, y) => y - x);
  const ratio = (a + .05) / (b + .05);
  assert.ok(ratio >= threshold);
  console.log(foreground, "on", background, ratio.toFixed(2), "PASS", threshold);
}
