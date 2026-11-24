import { DeepLinkLanding } from '@/components/DeepLinkLanding'
import { getSharePreview, previewText } from '@/lib/sharePreview'
import { cleanCode, getSharePage } from '@/lib/sharePage'
import { getReferralInviter } from '@/lib/referralInviter'
import { SharedPrizeRace, prizeRaceDescription, prizeRaceTitle } from '@/components/shared/SharedPrizeRace'

/**
 * A shared challenge, served at two addresses:
 *
 * - /challenges/<id>, which the app claims (AASA and the Android intent
 *   filters), so it opens the app when it is installed;
 * - /race/<id>, which nothing claims, so it ALWAYS opens in the browser
 *   (2026-11-23, the user: "even if I have the app I want the link to open in
 *   the browser and I can open it from there"). The app shares prize races at
 *   this one; the page's "I already have InstaCal" button and Safari's banner
 *   open the app from there. Keep /race out of the AASA and intentFilters.
 *
 * A prize race's preview is its own gold card (/api/og/race/<id>), canonical
 * at /race/<id>. Any other challenge keeps the site's card.
 */
const SITE = 'https://www.theinstacal.app'

export async function challengeMetadata(id) {
  const race = await getSharePage('challenge', id)
  if (race?.type === 'prize_race') {
    const title = prizeRaceTitle(race)
    const description = prizeRaceDescription(race)
    // The card changes with the race: the address carries its state so a
    // preview app that cached "12 in" asks again once it says "Live".
    const image = `/api/og/race/${id}?s=${race.state}-${race.runners}`
    return {
      title,
      description,
      alternates: { canonical: `${SITE}/race/${id}` },
      openGraph: { title, description, url: `${SITE}/race/${id}`, images: [{ url: image, width: 1200, height: 630 }] },
      twitter: { card: 'summary_large_image', title, description, images: [image] },
      other: { 'apple-itunes-app': `app-id=6743951306, app-argument=instacal://challenges/${id}` },
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
      url: `${SITE}/challenges/${id}`,
      // A child that defines `openGraph` replaces the parent's images, so the
      // root card has to be named explicitly.
      images: ['/opengraph-image'],
    },
  }
}

export async function ChallengeBody({ id, searchParams }) {
  // A prize race draws itself for a visitor with no account: the money, the
  // count, the clock, the board and the winner.
  const code = cleanCode((await searchParams)?.r)
  const [race, inviter] = await Promise.all([getSharePage('challenge', id), code ? getReferralInviter(code) : null])
  if (race?.type === 'prize_race') return <SharedPrizeRace race={race} inviter={inviter} code={inviter ? code : null} />
  return <DeepLinkLanding type="challenges" id={id} code={inviter ? code : null} inviter={inviter} />
}
