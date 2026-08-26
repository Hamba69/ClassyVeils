-- Merchandise every distinct source photograph as an orderable catalogue edit.
-- Prices remain nullable until the administrator publishes confirmed figures.
insert into public.veils (
  id, category_slug, name, description, price, photos, cover_index,
  model_photos, editorial_cover_index, use_editorial_cover,
  is_featured, video_url, visible, sort_order
)
values
  ('c2000000-0000-4000-8000-000000000001', 'jersey', 'Jersey Colour Library', 'A full spectrum of soft, breathable jersey shades. Add this edit to your bag and confirm your preferred colour when ordering.', null, array['catalog-v1/jersey/303fd6ae68457b8704af986640dc797e.webp'], 0, '{}', 0, false, false, null, true, 1),
  ('c2000000-0000-4000-8000-000000000002', 'jersey', 'Pastel Pin-Ready Jersey Edit', 'A coordinated pastel jersey selection presented with styling pins for easy gifting and everyday rotation.', null, array['catalog-v1/jersey/482b97c4fe6e4c3135fa1ef266a2585a.webp'], 0, '{}', 0, false, false, null, true, 2),
  ('c2000000-0000-4000-8000-000000000003', 'jersey', 'Deep Jewel Jersey Set', 'A boxed edit of deep teal, black, and rich neutral jersey veils with a secure, comfortable stretch.', null, array['catalog-v1/jersey/5eb6eaa744484cc5f2c87a18bd10ac50.webp'], 0, '{}', 0, false, false, null, true, 3),
  ('c2000000-0000-4000-8000-000000000004', 'jersey', 'Ivory Everyday Jersey', 'A warm ivory jersey with a smooth matte finish, soft stretch, and an effortless asymmetric drape.', null, array['catalog-v1/jersey/9100cb2e66011543229f780e4c7a597d.webp'], 0, array['catalog-v1/jersey/ivory-jersey-morning.webp'], 0, true, true, null, true, 4),
  ('c2000000-0000-4000-8000-000000000005', 'jersey', 'Soft Pastel Jersey Set', 'A light, feminine jersey colour edit designed for comfortable all-day styling and repeat wear.', null, array['catalog-v1/jersey/b476aa533da67f3b6c2c7dd10172c374.webp'], 0, '{}', 0, false, false, null, true, 5),
  ('c2000000-0000-4000-8000-000000000006', 'jersey', 'Gift-Box Jersey Edit', 'A ready-to-gift mix of classic, vibrant, and muted jersey veils. Confirm your colour selection when ordering.', null, array['catalog-v1/jersey/c196d67def4fc8c0a0e49bf20794953e.webp'], 0, '{}', 0, false, false, null, true, 6),

  ('c1000000-0000-4000-8000-000000000001', 'chiffon', 'Ruby Ombre Chiffon', 'A fluid scarlet-to-black ombre chiffon with a subtle lustrous finish and an elegant full drape.', null, array['catalog-v1/chiffon/29f79ee91b4862f75e76d8a14ca908f5.webp'], 0, array['chiffon/red-black-ombre-close.webp'], 0, true, false, null, true, 1),
  ('c3000000-0000-4000-8000-000000000002', 'chiffon', 'Pearl Filigree Chiffon', 'A soft pearl chiffon with delicate tonal patterning and a refined border for polished occasion styling.', null, array['catalog-v1/chiffon/40f35a57b91bb70695295c9c5ac8072d.webp'], 0, '{}', 0, false, false, null, true, 2),
  ('c3000000-0000-4000-8000-000000000003', 'chiffon', 'Mustard Marble Chiffon', 'A warm mustard chiffon traced with a fine metallic marble pattern for light-catching evening elegance.', null, array['catalog-v1/chiffon/52eaa2354e81960315d5d12c2f4f5bfe.webp'], 0, array['catalog-v1/chiffon/mustard-gold-hour.webp'], 0, true, true, null, true, 3),
  ('c3000000-0000-4000-8000-000000000004', 'chiffon', 'Blush Embellished Chiffon', 'A sheer blush chiffon detailed with delicate embroidery and scattered embellishment for special occasions.', null, array['catalog-v1/chiffon/809ff9c8573e9fd972ced85e9695dd2b.webp'], 0, '{}', 0, false, false, null, true, 4),
  ('c3000000-0000-4000-8000-000000000005', 'chiffon', 'Magenta Ombre Chiffon', 'A vibrant magenta-to-plum chiffon with a luminous finish and dramatic, graceful movement.', null, array['catalog-v1/chiffon/b9fcea5e199575a994728b5b03d59dd9.webp'], 0, '{}', 0, false, false, null, true, 5),
  ('c3000000-0000-4000-8000-000000000006', 'chiffon', 'Sky Foil Chiffon', 'An airy sky-blue chiffon finished with playful gold ring motifs for a bright statement look.', null, array['catalog-v1/chiffon/c0c609e8b73df4d655529fa8ff0d3c5c.webp'], 0, '{}', 0, false, false, null, true, 6),
  ('c1000000-0000-4000-8000-000000000002', 'chiffon', 'Ice Blue Chiffon', 'An airy pale-blue chiffon with a fine woven texture, feather-light movement, and a soft layered fall.', null, array['catalog-v1/chiffon/f86e455cd898a3e013035424901fd29b.webp'], 0, array['chiffon/ice-blue-golden-hour-full.webp'], 0, true, false, null, true, 7),

  ('c4000000-0000-4000-8000-000000000001', 'silk', 'Dusty Rose Botanical Silk', 'A fluid dusty-rose silk scattered with tonal botanical marks for romantic, understated occasion dressing.', null, array['catalog-v1/silk/1e9cbaeaa4dcfab51a69a69a079b378c.webp'], 0, array['catalog-v1/silk/dusty-rose-gallery.webp'], 0, true, true, null, true, 1),
  ('c4000000-0000-4000-8000-000000000002', 'silk', 'Essential Satin Silk Edit', 'A curated stack of soft neutral and jewel-tone silk veils with a smooth hand and elegant sheen.', null, array['catalog-v1/silk/1ee4ee9084b9c008a57a2ff3b4610517.webp'], 0, '{}', 0, false, false, null, true, 2),
  ('c4000000-0000-4000-8000-000000000003', 'silk', 'Champagne Silk Stack', 'A luminous assortment of champagne, taupe, and silver silk tones for elevated neutral dressing.', null, array['catalog-v1/silk/2a73c6e109f83aed82322a76851cc987.webp'], 0, '{}', 0, false, false, null, true, 3),
  ('c4000000-0000-4000-8000-000000000004', 'silk', 'Earth Animal Silk Edit', 'An expressive earth-tone silk trio combining rich brown, dappled, and animal-inspired prints.', null, array['catalog-v1/silk/7bf06f7e674506ba09d6cb21074a2fe4.webp'], 0, '{}', 0, false, false, null, true, 4),
  ('c4000000-0000-4000-8000-000000000005', 'silk', 'Jewel Tone Silk Edit', 'A versatile colour library of jewel, neutral, blush, and classic silk veils for building an occasion wardrobe.', null, array['catalog-v1/silk/b869edc7594f2ece5433f69507d56ae0.webp'], 0, '{}', 0, false, false, null, true, 5),
  ('c4000000-0000-4000-8000-000000000006', 'silk', 'Mocha Silk Pair', 'A softly luminous mocha-and-mauve silk pairing with fluid folds and an elegant polished finish.', null, array['catalog-v1/silk/cddda725615fc7afa27cead737acc87c.webp'], 0, '{}', 0, false, false, null, true, 6),
  ('c4000000-0000-4000-8000-000000000007', 'silk', 'Mineral Print Silk Edit', 'A four-colour silk edit with painterly mineral motifs for distinctive statement styling.', null, array['catalog-v1/silk/e8d235a09cc2be4ab43b9f9bed66195c.webp'], 0, '{}', 0, false, false, null, true, 7),
  ('c4000000-0000-4000-8000-000000000008', 'silk', 'Rose Ripple Silk Set', 'A rose-led silk set with radiating printed detail and complementary colour options.', null, array['catalog-v1/silk/f72744849a77e3c34fa81203b9a381e0.webp'], 0, '{}', 0, false, false, null, true, 8),

  ('c5000000-0000-4000-8000-000000000001', 'cotton-ninja', 'Sand Contour Ninja', 'A softly structured sand cotton ninja veil with full neck coverage and a clean layered silhouette.', null, array['catalog-v1/cotton-ninja/1f12c2e4dcfd62d8a24cae0ff9aabcff.webp'], 0, '{}', 0, false, false, null, true, 1),
  ('c5000000-0000-4000-8000-000000000002', 'cotton-ninja', 'Rosé Button Ninja', 'A warm rosé cotton ninja veil with a gathered back and pearl-button detail for graceful full coverage.', null, array['catalog-v1/cotton-ninja/257305342ef4d237e8394b1a5445e357.webp'], 0, '{}', 0, false, false, null, true, 2),
  ('c5000000-0000-4000-8000-000000000003', 'cotton-ninja', 'Taupe Everyday Ninja', 'A fine-ribbed taupe cotton ninja veil with a secure face opening and generous front drape.', null, array['catalog-v1/cotton-ninja/288644c0d6260878cff298a782c17c66.webp'], 0, array['catalog-v1/cotton-ninja/taupe-everyday.webp'], 0, true, true, null, true, 3),
  ('c5000000-0000-4000-8000-000000000004', 'cotton-ninja', 'Essential Ninja Trio', 'A practical black, white, and nude cotton ninja trio for dependable everyday coverage.', null, array['catalog-v1/cotton-ninja/a0654084212a57c45b8e1edec2538edb.webp'], 0, '{}', 0, false, false, null, true, 4),
  ('c5000000-0000-4000-8000-000000000005', 'cotton-ninja', 'Saturated Cotton Ninja Edit', 'A vivid colour edit of full-coverage cotton ninja veils for easy layering and expressive daily styling.', null, array['catalog-v1/cotton-ninja/e3bc36fda57cfb9d47ee9d6aa4879245.webp'], 0, '{}', 0, false, false, null, true, 5),
  ('c5000000-0000-4000-8000-000000000006', 'cotton-ninja', 'Everyday Colour Ninja Set', 'A balanced everyday selection of olive, white, berry, rust, blue, and cream cotton ninja veils.', null, array['catalog-v1/cotton-ninja/fba0ded04c1eeef19b9f58b6de3ce2bf.webp'], 0, '{}', 0, false, false, null, true, 6)
on conflict (id) do update set
  category_slug = excluded.category_slug,
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  photos = excluded.photos,
  cover_index = excluded.cover_index,
  model_photos = excluded.model_photos,
  editorial_cover_index = excluded.editorial_cover_index,
  use_editorial_cover = excluded.use_editorial_cover,
  is_featured = excluded.is_featured,
  video_url = excluded.video_url,
  visible = excluded.visible,
  sort_order = excluded.sort_order,
  updated_at = now();

update public.categories
set header_photo = case slug
  when 'jersey' then 'catalog-v1/jersey/303fd6ae68457b8704af986640dc797e.webp'
  when 'chiffon' then 'catalog-v1/chiffon/52eaa2354e81960315d5d12c2f4f5bfe.webp'
  when 'silk' then 'catalog-v1/silk/1e9cbaeaa4dcfab51a69a69a079b378c.webp'
  when 'cotton-ninja' then 'catalog-v1/cotton-ninja/288644c0d6260878cff298a782c17c66.webp'
  else header_photo
end,
updated_at = now()
where slug in ('jersey', 'chiffon', 'silk', 'cotton-ninja');
