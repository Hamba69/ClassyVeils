import assert from "node:assert/strict";
import fs from "node:fs";
import { browserPage } from "./browser-cdp.mjs";

const page = await browserPage();
const { send, evaluate: run, wait, go, errors } = page;
const results = process.env.CV_BROWSER_FLOW_ONLY ? JSON.parse(fs.readFileSync("docs/experience-v2/browser-results.json", "utf8")).checks.filter((name) => /px /.test(name)) : [];
const check = (name, value) => { assert.ok(value, name); results.push(name); console.log("PASS", name); };
const click = (selector) => run("(()=>{const e=document.querySelector(" + JSON.stringify(selector) + ");e.focus();e.click()})()");
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function size(width, height, mobile = false) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
  await send("Emulation.setTouchEmulationEnabled", { enabled: mobile });
}
async function screenshot(name) {
  const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  fs.writeFileSync("docs/experience-v2/" + name + ".png", Buffer.from(data, "base64"));
}
async function key(value, code) {
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: value, code: code || value, windowsVirtualKeyCode: value === "Escape" ? 27 : value === "ArrowRight" ? 39 : value === "ArrowLeft" ? 37 : value === "Tab" ? 9 : 0 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: value, code: code || value });
}
async function drag(selector, dx) {
  const box = await run("(()=>{const e=document.querySelector(" + JSON.stringify(selector) + ");e.scrollIntoView({block:'center',behavior:'instant'});const r=e.getBoundingClientRect();return {x:r.left+r.width*.3,y:r.top+r.height*.45}})()");
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: box.x, y: box.y });
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x: box.x, y: box.y, button: "left", clickCount: 1 });
  for (let i = 1; i <= 8; i++) await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: box.x + dx * i / 8, y: box.y, button: "left", buttons: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: box.x + dx, y: box.y, button: "left", clickCount: 1 });
  await pause(400);
}

