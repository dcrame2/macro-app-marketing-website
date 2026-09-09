import { DeepLinkLanding } from '@/components/DeepLinkLanding'

export async function generateMetadata({ params }) {
  const { id } = await params
  return {
    title: 'Check out this workout on InstaCal',
    description: 'Track your nutrition with InstaCal',
    openGraph: {
      title: 'Check out this workout on InstaCal',
      description: 'Track your nutrition with InstaCal',
      url: `https://theinstacal.app/workout/${id}`,
      // The root opengraph-image.jsx renders the real 1200x630 card, but a
      // child that defines `openGraph` replaces the parent's images rather
      // than inheriting them - so it has to be named explicitly. Relative,
      // resolved against `metadataBase` in the root layout.
      images: ['/opengraph-image'],
    },
  }
}

export default async function WorkoutPage({ params }) {
  const { id } = await params
  return <DeepLinkLanding type="workout" id={id} />
}
