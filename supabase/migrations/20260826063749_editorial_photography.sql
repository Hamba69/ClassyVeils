-- Keep AI-assisted campaign photography distinct from real product evidence.
-- The public site only opts into an editorial cover when an admin selects it.
alter table public.veils
  add column if not exists model_photos text[] not null default '{}',
  add column if not exists editorial_cover_index integer not null default 0,
  add column if not exists use_editorial_cover boolean not null default false;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'veils_editorial_cover_index_nonnegative'
      and conrelid = 'public.veils'::regclass
  ) then
    alter table public.veils
      add constraint veils_editorial_cover_index_nonnegative
      check (editorial_cover_index >= 0);
  end if;
end $$;

insert into storage.buckets (id, name, public)
values ('veil-editorial', 'veil-editorial', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "public read veil editorial" on storage.objects;
create policy "public read veil editorial"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'veil-editorial');

drop policy if exists "admin upload veil editorial" on storage.objects;
create policy "admin upload veil editorial"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'veil-editorial'
  and (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin update veil editorial" on storage.objects;
create policy "admin update veil editorial"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'veil-editorial'
  and (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
)
with check (
  bucket_id = 'veil-editorial'
  and (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin delete veil editorial" on storage.objects;
create policy "admin delete veil editorial"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'veil-editorial'
  and (select auth.jwt() ->> 'email') in (select email from public.allowed_admins)
);
