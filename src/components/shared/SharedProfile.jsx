import { proLength } from '@/lib/proLength'
import { num, sized, withCode } from '@/lib/sharePage'
import { GetApp, ShareBeacon } from './GetApp'
import { Avatar, Footer, Page, TopBar, numeral } from './parts'

function Count({ value, label }) {
  return (
    <span className="flex flex-col">
      <span className="text-xs text-[#566170]">{label}</span>
      <span className={`${numeral} text-xl leading-6 text-[#10151C]`}>{num(value)}</span>
    </span>
  )
}

/**
 * A shared profile, laid out the way the app's own profile is: the face and
 * the counts, the bio, then the plates as a three-across photo grid with each
 * plate's calories on its foot. A private account is its name and photo.
 */
export function SharedProfile({ profile, inviter, code }) {
  const name = profile.name ?? profile.username
  const length = proLength(inviter?.trial_days)
  return (
    <Page>
      <ShareBeacon type="user" id={profile.id} code={code} />
      <TopBar type="user" id={profile.id} code={code} />

      <main className="flex flex-col gap-4 pt-5">
        <div className="flex items-center gap-4 px-4">
          <Avatar url={profile.avatar_url} name={name} size={92} />
          <div className="flex min-w-0 flex-col gap-1.5">
            <div className="flex flex-col">
              <h1 className="truncate text-2xl font-extrabold leading-7 text-[#10151C]">{name}</h1>
              <span className="text-[15px] text-[#566170]">@{profile.username}</span>
            </div>
            {profile.is_public ? (
              <div className="flex gap-6">
                <Count value={profile.posts} label="Posts" />
                <Count value={profile.followers} label="Followers" />
                <Count value={profile.following} label="Following" />
              </div>
            ) : null}
          </div>
        </div>

        {profile.bio ? (
          <p className="whitespace-pre-line px-4 text-[15px] leading-[21px] text-[#10151C]">{profile.bio}</p>
        ) : null}

        <div className="flex flex-col gap-2 px-4">
          <GetApp type="user" id={profile.id} code={code} label={`Follow ${name} on InstaCal`} />
          {inviter?.name ? (
            <p className="text-center text-[13px] text-[#566170]">
              Join with this link and get {length ?? 'free days'} of Pro, free.
            </p>
          ) : null}
        </div>

        {!profile.is_public ? (
          <p className="px-4 py-10 text-center text-[15px] text-[#566170]">
            This account is private. Follow {name} in the app to see their plates.
          </p>
        ) : profile.plates.length > 0 ? (
          <div className="grid grid-cols-3 gap-px bg-[#EEF1F5]">
            {profile.plates.map((plate, index) => (
              <a
                key={plate.id}
                href={withCode(`/meal/${plate.id}`, code)}
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
      </main>
      <Footer />
    </Page>
  )
}
