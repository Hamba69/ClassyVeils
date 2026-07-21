-- Classyveils schema
-- Run this in the Supabase SQL editor, or via `supabase db push`.

-- 1. Who is allowed into /admin. Add Anisha + her helper's Google account emails here.
create table if not exists allowed_admins (
  email text primary key
);

-- 2. One row per fabric line (jersey, chiffon, silk, cotton-ninja).
-- The intro text, "why you'll love it" bullets, and header photo live here so
-- Anisha can edit the story without touching a single veil listing.
create table if not exists categories (
  slug text primary key,              -- e.g. 'jersey', 'chiffon', 'silk', 'cotton-ninja'
  label text not null,                -- e.g. 'Jersey Veils'
  tagline text not null default '',   -- e.g. 'Where elegance meets everyday comfort.'
  intro text not null default '',
  bullets text[] not null default '{}',
  header_photo text,                  -- storage path in the veil-photos bucket
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

-- 3. Individual veil listings.
create table if not exists veils (
  id uuid primary key default gen_random_uuid(),
  category_slug text not null references categories(slug) on delete cascade,
  name text not null,
  description text not null default '',
  price numeric,                      -- nullable: leave blank to mean "ask on WhatsApp"
  photos text[] not null default '{}', -- ordered array of storage paths
  visible boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. Small named text blocks used across the public site (hero headline,
-- about-page bio, phone/WhatsApp number, Instagram handle, etc.)
create table if not exists site_text (
  key text primary key,
  value text not null default ''
);

insert into site_text (key, value) values
  ('hero_headline', 'Classy and luxurious veils'),
  ('hero_subhead', 'Jersey, chiffon, silk, and cotton ninja veils — made for everyday elegance.'),
  ('about_bio', 'Founded by Anisha B Yusurah, Classyveils.ug brings together jersey, chiffon, and silk veils selected for comfort, elegance, and quality.'),
  ('whatsapp_number', ''),
  ('contact_phone', ''),
  ('instagram_handle', '')
on conflict (key) do nothing;

insert into categories (slug, label, tagline, intro, bullets, sort_order) values
  ('jersey', 'Jersey Veils', 'Where elegance meets everyday comfort.',
   'Soft, breathable, high-quality jersey fabric with a smooth stretch that stays put without pins.',
   array['Soft, premium-quality jersey fabric','Lightweight, breathable, and comfortable','Stretchy material for a secure, non-slip fit','No pins required for most styles','Wrinkle-resistant and easy to care for','Suitable for all seasons'], 1),
  ('chiffon', 'Chiffon Veils', 'Where elegance meets effortless beauty.',
   'Lightweight, airy chiffon that drapes beautifully for a soft, refined look.',
   array['Lightweight, airy, and elegant chiffon fabric','Soft drape for a graceful and polished look','Available in a variety of stunning colors','Ideal for layering with pins or undercaps'], 2),
  ('silk', 'Silk Veils', 'Where luxury meets timeless elegance.',
   'Premium silk with a smooth, silky finish and an elegant sheen for special occasions.',
   array['Premium-quality silk with a soft, luxurious feel','Elegant sheen for a sophisticated look','Beautiful drape that enhances every style','Perfect for special occasions and everyday elegance'], 3),
  ('cotton-ninja', 'Cotton Ninja Veils', 'Where comfort meets everyday coverage.',
   'Breathable cotton ninja veils built for full coverage and all-day comfort.',
   array['Soft, breathable cotton blend','Full coverage, easy everyday styling','Comfortable for all-day wear'], 4)
on conflict (slug) do nothing;

-- Row Level Security ---------------------------------------------------

alter table categories enable row level security;
alter table veils enable row level security;
alter table site_text enable row level security;
alter table allowed_admins enable row level security;

-- Anyone can read categories, site text, and visible veils (the public site).
create policy "public read categories" on categories for select using (true);
create policy "public read site_text" on site_text for select using (true);
create policy "public read visible veils" on veils for select using (visible = true);

-- Only whitelisted, signed-in Google accounts can write, and can read
-- everything including hidden veils.
create policy "admin full read veils" on veils for select using (
  auth.jwt() ->> 'email' in (select email from allowed_admins)
);
create policy "admin write veils" on veils for all using (
  auth.jwt() ->> 'email' in (select email from allowed_admins)
) with check (
  auth.jwt() ->> 'email' in (select email from allowed_admins)
);
create policy "admin write categories" on categories for all using (
  auth.jwt() ->> 'email' in (select email from allowed_admins)
) with check (
  auth.jwt() ->> 'email' in (select email from allowed_admins)
);
create policy "admin write site_text" on site_text for all using (
  auth.jwt() ->> 'email' in (select email from allowed_admins)
) with check (
  auth.jwt() ->> 'email' in (select email from allowed_admins)
);

-- Storage: a public bucket for veil photos. Run once; ignore if it already exists.
insert into storage.buckets (id, name, public)
values ('veil-photos', 'veil-photos', true)
on conflict (id) do nothing;

create policy "public read veil photos" on storage.objects for select using (
  bucket_id = 'veil-photos'
);
create policy "admin upload veil photos" on storage.objects for insert with check (
  bucket_id = 'veil-photos'
  and auth.jwt() ->> 'email' in (select email from allowed_admins)
);
create policy "admin delete veil photos" on storage.objects for delete using (
  bucket_id = 'veil-photos'
  and auth.jwt() ->> 'email' in (select email from allowed_admins)
);

-- Finally, add the real admin emails:
-- insert into allowed_admins (email) values ('anisha@example.com'), ('helper@example.com');
