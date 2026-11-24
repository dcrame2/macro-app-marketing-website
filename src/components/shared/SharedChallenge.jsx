import { sized } from '@/lib/sharePage'
import { Avatar, CallToAction, Card, Eyebrow, Footer, InviteStrip, Page, StickyBar, numeral } from './parts'
import { ShareBeacon } from './GetApp'

/*
 * A public challenge that is not a prize race, for someone with no account
 * (2026-11-24; the user: "ensure the web page looks good for any challenge"):
 * a monthly or weekly drop from Team InstaCal, a drop a member made, or an
 * open bet. What it is, when it runs, who is in and the top ten. First names
 * only; the server sends a face only for a public profile. Until this page a
 * shared drop landed on a logo and "Open in App".
 */

// The app's drop posters (models/Challenge.ts DROP_ART): KEEP IN STEP.
const ART = {
  the_burn: ['#5B0E1F', '#FF4D6D'],
  every_day: ['#0B2A4A', '#1A8EE6'],
  fifty_miles: ['#10331F', '#22C55E'],
  protein_season: ['#3B1F5E', '#A855F7'],
  thousand_minutes: ['#4A2A0B', '#F59E0B'],
  on_foot: ['#0F3A3A', '#14B8A6'],
  seven_for_seven: ['#0B2A4A', '#60A5FA'],
}
const BY_METRIC = {
  distance_run: ART.fifty_miles,
  distance_ride: ART.fifty_miles,
  distance_swim: ART.on_foot,
  distance_foot: ART.on_foot,
  calories_burned: ART.the_burn,
  active_minutes: ART.thousand_minutes,
  workouts: ART.thousand_minutes,
  logged_days: ART.every_day,
  protein_days: ART.protein_season,
}

/** What is counted, in a sentence and as a short unit. */
const COUNTS = {
  distance_run: { what: 'Miles you run', unit: 'mi', decimals: 1 },
  distance_ride: { what: 'Miles you ride', unit: 'mi', decimals: 1 },
  distance_swim: { what: 'Yards you swim', unit: 'yd', decimals: 0 },
  distance_foot: { what: 'Miles on foot: runs, walks and hikes', unit: 'mi', decimals: 1 },
  calories_burned: { what: 'Calories you burn in workouts', unit: 'kcal', decimals: 0 },
  active_minutes: { what: 'Minutes you spend training', unit: 'min', decimals: 0 },
  workouts: { what: 'Workouts you log', unit: 'workouts', decimals: 0 },
  logged_days: { what: 'Days you log a meal', unit: 'days', decimals: 0 },
  protein_days: { what: 'Days you hit your protein goal', unit: 'days', decimals: 0 },
}

