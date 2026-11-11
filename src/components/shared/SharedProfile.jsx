import { proLength } from '@/lib/proLength'
import { dayOf, num, platePath, sized, withCode, workoutPath } from '@/lib/sharePage'
import { durationOf, milesOf } from '@/lib/sharePreview'
import { GetApp, ShareBeacon } from './GetApp'
import { Avatar, Eyebrow, Footer, Page, StickyBar, TopBar, numeral } from './parts'

function Count({ value, label }) {
  return (
    <span className="flex flex-col items-center">
      <span className={`${numeral} text-xl leading-6 text-[#10151C]`}>{num(value)}</span>
      <span className="text-xs text-[#566170]">{label}</span>
    </span>
  )
}

const hostOf = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return null
  }
}

function Flame() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="#F97316" stroke="#F97316" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}

/**
 * A profile on the web, laid out the way the app's own profile is (the user,
 * 2026-11-10: "a profile view similar to the actual app profile view so
 * people can see the profile"): the face beside the counts, the name, the
 * bio, the streak, the links, one Follow button, then the grid with the
 * calories on each tile and the last few sessions. A bar at the foot keeps
 * the way in on screen. "Follow me", never "you're invited": the invite's
 * free days ride along as one quiet line. A private account is its name and
 * photo.
 */
export function SharedProfile({ profile, inviter, code }) {
  const name = profile.name ?? profile.username
  const length = proLength(inviter?.trial_days)
  const site = profile.link ? hostOf(profile.link) : null
  const sessions = profile.sessions ?? []
  return (
    <Page
      bar={
        <StickyBar
          type="user"
          id={profile.id}
          code={code}
          lead={<Avatar url={profile.avatar_url} name={name} size={36} />}
          title={`Follow @${profile.username}`}
          sub="See every plate and workout in the app"
          action="Follow"
        />
      }
    >
      <ShareBeacon type="user" id={profile.id} code={code} />
      <TopBar type="user" id={profile.id} code={code} />

      <main className="flex flex-col gap-4 pt-5">
        <div className="flex items-center gap-5 px-4">
          <Avatar url={profile.avatar_url} name={name} size={88} />
          {profile.is_public ? (
            <div className="flex flex-1 justify-around">
              <Count value={profile.posts} label="Posts" />
              <Count value={profile.followers} label="Followers" />
              <Count value={profile.following} label="Following" />
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5 px-4">
          <h1 className="flex flex-wrap items-baseline gap-x-2 text-xl font-extrabold leading-6 text-[#10151C]">
            {name}
            <span className="text-[15px] font-medium text-[#566170]">@{profile.username}</span>
          </h1>
          {profile.bio ? (
            <p className="whitespace-pre-line text-[15px] leading-[21px] text-[#10151C]">{profile.bio}</p>
          ) : null}
          {profile.streak >= 2 || site || profile.instagram ? (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-0.5 text-sm font-semibold">
              {profile.streak >= 2 ? (
                <span className="flex items-center gap-1 text-[#10151C]">
                  <Flame />
                  {num(profile.streak)} day streak
                </span>
              ) : null}
              {site ? (
                <a href={profile.link} rel="nofollow noopener" className="text-[#0068b3]">
                  {site}
                </a>
              ) : null}
              {profile.instagram ? (
                <a href={`https://instagram.com/${profile.instagram}`} rel="nofollow noopener" className="text-[#0068b3]">
                  @{profile.instagram} on Instagram
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 px-4">
          <GetApp type="user" id={profile.id} code={code} label={`Follow ${name}`} />
          <p className="text-center text-[13px] text-[#566170]">
            {inviter?.name
              ? `InstaCal is free. Join from this link and get ${length ?? 'free days'} of Pro on top.`
              : 'On InstaCal, the app for what you eat and how you train. Free.'}
          </p>
        </div>

        {!profile.is_public ? (
          <p className="px-4 py-10 text-center text-[15px] text-[#566170]">
            This account is private. Follow {name} in the app to see their plates.
          </p>
        ) : (
          <>
            <div role="presentation" className="flex border-b border-[#DDE3EA] px-4">
              <span className="border-b-2 border-[#10151C] px-1 pb-2.5 text-sm font-bold text-[#10151C]">Posts</span>
            </div>
            {profile.plates.length > 0 ? (
              <div className="-mt-4 grid grid-cols-3 gap-px bg-[#EEF1F5]">
                {profile.plates.map((plate, index) => (
                  <a
                    key={plate.id}
                    href={withCode(platePath(plate), code)}
                    aria-label={`${plate.title}, ${num(plate.calories)} calories`}
                    className="relative block aspect-[3/4] overflow-hidden bg-[#DDE3EA]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sized(plate.image_url, 330, 440)}
                      alt=""
                      loading={index < 9 ? 'eager' : 'lazy'}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-x-0 bottom-0 flex flex-col bg-gradient-to-t from-black/75 to-transparent px-2 pb-1.5 pt-8 text-white">
                      <span className={`${numeral} text-[17px] leading-5`}>
                        {num(plate.calories)}
                        <span className="ml-0.5 font-sans text-[10px] font-semibold">cal</span>
                      </span>
                      <span className="truncate text-[11px] font-semibold leading-[14px]">{plate.title}</span>
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="px-4 py-10 text-center text-[15px] text-[#566170]">No plates posted yet.</p>
            )}

            {profile.posts > profile.plates.length && profile.plates.length > 0 ? (
              <p className="px-4 text-center text-sm text-[#566170]">
                {num(profile.posts - profile.plates.length)} more in the app.
              </p>
            ) : null}

            {sessions.length >= 2 ? (
              <section className="flex flex-col gap-2.5 pt-2">
                <Eyebrow>Recent training</Eyebrow>
                <div className="mx-4 flex flex-col rounded-[18px] border border-[#DDE3EA] bg-white px-4 py-1.5">
                  {sessions.map((s, index) => {
                    const lead = milesOf(s.distance_meters) ?? durationOf(s.duration_seconds)
                    return (
                      <a
                        key={s.id}
                        href={withCode(workoutPath(s), code)}
                        className={`flex items-center justify-between gap-3 py-3 ${index < sessions.length - 1 ? 'border-b border-[#DDE3EA]' : ''}`}
                      >
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate text-[15px] font-semibold leading-5 text-[#10151C]">{s.title}</span>
                          <span className="text-[13px] leading-[18px] text-[#566170]">
                            {[dayOf(s.started_at), s.activity, s.calories ? `${num(s.calories)} kcal` : null].filter(Boolean).join(' · ')}
                          </span>
                        </span>
                        {lead ? <span className={`${numeral} flex-none text-lg text-[#10151C]`}>{lead}</span> : null}
                      </a>
                    )
                  })}
                </div>
              </section>
            ) : null}
          </>
        )}
      </main>
      <Footer />

    </Page>
  )
}
