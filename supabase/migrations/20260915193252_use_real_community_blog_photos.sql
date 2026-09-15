alter table public.blog_posts drop constraint blog_posts_cover_image_check;
alter table public.blog_posts add constraint blog_posts_cover_image_check check (
 cover_image ~ '^https://rrcwrqstlvauzdsjfriq\.supabase\.co/storage/v1/object/public/images/[a-zA-Z0-9/_\.-]+$'
);
alter table editorial.blog_runs add column cover_meal_id integer;
