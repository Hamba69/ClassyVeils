# Classyveils asset implementation

You're working in the local ClassyVeils repo. `/assets/new` has already been
inventoried (see `RECON_REPORT.md`). This prompt has you act on that
inventory in stages. Some stages touch the live site and Supabase, some stages
only produce a document for a human to review. Do not skip the review stages
or auto-decide what they're meant to settle.

## Hard exclusions

`IMG_1130.JPG.jpeg` (the Simdif contact card) is never converted, never
uploaded, never copied into `public/` or storage, and never referenced in any
commit, code comment, or copy. Treat it as if it isn't in the folder.

## Stage 1 — Preprocess and classify (touches nothing live)

1. Create a working directory, `assets/processed/`, outside of `public/` and
   outside of git-tracked build output. Do not modify `/assets/new` itself.
2. For every file except `IMG_1130.JPG.jpeg`:
   - Normalize the filename: strip double extensions (`IMG_1125.JPG.jpeg` →
     `img-1125.jpg`), lowercase, kebab-case.
   - Convert HEIC files to `.webp`, matching the format already used in
     `catalog-v1/` in the existing migrations. Keep quality reasonably high,
     these are the actual product/editorial photos.
   - The two `.PNG` files (`IMG_5669`, `IMG_5699`) contain JPEG payloads per
     the recon, re-encode them properly rather than just renaming the
     extension.
   - Leave original files in `/assets/new` untouched throughout.
3. Produce `assets/processed/ASSET_CLASSIFICATION.md`, a table with one row
   per file: processed filename, original filename, dimensions, and a
   classification into exactly one of:
   - `editorial` — a person is visible wearing a veil
   - `product-candidate` — a veil shown on its own, no person, plausible as a
     catalogue product shot
   - `brand-graphic` — logo or wordmark art (`img-1129`, `img-5669`,
     `img-5699` per the recon, confirm rather than assume)
   - `promo-graphic` — the "10% off" marketing graphic (`img-1125`)
   Use the recon report's bucket assignments as a starting point, but look at
   the actual images, the recon was a first pass, not a final ruling.

## Stage 2 — Migrate what's unambiguous

1. **Editorial photos.** Inspect `src/app/admin/actions.ts` and whatever
   storage helper the current upload path uses, don't assume a bucket name or
   function signature, confirm it from the code first. Upload the
   `editorial` set through that same path so it's consistent with however
   `model_photos` are currently stored. Do not touch `veils.photos` or
   `categories.header_photo`, those are catalogue fields, not editorial ones.
2. **Brand graphics.** Copy the cleaned `brand-graphic` files into
   `public/brand/` (new folder). Don't wire them into `SiteHeader.tsx` or
   anywhere else yet, stage them and stop. Swapping the site's visual mark is
   a decision for stage 4, not something to do quietly as a side effect of an
   asset migration.
3. **Promo graphic.** Copy the cleaned `promo-graphic` file into
   `public/promo/`. Same rule, stage it, don't wire it in yet.

## Stage 3 — Product-candidate handoff (produces a document, not a migration)

1. From the `product-candidate` rows in `ASSET_CLASSIFICATION.md`, generate
   `PRODUCT_TAGGING_WORKSHEET.md`: one row per candidate image, its processed
   filename, dimensions, and a blank `fabric_category` column with the four
   existing options listed (`jersey`, `chiffon`, `silk`, `cotton-ninja`) plus
   an `other` option for anything that looks like it needs a new category.
   Include a blank `price` column and a blank `notes` column too, since those
   are the same kind of thing only Anisha can fill in.
2. Do not insert anything into the `veils` table, do not touch
   `catalog-v1/*` in storage, and do not delete any existing seeded product
   photos. The current catalogue stays live and untouched until this
   worksheet comes back filled in. This is the one deliberate deviation from
   "delete the old photos and replace them", doing that now would take a
   working, correctly labeled catalogue down and put up one nobody's
   confirmed the fabric on.
3. Once the worksheet is returned, a follow-up prompt handles the actual
   `veils` migration, description drafting, and old-photo removal, that's a
   separate step, not part of this one.

## Stage 4 — Flag, don't decide, the brand/design question

Write a short note (add it to the bottom of `ASSET_CLASSIFICATION.md`)
surfacing that three things are now sitting together and probably want one
decision, not three:

- The pink/gold/white direction from the client's inspo screenshot
- The gold swan mark and wordmark now staged in `public/brand/`
- The current site's `plum`/`sage`/`linen` token palette in `globals.css`

Don't touch `globals.css`, `SiteHeader.tsx`, or add the promo bar component
yet. That's a design conversation, not something to resolve inside an asset
migration script.

## What this prompt deliberately does not do

- Does not touch `catalog-v1/*` product photos or the `veils` table
- Does not write any veil descriptions (nothing to describe yet, no tagged
  products exist)
- Does not add the promo bar or swap the logo
- Does not do anything with `IMG_1130.JPG.jpeg`

## Deliverables to bring back

- `assets/processed/` (converted, renamed files)
- `assets/processed/ASSET_CLASSIFICATION.md`
- `PRODUCT_TAGGING_WORKSHEET.md`
- `public/brand/` and `public/promo/` (staged, unwired)
