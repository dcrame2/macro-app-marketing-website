import { cache } from 'react'

const FUNCTIONS =
  (process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://rrcwrqstlvauzdsjfriq.supabase.co') + '/functions/v1'

const KIND = { meal: 'meal', workout: 'workout', user: 'user' }

/**
 * Everything a shared link's page shows: the plate with its rows and recipe,
 * a session's numbers, a profile with its grid. Asked of the app's
 * `deferred-link` function (`page`), which answers only for what a
 * signed-out visitor to a public profile could already see; anything else, or
 * a failed lookup, is null and the page falls back to the plain "open in the
 * app" landing. `cache` shares one request between generateMetadata and the
 * page.
 */
export const getSharePage = cache(async (type, id) => {
  const kind = KIND[type]
  if (!kind || !id) return null
  try {
    const res = await fetch(`${FUNCTIONS}/deferred-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'page', type: kind, id: String(id) }),
      next: { revalidate: 300 },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data?.page ?? null
  } catch {
    return null
  }
})

/** An invite code from a link's `?r=`, or null. */
export const cleanCode = (value) => {
  const code = String(Array.isArray(value) ? value[0] : (value ?? ''))
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
  return code.length >= 4 && code.length <= 12 ? code : null
}

/** A stored photo at the size it is drawn, through Supabase's image transform. */
export const sized = (url, width, height) => {
  if (!url) return null
  if (!url.includes('/storage/v1/object/public/')) return url
  const base = url
    .split('?')[0]
    .replace('/storage/v1/object/public/', '/storage/v1/render/image/public/')
  return `${base}?width=${width}&height=${height}&resize=cover&quality=75`
}

export const num = (value) => Math.round(Number(value) || 0).toLocaleString('en-US')

/** "Grilled Chicken (7 oz)" → { name: "Grilled Chicken", serving: "7 oz" }. */
export const splitServing = (raw) => {
  const text = String(raw ?? '').trim()
  const match = text.match(/^(.*?)\s*\(([^)]*)\)\s*$/)
  return match ? { name: match[1].trim() || text, serving: match[2].trim() } : { name: text, serving: null }
}

export const dayOf = (iso) => {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
}

/** A link to another shared page that keeps the sharer's invite code. */
export const withCode = (path, code) => (code ? `${path}?r=${code}` : path)
