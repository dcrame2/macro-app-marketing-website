import { getReferralInviter } from '@/lib/referralInviter'
import { cleanCode, getSharePage } from '@/lib/sharePage'
import { ShareBeacon } from '@/components/shared/GetApp'
import { MacroCalculator } from '@/components/shared/MacroCalculator'
import { Eyebrow } from '@/components/landing/LandingUI'
import { InviteStrip, numeral } from '@/components/shared/parts'

const SITE = 'https://theinstacal.app'
const TITLE = 'Macro calculator: your calories and protein'
const DESCRIPTION =
  'Six answers and you have your daily calories, protein, carbs and fat. Free, no email, and the same numbers the InstaCal app tracks against.'

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/calculator` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE}/calculator`, images: [{ url: '/api/og/site/calculator', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/api/og/site/calculator'] },
}

/** theinstacal.app/calculator - the link to hand out for "comment PLAN". */
export default async function CalculatorPage({ searchParams }) {
  const code = cleanCode((await searchParams)?.r)
  const [recipes, inviter] = await Promise.all([getSharePage('recipes'), code ? getReferralInviter(code) : null])
  const known = inviter ? code : null
  return (
    <div className="ic-site ic-explore-page">
      {known ? <ShareBeacon code={known} /> : null}
      {inviter ? (
        <div className="ic-wrap ic-invite-strip">
          <InviteStrip inviter={inviter} line="sent you this" />
        </div>
      ) : null}
      <section className="ic-wrap ic-explore-head">
        <Eyebrow>MACRO CALCULATOR</Eyebrow>
        <h1>
          What should you
          <br />
          <em>eat in a day?</em>
        </h1>
        <p>Six answers. Your numbers update as you type. No email.</p>
      </section>
      <section className="ic-wrap ic-explore-block">
        <MacroCalculator numeral={numeral} plates={recipes?.plates ?? []} code={known} />
        <p className="ic-calc-note">
          Mifflin-St Jeor for what you burn at rest, times how active you are, then 20% under to lose fat or 10% over to build. A starting point, not medical advice.
        </p>
      </section>
    </div>
  )
}