try {
  for (const width of process.env.CV_BROWSER_FLOW_ONLY ? [] : [390, 1440]) {
    await size(width, width === 390 ? 844 : 900, width === 390);
    for (const route of ["/", "/shop", "/shop?mode=swipe&shade=rose", "/shop?mode=compare", "/shop?category=silk", "/lookbook", "/styling", "/about", "/contact", "/nope"]) {
      await go(route);
      await pause(150);
      check(width + "px no overflow " + route, await run("document.documentElement.scrollWidth <= innerWidth"));
      check(width + "px one heading " + route, await run("document.querySelectorAll('h1').length===1"));
    }
  }
  await size(390, 844, true);
  await go("/");
  await run("localStorage.removeItem('classyveils-picks');localStorage.removeItem('cv-mode');sessionStorage.removeItem('cv-shade')");
  await go("/");
  await click(".cv-shades button[role=radio]:nth-child(2)");
  await wait("document.querySelector('[data-hero-shop]').href.includes('shade=periwinkle') && document.querySelector('.cv-hero-layer.cv-active').src.includes('9578')");
  check("hero shade updates photograph and deep link", true);
  await go("/");
  await wait("document.querySelector('[data-hero-shop]').href.includes('shade=periwinkle')");
  check("hero shade restores within session", true);
  await screenshot("mobile-home");
  await go("/shop?mode=swipe");
  await wait("!!document.querySelector('[data-deck-top]')");
  await screenshot("mobile-deck");
  await drag("[data-deck-top]", 160);
  check("pointer swipe keeps a photo", await run("JSON.parse(localStorage.getItem('classyveils-picks')).lines.length===1"));
  check("swipe announces kept reference", await run("document.querySelector('.cv-deck-stage [role=status]').textContent.includes('Kept reference')"));
  await run("document.querySelector('.cv-deck').focus()");
  const beforePass = await run("document.querySelector('.cv-deck-caption h3').textContent");
  await key("ArrowLeft");
  await pause(400);
  check("keyboard pass advances deck", await run("document.querySelector('.cv-deck-caption h3').textContent") !== beforePass);
  await key("z", "KeyZ");
  check("undo restores passed card", await run("document.querySelector('.cv-deck-caption h3').textContent") === beforePass);
  await go("/shop?mode=wander");
  await wait("!!document.querySelector('.cv-grid')");
  await click(".cv-grid article:nth-child(2) .cv-photo-button");
  await wait("!!document.querySelector('dialog[open]')");
  check("photo opens quick view", true);
  await key("Tab");
  check("dialog contains keyboard focus", await run("document.querySelector('dialog[open]').contains(document.activeElement)"));
  await key("Escape");
  await wait("!document.querySelector('dialog[open]')");
  check("Escape closes and restores focus", await run("document.activeElement.classList.contains('cv-photo-button')"));
  await click(".cv-grid article:nth-child(2) .cv-heart");
  await wait("JSON.parse(localStorage.getItem('classyveils-picks')).lines.length===2");
  await go("/shop?mode=wander");
  check("picks persist across reload", await run("document.querySelector('.cv-tabs .cv-badge').textContent==='2'"));
  await click(".cv-tabs [data-picks-target]");
  await wait("!!document.querySelector('.cv-picks-sheet[open]')");
  check("picks has comparison deep link", await run("[...document.querySelectorAll('.cv-picks-sheet a')].some(a=>a.href.includes('mode=compare') && a.href.includes('a='))"));
  await click(".cv-picks-sheet .cv-pill.cv-wide");
  await run("(()=>{const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;for(const [name,value] of [['customer_name','Browser fixture'],['contact','fixture@example.test']]){const e=document.querySelector('[name='+name+']');setter.call(e,value);e.dispatchEvent(new Event('input',{bubbles:true}));}})()");
  const url = await run("document.querySelector('[data-send-picks]').href");
  const message = new URL(url).searchParams.get("text");
  check("WhatsApp link includes references and contact with no dashes", url.startsWith("https://wa.me/") && message.includes("Reference 2204") && message.includes("fixture@example.test") && !/[\u2013\u2014]/.test(message));
  await run("document.querySelector('[name=website]').value='local-test-honeypot';document.querySelector('.cv-picks-form').requestSubmit()");
  await wait("!!document.querySelector('.cv-received')");
  check("received state via no-write honeypot branch", await run("/[A-F0-9]{8}/.test(document.querySelector('.cv-received strong').textContent)"));
  await click(".cv-received .cv-pill");
  await wait("!document.querySelector('dialog[open]')");
  await click(".cv-tabs [data-picks-target]");
  check("finished request reopens as empty picks", await run("document.querySelector('.cv-empty').textContent.includes('Nothing here yet.')"));
  await key("Escape");
  await go("/shop?mode=compare");
  await wait("!!document.querySelector('.cv-picker')");
  await click(".cv-picker-item:nth-child(1)");
  await click(".cv-picker-item:nth-child(2)");
  await wait("!!document.querySelector('[role=slider]')");
  await run("document.querySelector('[role=slider]').focus()");
  await key("ArrowRight");
  check("compare slider responds to keyboard", await run("document.querySelector('[role=slider]').getAttribute('aria-valuenow')==='55'"));
  await key("Home");
  check("compare Home reaches zero", await run("document.querySelector('[role=slider]').getAttribute('aria-valuenow')==='0'"));
  await key("End");
  check("compare End reaches full width", await run("document.querySelector('[role=slider]').getAttribute('aria-valuenow')==='100'"));
  await key("ArrowLeft");
  check("compare selection syncs URL", await run("location.search.includes('a=2204') && location.search.includes('b=2205')"));
  await go("/shop?mode=compare&a=9773&b=9778");
  await wait("!!document.querySelector('[role=slider]')");
  check("comparison deep link restores both photographs", await run("document.querySelector('.cv-compare-stage').textContent.includes('9773') && document.querySelector('.cv-compare-stage').textContent.includes('9778')"));
  await size(1440, 900);
  await go("/styling");
  await run("document.querySelector('.cv-lesson').scrollIntoView({block:'start',behavior:'instant'})");
  await screenshot("desktop-styling");
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await go("/shop?mode=swipe");
  await wait("!!document.querySelector('[data-deck-top]')");
  await run("document.querySelector('.cv-deck').focus()");
  await key("ArrowRight");
  check("reduced motion commits immediately", await run("document.querySelector('.cv-deck-caption h3').textContent.includes('2205')"));
  check("reduced motion has no CSS animations or transitions", await run("[...document.querySelectorAll('.cv-public *')].every(e=>{const s=getComputedStyle(e);return s.animationName==='none' && s.transitionDuration.split(',').every(x=>parseFloat(x)===0)})"));
  check("no browser console or page errors", errors.length === 0);
  fs.writeFileSync("docs/experience-v2/browser-results.json", JSON.stringify({ checks: results, errors }, null, 2));
} catch (error) {
  fs.writeFileSync("docs/experience-v2/browser-results.json", JSON.stringify({ checks: results, errors, failure: error.message }, null, 2));
  throw error;
} finally {
  await page.close();
}
