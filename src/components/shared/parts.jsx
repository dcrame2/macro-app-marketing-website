import Image from 'next/image'
import { Oswald } from 'next/font/google'
import logo from '@/images/logos/InstaCal_logo.png'
import { proLength } from '@/lib/proLength'
import { num, platePath, sized, withCode } from '@/lib/sharePage'
import { Header } from '@/components/Header'
import '@/styles/landing.css'
import { GetApp, StoreLink } from './GetApp'

// The app's numeral face: every big number on these pages is the app's own.
const oswald = Oswald({ subsets: ['latin'], weight: '600', display: 'swap' })
export const numeral = oswald.className

// The app's macro tags.
const PILL = {
  Protein: 'bg-[#1E8A45]/25 text-[#8EE5A5]',
  Carbs: 'bg-[#B58900]/25 text-[#F2D56B]',
  Fat: 'bg-[#C2410C]/25 text-[#FFB08F]',
}

/**
 * The page (2026-11-18): the site's own dark ground and header, so a shared
 * link reads as the same website on a phone and on a desktop. One phone-width
 * column by default; `wide` opens to the site's width from a laptop up, for
 * the pages that lay themselves out there (a plate or session beside its
 * details, a profile's grid, the recipes).
 */
export function Page({ children, bar = null, wide = false }) {
  return (
    <div className="min-h-screen bg-[#030712] text-[#F8FAFC]">
      <Header />
      <div
        className={`mx-auto flex min-h-[calc(100vh-78px)] w-full max-w-[480px] flex-col ${wide ? 'lg:max-w-[1120px]' : 'lg:max-w-[560px]'} ${bar ? 'pb-[76px]' : ''}`}
      >
        {children}
      </div>
      {bar}
    </div>
  )
}

/**
 * A thing beside its details: on a phone the picture leads and the details
 * follow; from a laptop up the picture holds the left half while the details
 * scroll on the right. With no picture the details are one centred column.
 */
