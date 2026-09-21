-- Keep the business WhatsApp contact aligned with the active number on the live storefront.
insert into public.site_text (key, value)
values ('whatsapp_number', '0789460004')
on conflict (key) do update set value = excluded.value;
