alter table veils add column if not exists cover_index int not null default 0;
alter table veils add column if not exists is_featured boolean not null default false;
alter table veils add column if not exists video_url text;
alter table categories add column if not exists video_url text;
