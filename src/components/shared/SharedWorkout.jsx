import { dayOf, num, sized } from '@/lib/sharePage'
import { durationOf, milesOf } from '@/lib/sharePreview'
import { ShareBeacon } from './GetApp'
import {
  AuthorRow,
  CallToAction,
  Eyebrow,
  Footer,
  InviteStrip,
  Page,
  PlateTiles,
  Stat,
  TopBar,
  numeral,
} from './parts'

/** "9:02 /mi" from metres and seconds; null without both. */
const paceOf = (meters, seconds) => {
  const miles = (Number(meters) || 0) / 1609.344
  if (miles < 0.1 || !seconds) return null
  const perMile = Math.round(seconds / miles)
  return `${Math.floor(perMile / 60)}:${String(perMile % 60).padStart(2, '0')} /mi`
}

/** A shared session: its one big number, the rest of its numbers, who did it. Never a route. */
export function SharedWorkout({ workout, inviter, code }) {
  const distance = milesOf(workout.distance_meters)
  const time = durationOf(workout.duration_seconds)
  const pace = paceOf(workout.distance_meters, workout.duration_seconds)
  const lead = distance ?? time
  const handle = workout.author.username ? `@${workout.author.username}` : workout.author.name
  const stats = [
    distance && time ? [time, 'time'] : null,
    pace ? [pace, 'pace'] : null,
    workout.calories ? [num(workout.calories), 'kcal burned'] : null,
    workout.heart_rate ? [num(workout.heart_rate), 'avg bpm'] : null,
  ].filter(Boolean)

  return (
    <Page>
      <ShareBeacon type="workout" id={workout.id} code={code} />
      <TopBar type="workout" id={workout.id} code={code} />
      <InviteStrip inviter={inviter} line="shared this with you" />
      {workout.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sized(workout.image_url, 960, 1080)}
          alt={workout.title}
          className="aspect-[8/9] w-full bg-[#DDE3EA] object-cover"
        />
      ) : null}

      <main className="flex flex-col gap-[22px] pb-2 pt-3.5">
        <AuthorRow
          author={workout.author}
          sub={[dayOf(workout.started_at), workout.activity].filter(Boolean).join(' · ')}
          likes={workout.likes}
          code={code}
        />
        <div className="flex flex-col gap-2.5 px-4">
          <h1 className="text-2xl font-extrabold leading-[30px] text-[#10151C]">{workout.title}</h1>
          {workout.caption ? (
            <p className="whitespace-pre-line text-[15px] leading-[21px] text-[#566170]">{workout.caption}</p>
          ) : null}
          {lead ? <p className={`${numeral} text-[52px] leading-[58px] text-[#10151C]`}>{lead}</p> : null}
          {stats.length > 0 ? (
            <div className={`grid gap-x-6 gap-y-3 rounded-2xl border border-[#DDE3EA] bg-white px-4 py-3.5 ${stats.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {stats.map(([value, label]) => (
                <Stat key={label} value={value} label={label} />
              ))}
            </div>
          ) : null}
        </div>

        <CallToAction
          type="workout"
          id={workout.id}
          code={code}
          head="Train with your friends"
          sub="InstaCal brings in your runs, rides and lifts from Apple Health and Strava, next to what you eat. Free to start."
        />

        {workout.more.length >= 2 ? (
          <section className="flex flex-col gap-2.5">
            <Eyebrow>{`What ${handle} eats`}</Eyebrow>
            <PlateTiles plates={workout.more} code={code} />
          </section>
        ) : null}
      </main>
      <Footer />
    </Page>
  )
}
