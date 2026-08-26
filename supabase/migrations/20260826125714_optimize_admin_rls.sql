-- Keep storefront reads public while evaluating administrator claims once per query.
-- Write policies are split by operation so they do not overlap public SELECT rules.

drop policy if exists "public read visible veils" on public.veils;
drop policy if exists "admin full read veils" on public.veils;
drop policy if exists "admin write veils" on public.veils;

drop policy if exists "read visible or admin veils" on public.veils;
create policy "read visible or admin veils"
on public.veils
for select
to anon, authenticated
using (
  visible = true
  or (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin insert veils" on public.veils;
create policy "admin insert veils"
on public.veils
for insert
to authenticated
with check (
  (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin update veils" on public.veils;
create policy "admin update veils"
on public.veils
for update
to authenticated
using (
  (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
)
with check (
  (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin delete veils" on public.veils;
create policy "admin delete veils"
on public.veils
for delete
to authenticated
using (
  (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin write categories" on public.categories;

drop policy if exists "admin update categories" on public.categories;
create policy "admin update categories"
on public.categories
for update
to authenticated
using (
  (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
)
with check (
  (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin write site_text" on public.site_text;

drop policy if exists "admin insert site_text" on public.site_text;
create policy "admin insert site_text"
on public.site_text
for insert
to authenticated
with check (
  (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin update site_text" on public.site_text;
create policy "admin update site_text"
on public.site_text
for update
to authenticated
using (
  (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
)
with check (
  (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
);

-- Apply the same single-evaluation pattern to the original product-photo bucket.
drop policy if exists "admin upload veil photos" on storage.objects;
create policy "admin upload veil photos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'veil-photos'
  and (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin delete veil photos" on storage.objects;
create policy "admin delete veil photos"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'veil-photos'
  and (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
);