const day = (iso) => new Date(`${String(iso).slice(0, 10)}T12:00:00Z`)
const dateText = (iso) => day(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
const amount = (value, decimals) =>
  decimals > 0 && Number(value) < 100 ? Number(value).toFixed(decimals).replace(/\.0$/, '') : Math.round(Number(value)).toLocaleString('en-US')

/** Where the challenge stands today, in a few words. */
const when = (c) => {
  const today = new Date()
  const start = day(c.starts_on)
  const end = day(c.ends_on)
  const days = (a, b) => Math.ceil((a.getTime() - b.getTime()) / 86400000)
  if (c.status === 'completed' || end < today) return { chip: 'Finished', line: `Ran ${dateText(c.starts_on)} to ${dateText(c.ends_on)}`, open: false }
  if (start > today) {
    const n = Math.max(1, days(start, today))
    return { chip: `Starts in ${n} ${n === 1 ? 'day' : 'days'}`, line: `${dateText(c.starts_on)} to ${dateText(c.ends_on)}`, open: true }
  }
  const left = Math.max(0, days(end, today))
  return { chip: left <= 1 ? 'Last day' : `${left} days left`, line: `${dateText(c.starts_on)} to ${dateText(c.ends_on)}`, open: true }
}

export const challengeTitle = (c) => {
  const k = COUNTS[c.target_metric]
  if (c.format === 'target' && c.target_value && k) return `${c.title}: ${amount(c.target_value, k.decimals)} ${c.target_unit ?? k.unit} · a challenge on InstaCal`
  return `${c.title} · a challenge on InstaCal`
}

export const challengeDescription = (c) => {
  const w = when(c)
  const people = `${c.participants.toLocaleString('en-US')} ${c.participants === 1 ? 'person is' : 'people are'} in`
  return w.open ? `${people}. ${w.chip}. Free to join on InstaCal.` : `${w.line}. See how it finished on InstaCal.`
}

function Step({ n, title, body, color }) {
  return (
    <div className="flex gap-3">
      <span aria-hidden="true" className={`${numeral} flex h-[28px] w-[28px] flex-none items-center justify-center rounded-full bg-white/10 text-sm`} style={{ color }}>
        {n}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[15px] font-bold leading-5 text-[#F8FAFC]">{title}</span>
        <span className="text-[13px] leading-[19px] text-[#9CA8BB]">{body}</span>
      </span>
    </div>
  )
}

export function SharedChallenge({ challenge: c, inviter, code }) {
  const [from, to] = ART[c.art_key] ?? BY_METRIC[c.target_metric] ?? ART.every_day
  const k = COUNTS[c.target_metric] ?? { what: 'What you log', unit: c.target_unit ?? '', decimals: 0 }
  const unit = c.target_unit ?? k.unit
  const w = when(c)
  const target = c.format === 'target' && c.target_value
  const bet = c.format === 'race'
  const board = c.board ?? []
  const lead = board.reduce((m, row) => Math.max(m, Number(row.value) || 0), 0)
  const scale = target ? Number(c.target_value) : lead
  const big = target ? (Number(c.target_value) >= 1000 ? `${Math.round(Number(c.target_value) / 1000)}K` : amount(c.target_value, 0)) : null
  const kind = c.is_official ? 'Team InstaCal' : bet ? `An open bet from ${c.host}` : `From ${c.host}`

  return (
    <Page
      bar={
        <StickyBar
          type="challenges"
          id={c.id}
          code={code}
          title={c.title}
          sub={w.open ? 'Free to join on InstaCal' : 'More challenges on InstaCal'}
          action={w.open ? 'Join the challenge' : 'Get the app'}
        />
      }
    >
      <InviteStrip inviter={inviter} line="wants you in this challenge" />
      {code ? <ShareBeacon code={code} /> : null}

      <header className="relative flex min-h-[300px] flex-col justify-end overflow-hidden px-5 pb-7 pt-16 lg:mt-6 lg:rounded-[28px]" style={{ background: `linear-gradient(150deg, ${from} 0%, ${to} 130%)` }}>
        {c.image_url ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sized(c.image_url, 1120, 700)} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90" />
          </>
        ) : null}
        <div className="relative flex flex-col">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/85">
            {kind}
            {c.sponsor_name ? ` · with ${c.sponsor_name}` : ''}
          </span>
          <h1 className="flex flex-col">
            {big ? (
              <span className={`${numeral} text-[104px] leading-[112px] text-white`}>
                {big}
                <span className="ml-2 text-[30px] uppercase text-white/85">{unit}</span>
              </span>
            ) : null}
            <span className={`${numeral} ${big ? 'text-[26px] leading-[34px]' : 'text-[44px] leading-[52px]'} uppercase tracking-[0.02em] text-white`}>{c.title}</span>
          </h1>
          <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-bold text-white">
            <span className="rounded-full bg-white/20 px-2.5 py-1.5">{w.chip}</span>
            <span className="rounded-full bg-white/20 px-2.5 py-1.5">{w.line}</span>
            {c.stake ? <span className="rounded-full bg-white/20 px-2.5 py-1.5">{c.stake}</span> : null}
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-[22px] pb-2 pt-5">
        {c.blurb ? <p className="px-4 text-[15px] leading-[21px] text-[#9CA8BB]">{c.blurb}</p> : null}

        <Card className="gap-3">
          <div className="flex items-end gap-2">
            <span className={`${numeral} text-[46px] leading-[50px] text-[#F8FAFC]`}>{c.participants.toLocaleString('en-US')}</span>
            <span className={`${numeral} flex-1 pb-1.5 text-xl text-[#9CA8BB]`}>{c.participants === 1 ? 'person in' : 'people in'}</span>
            <span className="flex pb-2">
              {(c.faces ?? []).slice(0, 5).map((face, index) => (
                <span key={index} className={`rounded-full border-2 border-[#0B1220] ${index === 0 ? '' : '-ml-2'}`}>
                  <Avatar url={face.avatar_url} name={face.name} size={28} />
                </span>
              ))}
            </span>
          </div>
          <p className="text-[14px] leading-5 text-[#9CA8BB]">
            <strong className="text-[#F8FAFC]">What counts:</strong> {k.what.charAt(0).toLowerCase() + k.what.slice(1)}, from the day you join.{' '}
            {target ? `Everyone who reaches ${amount(c.target_value, k.decimals)} ${unit} wins it.` : bet ? 'The highest total at the end wins.' : 'Points every day, capped so nobody wins by overdoing it.'}
          </p>
        </Card>

        {w.open ? (
          <section className="flex flex-col gap-2.5">
            <Eyebrow>How it works</Eyebrow>
            <Card className="gap-3.5">
              <Step n={1} color={to} title="Join free" body="One tap in the InstaCal app. You can join after it has started." />
              <Step
                n={2}
                color={to}
                title={c.target_metric === 'logged_days' || c.target_metric === 'protein_days' ? 'Log your meals' : 'Do the work'}
                body={
                  c.target_metric === 'logged_days' || c.target_metric === 'protein_days'
                    ? 'Snap a plate, scan a label or say what you ate. Each day counts once.'
                    : 'Connect Apple Health, Health Connect, Strava or Garmin and your workouts count by themselves, or log one by hand.'
                }
              />
              <Step n={3} color={to} title={target ? 'Hit the number' : 'Climb the board'} body={target ? `Reach ${amount(c.target_value, k.decimals)} ${unit} by ${dateText(c.ends_on)} and it is yours.` : `Whoever is on top on ${dateText(c.ends_on)} wins.`} />
            </Card>
          </section>
        ) : null}

        {board.length > 0 ? (
          <section className="flex flex-col gap-2.5">
            <Eyebrow>{w.open ? 'The board right now' : 'How it finished'}</Eyebrow>
            <Card className="!py-1.5">
              {board.map((row, index) => {
                const done = target && Number(row.value) >= Number(c.target_value)
                return (
                  <div key={index} className={`flex items-center gap-3 py-2.5 ${index < board.length - 1 ? 'border-b border-white/10' : ''}`}>
                    <span className={`${numeral} w-5 text-[15px] text-[#9CA8BB]`}>{row.rank}</span>
                    <Avatar url={row.avatar_url} name={row.name} size={30} />
                    <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <span className="truncate text-sm font-bold text-[#F8FAFC]">{row.name}</span>
                      <span className="h-[5px] overflow-hidden rounded-full bg-white/10">
                        <span className="block h-full rounded-full" style={{ width: `${Math.min(100, scale > 0 ? (Number(row.value) / scale) * 100 : 0)}%`, background: done ? '#34D399' : to }} />
                      </span>
                    </span>
                    <span className={`${numeral} text-right text-[15px] ${done ? 'text-[#34D399]' : 'text-[#F8FAFC]'}`}>
                      {amount(row.value, k.decimals)} <span className="text-xs text-[#9CA8BB]">{unit}</span>
                    </span>
                  </div>
                )
              })}
            </Card>
            <p className="px-4 text-[13px] leading-[18px] text-[#9CA8BB]">The top ten. First names only.</p>
          </section>
        ) : null}

        <CallToAction
          head={w.open ? `Take on ${c.title}.` : 'The next one is on InstaCal.'}
          sub={w.open ? 'Free to join. Track your food and training in one app, and see where you stand every day.' : 'A new challenge every month and every week, and bets with friends. Free on iPhone and Android.'}
          type="challenges"
          id={c.id}
          code={code}
        />
        <p className="px-4 text-[13px] leading-[19px] text-[#9CA8BB]">
          Questions? Message Team InstaCal in the app, or email{' '}
          <a className="font-semibold text-[#44BAFF]" href="mailto:support@theinstacal.app">
            support@theinstacal.app
          </a>
          .
        </p>
      </main>
      <Footer />
    </Page>
  )
}
