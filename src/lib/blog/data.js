import 'server-only'
import { cache } from 'react'

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://rrcwrqstlvauzdsjfriq.supabase.co'
// Public anon key, restricted by RLS. This reader never accepts a service-role key.
const publicKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyY3dycXN0bHZhdXpkc2pmcmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NzM2NjIsImV4cCI6MjA1OTA0OTY2Mn0.OGJGIK4asUIqCd42AnSUNh-vtzw21U11K4GrfgNyHoo'
const summary =
  'slug,title,description,category,cover_image,cover_alt,published_at,updated_at'

async function readPosts(params) {
  const query = new URLSearchParams({ status: 'eq.published', ...params })
  const response = await fetch(`${url}/rest/v1/blog_posts?${query}`, {
    headers: { apikey: publicKey },
    next: { revalidate: 300, tags: ['blog'] },
    signal: AbortSignal.timeout(10000),
  })
  if (!response.ok)
    throw new Error(`Blog content unavailable (${response.status})`)
  return response.json()
}

export const getPosts = cache(
  async (category = '', page = 1, pageSize = 12) => {
    return readPosts({
      select: summary,
      order: 'published_at.desc,slug.asc',
      limit: String(pageSize),
      offset: String((page - 1) * pageSize),
      ...(category ? { category: `eq.${category}` } : {}),
    })
  },
)

export const getPost = cache(async (slug) => {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return null
  const posts = await readPosts({ select: '*', slug: `eq.${slug}`, limit: '1' })
  return posts[0] || null
})

export function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(value))
}
