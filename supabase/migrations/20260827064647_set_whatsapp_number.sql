insert into public.site_text (key, value)
values ('whatsapp_number', '+256705019297')
on conflict (key) do update
set value = excluded.value;
