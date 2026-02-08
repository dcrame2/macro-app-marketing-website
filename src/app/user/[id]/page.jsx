import { DeepLinkLanding } from '@/components/DeepLinkLanding'

export async function generateMetadata({ params }) {
  const { id } = await params
  return {
    title: 'Check out this profile on InstaCal',
    description: 'Track your nutrition with InstaCal',
    openGraph: {
      title: 'Check out this profile on InstaCal',
      description: 'Track your nutrition with InstaCal',
      url: `https://theinstacal.app/user/${id}`,
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

export default async function UserPage({ params }) {
  const { id } = await params
  return <DeepLinkLanding type="user" id={id} />
}
