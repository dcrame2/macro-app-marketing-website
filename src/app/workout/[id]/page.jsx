import { DeepLinkLanding } from '@/components/DeepLinkLanding'
import { getSharePreview, previewImage, previewText } from '@/lib/sharePreview'
import { getReferralInviter } from '@/lib/referralInviter'
import { cleanCode, getSharePage } from '@/lib/sharePage'
import { SharedWorkout } from '@/components/shared/SharedWorkout'

const GENERIC = {
  title: 'Check out this workout on InstaCal',
  description: 'Track your nutrition with InstaCal',
}

// A link sent in a text unfurls with these, so they say what the link is:
// the plate's name and numbers, who logged it, and (through /api/og) its
// photo. Anything that is not public keeps the generic line and the site's
// own card.
export async function generateMetadata({ params }) {
  const { id } = await params
  const [preview, page] = await Promise.all([getSharePreview('workout', id), getSharePage('workout', id)])
  const { title, description } = previewText(preview) ?? GENERIC
  // A child that defines `openGraph` replaces the parent's images rather
  // than inheriting them, so the image is always named. Relative, resolved
  // against `metadataBase` in the root layout.
  const image = previewImage('workout', id, preview)
  return {
    title,
    description,
    // One address per page whatever invite code the link carried.
    alternates: { canonical: `https://theinstacal.app/workout/${id}` },
    // Listed by search engines only for people who also show on Discover.
    robots: page?.indexable ? undefined : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: `https://theinstacal.app/workout/${id}`,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    // Safari's own banner: opens the app on this page when it is installed.
    other: { 'apple-itunes-app': `app-id=6743951306, app-argument=instacal://workout/${id}` },
  }
}

/**
 * The shared page itself (2026-11-10): what was shared, with the sharer's
 * invite when the link carries `?r=CODE`. Anything private, or a lookup that
 * fails, keeps the plain "open in the app" landing.
 */
export default async function SharedPage({ params, searchParams }) {
  const { id } = await params
  const code = cleanCode((await searchParams)?.r)
  const [page, inviter] = await Promise.all([
    getSharePage('workout', id),
    code ? getReferralInviter(code) : null,
  ])
  if (!page) return <DeepLinkLanding type="workout" id={id} />
  return <SharedWorkout workout={page} inviter={inviter} code={inviter ? code : null} />
}
