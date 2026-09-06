# ClassyVeils asset recon report

## Scope and constraints

- Read-only reconnaissance pass only.
- `/assets/new` was inventoried without moving, deleting, or altering files.
- Simdif-related material was identified and explicitly excluded from the product/site assessment.
- `supabase/migrations/*.sql` and `public/` were inspected only for current-state mapping and comparison.

## 1) Inventory of `/assets/new`

### Folder tree

`/assets/new` has no nested folders. Everything is a direct child of the root folder.

```
assets/new/
├── IMG_1125.JPG.jpeg
├── IMG_1129.JPG.jpeg
├── IMG_1130.JPG.jpeg
├── IMG_2204.JPG.jpeg
├── IMG_2205.JPG.jpeg
├── IMG_2206.JPG.jpeg
├── IMG_2208.JPG.jpeg
├── IMG_2220.JPG.jpeg
├── IMG_3177.HEIC
├── IMG_3179.HEIC
├── IMG_3182.HEIC
├── IMG_3184.HEIC
├── IMG_3189.HEIC
├── IMG_3190.HEIC
├── IMG_3195.HEIC
├── IMG_3197.HEIC
├── IMG_3203.HEIC
├── IMG_3205.HEIC
├── IMG_3229.HEIC
├── IMG_3231.HEIC
├── IMG_5669.PNG
├── IMG_5699.PNG
├── IMG_5794.JPG.jpeg
├── IMG_9253.JPG.jpeg
├── IMG_9262.JPG.jpeg
├── IMG_9274.JPG.jpeg
├── IMG_9317.JPG.jpeg
├── IMG_9337.JPG.jpeg
├── IMG_9342.JPG.jpeg
├── IMG_9395.JPG.jpeg
├── IMG_9402.HEIC
├── IMG_9403.HEIC
├── IMG_9414.JPG.jpeg
├── IMG_9426.JPG.jpeg
├── IMG_9434.JPG.jpeg
├── IMG_9524.JPG.jpeg
├── IMG_9533.JPG.jpeg
├── IMG_9546.JPG.jpeg
├── IMG_9564.JPG.jpeg
├── IMG_9578.JPG.jpeg
├── IMG_9589.JPG.jpeg
├── IMG_9640.JPG.jpeg
├── IMG_9645.JPG.jpeg
├── IMG_9659.JPG.jpeg
├── IMG_9678.JPG.jpeg
├── IMG_9687.JPG.jpeg
├── IMG_9701.JPG.jpeg
├── IMG_9763.JPG.jpeg
├── IMG_9773.JPG.jpeg
├── IMG_9778.JPG.jpeg
├── IMG_9833.JPG.jpeg
├── IMG_9840.JPG.jpeg
├── IMG_9853.JPG.jpeg
├── IMG_9863.JPG.jpeg
├── IMG_9872.JPG.jpeg
├── IMG_9884.JPG.jpeg
└── (56 files total; no subfolders)
```

### Extension counts and rough size summary

- JPEG: 40 files
- HEIC: 14 files
- PNG: 2 files
- Total files: 56
- Rough total size: ~53.1 MB
- Rough size range: ~45 KB to ~1.9 MB per file
- No non-image files were found in `/assets/new` (no `.mp4`, `.mov`, `.webp`, `.svg`, `.pdf`, etc.)
- No folders were present beneath `/assets/new`, so there is no internal structure for product colour/fabric grouping at the moment.

### File naming / format notes

- Filenames are all camera-generated (`IMG_XXXX...`) and are not slug-ready.
- Several names have double extensions like `IMG_1125.JPG.jpeg` and `IMG_5794.JPG.jpeg`.
- The `.PNG` files appear to contain JPEG payloads and should be treated as mismatched-extension files rather than clean `.png` sources.
- HEIC files are device-captured and likely require conversion before ingest into a web pipeline.

## 2) Classification into four buckets

### A. Actual product photography

This drop does not provide a clean product-only folder structure or obvious colour/fabric subfolders. The majority of the imagery is on-model and studio-lifestyle style rather than flat catalogue product stills.

The clearest product-like shots are the more neutral, close-up drape shots that show a veil as a fabric object without a person wearing it, but they are not broken out into obvious fabric folders. The collection is not ready for direct mapping to the current `jersey` / `chiffon` / `silk` / `cotton-ninja` schema without manual review.

### B. Model/editorial photography

This is the dominant category in the drop.

Representative examples:
- `IMG_2204.JPG.jpeg` through `IMG_2220.JPG.jpeg`
- `IMG_3177.HEIC` through `IMG_3231.HEIC`
- `IMG_5794.JPG.jpeg`
- `IMG_9253.JPG.jpeg` through `IMG_9884.JPG.jpeg`
- `IMG_9395.JPG.jpeg`, `IMG_9414.JPG.jpeg`, `IMG_9426.JPG.jpeg`, `IMG_9434.JPG.jpeg`, and adjacent files in the same sequence

These are all studio/room-based shots of a model wearing a veil, with the same interior dressing room / event-space styling, which matches the current site’s `model_photos` / editorial use pattern more than a flat product-catalog set.

