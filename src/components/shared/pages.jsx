import { DeepLinkLanding } from '@/components/DeepLinkLanding'
import { getSharePreview, previewImage, previewText } from '@/lib/sharePreview'
import { getReferralInviter } from '@/lib/referralInviter'
import { cleanCode, getSharePage, platePath, workoutPath } from '@/lib/sharePage'
import { SharedMeal, recipeJsonLd } from './SharedMeal'
import { SharedWorkout } from './SharedWorkout'

const SITE = 'https://theinstacal.app'
const GENERIC = {
  meal: { title: 'Check out this meal on InstaCal', description: 'Track your nutrition with InstaCal' },
  workout: { title: 'Check out this workout on InstaCal', description: 'Track your nutrition with InstaCal' },
}

/**
 * The metadata for a meal or workout page, whichever address it was asked
 * at: `/meal/21333` (the link the app shares, which opens the app when it is
 * installed) or the readable `/recipe/...`, `/meals/...`, `/workouts/...`
 * (always a web page). One canonical address per thing - the readable one -
 * so a search engine sees a single page.
 */
export async function sharedMetadata(type, id) {
  const [preview, page] = await Promise.all([getSharePreview(type, id), getSharePage(type, id)])
  const text = previewText(preview) ?? GENERIC[type]
  const recipe = type === 'meal' && page?.recipe
  const title = recipe ? `${page.title} recipe · ${Math.round(page.calories).toLocaleString('en-US')} cal` : text.title
  const description = recipe
    ? `${page.protein}g protein · ${page.recipe.steps.length} steps${page.author?.username ? ` · by @${page.author.username}` : ''}. Ingredients, method and macros on InstaCal.`
    : text.description
  const path = page ? (type === 'meal' ? platePath(page) : workoutPath(page)) : `/${type}/${id}`
  // A child that defines `openGraph` replaces the parent's images rather
  // than inheriting them, so the image is always named.
  const image = previewImage(type, id, preview)
  return {
    title,
    description,
    alternates: { canonical: `${SITE}${path}` },
    // Listed by search engines only for people who also show on Discover.
    robots: page?.indexable ? undefined : { index: false, follow: false },
    openGraph: { title, description, url: `${SITE}${path}`, images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    // Safari's own banner: opens the app on this thing when it is installed.
    other: { 'apple-itunes-app': `app-id=6743951306, app-argument=instacal://${type}/${id}` },
  }
}

/** The page itself. Anything private, or a lookup that fails, is the plain landing. */
export async function SharedBody({ type, id, searchParams }) {
  const code = cleanCode((await searchParams)?.r)
  const [page, inviter] = await Promise.all([getSharePage(type, id), code ? getReferralInviter(code) : null])
  if (!page) return <DeepLinkLanding type={type} id={id} />
  if (type === 'workout') return <SharedWorkout workout={page} inviter={inviter} code={inviter ? code : null} />
  const jsonLd = recipeJsonLd(page)
  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      ) : null}
      <SharedMeal meal={page} inviter={inviter} code={inviter ? code : null} />
    </>
  )
}
