import { DeepLinkLanding } from '@/components/DeepLinkLanding'
import { getSharePreview, previewText } from '@/lib/sharePreview'
import { cleanCode, getSharePage } from '@/lib/sharePage'
import { getReferralInviter } from '@/lib/referralInviter'
import { SharedPrizeRace, prizeRaceDescription, prizeRaceTitle } from '@/components/shared/SharedPrizeRace'

/**
 * The landing page for a shared challenge link.
 *
 * Only PUBLIC challenges are ever shared from the app - a private one is
 * invite-only behind an accepted-follow check, so a link could not let anyone
 * in. This page therefore always speaks in "join this" terms.
 *
 * The path must stay plural. It mirrors the app's own route
 * (app/(protected)/challenges/[id].tsx, with Expo Router stripping the
 * "(protected)" group) and it is what /.well-known/apple-app-site-association
 * and the Android intentFilters both claim.
 *
 * No `openGraph.images` here on purpose: the root opengraph-image.jsx renders a
 * proper branded 1200x630 card, and naming an image in metadata overrides it.
 * The other deep-link pages used to point at "/src/images/..." - a source path
 * Next never serves - so every shared link unfurled with a broken image.
 */

export async function generateMetadata({ params }) {
  const { id } = await params
  // A prize race says the money and where it stands.
  const race = await getSharePage('challenge', id)
  if (race?.type === 'prize_race') {
    const title = prizeRaceTitle(race)
    const description = prizeRaceDescription(race)
    return {
      title,
      description,
      openGraph: { title, description, url: `https://www.theinstacal.app/challenges/${id}`, images: ['/opengraph-image'] },
    }
  }
  // A public challenge is named in its preview; anything else keeps the line.
  const { title, description } = previewText(await getSharePreview('challenges', id)) ?? {
    title: 'Join this challenge on InstaCal',
    description: 'Take on a challenge with friends on InstaCal',
  }
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.theinstacal.app/challenges/${id}`,
      // The root opengraph-image.jsx renders the real 1200x630 card, but a
      // child that defines `openGraph` replaces the parent's images rather
      // than inheriting them - so it has to be named explicitly. Relative,
      // resolved against `metadataBase` in the root layout.
      images: ['/opengraph-image'],
    },
  }
}

export default async function ChallengePage({ params, searchParams }) {
  const { id } = await params
  // A prize race draws itself for a visitor with no account: the money, the
  // count, the clock, the board and the winner. Any other challenge keeps the
  // plain landing.
  const race = await getSharePage('challenge', id)
  if (race?.type === 'prize_race') {
    const code = cleanCode((await searchParams)?.r)
    const inviter = code ? await getReferralInviter(code) : null
    return <SharedPrizeRace race={race} inviter={inviter} code={inviter ? code : null} />
  }
  return <DeepLinkLanding type="challenges" id={id} />
}
