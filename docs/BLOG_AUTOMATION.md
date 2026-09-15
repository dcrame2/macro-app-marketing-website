# InstaCal weekly journal

## Running system

- Website: https://www.theinstacal.app/blog
- Database: InstaCal Production (`rrcwrqstlvauzdsjfriq`).
- Public articles: `public.blog_posts`. Anonymous and signed-in app visitors can read only already-published rows. They cannot write.
- Private provenance: `editorial.blog_runs`. No public schema access; deliberately no user RLS policies.
- Aggregate function: `select editorial.blog_snapshot(date_trunc('day',now()));` Invoke through the authenticated Supabase SQL connector. It reads source tables but does not mutate app records.
- Schedule: Monday, 09:00 America/Detroit, in this Codex task. This is a local Codex automation; the computer and app must be running with the project and Supabase connection available. It does not require a separate OpenAI API key.
- Publishing uses Supabase immediately. Next.js refreshes content within about five minutes. No weekly Git commit or website rebuild is required.

## Weekly runbook

1. Read this file and `docs/BLOG_EDITORIAL.md`. Confirm the live journal responds successfully before publishing. If it does not, preserve the completed draft and report the deployment failure.
2. Calculate the current Monday date in America/Detroit as `week_start`. Read existing post slugs, topics, keywords and publication slots. If that week is already published, verify its URL and finish without a duplicate. Never delete or overwrite an existing post to make room.
3. Review every published cover's source against `editorial.blog_runs.cover_meal_id` and the eligibility query below. If a source is deleted, private, hidden or no longer eligible, replace its image with a newly inspected eligible real photo and update provenance, or archive the affected article until a suitable photo is available. This runs weekly; removal requests should be handled immediately.
4. Get the current 28-day snapshot and preceding comparison using `editorial.blog_snapshot`. Do not query private profiles, health conditions, weight records, locations, messages or personal notes. Copy only the aggregate fields accepted by the validator. Empty or suppressed results mean there is no publishable community statistic: write a research-led article and clearly omit community claims. Never lower thresholds.
5. Research a fresh, useful topic. Browse and open authoritative primary sources. Verify numeric health claims, dates and qualifications. Choose a natural search query and specific reader intent. Without Search Console/keyword tools, these are editorial keyword targets, not measured search volume or proven trends.
6. Select and visually inspect an eligible real cover photo. The cover query must join meals to profiles and images and require `p.is_public is true`, `p.show_on_discover is true`, `m.is_hidden is false`, `m.visibility='feed'`, `m.cover_is_user_photo is true`, and `i.id=m.image_id`. Select only the meal ID, title, timestamp and image URL needed for the article. Prefer relevant, clear food photos without people or identifying details. Never generate AI imagery. Do not infer ingredients, exact portions or macro totals from pixels. Use the original public Storage URL and an honest caption. A workout article can use a relevant food/recovery image; do not invent a workout photo.
7. Write one original 900–1,500-word article (validator allows 650–2,500) using the JSON structure in `content/blog/high-protein-meal-prep.json`. Include a strong opening, practical takeaway, descriptive headings, FAQs, meaningful table or data chart when supported, honest methodology, two or more external primary sources and an appropriate InstaCal connection. Community dataset sources can use the article's `/data` URL. Without a snapshot, use at least three external sources and omit `data_snapshot` and community charts.
8. Save the new JSON to `content/blog/<slug>.json`. Keep `cover_meal_id` at the top level: the publisher stores it privately, not inside public content. For `data_snapshot`, use only the allowlisted summary fields and `periods`; never copy `protein_groups` or arbitrary source objects into it. Charts currently support the audited community metrics `mean_protein_g`, `median_protein_g`, `meals`, `contributors`, matched exactly to a snapshot period. Use tables for other sourced comparisons.
9. Run `node scripts/blog/prepare.mjs content/blog/<slug>.json /tmp/instacal-blog-<week>.sql`. Read and review the rendered content and generated SQL. The command validates content and prepares a transaction; it does not publish. Do not treat successful validation as fact-checking: verify claims and image eligibility yourself.
10. Execute the prepared SQL through Supabase `execute_sql`. The transaction rechecks exact cover eligibility, inserts one published post per `week_start`, and records the aggregate snapshot and photo provenance privately. The unique week prevents duplicate publication on retries. If no row is inserted, check whether the slot already exists or the cover became ineligible. Never report success solely because SQL returned no error.
11. Verify the resulting row, published status, date and public REST visibility, then open the live article, image and `/data` link when present. Allow five minutes for caches. Confirm title, canonical, structured data, readable mobile layout and source links. Record meaningful failures in the run log and report them.
12. Report the new article link, primary keyword and one useful evidence point. Stay quiet for a duplicate/no-op run; report actual publication, failure or required user action. Do not send email, social posts or other messages.

## Editorial backlog (keyword hypotheses, not volume estimates)

| Pillar      | Reader question / target keyword         | Useful format                                              |
| ----------- | ---------------------------------------- | ---------------------------------------------------------- |
| Nutrition   | high protein meal prep                   | Meal-log context + flexible lunch framework                |
| Workouts    | beginner strength training routine       | Sourced weekly structure + exercise substitutions          |
| Weight loss | how to track macros without overthinking | Portions, estimates and sustainable logging habits         |
| Recipes     | easy high protein breakfast ideas        | Real community inspiration + original meal ideas           |
| Weight gain | how to eat more with a small appetite    | Practical food options and appropriate individual guidance |
| Muscle      | protein and strength training            | Evidence explainer + daily planning example                |
| Community   | what makes a meal worth saving           | Privacy-safe logging patterns + product education          |
| Nutrition   | protein and fiber meal ideas             | Ingredient comparison with source-specific quantities      |

Rotate pillars and search intent. Avoid near-duplicate articles, repetitive hooks and unsupported claims of popularity. Update a relevant existing article when it better serves readers; the normal weekly output is one new article.

## Operations

Build: `npm run build`. Editorial validation tests: `node --test scripts/blog/validate.test.mjs`.

Drafts: write `status='draft'` and leave `published_at` null if deliberately retaining a draft. The public reader will not show it. The normal validated run publishes automatically, as requested by the user.

Corrections: update the specific article and `updated_at`, preserving `published_at` and its slot. Retain provenance and explain substantive corrections. Archive with `status='archived'` if removal is necessary.

Deployment: user confirmed pushes to `main` deploy the marketing site via Vercel. The local Vercel account cannot access that hosting project. The initial website code goes through GitHub; ongoing article publication uses Supabase.

Assets: initial generated cover concepts were discarded. Production images must be real eligible community photographs. Do not reintroduce generated images.

The two checked-in migrations are already applied to production; their version numbers match the remote migration ledger. This website repository contains only the blog additions, not the app database's full migration history. Do not run a standalone database reset or blindly push migrations from this partial history.
