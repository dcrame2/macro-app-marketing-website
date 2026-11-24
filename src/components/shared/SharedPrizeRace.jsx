import { sized } from '@/lib/sharePage'
import { Avatar, CallToAction, Card, Eyebrow, Footer, InviteStrip, Page, StickyBar, numeral } from './parts'
import { RaceCountdown, RaceInstant } from './RaceClock'
import { ShareBeacon } from './GetApp'

const GOLD = '#F5B93A'

const money = (cents) => (cents % 100 === 0 ? `$${(cents / 100).toLocaleString('en-US')}` : `$${(cents / 100).toFixed(2)}`)
const miles = (meters) => {
  const v = (Number(meters) || 0) / 1609.344
  return Math.abs(v - Math.round(v)) < 0.05 ? String(Math.round(v)) : v.toFixed(1)
}
const clock = (seconds) => {
  const total = Math.max(0, Math.round(Number(seconds) || 0))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`
}
const pace = (meters, seconds) => {
  const mi = (Number(meters) || 0) / 1609.344
  if (mi < 0.1 || !seconds) return null
  const per = Math.round(seconds / mi)
  return `${Math.floor(per / 60)}:${String(per % 60).padStart(2, '0')} /mi`
}
const PEOPLE = { Run: 'runners', Ride: 'riders', Walk: 'walkers' }
const VERB = { Run: 'Run', Ride: 'Ride', Walk: 'Walk' }
const PLURAL = { Run: 'runs', Ride: 'rides', Walk: 'walks' }

/*
 * The kinds of race (2026-11-24): a set distance against the clock (fastest,
 * first), the open-ended ones a watch scores (most distance, most days moved,
 * the biggest climb) and two judged from photos (best plate, best week of
 * plates). KEEP IN STEP with the app's `lib/prize/prizeRace.ts`.
 */
const timed = (race) => race.win_rule === 'fastest' || race.win_rule === 'first'
const judged = (race) => race.win_rule === 'plate' || race.win_rule === 'week'
const feet = (meters) => Math.round((Number(meters) || 0) * 3.28084).toLocaleString('en-US')
const oneDecimal = (meters) => ((Number(meters) || 0) / 1609.344).toFixed(1)

/** Under the money: "to the fastest 20 miles", "for the best plate". */
export const raceHeadline = (race) => {
  switch (race.win_rule) {
    case 'first':
      return `to the first to ${miles(race.distance_meters)} miles`
    case 'most':
      return `for the most miles in ${race.window_days} days`
    case 'days':
      return 'for the most days moved'
    case 'climb':
      return 'for the biggest climb'
    case 'plate':
      return 'for the best plate'
    case 'week':
      return 'for the best week of plates'
    default:
      return `to the fastest ${miles(race.distance_meters)} miles`
  }
}

const peopleOf = (race) => (timed(race) || race.win_rule === 'most' ? (PEOPLE[race.sport] ?? 'runners') : 'people')

/** What a row of the board shows at its end, and how far along its bar is. */
const rowValue = (row, race) => (race.win_rule === 'days' ? Number(row.days) || 0 : race.win_rule === 'climb' ? Number(row.climb) || 0 : Number(row.meters) || 0)
const rowFigure = (row, race) => {
  if (timed(race)) return clock(row.seconds)
  if (race.win_rule === 'days') return `${row.days ?? 0} ${row.days === 1 ? 'day' : 'days'}`
  if (race.win_rule === 'climb') return `${feet(row.climb)} ft`
  return `${oneDecimal(row.meters)} mi`
}

/** What the winner did. */
const winnerDid = (race) => {
  const w = race.winner
  if (!w) return ''
  if (timed(race)) return `${miles(race.distance_meters)} miles in ${clock(w.seconds)}`
  if (race.win_rule === 'most') return `${oneDecimal(w.score)} miles`
  if (race.win_rule === 'days') return `${w.score ?? 0} days moved`
  if (race.win_rule === 'climb') return `${feet(w.score)} ft climbed`
  return race.places?.[0]?.meal_name ?? "the judges' pick"
}

/** What the race is called in a title and a link preview. */
export const prizeRaceTitle = (race) => `${money(race.prize_cents)} ${raceHeadline(race)} · ${race.title}`

export const prizeRaceDescription = (race) => {
  const people = peopleOf(race)
  if (race.state === 'final' && race.winner) return `${race.winner.name} won: ${winnerDid(race)}. See it on InstaCal.`
  if (race.state === 'gathering')
    return `${race.runners} of ${race.min_runners} ${people} are in. The race starts when it is full. Free to enter on InstaCal.`
  if (race.state === 'live') return `${race.runners} ${people} are racing right now. Free to enter on InstaCal.`
  return `${race.runners} ${people} are in. Free to enter on InstaCal.`
}

function Step({ n, title, body }) {
  return (
    <div className="flex gap-3">
      <span aria-hidden="true" className={`${numeral} flex h-[28px] w-[28px] flex-none items-center justify-center rounded-full bg-[#F5B93A]/15 text-sm text-[#F5B93A]`}>
        {n}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[15px] font-bold leading-5 text-[#F8FAFC]">{title}</span>
        <span className="text-[13px] leading-[19px] text-[#9CA8BB]">{body}</span>
      </span>
    </div>
  )
}

/**
 * A prize race, for someone with no account (2026-11-20): the money and what
 * wins it, how many are in, when it starts, the board while it runs and the
 * winner after. First names only. The one button is the store; the app is
 * where anyone joins.
 */
export function SharedPrizeRace({ race, inviter, code }) {
  const people = peopleOf(race)
  const isTimed = timed(race)
  const isJudged = judged(race)
  const dist = `${miles(race.distance_meters)} miles`
  const lead = (race.board ?? []).reduce((m, row) => Math.max(m, rowValue(row, race)), 0)
  const places = race.places ?? []
  // The door: joining may close when it fills or when it starts.
  const canJoin = race.open ?? true
  const prize = money(race.prize_cents)
  const toGo = Math.max(0, race.min_runners - race.runners)
  const pct = Math.min(100, (race.runners / Math.max(1, race.min_runners)) * 100)
  const board = race.board ?? []
  const open = (race.state === 'gathering' || race.state === 'set' || race.state === 'live') && canJoin

  return (
    <Page
      bar={
        <StickyBar
          type="challenges"
          id={race.id}
          code={code}
          title={open ? `${isJudged ? 'Enter' : 'Race'} for ${prize}` : race.title}
          sub={open ? 'Free to enter on InstaCal' : 'A new prize race most months'}
          action={open ? 'Join the race' : 'Get the app'}
        />
      }
    >
      <InviteStrip inviter={inviter} line="wants you in this race" />
      {/* The invite code, kept for the app after an App Store install (iPhone has no store referrer; Android's
          store link carries it). Code only: the install link has no challenge target yet. */}
      {code ? <ShareBeacon code={code} /> : null}

      <header
        className="relative flex min-h-[300px] flex-col justify-end overflow-hidden px-5 pb-7 pt-16 lg:mt-6 lg:rounded-[28px]"
        style={{ background: 'radial-gradient(120% 90% at 85% 0%, #3B2A05 0%, #0D1620 55%, #070B10 100%)' }}
      >
        {race.image_url ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sized(race.image_url, 1120, 700)} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90" />
          </>
        ) : null}
        <div className="relative flex flex-col">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.14em]" style={{ color: GOLD }}>
            Team InstaCal · {race.title}
          </span>
          <h1 className="flex flex-col">
            <span className={`${numeral} text-[104px] leading-[112px]`} style={{ color: GOLD }}>
              {prize}
            </span>
            <span className={`${numeral} text-[26px] uppercase leading-[34px] tracking-[0.02em] text-white`}>
              {raceHeadline(race)}
            </span>
          </h1>
          {/* One row on a phone: short words, no wrapping. */}
          <div className="mt-3 flex flex-nowrap gap-1.5 whitespace-nowrap text-xs font-bold text-white">
            <span className="rounded-full bg-white/15 px-2.5 py-1.5">
              {isJudged ? 'Judged' : isTimed || race.win_rule === 'most' ? `${VERB[race.sport]}s only` : race.win_rule === 'days' ? 'Any sport' : 'Any climb'}
            </span>
            {isJudged ? (
              <span className="rounded-full bg-white/15 px-2.5 py-1.5">In-app camera</span>
            ) : race.tracked_only ? (
              <span className="rounded-full bg-white/15 px-2.5 py-1.5">{isTimed || race.win_rule === 'most' ? 'GPS tracked' : 'Tracked'}</span>
            ) : null}
            <span className="rounded-full bg-white/15 px-2.5 py-1.5">{race.window_days} days</span>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-[22px] pb-2 pt-5">
        {race.blurb ? <p className="px-4 text-[15px] leading-[21px] text-[#9CA8BB]">{race.blurb}</p> : null}

        {race.state === 'final' && race.winner ? (
          <Card className="items-center gap-2 !border-[#F5B93A]/40 !py-6 text-center">
            {isJudged && places[0]?.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={sized(places[0].image_url, 640, 640)} alt={places[0].meal_name ?? 'The winning plate'} className="mb-2 h-[240px] w-[240px] rounded-[24px] border-[3px] object-cover" style={{ borderColor: GOLD }} />
            ) : null}
            <span className="rounded-full p-[3px]" style={{ background: GOLD }}>
              <Avatar url={race.winner.avatar_url} name={race.winner.name} size={isJudged ? 56 : 88} />
            </span>
            <p className={`${numeral} mt-1 text-[30px] uppercase leading-[38px] text-[#F8FAFC]`}>
              {race.winner.name} won <span style={{ color: GOLD }}>{prize}</span>
            </p>
            {isTimed ? (
              <p className="text-[15px] text-[#F8FAFC]">
                {dist} in <strong>{clock(race.winner.seconds)}</strong>
                {pace(race.distance_meters, race.winner.seconds) ? ` · ${pace(race.distance_meters, race.winner.seconds)}` : ''} · {race.winner.runs}{' '}
                {race.winner.runs === 1 ? PLURAL[race.sport].slice(0, -1) : PLURAL[race.sport]}
              </p>
            ) : (
              <p className="text-[15px] text-[#F8FAFC]">{winnerDid(race)}</p>
            )}
            <p className="text-[13px] text-[#9CA8BB]">
              {isJudged ? 'Picked by Team InstaCal.' : race.changed ? 'Result corrected after a second review.' : 'Checked by Team InstaCal.'}
            </p>
            {places
              .filter((x) => x.place > 1)
              .map((x) => (
                <p key={x.place} className="text-[14px] text-[#F8FAFC]">
                  <strong>{x.place === 2 ? '2nd' : '3rd'}</strong> · {x.name}
                  {x.meal_name ? ` · ${x.meal_name}` : ''}
                  {x.cents ? ` · ${money(x.cents)}` : ''}
                </p>
              ))}
          </Card>
        ) : null}

        {race.state === 'review' ? (
          <Card className="gap-1.5 !border-[#F5B93A]/40">
            <span className="text-xs font-extrabold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
              The race is over
            </span>
            <p className="text-lg font-extrabold leading-6 text-[#F8FAFC]">{isJudged ? 'The plates are being judged.' : 'The top results are being checked.'}</p>
            <p className="text-[14px] leading-5 text-[#9CA8BB]">
              {isJudged ? 'The 20 best-looking go to the judges. The winner is named here.' : 'The winner is named here once Team InstaCal has confirmed it. The board below is not final.'}
            </p>
          </Card>
        ) : null}

        {race.state === 'set' ? (
          <Card className="gap-1 !border-[#F5B93A]/40">
            <span className="text-xs font-extrabold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
              {isJudged ? 'It has a start time' : 'The gun is set'}
            </span>
            <p className={`${numeral} text-[40px] leading-[48px] text-[#F8FAFC]`}>
              Starts in <RaceCountdown to={race.gun_at} />
            </p>
            <p className="text-[14px] leading-5 text-[#9CA8BB]">
              <RaceInstant at={race.gun_at} />, the same instant for everyone. {race.join_closes === 'gun' ? 'Joining has closed.' : race.join_closes === 'start' ? 'You can join until it starts.' : 'You can still join.'}
            </p>
          </Card>
        ) : null}

        {race.state === 'gathering' || race.state === 'set' || race.state === 'live' ? (
          <Card className="gap-3">
            <div className="flex items-end gap-2">
              <span className={`${numeral} text-[46px] leading-[50px] text-[#F8FAFC]`}>{race.runners.toLocaleString('en-US')}</span>
              <span className={`${numeral} flex-1 pb-1.5 text-xl text-[#9CA8BB]`}>
                {race.state === 'gathering' ? `of ${race.min_runners.toLocaleString('en-US')} ${people}` : race.state === 'live' ? `${people} ${isJudged ? 'in it' : 'racing'}` : `${people} in`}
              </span>
              <span className="flex pb-2">
                {(race.faces ?? []).slice(0, 5).map((face, index) => (
                  <span key={index} className={`rounded-full border-2 border-[#0B1220] ${index === 0 ? '' : '-ml-2'}`}>
                    <Avatar url={face.avatar_url} name={face.name} size={28} />
                  </span>
                ))}
              </span>
            </div>
            {race.state === 'gathering' ? (
              <>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/10" role="img" aria-label={`${race.runners} of ${race.min_runners} ${people}`}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: GOLD }} />
                </div>
                <p className="text-[14px] leading-5 text-[#9CA8BB]">
                  {toGo.toLocaleString('en-US')} more and it starts. Everyone in gets a push the moment it fills, and it starts {race.notice_hours} hours later.
                </p>
              </>
            ) : race.state === 'live' ? (
              <p className="text-[14px] leading-5 text-[#9CA8BB]">
                <RaceCountdown to={race.ends_at} /> left.{' '}
                {isJudged ? `${(race.entries ?? 0).toLocaleString('en-US')} plates in so far.` : isTimed ? `${race.finished} finished so far.` : `${race.finished} on the board.`}{' '}
                {canJoin ? 'You can still join.' : 'Joining has closed, but you can watch.'}
              </p>
            ) : null}
          </Card>
        ) : null}

        {open ? (
          <section className="flex flex-col gap-2.5">
            <Eyebrow>How it works</Eyebrow>
            <Card className="gap-3.5">
              <Step
                n={1}
                title="Join free"
                body={
                  isJudged
                    ? race.adults_us_only
                      ? 'Anyone 18 or older in the US. No purchase needed.'
                      : 'No purchase needed.'
                    : race.adults_us_only
                      ? 'Anyone 18 or older in the US with Apple Health, Health Connect or Strava connected. No purchase needed.'
                      : 'Connect Apple Health, Health Connect or Strava. No purchase needed.'
                }
              />
              <Step
                n={2}
                title={race.state === 'gathering' ? `Wait for ${race.min_runners.toLocaleString('en-US')}` : 'Wait for the start'}
                body={race.state === 'gathering' ? `Everyone gets ${race.notice_hours} hours of notice before the start.` : 'Everyone starts at the same instant.'}
              />
              <Step
                n={3}
                title={
                  isTimed
                    ? `${VERB[race.sport]} ${dist} in ${race.window_days} days`
                    : race.win_rule === 'most'
                      ? `${VERB[race.sport]} the most miles in ${race.window_days} days`
                      : race.win_rule === 'days'
                        ? `Move on the most days out of ${race.window_days}`
                        : race.win_rule === 'climb'
                          ? `Climb the most in ${race.window_days} days`
                          : race.win_rule === 'plate'
                            ? 'Shoot your best plate'
                            : `Shoot your meals for ${race.window_days} days`
                }
                body={
                  race.win_rule === 'first'
                    ? `The first to cover it wins ${prize}.`
                    : race.win_rule === 'fastest'
                      ? `Any number of ${PLURAL[race.sport]}, recorded by a watch or phone. The lowest total moving time wins ${prize}.`
                      : race.win_rule === 'most'
                        ? `Recorded by a watch or phone. The most distance wins ${prize}.`
                        : race.win_rule === 'days'
                          ? `A day counts with a tracked half hour of any sport, lifting too. The most days wins ${prize}.`
                          : race.win_rule === 'climb'
                            ? `Runs, rides and hikes with elevation. The most feet climbed wins ${prize}.`
                            : race.win_rule === 'plate'
                              ? `One plate each, taken with the InstaCal camera. Team InstaCal picks from the 20 best-looking. The winner gets ${prize}.`
                              : `Taken with the InstaCal camera. Team InstaCal picks from the 20 best weeks. The winner gets ${prize}.`
                }
              />
            </Card>
          </section>
        ) : null}

        {board.length > 0 ? (
          <section className="flex flex-col gap-2.5">
            <Eyebrow>{race.state === 'final' ? 'The final board' : isTimed ? `The board · ${race.finished} finished` : 'The board'}</Eyebrow>
            <Card className="!py-1.5">
              {board.map((row, index) => (
                <div key={index} className={`flex items-center gap-3 py-2.5 ${index < board.length - 1 ? 'border-b border-white/10' : ''}`}>
                  <span className={`${numeral} w-5 text-[15px]`} style={{ color: row.rank === 1 && row.finished ? GOLD : '#9CA8BB' }}>
                    {row.rank}
                  </span>
                  <Avatar url={row.avatar_url} name={row.name} size={30} />
                  <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className="flex items-baseline gap-2">
                      <span className="flex-1 truncate text-sm font-bold text-[#F8FAFC]">{row.name}</span>
                      {isTimed ? <span className="text-xs text-[#9CA8BB]">{miles(Math.min(row.meters, race.distance_meters))} mi</span> : null}
                    </span>
                    <span className="h-[5px] overflow-hidden rounded-full bg-white/10">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          width: `${Math.min(100, isTimed ? (row.meters / race.distance_meters) * 100 : lead > 0 ? (rowValue(row, race) / lead) * 100 : 0)}%`,
                          background: (isTimed ? row.finished : row.rank === 1) ? GOLD : '#1A8EE6',
                        }}
                      />
                    </span>
                  </span>
                  <span className={`${numeral} w-[72px] text-right text-[15px] ${row.finished ? 'text-[#F8FAFC]' : 'text-[#9CA8BB]'}`}>{rowFigure(row, race)}</span>
                </div>
              ))}
            </Card>
            <p className="px-4 text-[13px] leading-[18px] text-[#9CA8BB]">
              {race.win_rule === 'first'
                ? 'Finishers rank by when they crossed the line. Everyone else by how far they have gone.'
                : race.win_rule === 'fastest'
                  ? 'Finishers rank by their time. Everyone else by how far they have gone.'
                  : race.win_rule === 'days'
                    ? 'Ranked by days with a tracked half hour or more.'
                    : race.win_rule === 'climb'
                      ? 'Ranked by feet climbed.'
                      : 'Ranked by distance.'}
            </p>
          </section>
        ) : null}

        <CallToAction
          head={open ? `Get in for ${prize}.` : 'The next race starts on InstaCal.'}
          sub={
            open
              ? isJudged
                ? 'Join in the app, then shoot your plate with the InstaCal camera once it opens. Photos from your library cannot enter.'
                : 'Join in the app, connect Apple Health, Health Connect or Strava, and what you do counts by itself. Anything typed in by hand never counts.'
              : 'This was not the last one: there is a new prize race most months. Free on iPhone and Android.'
          }
          type="challenges"
          id={race.id}
          code={code}
        />

        <p className="px-4 text-[13px] leading-[19px] text-[#9CA8BB]">
          Questions? Message Team InstaCal in the app, or email{' '}
          <a className="font-semibold text-[#44BAFF]" href="mailto:support@theinstacal.app">
            support@theinstacal.app
          </a>
          .
        </p>

        <p className="px-4 text-xs leading-[18px] text-[#9CA8BB]">
          {prize} is paid by Team InstaCal{race.paid_via ? ` (${race.paid_via})` : ''}, outside the app. Apple and Google are not sponsors of this race and have nothing to do
          with it.{' '}
          {race.rules_url ? (
            <a className="font-semibold text-[#44BAFF]" href={race.rules_url}>
              Official rules
            </a>
          ) : null}
        </p>
      </main>
      <Footer />
    </Page>
  )
}