### C. Video files

- None found in `/assets/new`.
- No `.mp4`, `.mov`, `.m4v`, `.avi`, or related files were present.

### D. Non-product images carrying text, notes, or client feedback

These are clearly not veil-product photography and belong in a separate “site notes / client feedback” bucket.

1. `IMG_1125.JPG.jpeg`
   - Shows a large promotion graphic with a beige background.
   - Visible text summary:
     - “10% OFF”
     - “ALL OUR TURKEY VEILS”
     - “Classyveils ug”
     - “ALL OUR TURKEY VEILS”
   - This is a sale/marketing graphic, not product photography.

2. `IMG_1129.JPG.jpeg`
   - Shows a gold swan logo and stylized wordmark on a light background.
   - Visible text summary:
     - “Classy Veils”
     - “Celebrate Your Veil”
   - This is a branding graphic / logo, not product photography.

3. `IMG_1130.JPG.jpeg`
   - Shows a pink branded contact card with social media and contact information.
   - Visible text summary:
     - “Classy Veils”
     - “Celebrate Your Veil”
     - “@classy.veils”
     - “0705 019 297”
     - “0789 460 004”
     - “classyveilsscarfs@gmail.com”
     - “classyveilsscarfs.simdif.com”
   - This is the clearest Simdif-related artifact in the set and is excluded from all other counts.

4. `IMG_5669.PNG`
   - Stylized pink logo / brand art.
   - Visible text summary:
     - “Classy Veils”
     - “Celebrate Your Veil”
   - Brand art, not product photography.

5. `IMG_5699.PNG`
   - Similar stylized logo / brand art on a light background.
   - Visible text summary:
     - “Classy Veils”
     - “Celebrate Your Veil”
   - Brand art, not product photography.

## 3) Simdif-related findings (explicit exclusion)

The request specifically said to identify and exclude anything Simdif-related from consideration entirely. I found the following:

- `IMG_1130.JPG.jpeg` — visible text includes `classyveilsscarfs.simdif.com`
- No direct `simdif` filenames were present in `/assets/new`
- No other explicit Simdif references were visible in the root asset set during this pass

These items are intentionally excluded from the product, model, and category mapping sections above and should not be folded into the migration content set.

## 4) Mapping the new asset set to existing categories

There are no subfolders beneath `/assets/new`, so there is no folder-level mapping to the four current database categories:

- `jersey`
- `chiffon`
- `silk`
- `cotton-ninja`

### Direct mapping result

- No new asset folder matches any of the four established categories as-is.
- The whole collection reads more like a mixed “editorial + promo + brand graphics” dump than a category-organized product catalogue.
- If a new category is required, the closest fit is:
  - `editorial-promo` or `brand-graphics` (for the note/marketing files)
  - not a garment/fabric category

### Practical conclusion

The `/assets/new` dump is not currently compatible with the existing category schema in a one-to-one way. It would need manual grouping or a new migration category before any product import.

## 5) Diff against the current state

### Current database object references

The current migrations reference a catalogue of bagged images under `catalog-v1/...` and some direct `chiffon/...` paths.

`veils.photos`, `veils.model_photos`, and `veils.video_url` are seeded in:
- `supabase/migrations/20260826084914_credential_admin_and_editorial_seed.sql`
- `supabase/migrations/20260826140000_seed_complete_veil_catalog.sql`

Representative current path inventory from those SQL files:

- Jersey:
  - `catalog-v1/jersey/303fd6ae68457b8704af986640dc797e.webp`
  - `catalog-v1/jersey/482b97c4fe6e4c3135fa1ef266a2585a.webp`
  - `catalog-v1/jersey/5eb6eaa744484cc5f2c87a18bd10ac50.webp`
  - `catalog-v1/jersey/ivory-jersey-morning.webp`
  - `catalog-v1/jersey/b476aa533da67f3b6c2c7dd10172c374.webp`
  - `catalog-v1/jersey/c196d67def4fc8c0a0e49bf20794953e.webp`

- Chiffon:
  - `catalog-v1/chiffon/29f79ee91b4862f75e76d8a14ca908f5.webp`
  - `catalog-v1/chiffon/40f35a57b91bb70695295c9c5ac8072d.webp`
  - `catalog-v1/chiffon/52eaa2354e81960315d5d12c2f4f5bfe.webp`
  - `catalog-v1/chiffon/809ff9c8573e9fd972ced85e9695dd2b.webp`
  - `catalog-v1/chiffon/b9fcea5e199575a994728b5b03d59dd9.webp`
  - `catalog-v1/chiffon/c0c609e8b73df4d655529fa8ff0d3c5c.webp`
  - `catalog-v1/chiffon/f86e455cd898a3e013035424901fd29b.webp`
  - `catalog-v1/chiffon/mustard-gold-hour.webp`
  - `chiffon/red-black-ombre-close.webp`
  - `chiffon/ice-blue-golden-hour-full.webp`
  - `chiffon/pilot-red-black-ombre.webp`
  - `chiffon/pilot-ice-blue.webp`

