import Link from 'next/link'
import { Eyebrow, Icon, SectionHead } from '@/components/landing/LandingUI'
import { numeral } from '@/components/shared/parts'
import { PlateCard } from './PlateCard'
import { FigureDefs, SessionArt } from '@/components/shared/SessionArt'
import { num, platePath, sized, workoutPath } from '@/lib/sharePage'
import { durationOf, milesOf } from '@/lib/sharePreview'

export { PlateCard } from './PlateCard'

/** Whether any of these sessions draws the figures, so the page writes their paths once. */
export const needsFigures = (sessions) => (sessions ?? []).some((s) => !s.image_url && !s.shape && s.muscles?.length > 0)

/**
 * A public session as the site draws it (2026-11-18): its photo, else its
 * route as a line, else a marked lift's figures; then the one number a person
 * would say (miles, else the time), the rest small, and who did it. A page
 * that draws figures renders `FigureDefs` once.
 */
export function SessionCard({ session, eager = false }) {
  const miles = milesOf(session.distance_meters)
  const time = durationOf(session.duration_seconds)
  const [value, unit] = String(miles ?? time ?? '').split(' ')
  const rest = [miles ? time : null, session.calories ? `${num(session.calories)} kcal` : null].filter(Boolean).join(' · ')
  return (
    <a href={workoutPath(session)} className="ic-plate">
      <span className="ic-plate-photo">
        {session.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={sized(session.image_url, 520, 520)} alt="" loading={eager ? 'eager' : 'lazy'} />
        ) : (
          <SessionArt shape={session.shape} muscles={session.muscles} fit="square" />
        )}
        {session.activity ? <span className="ic-plate-tag">{session.activity}</span> : null}
      </span>
      <span className="ic-plate-body">
        <strong>{session.title}</strong>
        <span className="ic-plate-nums">
          {value ? <b className={numeral}>{value}</b> : null}
          {unit ? <small>{unit.toUpperCase()}</small> : null}
          {rest ? <em>{rest}</em> : null}
        </span>
        {session.author?.username ? (
          <span className="ic-plate-by">
            {session.author.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={sized(session.author.avatar_url, 56, 56)} alt="" loading="lazy" />
            ) : (
              <i aria-hidden="true" />
            )}
            @{session.author.username}
          </span>
        ) : null}
      </span>
    </a>
  )
}

/** One tile of the home page's bento: the picture fills it and the words sit on its foot. */
function BentoTile({ href, big = false, rank = null, tag = null, media, title, value, unit, rest, author }) {
  return (
    <a href={href} className={`ic-bento-tile${big ? ' ic-bento-big' : ''}`}>
      {media}
      {rank ? <span className={`ic-plate-rank ${numeral}`}>{rank}</span> : null}
      {tag ? <span className="ic-bento-tag">{tag}</span> : null}
      <span className="ic-bento-foot">
        <span className="ic-bento-nums">
          {value ? <b className={numeral}>{value}</b> : null}
          {unit ? <small>{unit}</small> : null}
          {rest ? <em>{rest}</em> : null}
        </span>
        <strong>{title}</strong>
        {author?.username ? <span className="ic-bento-by">@{author.username}</span> : null}
      </span>
    </a>
  )
}

const plateTile = (plate, big) => (
  <BentoTile
    key={plate.id}
    href={platePath(plate)}
    big={big}
    rank={plate.rank}
    // eslint-disable-next-line @next/next/no-img-element
    media={<img src={sized(plate.image_url, big ? 900 : 520, big ? 900 : 520)} alt="" />}
    title={plate.title}
    value={num(plate.calories)}
    unit="CAL"
    rest={`${num(plate.protein)}g protein`}
    author={plate.author}
  />
)

