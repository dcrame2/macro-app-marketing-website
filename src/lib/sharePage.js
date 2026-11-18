import { cache } from 'react'

const FUNCTIONS =
  (process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://rrcwrqstlvauzdsjfriq.supabase.co') + '/functions/v1'

const KIND = { meal: 'meal', workout: 'workout', user: 'user', collection: 'collection', recipes: 'recipes', explore: 'explore' }

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
  if (!kind || (!id && kind !== 'recipes' && kind !== 'explore')) return null
  try {
    const res = await fetch(`${FUNCTIONS}/deferred-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // SHARE_PAGE_NOW (local only): pretend a date, for a database whose plates end before today.
      body: JSON.stringify({ action: 'page', type: kind, id: String(id ?? ''), now: process.env.SHARE_PAGE_NOW || undefined }),
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

/**
 * The readable addresses (2026-11-10): `/recipe/chicken-burrito-bowl-21333`,
 * `/meals/...`, `/workouts/...`, `/c/...`. The words are for the reader and
 * the link preview; only the trailing number is looked up, so a renamed meal
 * keeps every link that was ever sent. These paths are deliberately NOT in
 * the app's universal-link list (`/meal/`, `/workout/`, `/user/` are): they
 * always open as a web page, which is the point of a link handed to someone
 * who does not have the app.
 */
export const slugify = (text) =>
  String(text ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '')

/** "chicken-burrito-bowl-21333" or "21333" → "21333"; anything else null. */
export const idFromSlug = (slug) => {
  const match = String(slug ?? '').match(/(?:^|-)(\d{1,12})$/)
  return match ? match[1] : null
}

const nice = (base, title, id) => {
  const words = slugify(title)
  return `/${base}/${words ? `${words}-` : ''}${id}`
}

/** A plate's page: the recipe address when it carries one. */
export const platePath = (plate) =>
  nice(plate.recipe || plate.recipe_steps > 0 ? 'recipe' : 'meals', plate.title, plate.id)
export const profilePath = (profile) => (profile.username ? `/u/${profile.username}` : `/user/${profile.id}`)
export const workoutPath = (workout) => nice('workouts', workout.title, workout.id)
export const collectionPath = (collection) => nice('c', collection.title, collection.id)

/** "3 × 5 · 185 lb", "3 × 8–10", "2 × 45s": a lift's sets the way a plan is written. */
export const setsLine = (sets) => {
  if (!sets?.length) return null
  const range = (values) => {
    const list = values.filter((v) => v != null)
    if (!list.length) return null
    const lo = Math.min(...list)
    const hi = Math.max(...list)
    return lo === hi ? `${lo}` : `${lo}–${hi}`
  }
  const reps = range(sets.map((s) => s.reps))
  const seconds = range(sets.map((s) => s.seconds))
  const weight = range(sets.map((s) => s.weight))
  const head = reps ? `${sets.length} × ${reps}` : seconds ? `${sets.length} × ${seconds}s` : `${sets.length} ${sets.length === 1 ? 'set' : 'sets'}`
  return weight ? `${head} · ${weight} ${sets[0].unit ?? 'lb'}` : head
}
