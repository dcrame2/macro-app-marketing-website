'use client'

import { Container } from '@/components/Container'
import { Device } from '@/components/Device'
import { AnimateIn } from '@/components/AnimateIn'
import achievementsImg from '@/images/screenshots/v2/achievements.webp'
import streakImg from '@/images/screenshots/v2/streak.webp'
import wrappedImg from '@/images/screenshots/v2/wrapped.webp'

const cards = [
  {
    id: 'achievements',
    eyebrow: 'Achievements',
    title: 'Earn it. Wear it.',
    text: '88 badges across nutrition, training, social, and consistency. Bronze, silver, gold. Level up from First Plate to Elite and see what you are closest to unlocking.',
    image: achievementsImg,
    alt: 'InstaCal Achievements: Level 9 Elite, 68 badges and 248 points, closest to unlocking, and recently earned gold badges',
    chips: [
      { text: '🏅 68 badges', className: '-left-4 top-14 sm:-left-8' },
      { text: 'Level 9 · Elite', className: '-right-4 bottom-32 sm:-right-8', delay: '1.4s' },
    ],
    rotate: '-rotate-3',
  },
  {
    id: 'streak',
    eyebrow: 'Streaks',
    title: 'Keep it alive.',
    text: 'One square a day. Twelve weeks of logged, on target, and every macro at a glance, a nightly nudge only on days you have not logged, and a restore if life happens.',
    image: streakImg,
    alt: 'InstaCal Streak page: a 210 day streak, 84 of 84 days logged, a 12 week heatmap, streak history, and the nightly nudge setting',
    chips: [
      { text: '🔥 210 day streak', className: '-right-4 top-16 sm:-right-8' },
      { text: '84 / 84 days logged', className: '-left-4 bottom-36 sm:-left-8', delay: '1s' },
    ],
    rotate: 'rotate-0',
    featured: true,
  },
  {
    id: 'wrapped',
    eyebrow: 'Wrapped',
    title: 'Your month, wrapped.',
    text: 'Every month, a story of what you ate, where you showed up, and who hyped you. Pick a look and put it on your story. Your invite link rides along.',
    image: wrappedImg,
    alt: "InstaCal Wrapped: 'Put it on your story' with a My Month card showing 10 of 31 days on target, 168 meals, 355 miles, 138g protein, and an Instagram story button",
    chips: [
      { text: '168 meals · 355 miles', className: '-left-4 top-20 sm:-left-8' },
      { text: '📲 Instagram story', className: '-right-4 bottom-28 sm:-right-8', delay: '2s' },
    ],
    rotate: 'rotate-3',
  },
]

function Chip({ children, className = '', style }) {
  return (
    <div
      className={`absolute z-10 whitespace-nowrap rounded-full border border-white/10 bg-gray-900/90 px-3 py-1.5 text-xs font-semibold text-white shadow-xl shadow-black/40 backdrop-blur-md ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export function Momentum() {
  return (
    <section
      id="streaks"
      className="relative overflow-hidden bg-[#0b1220] py-24 sm:py-32"
    >
      {/* Celebration surface: one gold light source, a little warmth low right */}
      <div
        className="absolute -top-40 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-amber-300/10 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-rose-500/10 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2">
              <span className="text-base">🏆</span>
              <span className="text-sm font-semibold tracking-wide text-amber-300">
                Achievements · Streaks · Wrapped
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Consistency,{' '}
              <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                made visible.
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              Showing up every day should feel like something. Badges to earn,
              a streak to protect, and a monthly Wrapped that looks good on a
              story.
            </p>
          </div>
        </AnimateIn>

        <div className="mt-20 grid gap-16 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {cards.map((card, i) => (
            <AnimateIn key={card.id} delay={i * 0.15} amount={0.15}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`relative w-[240px] transition-transform duration-500 hover:rotate-0 sm:w-[210px] lg:w-[270px] ${card.rotate} ${
                    card.featured ? 'sm:-translate-y-6' : ''
                  }`}
                >
                  <div
                    className={`absolute inset-6 rounded-[3rem] blur-3xl ${
                      card.featured ? 'bg-orange-500/30' : 'bg-amber-300/20'
                    }`}
                    aria-hidden="true"
                  />
                  <Device
                    className="relative"
                    screen={card.image}
                    alt={card.alt}
                    sizes="(min-width: 1024px) 270px, (min-width: 640px) 210px, 240px"
                  />
                  {card.chips.map((chip) => (
                    <Chip
                      key={chip.text}
                      className={`animate-float ${chip.className}`}
                      style={{ animationDelay: chip.delay || '0s' }}
                    >
                      {chip.text}
                    </Chip>
                  ))}
                </div>
                <div className="mt-10 max-w-xs">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                    {card.eyebrow}
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">
                    {card.text}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