const sessionTile = (session, big) => {
  const miles = milesOf(session.distance_meters)
  const time = durationOf(session.duration_seconds)
  const [value, unit] = String(miles ?? time ?? '').split(' ')
  return (
    <BentoTile
      key={session.id}
      href={workoutPath(session)}
      big={big}
      tag={session.activity}
      media={
        session.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={sized(session.image_url, big ? 900 : 520, big ? 900 : 520)} alt="" />
        ) : (
          <SessionArt shape={session.shape} muscles={session.muscles} fit="bento" />
        )
      }
      title={session.title}
      value={value}
      unit={unit ? unit.toUpperCase() : null}
      rest={[miles ? time : null, session.calories ? `${num(session.calories)} kcal` : null].filter(Boolean).join(' · ')}
      author={session.author}
    />
  )
}

/**
 * Five sessions for the bento, mixed: a route (or a photo) leads, and lifts
 * and routes take turns after it, so the row is never three figures in a line.
 */
const mixSessions = (sessions) => {
  const isLift = (s) => !s.image_url && !s.shape
  const lifts = sessions.filter(isLift)
  const rest = sessions.filter((s) => !isLift(s))
  const out = []
  while (out.length < 5 && (lifts.length || rest.length)) {
    const from = out.length % 2 === 0 ? (rest.length ? rest : lifts) : lifts.length ? lifts : rest
    out.push(from.shift())
  }
  return out
}

/**
 * The home page's "today" module (2026-11-18): food and fitness as two
 * halves of one section. Each half is one big tile and four small ones, the
 * picture filling the tile and the words on its foot, mirrored so the page
 * does not read as two shelves of the same card. Draws nothing without the
 * plates; the fitness half needs five sessions with a picture.
 */
export function TodayFive({ five, pool, sessions = [] }) {
  if (!five?.length) return null
  const trained = mixSessions(sessions ?? [])
  const fitness = trained.length >= 5
  return (
    <section id="today" className="ic-today ic-section" aria-labelledby="ic-today-title">
      <div className="ic-wrap">
        <div className="ic-section-head">
          <div>
            <Eyebrow>TODAY ON INSTACAL</Eyebrow>
            <h2 id="ic-today-title">
              What people ate.
              <br />
              <em>How they trained.</em>
            </h2>
          </div>
          <p className="ic-section-description">
            Real plates and real sessions from people in the app, {pool >= 10 ? `picked from ${pool} public plates today` : 'picked fresh every evening'}.
            Every plate has its calories and protein worked out; every run and lift has its numbers.
          </p>
        </div>

        <div className="ic-bento-head">
          <h3>
            <span>Food</span> The {five.length === 5 ? 'five ' : ''}best plates today
          </h3>
          <Link href="/explore" className="ic-text-link">
            All plates <Icon name="arrow" />
          </Link>
        </div>
        <div className={`ic-bento${five.length < 5 ? ' ic-bento-flat' : ''}`}>{five.map((plate, i) => plateTile(plate, i === 0 && five.length === 5))}</div>

        {fitness ? (
          <>
            {needsFigures(trained) ? <FigureDefs /> : null}
            <div className="ic-bento-head">
              <h3>
                <span>Fitness</span> How they trained this week
              </h3>
              <Link href="/explore?f=workouts" className="ic-text-link">
                All workouts <Icon name="arrow" />
              </Link>
            </div>
            <div className="ic-bento ic-bento-mirror">{trained.map((session, i) => sessionTile(session, i === 0))}</div>
          </>
        ) : null}
      </div>
    </section>
  )
}

/** The home page's recipes strip: four of the community's, linked to the hub. */
export function HomeRecipes({ plates }) {
  if (!plates || plates.length < 4) return null
  return (
    <section id="recipes" className="ic-home-recipes ic-section" aria-labelledby="ic-recipes-title">
      <div className="ic-wrap">
        <SectionHead
          eyebrow="RECIPES FROM THE APP"
          description="Posted by the people who cooked them: the ingredients, the method, and the numbers for a serving."
        >
          <span id="ic-recipes-title">
            Cook what people
            <br />
            <em>actually made.</em>
          </span>
        </SectionHead>
        <div className="ic-plates">
          {plates.slice(0, 4).map((plate) => (
            <PlateCard key={plate.id} plate={plate} />
          ))}
        </div>
        <Link href="/recipes" className="ic-text-link ic-plates-more">
          All recipes <Icon name="arrow" />
        </Link>
      </div>
    </section>
  )
}
