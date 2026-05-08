import { ReferralLanding } from '@/components/ReferralLanding'

const ITUNES_ID = '6743951306'

export async function generateMetadata({ params }) {
  const { code } = await params
  const upperCode = code.toUpperCase()

  return {
    title: "You've been invited to InstaCal",
    description: `Use code ${upperCode} to get free days of InstaCal Pro.`,
    openGraph: {
      title: "You've been invited to InstaCal",
      description: `Use code ${upperCode} to get free days of InstaCal Pro.`,
      url: `https://theinstacal.app/r/${upperCode}`,
      images: [
        {
          url: '/src/images/logos/InstaCal_logo.png',
          width: 1200,
          height: 630,
          alt: 'InstaCal',
        },
      ],
    },
    other: {
      'apple-itunes-app': `app-id=${ITUNES_ID}, app-argument=instacal://r/${upperCode}`,
    },
  }
}

export default async function ReferralPage({ params }) {
  const { code } = await params
  return <ReferralLanding code={code.toUpperCase()} />
}
