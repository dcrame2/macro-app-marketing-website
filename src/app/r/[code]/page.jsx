import { ReferralLanding } from '@/components/ReferralLanding'
import { getReferralInviter } from '@/lib/referralInviter'
import { proLength } from '@/lib/proLength'
import { SharedProfile } from '@/components/shared/SharedProfile'
import { getProfilePage, profileMetadata } from '@/components/shared/profilePage'

const ITUNES_ID = '6743951306'

/**
 * An invite link. When the code is a person's (a member, or a partner with an
 * account of their own) and their profile is public, the link shows THEM -
 * "Follow Dylan on InstaCal", their grid, the free days as one line - because
 * that is what the app's Share profile sent for partners until 2026-11-10 and
 * what every link already out there still points at. A brand's code, a
 * private account or an unknown code keeps the plain invite page.
 */
const profileFor = async (inviter) => {
  if (!inviter?.profile_id) return null
  const page = await getProfilePage(inviter.profile_id)
  return page?.is_public ? page : null
}

export async function generateMetadata({ params }) {
  const { code } = await params
  const upperCode = code.toUpperCase()
  const inviter = await getReferralInviter(upperCode)
  const profile = await profileFor(inviter)
  if (profile) {
    return {
      ...profileMetadata(profile, `/r/${upperCode}`),
      // The app opens on the invite, which applies the code and follows them.
      other: { 'apple-itunes-app': `app-id=${ITUNES_ID}, app-argument=instacal://r/${upperCode}` },
    }
  }
  const length = proLength(inviter?.trial_days)
  const title = inviter ? `${inviter.name} invited you to InstaCal` : "You've been invited to InstaCal"
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
      // A child that defines `openGraph` replaces the parent's images rather
      // than inheriting them, so the card is named explicitly.
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
    other: { 'apple-itunes-app': `app-id=${ITUNES_ID}, app-argument=instacal://r/${upperCode}` },
  }
}

export default async function ReferralPage({ params }) {
  const { code } = await params
  const upperCode = code.toUpperCase()
  const inviter = await getReferralInviter(upperCode)
  const profile = await profileFor(inviter)
  if (profile) return <SharedProfile profile={profile} inviter={inviter} code={upperCode} />
  return <ReferralLanding code={upperCode} inviter={inviter} />
}
