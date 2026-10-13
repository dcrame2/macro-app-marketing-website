import { DeepLinkLanding } from '@/components/DeepLinkLanding'
import { getSharePreview, previewImage, previewText } from '@/lib/sharePreview'

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
  const preview = await getSharePreview('workout', id)
  const { title, description } = previewText(preview) ?? GENERIC
  // A child that defines `openGraph` replaces the parent's images rather
  // than inheriting them, so the image is always named. Relative, resolved
  // against `metadataBase` in the root layout.
  const image = previewImage('workout', id, preview)
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://theinstacal.app/workout/${id}`,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

export default async function WorkoutPage({ params }) {
  const { id } = await params
  return <DeepLinkLanding type="workout" id={id} />
}
