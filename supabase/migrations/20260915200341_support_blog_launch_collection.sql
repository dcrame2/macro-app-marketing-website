-- Launch articles share the actual publication week without taking weekly slots.
alter table public.blog_posts add column publication_kind text not null default 'weekly'
  check (publication_kind in ('weekly', 'launch'));
alter table public.blog_posts drop constraint blog_posts_week_start_key;
create unique index blog_posts_weekly_slot_idx on public.blog_posts (week_start)
  where publication_kind = 'weekly';

alter table editorial.blog_runs add column run_key text;
update editorial.blog_runs set run_key = 'weekly:' || to_char(week_start, 'YYYY-MM-DD');
alter table editorial.blog_runs alter column run_key set not null;
alter table editorial.blog_runs drop constraint blog_runs_pkey;
alter table editorial.blog_runs add primary key (run_key);
create index blog_runs_week_start_idx on editorial.blog_runs (week_start);
