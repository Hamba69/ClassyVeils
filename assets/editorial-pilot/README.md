# Editorial pilot inventory

The live Supabase catalog could not be queried on 2026-08-26 because the configured project has not received the repository migrations (`categories`, `veils`, and `site_text` are absent from its schema cache). This pilot therefore uses the real product photography checked into `public/`, grouped by the same catalog categories.

## Source inventory

| Category | Original product images | Visual range observed |
| --- | ---: | --- |
| Chiffon Veils | 7 | Plain airy chiffon, lustrous ombre, and embroidered/net designs in red, blush, and pale blue |
| Cotton Ninja Veils | 6 | Full-coverage cotton silhouettes in varied neutrals and colors |
| Jersey Veils | 6 | Stretch jersey drapes plus one existing short motion source |
| Silk Veils | 8 | Smooth, higher-sheen occasion fabrics in varied colors |

## Chiffon pilot

The generated files are approval assets, not hardcoded storefront media. After the migration is applied, an administrator can upload them through the veil editor into the separate `veil-editorial` bucket and choose whether one becomes the card cover.

| Output | Real product reference | Intended crop | Art direction |
| --- | --- | --- | --- |
| `chiffon/red-black-ombre-close.webp` | `public/Chiffon Veils/29f79ee91b4862f75e76d8a14ca908f5.jpg` | 4:5 close portrait | Adult Ugandan model, warm minimal studio, scarlet-to-black gradient and sheen preserved |
| `chiffon/ice-blue-golden-hour-full.webp` | `public/Chiffon Veils/f86e455cd898a3e013035424901fd29b.jpg` | Tall category/editorial frame | Different adult Ugandan model, Kampala golden hour, pale-blue color and airy texture preserved |

Both outputs were generated with the built-in image generation tool, contain no text or logos, and were converted to WebP at quality 88. They are approximately 129 KB and 108 KB respectively.
