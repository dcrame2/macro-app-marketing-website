import { ReferralLanding } from '@/components/ReferralLanding'
import { getReferralInviter } from '@/lib/referralInviter'
import { proLength } from '@/lib/proLength'

const ITUNES_ID = '6743951306'

export async function generateMetadata({ params }) {
  const { code } = await params
  const upperCode = code.toUpperCase()
  const inviter = await getReferralInviter(upperCode)
  const length = proLength(inviter?.trial_days)

  // A link sent in a text unfurls with these, so they say who sent it and
  // what it is worth when the code is known.
  const title = inviter
    ? `${inviter.name} invited you to InstaCal`
    : "You've been invited to InstaCal"
  const description = inviter
    ? `Join with code ${upperCode} and get ${length ?? 'free days'} of InstaCal Pro, free. Snap a meal, see the macros, follow your friends.`
    : `Use code ${upperCode} to get free days of InstaCal Pro.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://theinstacal.app/r/${upperCode}`,
      // The root opengraph-image.jsx renders the real 1200x630 card, but a
      // child that defines `openGraph` replaces the parent's images rather
      // than inheriting them, so it has to be named explicitly. This used to
      // point at "/src/images/..." - a source path Next never serves - so
      // every shared referral link unfurled with a broken image.
      images: ['/opengraph-image'],
    },
    twitter: { card: 'summary_large_image', title, description },
    other: {
      'apple-itunes-app': `app-id=${ITUNES_ID}, app-argument=instacal://r/${upperCode}`,
    },
  }
}

export default async function ReferralPage({ params }) {
  const { code } = await params
  const upperCode = code.toUpperCase()
  const inviter = await getReferralInviter(upperCode)
  return <ReferralLanding code={upperCode} inviter={inviter} />
}
