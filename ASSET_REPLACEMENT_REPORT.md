# New collection implementation — 5 September 2026

Historical record: the 6 September design refresh and current development-server state are documented in `DESIGN_REFRESH_REPORT.md`. The user subsequently restored the deleted local asset folders; those originals are preserved, and only the restored AI editorials are reused as design artwork. The removal and production-preview statements below describe the earlier task, not the current filesystem/server state.

The approved pink, gold and white design is implemented on the homepage and collection page. The gold logo, app icons and share image all derive from the supplied brand artwork. Wording takes inspiration from Anisha's supplied HTML page: elegance, comfort, confidence and modest fashion.

## Display and asset sources

- All 51 reviewed veil photographs are published as orientation-corrected WebP files in `public/collection/`, derived from `assets/new/` through `assets/processed/`.
- Collection photographs use their prepared WebP URLs directly. Mobile testing found requests through the dynamic optimizer hanging; direct WebP loading succeeded. Native lazy loading remains enabled for the gallery.
- `src/lib/collection.ts` identifies the displayed photographs. Each has a full-image link and a WhatsApp enquiry containing its photo reference.
- `scripts/prepare-new-assets.mjs` regenerates the display copies and metadata images from the reviewed sources.
- The new photos have not been assigned unconfirmed fabric categories, prices or product descriptions.
- Old category and product URLs redirect to `/shop`. The previous cart is no longer displayed and its saved browser contents are cleared.
- The two promotional graphics remain staged in `public/promo/`; no unconfirmed discount is advertised.
- Original incoming files and the product tagging worksheet remain intact.

## Removed material

- Removed the four old public veil folders: 354 files, including photo variants and the old video.
- Removed the old editorial source folders and CVA artwork: 9 files.
- Removed the old catalogue provisioning scripts to prevent accidental re-upload.
- Cleared the old `.next` cache and the prior `node_modules/.codex-recovery` cache backup. A fresh production build creates new build output as expected.
- Local removed folders are recoverable from the Windows Recycle Bin. The initial permanent recursive deletion command was rejected by automatic approval review; recycling succeeded.
- Deleted 26 old product objects and 6 old editorial objects from the configured Supabase project. All 50 new editorial objects under `asset-drop-2026-09-04/` were preserved.
- Retained the 24 existing product records hidden, cleared their retired photo/video references, and cleared the four category header/video references. Existing customer order records were not modified.
- A local metadata snapshot is retained in ignored `node_modules/.asset-retirement/`. Remote image bytes were deleted; their original tracked files remain recoverable from Git history.

## Verification

- Production build, TypeScript and ESLint passed.
- Desktop collection browser check loaded all 53 images (51 collection photos and two logo instances) with no broken images or horizontal overflow.
- After the image delivery fix, the rebuilt mobile homepage loaded all 10 images at 390px width with no broken images or horizontal overflow.
- The rebuilt mobile collection loaded all 53 images at 390px width with zero broken images and no overflow; all 51 WhatsApp links included the correct photo reference.
- All 51 photo enquiry links use the configured WhatsApp number and include their reference.
- The configured number is currently `+25678960004`, which differs from the previously supplied `+256705019297` and appears incomplete. Confirmation was requested before changing that business contact.
- Home, collection, about, contact, admin login and all three metadata image routes returned HTTP 200.
- Old category/product URLs returned redirects to the collection. A removed old photo URL returned HTTP 404.
- Browser checks reported no page errors.
- Vercel Analytics is enabled only on Vercel, avoiding its unavailable script endpoint during local production preview.
- All 51 full-size collection URLs returned HTTP 200; their WebP payloads and classification coverage were verified.

The production build is served locally at `http://localhost:3000`. No Git push or hosted deployment has been performed. Supabase removals are live; any older hosted frontend must be redeployed to show this new collection.

The public collection is currently an enquiry gallery. Existing admin product records are retained for later confirmed catalogue work; editing them does not assign or change the new gallery photographs.
