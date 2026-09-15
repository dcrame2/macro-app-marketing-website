-- Public editorial content only. No app-user identifiers or raw logs are stored here.
create table public.blog_posts (
  slug text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  week_start date not null unique,
  title text not null check (length(title) between 10 and 100),
  description text not null check (length(description) between 50 and 180),
  category text not null check (category in ('Nutrition','Weight loss','Weight gain','Muscle','Workouts','Recipes','Community')),
  primary_keyword text not null,
  secondary_keywords text[] not null default '{}',
  cover_image text not null check (cover_image ~ '^/images/blog/[a-z0-9-]+\.webp$'),
  cover_alt text not null,
  cover_caption text not null,
  content jsonb not null check (jsonb_typeof(content) = 'object'),
  status text not null default 'draft' check (status in ('draft','published','archived')),
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint published_requires_date check (status <> 'published' or published_at is not null)
);
create index blog_posts_published_date_idx on public.blog_posts (published_at desc, slug) where status = 'published';
alter table public.blog_posts enable row level security;
revoke all on public.blog_posts from anon, authenticated;
grant select on public.blog_posts to anon, authenticated;
grant all on public.blog_posts to service_role;
create policy "Only published articles are public" on public.blog_posts for select to anon, authenticated
  using (status = 'published' and published_at <= now());

create schema if not exists editorial;
revoke all on schema editorial from public, anon, authenticated;
grant usage on schema editorial to service_role;
create table editorial.blog_runs (
  week_start date primary key,
  status text not null default 'researching' check (status in ('researching','published','failed')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  snapshot jsonb,
  post_slug text references public.blog_posts(slug),
  notes text
);
alter table editorial.blog_runs enable row level security;
revoke all on editorial.blog_runs from public, anon, authenticated;
grant all on editorial.blog_runs to service_role;

-- Invoker permissions: available only to the trusted editorial worker / SQL connector.
-- Suppress small cohorts at the database boundary. Do not publish personal records.
create function editorial.blog_snapshot(p_end timestamptz default date_trunc('day',now()))
returns jsonb language sql stable security invoker set search_path = '' as $function$
with eligible as materialized (
 select m.profile_id, m.created_at, m.protein, m.primary_protein_source,
   case when m.created_at >= p_end - interval '28 days' then 'current' else 'previous' end as period
 from public.meals m join public.profiles p on p.id=m.profile_id
 where p.is_public is true and p.show_on_discover is true
   and p.is_team_account is not true and p.is_coach_account is not true
   and m.is_hidden is false and m.visibility = 'feed'
   and m.created_at >= p_end - interval '56 days' and m.created_at < p_end
), totals as (
 select period, count(*) as meals, count(distinct profile_id) as contributors,
   count(*) filter(where protein between 0 and 250) as valid_protein_meals,
   count(distinct profile_id) filter(where protein between 0 and 250) as protein_contributors,
   round(avg(protein) filter(where protein between 0 and 250)::numeric,1) as mean_protein_g,
   round((percentile_cont(0.5) within group(order by protein) filter(where protein between 0 and 250))::numeric,1) as median_protein_g
 from eligible group by period having count(*)>=100 and count(distinct profile_id)>=20
), protein_groups as (
 select period, lower(trim(primary_protein_source)) as protein_source, count(*) as meals, count(distinct profile_id) as contributors
 from eligible where lower(trim(primary_protein_source)) in ('chicken','beef','pork','fish','seafood','eggs','tofu','beans','lentils','turkey','dairy','plant-based','none')
 group by period, lower(trim(primary_protein_source))
 having count(*)>=100 and count(distinct profile_id)>=20
)
select jsonb_build_object(
 'window_end_exclusive', p_end, 'window_start', p_end - interval '28 days',
 'previous_window_start', p_end - interval '56 days',
 'minimum_contributors',20,'minimum_records',100,
 'periods',coalesce((select jsonb_agg(jsonb_build_object('period',period,'meals',meals,'contributors',contributors,
   'valid_protein_meals',case when valid_protein_meals>=100 and protein_contributors>=20 then valid_protein_meals end,
   'mean_protein_g',case when valid_protein_meals>=100 and protein_contributors>=20 then mean_protein_g end,
   'median_protein_g',case when valid_protein_meals>=100 and protein_contributors>=20 then median_protein_g end)) from totals),'[]'::jsonb),
 'protein_groups',coalesce((select jsonb_agg(to_jsonb(g)) from protein_groups g),'[]'::jsonb),
 'methodology','Public, discoverable, feed-visible, non-hidden meal records; team and coach accounts excluded. UTC creation windows. Protein estimates restricted to 0–250 g per log. Meal-weighted, not person-weighted. Missing logs and automated estimates limit interpretation. Source labels are AI/user-entered and not validated. Small cohorts are omitted, so groups may not sum to totals. These are observational logging patterns, not measured diets or outcomes.'
);
$function$;
revoke all on function editorial.blog_snapshot(timestamptz) from public, anon, authenticated;
grant execute on function editorial.blog_snapshot(timestamptz) to service_role;
