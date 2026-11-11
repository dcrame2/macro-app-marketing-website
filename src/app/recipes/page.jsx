import { getReferralInviter } from '@/lib/referralInviter'
import { cleanCode, getSharePage } from '@/lib/sharePage'
import { ShareBeacon } from '@/components/shared/GetApp'
import { PlateGrid } from '@/components/shared/PlateList'
import { CallToAction, Footer, InviteStrip, Page, StickyBar, TopBar } from '@/components/shared/parts'

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
    <Page bar={<StickyBar code={known} title="Save the ones you like" sub="Free on InstaCal" action="Get the app" />}>
      {known ? <ShareBeacon code={known} /> : null}
      <TopBar code={known} />
      <InviteStrip inviter={inviter} line="sent you these recipes" />
      <main className="flex flex-col gap-[18px] pb-2 pt-5">
        <div className="flex flex-col gap-2 px-4">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#566170]">Recipes</span>
          <h1 className="text-[28px] font-extrabold leading-[34px] text-[#10151C]">{TITLE}</h1>
          <p className="text-[15px] leading-[21px] text-[#566170]">
            Cooked and posted by real people. Every one has its ingredients, its method, and the calories and protein already worked out.
          </p>
        </div>
        <nav aria-label="Filter recipes" className="flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((f) => (
            <a
              key={f.key}
              href={href(f.key)}
              aria-current={f.key === active.key ? 'page' : undefined}
              className={`flex h-11 flex-none items-center rounded-full border px-4 text-sm font-bold ${
                f.key === active.key ? 'border-[#10151C] bg-[#10151C] text-white' : 'border-[#DDE3EA] bg-white text-[#10151C]'
              }`}
            >
              {f.label}
            </a>
          ))}
        </nav>
        {plates.length > 0 ? (
          <PlateGrid plates={plates} code={known} by />
        ) : (
          <p className="px-4 py-10 text-center text-[15px] text-[#566170]">
            {page ? 'Nothing under that filter right now.' : 'The recipes could not be loaded. Try again in a minute.'}
          </p>
        )}
        <CallToAction
          code={known}
          head="Save the ones you would make"
          sub="In the app a recipe scales to the servings you are cooking and logs in one tap when you eat it. Free to start."
        />
      </main>
      <Footer />
    </Page>
  )
}