export function Split({ hero, children }) {
  if (!hero) return <div className="lg:mx-auto lg:w-full lg:max-w-[600px] lg:pt-6">{children}</div>
  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-10 lg:px-6 lg:pt-10">
      <div className="lg:sticky lg:top-[102px] lg:overflow-hidden lg:rounded-[28px] lg:border lg:border-white/10">{hero}</div>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

/**
 * The way in, pinned to the foot of every shared page (2026-11-10). A web
 * page cannot tell whether the app is installed, so nothing here says "Open":
 * the button names what the app does with THIS thing ("Save this recipe",
 * "Follow Dylan") and goes to the store, which itself offers Open to someone
 * who has it. After an install the app opens on the same thing.
 */
export function StickyBar({ title, sub, action, type, id, code, target, lead = null }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 flex justify-center border-t border-white/10 bg-[#030712]/95 backdrop-blur">
      <div className="flex w-full max-w-[480px] items-center gap-3 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3">
        {lead ?? <Image src={logo} alt="" width={36} height={36} className="flex-none" />}
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-bold leading-[18px] text-[#F8FAFC]">{title}</span>
          <span className="truncate text-xs text-[#9CA8BB]">{sub}</span>
        </span>
        <StoreLink type={type} id={id} code={code} target={target} label={action} />
      </div>
    </div>
  )
}

/** The site's header (in `Page`) took this bar's place; kept so the pages that render it need no change. */
export function TopBar() {
  return null
}

/** Who sent the link, and what joining with it is worth. Only with a known code. */
export function InviteStrip({ inviter, line }) {
  if (!inviter?.name) return null
  const length = proLength(inviter.trial_days)
  return (
    <div className="flex items-center gap-3 bg-[#0077cc]/20 px-4 py-3">
      <Avatar url={inviter.avatar_url} name={inviter.name} size={40} />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[15px] font-bold leading-5 text-[#F8FAFC]">
          {inviter.name} {line}
        </span>
        <span className="text-[13px] font-medium leading-[18px] text-[#6CC4FF]">
          Join with this link and get {length ?? 'free days'} of Pro, free.
        </span>
      </div>
    </div>
  )
}

export function Avatar({ url, name, size }) {
  const style = { width: size, height: size }
  if (url) {
    return (
      // A plain img: avatars come from Supabase Storage at any path.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={sized(url, size * 2, size * 2)}
        alt=""
        style={style}
        className="flex-none rounded-full bg-[#111A2B] object-cover"
      />
    )
  }
  return (
    <span
      style={{ ...style, fontSize: size * 0.42 }}
      className="flex flex-none items-center justify-center rounded-full bg-[#0077cc] font-bold text-white"
    >
      {String(name ?? '?').charAt(0).toUpperCase()}
    </span>
  )
}

export function AuthorRow({ author, sub, likes, code }) {
  const handle = author?.username ? `@${author.username}` : author?.name
  return (
    <div className="flex items-center justify-between px-4">
      <a href={withCode(`/user/${author.id}`, code)} className="flex min-w-0 items-center gap-2.5">
        <Avatar url={author.avatar_url} name={author.name ?? author.username} size={40} />
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-[15px] font-bold leading-5 text-[#F8FAFC]">{handle}</span>
          {sub ? <span className="truncate text-[13px] leading-[18px] text-[#9CA8BB]">{sub}</span> : null}
        </span>
      </a>
      {likes > 0 ? (
        <span className="flex flex-none items-center gap-1.5 text-sm font-semibold text-[#9CA8BB]">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="#E5484D">
            <path d="M12 21s-7.5-4.6-10-9.4C.4 8.3 2.2 4.5 5.8 4.5c2 0 3.4 1 4.2 2.3h4c.8-1.3 2.2-2.3 4.2-2.3 3.600 0 5.400 3.800 3.800 7.100C19.500 16.400 12 21 12 21z" />
          </svg>
          {num(likes)}
        </span>
      ) : null}
    </div>
  )
}

export function Eyebrow({ children }) {
  return (
    <h2 className="px-4 text-xs font-bold uppercase tracking-[0.1em] text-[#9CA8BB]">{children}</h2>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div className={`mx-4 flex flex-col rounded-[18px] border border-white/10 bg-[#0B1220] p-4 ${className}`}>
      {children}
    </div>
  )
}

export function MacroPills({ protein, carbs, fat }) {
  const items = [
    ['Protein', protein],
    ['Carbs', carbs],
    ['Fat', fat],
  ]
  return (
    <div className="flex flex-wrap gap-x-[18px] gap-y-2">
      {items.map(([label, value]) => (
        <span key={label} className="flex items-baseline gap-1.5">
          <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${PILL[label]}`}>{label}</span>
          <span className={`${numeral} text-xl leading-6`}>{num(value)}g</span>
        </span>
      ))}
    </div>
  )
}

export function Stat({ value, label }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className={`${numeral} text-[26px] leading-[30px] text-[#F8FAFC]`}>{value}</span>
      <span className="text-xs font-semibold text-[#9CA8BB]">{label}</span>
    </div>
  )
}

/** The closing card: what the app does with this, and the way in. */
export function CallToAction({ head, sub, type, id, code }) {
  return (
    <Card className="gap-3">
      <p className="text-xl font-extrabold leading-[25px] text-[#F8FAFC]">{head}</p>
      <p className="text-[15px] leading-[21px] text-[#9CA8BB]">{sub}</p>
      <GetApp type={type} id={id} code={code} />
    </Card>
  )
}

/** Two-up plates with their name and numbers. */
export function PlateTiles({ plates, code }) {
  if (!plates?.length) return null
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-3.5 px-4">
      {plates.map((plate) => (
        <a key={plate.id} href={withCode(platePath(plate), code)} className="flex min-w-0 flex-col gap-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sized(plate.image_url, 440, 480)}
            alt=""
            className="aspect-[11/12] w-full rounded-[14px] bg-[#111A2B] object-cover"
          />
          <span className="line-clamp-2 text-sm font-bold leading-[18px] text-[#F8FAFC]">{plate.title}</span>
          <span className="text-[13px] text-[#9CA8BB]">
            {num(plate.calories)} cal · {num(plate.protein)}g protein
          </span>
        </a>
      ))}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mt-auto flex justify-between px-4 pb-6 pt-5 text-[13px] text-[#9CA8BB]">
      <a href="/">theinstacal.app</a>
      <span>
        <a href="/privacy">Privacy</a>
      </span>
    </footer>
  )
}
