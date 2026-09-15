import { readFileSync, writeFileSync } from 'node:fs'
import { validatePost } from './validate.mjs'
const [input, output] = process.argv.slice(2)
if (!input || !output)
  throw new Error(
    'Usage: node scripts/blog/prepare.mjs article.json /tmp/article.sql',
  )
const post = JSON.parse(readFileSync(input, 'utf8'))
const report = validatePost(post)
const quote = (value) => "'" + String(value).replaceAll("'", "''") + "'"
// Recheck visibility and the exact original-photo URL in the publishing transaction.
// A week has one immutable publication slot, even across retries or overlapping runs.
const sql = `begin;
with eligible_cover as (
 select m.id from public.meals m join public.profiles p on p.id=m.profile_id join public.images i on i.id=m.image_id
 where m.id=${post.cover_meal_id} and p.is_public is true and p.show_on_discover is true and m.is_hidden is false
 and m.visibility='feed' and m.cover_is_user_photo is true and i.url=${quote(post.cover_image)}
), inserted as (
 insert into public.blog_posts (slug,week_start,title,description,category,primary_keyword,secondary_keywords,cover_image,cover_alt,cover_caption,content,status,published_at)
 select ${quote(post.slug)},${quote(post.week_start)}::date,${quote(post.title)},${quote(post.description)},${quote(post.category)},${quote(post.primary_keyword)},ARRAY[${post.secondary_keywords.map(quote).join(',')}]::text[],${quote(post.cover_image)},${quote(post.cover_alt)},${quote(post.cover_caption)},${quote(JSON.stringify(post.content))}::jsonb,'published',now()
 from eligible_cover on conflict (week_start) do nothing returning slug,week_start
)
insert into editorial.blog_runs (week_start,status,completed_at,post_slug,snapshot,cover_meal_id,notes)
select week_start,'published',now(),slug,${quote(JSON.stringify(post.content.data_snapshot || {}))}::jsonb,${post.cover_meal_id},'Validated and published via scripts/blog/prepare.mjs'
from inserted on conflict (week_start) do update set status=excluded.status,completed_at=excluded.completed_at,post_slug=excluded.post_slug,snapshot=excluded.snapshot,cover_meal_id=excluded.cover_meal_id,notes=excluded.notes;
commit;
select slug,status,published_at from public.blog_posts where week_start=${quote(post.week_start)}::date;
`
writeFileSync(output, sql)
console.log(
  `Validated ${report.words} words and ${report.sources} sources. SQL written to ${output}. No database writes performed.`,
)