- Silk:
  - `catalog-v1/silk/1e9cbaeaa4dcfab51a69a69a079b378c.webp`
  - `catalog-v1/silk/dusty-rose-gallery.webp`
  - `catalog-v1/silk/1ee4ee9084b9c008a57a2ff3b4610517.webp`
  - `catalog-v1/silk/2a73c6e109f83aed82322a76851cc987.webp`
  - `catalog-v1/silk/7bf06f7e674506ba09d6cb21074a2fe4.webp`
  - `catalog-v1/silk/b869edc7594f2ece5433f69507d56ae0.webp`
  - `catalog-v1/silk/cddda725615fc7afa27cead737acc87c.webp`
  - `catalog-v1/silk/e8d235a09cc2be4ab43b9f9bed66195c.webp`
  - `catalog-v1/silk/f72744849a77e3c34fa81203b9a381e0.webp`

- Cotton Ninja:
  - `catalog-v1/cotton-ninja/1f12c2e4dcfd62d8a24cae0ff9aabcff.webp`
  - `catalog-v1/cotton-ninja/257305342ef4d237e8394b1a5445e357.webp`
  - `catalog-v1/cotton-ninja/288644c0d6260878cff298a782c17c66.webp`
  - `catalog-v1/cotton-ninja/taupe-everyday.webp`
  - `catalog-v1/cotton-ninja/a0654084212a57c45b8e1edec2538edb.webp`
  - `catalog-v1/cotton-ninja/e3bc36fda57cfb9d47ee9d6aa4879245.webp`
  - `catalog-v1/cotton-ninja/fba0ded04c1eeef19b9f58b6de3ce2bf.webp`

### Current category `header_photo` and `video_url` values

The `categories` table currently carries the following patterns:

- `header_photo` values in the schema are bucket paths, not `/public/...` paths.
- The final seed update sets category headers to values like:
  - `catalog-v1/jersey/303fd6ae68457b8704af986640dc797e.webp`
  - `catalog-v1/chiffon/52eaa2354e81960315d5d12c2f4f5bfe.webp`
  - `catalog-v1/silk/1e9cbaeaa4dcfab51a69a69a079b378c.webp`
  - `catalog-v1/cotton-ninja/288644c0d6260878cff298a782c17c66.webp`
- An earlier seed row also sets `header_photo = 'chiffon/pilot-ice-blue.webp'` for the `chiffon` category.
- `video_url` is present as a column but no non-null video URLs are set in the seed data reviewed here.

### Current `public/` state

The public folder currently contains these local folders/files:

- `public/Jersey Veils/`
- `public/Chiffon Veils/`
- `public/Silk Veils/`
- `public/Cotton Ninja Veils/`
- plus the default Next.js app icons (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`)

This means the current app is using a mixed model:

- `fallbackCategories` in `src/lib/data.ts` use public local URLs like `/Jersey Veils/...`
- DB rows in SQL use Supabase bucket paths like `catalog-v1/jersey/...` or `chiffon/...`
- `photoUrl(path)` in `src/lib/types.ts` supports both absolute local paths and Supabase storage paths, so the system is designed for a mixed local + storage asset model.

## 6) New asset image specs

### Dimension summary

Observed dimensions from the asset set:

- Most model/room portrait images are either:
  - 960x1280
  - 1440x1920
  - 1737x3088
  - 2316x3088
  - 3088x2316
- The promo/brand graphics are smaller, e.g.:
  - 583x531
  - 1075x596
  - 1600x1460
  - 1024x1536
- HEIC files are all 2316x3088
- JPEG files are all standard camera output sizes, mostly 1737x3088 or 3088x2316
- PNG files display as 1024x1536 in practice, but also need to be treated as mismatched-extension files

### Format summary

- JPEG: 40 files
- HEIC: 14 files
- PNG: 2 files
- No WebP assets were present in `/assets/new`

### Slug viability and rename notes

- The current filenames are not ready for use as product slugs or DB keys.
- Examples: `IMG_1125.JPG.jpeg`, `IMG_3137.HEIC`, `IMG_5669.PNG`, `IMG_9402.HEIC`
- They are camera-generated and uppercase, duplicated-extension, and mixed-format, so they need a normalization / rename pass before migration.

### Volume against the current seeded catalogue

- Total asset count: 56
- Current SQL seed is a smaller, curated product list, but the new asset dump is large enough to cover or exceed current catalogue volume if categorized and cleaned.
- The key problem is not volume; it is structure and classification. The asset set is presently a flat drop with a mixture of model/editorial imagery and client feedback graphics, not a neatly organized four-category product repository.

## 7) Bottom-line assessment

- `/assets/new` is a mixed bundle, not a clean replacement catalogue.
- It contains substantial model/editorial material, but not a clearly separated set of `jersey` / `chiffon` / `silk` / `cotton-ninja` folders.
- It also contains non-product client feedback and brand graphics, including Simdif-related content that must be excluded from product migration planning.
- The drop has enough raw imagery volume to be useful, but it needs a structured import strategy, a rename pipeline, and category sorting before it can replace the existing seeded catalogue.
