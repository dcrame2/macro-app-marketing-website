import { SITE_URL } from '@/lib/blog/config'
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      // The link preview images live under /api/og/. X only loads a card's
      // picture when robots.txt lets it, so that path is allowed by name;
      // the longer rule wins over the /api/ block for every crawler.
      allow: ['/', '/api/og/'],
      disallow: ['/api/', '/email', '/login', '/register'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
