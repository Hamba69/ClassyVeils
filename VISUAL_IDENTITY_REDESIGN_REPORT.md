# ClassyVeils visual identity redesign — 8 September 2026

Implemented locally. The marketing redesign is ready to review at http://localhost:3010. No frontend deployment, commit, or push was performed. The Kids Veils category content record was added to the connected Supabase project; this single content write is live.

## Before and after

The baseline was inspected in the browser at https://classy-veils.vercel.app at 375px. It showed the illustrated hero, numbered illustrated mood cards, repeated fragment-based copy, a three-photo enquiry gallery without prices, and no category, video or QR/social section.

| Area | Result |
| --- | --- |
| Palette and fonts | Exact six requested CSS tokens. Fraunces with optical/soft axes, plus locally hosted General Sans 400/500/600. Gold is used for text, borders and strokes, never a background fill. Existing logo files are unchanged. |
| Promo strip | Horizontally scrollable delivery/help strip with WhatsApp pill and Kids Veils link. Delivery wording invites discussion; no delivery charge, location or timetable was invented. |
| Hero | Full-bleed real photograph 9833 with rosewater overlay and Drape Line underline. |
| Categories | Categories read from the existing table. Kids Veils is a real `kids-veils` record, sort order 5. Links filter `/shop?category=...`. Category initials appear inside pink/gold rings while header photographs remain unset. |
| Collection | Four-photo homepage preview and all 51 supplied photographs on `/shop`. Published admin photographs and saved prices can also appear. Hidden records are excluded. Existing photo-reference WhatsApp messages are preserved. |
| Price and stock | Fields are directly visible. Currently the database has no published products, so the supplied photos show “Price not yet listed” and “Availability: not yet confirmed”. Actual prices and stock are still a content gap. |
| Video | Explicit “Styling film coming soon” state. The section accepts the existing category `video_url`. Supplied `/assets/new` has no video; the inspected older clip shows folded stock, not the requested draping demonstration. It is not presented as one. |
| Styling stories | Real photos 9678 and 9773 on the homepage; 9678, 9773, 9853 and 9403 in the lookbook. No sequential mood numbers or AI illustrations remain in the rendered marketing pages. |
| QR and social | Locally generated QR uses the same configured `enquiryUrl` as the WhatsApp CTA. Instagram links to the brief’s `https://www.instagram.com/classy.veils/`. Configured phone is shown as a callable link if present. |
| Copy | Home, collection, lookbook, styling, about, contact, header and footer rewritten around Anisha, the actual photo references and the WhatsApp conversation. |
| Motion | One-time 750ms Drape Line draw, 8px reveal, category scale/gold glow, CTA press/release scale and visible keyboard focus. Reduced-motion users see final states. Video playback honors reduced motion and has controls. |

## Data and scope

Only a category content row was added. Schema, policies, auth, admin actions, order/cart logic, existing products, contact values and logo assets were not modified. The new row is editable through the existing `/admin/categories` form; that form’s authenticated save was not exercised.

Marketing category and video reads run at request time, so they do not depend on changes to the existing admin invalidation logic. Category descriptions on the filtered gallery use the existing `intro` field. Prices come only from exact photo matches or published admin listings; fabric/category assignments are never inferred from appearance. `visible` means published, not in stock: the existing model has no stock field, so it is not used as an availability claim.

## Content Anisha still needs to confirm

- Price, fabric/category assignment and availability for the supplied 51 photos. The current category filters correctly have no assigned photographs.
- Category header photographs, including suitable Kids Veils photography. Initials are intentional temporary content, not guessed fabric images.
- A short draping/styling video, entered through an existing category’s Video URL field.
- Correct WhatsApp number: the current record is `+25678960004`. This value is preserved; successful QR decoding does not confirm ownership or that the number has an active WhatsApp account.
- Delivery terms. The promo currently directs visitors to discuss delivery on WhatsApp.
- The brief requests `@classy.veils`, while the stored Instagram handle is `classyveils.ug`. The public redesign follows the brief without overwriting that stored value.

## Verification

Final production build, TypeScript and ESLint passed. `git diff --check` passed. A focused rendering check covered saved prices, a newly uploaded photo, category filtering, hidden-product exclusion, preserved enquiry references and missing-data labels using local fixtures only.

Production browser checks passed at 375px mobile and 1440px desktop:

- Mobile menu opened and navigated to the collection. All 51 photographs and both logo images loaded, with 51 price fields, 51 availability fields and all 51 correct enquiry references. No horizontal overflow.
- Kids badge navigated to `/shop?category=kids-veils` and displayed the real category heading and stored intro.
- Homepage images all loaded; five categories rendered; no AI editorial image URLs or horizontal overflow appeared.
- QR decoded to exactly the visible WhatsApp CTA URL, both at original resolution and at its displayed 180px size. Account ownership/delivery of a WhatsApp message was not tested.
- Keyboard focus had a solid 2px outline. Reduced-motion mode had a final SVG dash offset of zero, zero transition duration and no animation.
- Desktop homepage had no horizontal overflow. `/lookbook`, `/styling`, `/about` and `/contact` each returned HTTP 200 at 375px with no horizontal overflow or AI image URLs.
- No browser page errors were recorded.
- Protected source comparison was empty for admin, schema, auth/proxy, data helpers, cart and logo components.

The browser checks used the real connected data. The price/upload/filter fixture check was separate from the live-data checks. A screenshot timeout in the CDP test harness was handled with direct captures from the same browser; it did not affect the recorded page/interaction checks.

Dependency installation reported seven high-severity audit findings in the existing dependency tree; the production-only audit reported four, involving Next.js and its transitive packages. No framework upgrade or unrelated dependency repair was performed as part of this visual brief.

## Review images

- [Live baseline, mobile](docs/visual-redesign/before-mobile.png)
- [Redesigned mobile hero](docs/visual-redesign/after-mobile-hero.png)
- [Redesigned mobile page](docs/visual-redesign/after-mobile.png)
- [Redesigned desktop hero](docs/visual-redesign/after-desktop-hero.png)
- [Redesigned desktop page](docs/visual-redesign/after-desktop.png)
