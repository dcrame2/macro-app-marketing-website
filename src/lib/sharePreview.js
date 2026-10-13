import { cache } from 'react'

const FUNCTIONS =
  (process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://rrcwrqstlvauzdsjfriq.supabase.co') + '/functions/v1'

/** The deep-link page types that have something to preview. */
const KIND = { meal: 'meal', workout: 'workout', user: 'user', challenges: 'challenge' }

/**
 * What a shared link points at, for its page title and its link preview: a
 * meal's name, numbers, photo and author; a workout's; a profile's name and
 * handle; a public challenge's title. Asked of the app's `deferred-link`
 * function (`preview`), which only answers for things a signed-out visitor
 * could already see - anything private, or a lookup that fails, is null and
 * the page keeps its generic preview. `cache` shares one request between
 * generateMetadata and the image route's sibling calls in a render.
 */
export const getSharePreview = cache(async (type, id) => {
  const kind = KIND[type]
  if (!kind || !id) return null
  try {
    const res = await fetch(`${FUNCTIONS}/deferred-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'preview', type: kind, id: String(id) }),
      next: { revalidate: 300 },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data?.preview ?? null
  } catch {
    return null
  }
})

const n = (value) => Math.round(Number(value) || 0).toLocaleString('en-US')

export const handleOf = (author) =>
  author?.username ? `@${author.username}` : author?.name || null

/** "3.1 mi" - a link preview has no reader to ask, so miles. */
export const milesOf = (meters) => {
  const mi = (Number(meters) || 0) / 1609.344
  if (mi <= 0) return null
  return `${mi >= 10 ? mi.toFixed(1) : mi.toFixed(2).replace(/0$/, '')} mi`
}

export const durationOf = (seconds) => {
  const s = Math.round(Number(seconds) || 0)
  if (s <= 0) return null
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    : `${m}:${String(sec).padStart(2, '0')}`
}

/** A workout's numbers, the ones a person would say: distance, time, burn. */
export const workoutStats = (p) =>
  [
    milesOf(p.distance_meters),
    durationOf(p.duration_seconds),
    p.calories ? `${n(p.calories)} kcal` : null,
  ].filter(Boolean)

/**
 * The words a link unfurls with. Null when there is nothing to say beyond the
 * generic line, so each page keeps its own fallback.
 */
export const previewText = (preview) => {
  if (!preview) return null
  const by = handleOf(preview.author)
  if (preview.kind === 'meal') {
    return {
      title: `${preview.title} · ${n(preview.calories)} cal`,
      description: `${n(preview.protein)}g protein · ${n(preview.carbs)}g carbs · ${n(preview.fat)}g fat.${by ? ` Logged by ${by} on InstaCal.` : ' Logged on InstaCal.'}`,
    }
  }
  if (preview.kind === 'workout') {
    const stats = workoutStats(preview)
    return {
      title: stats.length ? `${preview.title} · ${stats[0]}` : preview.title,
      description: `${stats.join(' · ')}${stats.length ? '. ' : ''}${by ? `Logged by ${by} on InstaCal.` : 'Logged on InstaCal.'}`,
    }
  }
  if (preview.kind === 'user') {
    const who = preview.name ? `${preview.name} (@${preview.username})` : `@${preview.username}`
    return {
      title: `${who} on InstaCal`,
      description:
        preview.bio ||
        `Follow @${preview.username} on InstaCal to see what they eat and how they train.`,
    }
  }
  if (preview.kind === 'challenge') {
    return {
      title: `Join "${preview.title}" on InstaCal`,
      description: 'A public challenge on InstaCal. Open the app to see the target and join in.',
    }
  }
  return null
}

/** The composed preview image for a link, or the site's own card. */
export const previewImage = (type, id, preview) =>
  preview && preview.kind !== 'challenge' ? `/api/og/${type}/${id}` : '/opengraph-image'
