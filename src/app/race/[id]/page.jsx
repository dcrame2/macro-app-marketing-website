import { ChallengeBody, challengeMetadata } from '@/components/shared/challengePage'

/**
 * A prize race's web page at an address the app does not claim, so the link
 * opens in the browser even with the app installed; the page opens the app
 * from there. NOT in the AASA file or the Android intentFilters, on purpose.
 */
export async function generateMetadata({ params }) {
  const { id } = await params
  return challengeMetadata(id)
}

export default async function RacePage({ params, searchParams }) {
  const { id } = await params
  return <ChallengeBody id={id} searchParams={searchParams} />
}
