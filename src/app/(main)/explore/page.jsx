import Link from 'next/link'
import { Eyebrow, StoreLinks } from '@/components/landing/LandingUI'
import { PlateCard, SessionCard, needsFigures } from '@/components/explore/Plates'
import { FigureDefs } from '@/components/shared/SessionArt'
import { getSharePage } from '@/lib/sharePage'

const SITE = 'https://theinstacal.app'
const TITLE = 'Explore what people are really eating'
const DESCRIPTION =
  'Real plates, recipes and workouts from people on InstaCal, each plate with its calories and protein already worked out. No account needed to look around.'

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/explore` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE}/explore` },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

const slot = (name) => (p) => String(p.meal_type ?? '').toLowerCase() === name
const FILTERS = [
  { key: 'all', label: 'All', test: () => true },
  { key: 'recipes', label: 'Recipes', test: (p) => p.recipe_steps > 0 },
  { key: 'protein', label: '40g+ protein', test: (p) => p.protein >= 40 },
  { key: 'light', label: 'Under 500 cal', test: (p) => p.calories > 0 && p.calories < 500 },
  { key: 'breakfast', label: 'Breakfast', test: slot('breakfast') },
  { key: 'lunch', label: 'Lunch', test: slot('lunch') },
  { key: 'dinner', label: 'Dinner', test: slot('dinner') },
]
// Sessions have chips of their own; one of these shows sessions in place of plates.
const SESSION_FILTERS = [
  { key: 'workouts', label: 'Workouts', test: () => true },
  { key: 'routes', label: 'Runs & rides', test: (s) => s.shape?.length >= 4 || Number(s.distance_meters) > 0 },
  { key: 'lifts', label: 'Lifts', test: (s) => s.muscles?.length > 0 || ['Weight Training', 'Crossfit', 'HIIT'].includes(s.activity) },
]

/**
 * Explore on the web (2026-11-16): the app's public plates for someone who
 * does not have the app. One chip narrows it (a plain link, so it works with
 * no script: /explore?f=protein). Everything here is what a signed-out visitor
 * to a public profile could already see. Not in the app's universal-link
 * list, so it always opens as a web page.
 */
export default async function ExplorePage({ searchParams }) {
  const query = await searchParams
  const page = await getSharePage('explore')
  const sessions = page?.sessions ?? []
  const sessionFilter = SESSION_FILTERS.find((f) => f.key === query?.f) ?? null
  const active = sessionFilter ?? FILTERS.find((f) => f.key === query?.f) ?? FILTERS[0]
  const all = page?.plates ?? []
  // A chip only shows when something is under it.
  const filters = [
    ...FILTERS.filter((f) => f.key === 'all' || all.some(f.test)),
    ...SESSION_FILTERS.filter((f) => sessions.some(f.test)),
  ]
  const five = active.key === 'all' ? (page?.five ?? []) : []
  const trained = active.key === 'all' && sessions.length >= 4 ? sessions.slice(0, 5) : []
  const shown = new Set(five.map((p) => p.id))
  const plates = sessionFilter ? [] : all.filter(active.test).filter((p) => !shown.has(p.id))
  const cards = sessionFilter
    ? sessions.filter(sessionFilter.test).map((session, i) => <SessionCard key={session.id} session={session} eager={i < 8} />)
    : plates.map((plate, i) => <PlateCard key={plate.id} plate={plate} eager={i < 8} />)
  if (cards.length > 7) {
    cards.splice(
      7,
      0,
      <div key="join" className="ic-plate ic-plate-join">
        <strong>{sessionFilter ? 'Bring your own training.' : 'Save the ones you would eat.'}</strong>
        <span>
          {sessionFilter
            ? 'InstaCal brings in your runs, rides and lifts from Apple Health, Strava and Garmin, next to what you eat. Free to start.'
            : 'In the app you can save plates, follow the people who post them and log your own from a photo. Free to start.'}
        </span>
        <Link href="/#download" className="ic-nav-download">
          Get InstaCal
        </Link>
      </div>,
    )
  }
  return (
    <div className="ic-site ic-explore-page">
      {needsFigures(sessions) ? <FigureDefs /> : null}
      <section className="ic-wrap ic-explore-head">
        <Eyebrow>EXPLORE</Eyebrow>
        <h1>
          What people are
          <br />
          <em>{sessionFilter ? 'really doing.' : 'really eating.'}</em>
        </h1>
        <p>
          {sessionFilter
            ? 'Public runs, rides and lifts from people on InstaCal, from the last two weeks. A route is drawn as a line, never on a map.'
            : 'Public plates and workouts from people on InstaCal, best looking first. Every plate opens with its ingredients, calories and protein.'}
        </p>
        <nav aria-label="Filter" className="ic-chips">
          {filters.map((f) => (
            <Link
              key={f.key}
              href={f.key === 'all' ? '/explore' : `/explore?f=${f.key}`}
              aria-current={f.key === active.key ? 'page' : undefined}
              className="ic-chip"
            >
              {f.label}
            </Link>
          ))}
        </nav>
      </section>
      {five.length > 0 ? (
        <section className="ic-wrap ic-explore-block" aria-labelledby="ic-explore-five">
          <h2 id="ic-explore-five" className="ic-explore-label">
            Today's best
          </h2>
          <div className="ic-plates ic-plates-row">
            {five.map((plate) => (
              <PlateCard key={plate.id} plate={plate} eager />
            ))}
          </div>
        </section>
      ) : null}
      {trained.length > 0 ? (
        <section className="ic-wrap ic-explore-block" aria-labelledby="ic-explore-trained">
          <h2 id="ic-explore-trained" className="ic-explore-label">
            Training this week
          </h2>
          <div className="ic-plates ic-plates-row">
            {trained.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
          <Link href="/explore?f=workouts" className="ic-text-link ic-plates-more">
            All workouts
          </Link>
        </section>
      ) : null}
      <section className="ic-wrap ic-explore-block" aria-labelledby="ic-explore-all">
        <h2 id="ic-explore-all" className="ic-explore-label">
          {active.key === 'all' ? 'Plates from the last few weeks' : active.label}
        </h2>
        {cards.length > 0 ? (
          <div className="ic-plates">{cards}</div>
        ) : (
          <p className="ic-explore-empty">
            {page ? 'Nothing under that filter right now.' : 'The plates could not be loaded. Try again in a minute.'}
          </p>
        )}
      </section>
      <section className="ic-wrap ic-explore-cta">
        <h2>
          Post your own plate.
          <br />
          <em>The numbers do themselves.</em>
        </h2>
        <p>Snap a photo and InstaCal works out the calories and protein. Free on iOS and Android.</p>
        <StoreLinks light />
      </section>
    </div>
  )
}
