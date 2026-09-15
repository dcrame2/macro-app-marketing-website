import { getPosts } from '@/lib/blog/data'
import { SITE_URL } from '@/lib/blog/config'
export const revalidate = 300
export default async function sitemap() {
  const posts = []
  for (let page = 1; ; page++) {
    const batch = await getPosts('', page, 500)
    posts.push(...batch)
    if (batch.length < 500) break
  }
  return [
    ...[
      '',
      '/blog',
      '/blog/editorial',
      '/partners',
      '/privacy',
      '/community-guidelines',
    ].map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: path === '/blog' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : path === '/blog' ? 0.9 : 0.4,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updated_at,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ]
}
