import { getReferralInviter } from '@/lib/referralInviter'
import { cleanCode, getSharePage } from '@/lib/sharePage'
import { ShareBeacon } from '@/components/shared/GetApp'
import { MacroCalculator } from '@/components/shared/MacroCalculator'
import { Footer, InviteStrip, Page, TopBar, numeral } from '@/components/shared/parts'

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
    <Page>
      {known ? <ShareBeacon code={known} /> : null}
      <TopBar code={known} />
      <InviteStrip inviter={inviter} line="sent you this" />
      <main className="flex flex-col gap-[18px] pb-2 pt-5">
        <div className="flex flex-col gap-2 px-4">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#566170]">Macro calculator</span>
          <h1 className="text-[28px] font-extrabold leading-[34px] text-[#10151C]">What should you eat in a day?</h1>
          <p className="text-[15px] leading-[21px] text-[#566170]">
            Six answers. Your numbers update as you type. No email.
          </p>
        </div>
        <MacroCalculator numeral={numeral} plates={recipes?.plates ?? []} code={known} />
        <p className="px-4 text-[13px] leading-[18px] text-[#566170]">
          Mifflin-St Jeor for what you burn at rest, times how active you are, then 20% under to lose fat or 10% over to build. A starting point, not medical advice.
        </p>
      </main>
      <Footer />
    </Page>
  )
}
