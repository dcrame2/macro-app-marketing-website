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
      // The root opengraph-image.jsx renders the real 1200x630 card, but a
      // child that defines `openGraph` replaces the parent's images rather
      // than inheriting them, so it has to be named explicitly. This used to
      // point at "/src/images/..." - a source path Next never serves - so
      // every shared referral link unfurled with a broken image.
      images: ['/opengraph-image'],
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
