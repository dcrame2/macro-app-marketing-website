import PrizeRaceRules, { metadata as rulesMetadata } from '../prize-race-rules/page'

/**
 * theinstacal.app/rules: the short address the race posts link to (2026-11-23).
 * The same page as /prize-race-rules, which stays for links already out.
 */
export const metadata = { ...rulesMetadata, alternates: { canonical: '/prize-race-rules' } }

export default PrizeRaceRules
