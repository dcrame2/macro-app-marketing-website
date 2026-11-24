import { ChallengeBody, challengeMetadata } from '@/components/shared/challengePage'

/**
 * The landing page for a shared challenge link. Only PUBLIC challenges are
 * shared from the app. The path must stay plural: it mirrors the app's own
 * route and is what the AASA file and the Android intentFilters claim, so it
 * opens the app when installed. A prize race is shared at /race/<id> instead,
 * which always opens here (see components/shared/challengePage.jsx).
 */
export async function generateMetadata({ params }) {
  const { id } = await params
  return challengeMetadata(id)
}

export default async function ChallengePage({ params, searchParams }) {
  const { id } = await params
  return <ChallengeBody id={id} searchParams={searchParams} />
}
