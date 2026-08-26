-- The password is managed by Supabase Auth and is deliberately absent here.
insert into public.allowed_admins (email)
values ('admin@classyveils.ug')
on conflict (email) do nothing;

insert into public.veils (
  id,
  category_slug,
  name,
  description,
  price,
  photos,
  cover_index,
  model_photos,
  editorial_cover_index,
  use_editorial_cover,
  is_featured,
  video_url,
  visible,
  sort_order
)
values
  (
    'c1000000-0000-4000-8000-000000000001',
    'chiffon',
    'Ruby Ombre Chiffon',
    'A fluid scarlet-to-black ombre chiffon with a subtle lustrous finish and an elegant full drape.',
    null,
    array['chiffon/pilot-red-black-ombre.webp'],
    0,
    array['chiffon/red-black-ombre-close.webp'],
    0,
    true,
    true,
    null,
    true,
    1
  ),
  (
    'c1000000-0000-4000-8000-000000000002',
    'chiffon',
    'Ice Blue Chiffon',
    'An airy pale-blue chiffon with a fine woven texture, feather-light movement, and a soft layered fall.',
    null,
    array['chiffon/pilot-ice-blue.webp'],
    0,
    array['chiffon/ice-blue-golden-hour-full.webp'],
    0,
    true,
    true,
    null,
    true,
    2
  )
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
set
  header_photo = 'chiffon/pilot-ice-blue.webp',
  updated_at = now()
where slug = 'chiffon';
