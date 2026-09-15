import { getPosts } from '@/lib/blog/data'
import { SITE_URL } from '@/lib/blog/config'
export const revalidate = 300
const xml = (value) =>
  String(value).replace(
    /[<>&"']/g,
    (char) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&apos;',
      })[char],
  )
export async function GET() {
  const posts = await getPosts('', 1, 50)
  const items = posts
    .map(
      (post) =>
        `<item><title>${xml(post.title)}</title><link>${SITE_URL}/blog/${post.slug}</link><guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid><description>${xml(post.description)}</description><pubDate>${new Date(post.published_at).toUTCString()}</pubDate><category>${xml(post.category)}</category></item>`,
    )
    .join('')
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>The InstaCal Blog</title><link>${SITE_URL}/blog</link><description>Food, fitness and real life. Fresh ideas from InstaCal.</description><language>en-us</language><atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,
    {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    },
  )
}
