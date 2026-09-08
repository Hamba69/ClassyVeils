-- Keep the database-backed public copy aligned with the considered, personal site voice.
update public.site_text
set value = case key
  when 'hero_headline' then 'Find your shade of the day'
  when 'hero_subhead' then 'A considered edit of jersey, chiffon, silk, and cotton veils, chosen by Anisha for colour, comfort, and an easy sense of occasion.'
  when 'about_bio' then 'Anisha B Yusurah’s edit brings together veils and scarves chosen for their colour, comfort, and the way they make an outfit feel.'
  else value
end
where key in ('hero_headline', 'hero_subhead', 'about_bio');

update public.categories
set
  label = case slug
    when 'jersey' then 'Jersey'
    when 'chiffon' then 'Chiffon'
    when 'silk' then 'Silk'
    when 'cotton-ninja' then 'Cotton ninja'
    else label
  end,
  tagline = case slug
    when 'jersey' then 'Soft structure for everyday wear.'
    when 'chiffon' then 'Light, sheer, and easy to layer.'
    when 'silk' then 'A little sheen, beautifully held.'
    when 'cotton-ninja' then 'Comfort with a clean, covered shape.'
    else tagline
  end,
  intro = case slug
    when 'jersey' then 'Matte, breathable jersey with gentle stretch and an easy drape that stays comfortable through the day.'
    when 'chiffon' then 'Airy chiffon with a fine texture and a graceful fall, lovely when you want movement around the face and shoulder.'
    when 'silk' then 'Smooth silk with a quiet sheen and fluid folds for days when the fabric should carry the look.'
    when 'cotton-ninja' then 'Breathable cotton pieces with a secure shape and full coverage for simple, considered everyday dressing.'
    else intro
  end,
  bullets = case slug
    when 'jersey' then array['Soft, breathable jersey', 'Gentle stretch', 'Easy everyday drape']
    when 'chiffon' then array['Lightweight texture', 'Airy movement', 'A soft layered finish']
    when 'silk' then array['Smooth hand', 'Subtle natural sheen', 'Fluid folds']
    when 'cotton-ninja' then array['Breathable cotton blend', 'Full everyday coverage', 'A secure, simple shape']
    else bullets
  end
where slug in ('jersey', 'chiffon', 'silk', 'cotton-ninja');
