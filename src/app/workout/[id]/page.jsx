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
      images: [
        {
          url: '/src/images/logos/InstaCal_logo.png',
          width: 1200,
          height: 630,
          alt: 'InstaCal',
        },
      ],
    },
  }
}

export default async function WorkoutPage({ params }) {
  const { id } = await params
  return <DeepLinkLanding type="workout" id={id} />
}
