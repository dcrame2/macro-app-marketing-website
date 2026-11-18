import { getReferralInviter } from '@/lib/referralInviter'
import { cleanCode, getSharePage } from '@/lib/sharePage'
import { ShareBeacon } from '@/components/shared/GetApp'
import Link from 'next/link'
import { Eyebrow, StoreLinks } from '@/components/landing/LandingUI'
import { PlateCard } from '@/components/explore/PlateCard'
import { InviteStrip, StickyBar } from '@/components/shared/parts'

const SITE = 'https://theinstacal.app'
const TITLE = 'Recipes with the macros done'
const DESCRIPTION =
  'Real recipes from people on InstaCal: the ingredients, the method, and the calories and protein already worked out.'

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/recipes` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE}/recipes`, images: [{ url: '/api/og/site/recipes', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/api/og/site/recipes'] },
}

const FILTERS = [
  { key: 'all', label: 'All', test: () => true },
  { key: 'protein', label: '40g+ protein', test: (p) => p.protein >= 40 },
  { key: 'light', label: 'Under 500 cal', test: (p) => p.calories < 500 },
  { key: 'quick', label: 'Under 20 min', test: (p) => p.minutes && p.minutes <= 20 },
]

/**
 * The recipes hub (2026-11-10): every public recipe with its own photo,
 * best-looking first, narrowed by one chip (a plain link, so it works with no
 * script: /recipes?f=protein). One link to hand out for "comment RECIPES".
 */
export default async function RecipesPage({ searchParams }) {
  const query = await searchParams
  const code = cleanCode(query?.r)
  const [page, inviter] = await Promise.all([getSharePage('recipes'), code ? getReferralInviter(code) : null])
  const active = FILTERS.find((f) => f.key === query?.f) ?? FILTERS[0]
  const plates = (page?.plates ?? []).filter(active.test)
  const known = inviter ? code : null
  const href = (key) => {
    const params = new URLSearchParams()
    if (key !== 'all') params.set('f', key)
    if (known) params.set('r', known)
    const text = params.toString()
    return text ? `/recipes?${text}` : '/recipes'
  }
  return (
    <div className="ic-site ic-explore-page">
      {known ? <ShareBeacon code={known} /> : null}
      {inviter ? (
        <div className="ic-wrap ic-invite-strip">
          <InviteStrip inviter={inviter} line="sent you these recipes" />
        </div>
      ) : null}
      <section className="ic-wrap ic-explore-head">
        <Eyebrow>RECIPES</Eyebrow>
        <h1>
          Recipes with the
          <br />
          <em>macros done.</em>
        </h1>
        <p>
          Cooked and posted by real people. Every one has its ingredients, its method, and the calories and protein already worked out.
        </p>
        <nav aria-label="Filter recipes" className="ic-chips">
          {FILTERS.filter((f) => f.key === 'all' || (page?.plates ?? []).some(f.test)).map((f) => (
            <Link key={f.key} href={href(f.key)} aria-current={f.key === active.key ? 'page' : undefined} className="ic-chip">
              {f.label}
            </Link>
          ))}
        </nav>
      </section>
      <section className="ic-wrap ic-explore-block" aria-labelledby="ic-recipes-all">
        <h2 id="ic-recipes-all" className="ic-explore-label">
          {active.key === 'all' ? 'Best looking first' : active.label}
        </h2>
        {plates.length > 0 ? (
          <div className="ic-plates">
            {plates.map((plate, i) => (
              <PlateCard key={plate.id} plate={plate} code={known} eager={i < 8} />
            ))}
          </div>
        ) : (
          <p className="ic-explore-empty">
            {page ? 'Nothing under that filter right now.' : 'The recipes could not be loaded. Try again in a minute.'}
          </p>
        )}
      </section>
      <section className="ic-wrap ic-explore-cta">
        <h2>
          Save the ones
          <br />
          <em>you would make.</em>
        </h2>
        <p>In the app a recipe scales to the servings you are cooking and logs in one tap when you eat it. Free to start.</p>
        <StoreLinks light />
      </section>
      {known ? <StickyBar code={known} title="Save the ones you like" sub="Free on InstaCal" action="Get the app" /> : null}
    </div>
  )
}
