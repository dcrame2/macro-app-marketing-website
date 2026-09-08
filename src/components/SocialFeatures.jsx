'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { Device } from '@/components/Device'
import { AnimateIn } from '@/components/AnimateIn'
import feedImg from '@/images/screenshots/v2/hero-feed.webp'
import exploreImg from '@/images/screenshots/v2/explore.webp'
import mapImg from '@/images/screenshots/v2/map.webp'
import profileImg from '@/images/screenshots/v2/profile.webp'
import profileWorkoutsImg from '@/images/screenshots/v2/profile-workouts.webp'

const ICONS = {
  heart:
    'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
  sparkles:
    'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z',
  pin: [
    'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z',
    'M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
  ],
  user: 'M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z',
  share:
    'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5',
  storefront:
    'M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z',
  map: 'M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z',
  flag: 'M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5',
  lock: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
  bell: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0',
}

function Icon({ name, className }) {
  const paths = [].concat(ICONS[name])
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      {paths.map((d) => (
        <path key={d} strokeLinecap="round" strokeLinejoin="round" d={d} />
      ))}
    </svg>
  )
}

function ReactionChip({ children, className = '', style }) {
  return (
    <div
      className={`absolute z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-lg shadow-gray-900/10 ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

const features = [
  {
    number: '01',
    id: 'feed',
    title: 'Your Food Feed',
    icon: 'heart',
    gradient: 'from-pink-500 to-rose-600',
    chipBg: 'bg-pink-50 text-pink-700',
    description:
      'See what your friends are actually eating in a feed built for food. Every post shows the photo plus the full breakdown: calories, carbs, fat, protein, sugar. Like it, comment on it, @mention your friends, bookmark it, steal it for dinner tomorrow.',
    tags: ['Likes & Comments', '@Mentions', 'Bookmarks', 'Macro Pills'],
    screens: [
      {
        image: feedImg,
        alt: "InstaCal feed showing @dylan's steak with broccolini post with a full macro breakdown, likes, and comments",
      },
    ],
    rotate: '-rotate-3',
    chips: [
      {
        content: (
          <>
            <span className="text-pink-500">❤️</span> mia_lifts liked your meal
          </>
        ),
        className: '-left-2 top-16 animate-float sm:-left-12',
      },
      {
        content: <>💬 &quot;What are the macros??&quot;</>,
        className: '-right-2 bottom-24 animate-float-delayed sm:-right-14',
      },
    ],
  },
  {
    number: '02',
    id: 'explore',
    title: 'Find a Plate That Fits',
    icon: 'sparkles',
    gradient: 'from-violet-500 to-purple-600',
    chipBg: 'bg-violet-50 text-violet-700',
    description:
      'Explore knows what you have left today. Plate Deck deals you real meals that fit your remaining calories and protein, and you swipe to keep the ones you like. Below it: plates that fit your macros, trending recipes, and what is worth eating nearby. Three lanes, Eat, Move, and People, so you can find a run route as easily as a burrito.',
    tags: ['Plate Deck', 'Fits Your Macros', 'Trending Recipes', 'Eat · Move · People'],
    screens: [
      {
        image: exploreImg,
        alt: 'InstaCal Explore showing calories and protein left today, the Plate Deck, meals that fit your macros, and trending recipes',
      },
    ],
    rotate: 'rotate-3',
    chips: [
      {
        content: <>🃏 Deal me a plate that fits</>,
        className: '-right-4 top-24 animate-float sm:-right-16',
      },
      {
        content: <>2,464 cal · 160 g protein left</>,
        className: '-left-2 bottom-32 animate-float-delayed sm:-left-14',
      },
    ],
  },
  {
    number: '03',
    id: 'map',
    title: 'See Where Friends Eat',
    icon: 'pin',
    gradient: 'from-[#0077cc] to-cyan-500',
    chipBg: 'bg-sky-50 text-sky-700',
    description:
      'Every meal posted at a restaurant drops a pin. Open the map and see what people actually ordered anywhere in your city, with photos and macros instead of five-star reviews from strangers. Flip to Routes and every run and ride you follow sits on the same map.',
    tags: ['Places', 'Routes', 'Restaurant Pages', 'My Places'],
    screens: [
      {
        image: mapImg,
        alt: 'InstaCal map with meal pins clustered across Chicago and an Explore Places card showing 125 places with meals',
      },
    ],
    rotate: '-rotate-2',
    chips: [
      {
        content: <>📍 125 places with meals</>,
        className: '-left-2 top-20 animate-float sm:-left-12',
      },
      {
        content: <>🍜 Tonkotsu at Ramen-San</>,
        className: '-right-2 bottom-28 animate-float-delayed sm:-right-14',
      },
    ],
  },
  {
    number: '04',
    id: 'profile',
    title: 'A Profile That Shows Your Work',
    icon: 'user',
    gradient: 'from-orange-500 to-amber-500',
    chipBg: 'bg-orange-50 text-orange-700',
    description:
      'This is @dylan, for real: 2,176 posts, a 210 day streak, 68 badges. Every meal and every workout you post builds your grid, like Instagram for what you actually eat and do. Filter it by meals, workouts, or places, keep some posts to yourself with Only me, and go public for accountability or private for peace.',
    tags: ['Photo Grid', 'Meals & Workouts', 'Streak & Badges', 'Privacy Controls'],
    screens: [
      {
        label: 'Meals',
        image: profileImg,
        alt: "@dylan's InstaCal profile with 2,176 posts, a 210 day streak, 68 badges, and a grid of meal photos",
      },
      {
        label: 'Workouts',
        image: profileWorkoutsImg,
        alt: "@dylan's InstaCal profile filtered to workouts, showing lifts and run and ride routes drawn on a grid",
      },
    ],
    rotate: 'rotate-2',
    chips: [
      {
        content: <>🔥 210 day streak</>,
        className: '-right-2 top-16 animate-float sm:-right-12',
      },
      {
        content: <>🏅 68 badges · Level 9</>,
        className: '-left-2 bottom-24 animate-float-delayed sm:-left-12',
      },
    ],
  },
]

function ScreenSwitcher({ feature }) {
  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)
  const many = feature.screens.length > 1

  useEffect(() => {
    if (!many || touched) return undefined
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % feature.screens.length),
      4000,
    )
    return () => window.clearInterval(id)
  }, [many, touched, feature.screens.length])

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative w-[260px] transition-transform duration-500 hover:rotate-0 sm:w-[300px] ${feature.rotate}`}
      >
        <div className="relative aspect-[1022/2082]">
          {feature.screens.map((screen, i) => (
            <motion.div
              key={screen.alt}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: active === i ? 1 : 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              style={{ pointerEvents: active === i ? 'auto' : 'none' }}
            >
              <Device
                className="w-full"
                screen={screen.image}
                alt={screen.alt}
              />
            </motion.div>
          ))}
        </div>
        {feature.chips.map((chip, i) => (
          <ReactionChip
            key={i}
            className={chip.className}
            style={{ animationDelay: `${i * 1.5}s` }}
          >
            {chip.content}
          </ReactionChip>
        ))}
      </div>

      {many && (
        <div className="mt-8 flex items-center gap-1 rounded-full bg-white p-1 shadow-lg shadow-gray-900/10 ring-1 ring-gray-200">
          {feature.screens.map((screen, i) => (
            <button
              key={screen.label}
              type="button"
              onClick={() => {
                setTouched(true)
                setActive(i)
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                active === i
                  ? 'bg-gray-950 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {screen.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const deeper = [
  {
    icon: 'share',
    gradient: 'from-fuchsia-500 to-pink-600',
    title: 'Share Studio',
    description:
      'Any meal, workout, week, or Wrapped becomes a designed card. Pick a look, drop it on your Instagram story, and your invite link rides along.',
  },
  {
    icon: 'storefront',
    gradient: 'from-[#0077cc] to-cyan-500',
    title: 'Restaurant Pages',
    description:
      'Every restaurant gets its own page with every meal the community has logged there. Menus, but honest.',
  },
  {
    icon: 'map',
    gradient: 'from-emerald-500 to-teal-600',
    title: 'Workouts Are Posts Too',
    description:
      'Log a run and it hits the feed with the route drawing itself in, splits, pace, and heart rate. Likes and comments included.',
  },
  {
    icon: 'flag',
    gradient: 'from-amber-500 to-orange-600',
    title: 'Challenges',
    description:
      'Go head to head with friends, scored against your own targets so nobody wins by eating more. Or race a number: run 50 miles, log 25 days.',
  },
  {
    icon: 'lock',
    gradient: 'from-violet-500 to-purple-600',
    title: 'Private Mode',
    description:
      'Go private and approve follow requests one by one. Control the feed, the map, and discovery separately. Some posts can be Only me.',
  },
  {
    icon: 'bell',
    gradient: 'from-orange-500 to-red-600',
    title: 'Real Notifications',
    description:
      'Likes, comments, replies, mentions, new followers, follow requests, and a badge unlock now and then. Reasons to open the app.',
  },
]

export function SocialFeatures() {
  return (
    <section id="social" className="overflow-hidden bg-white py-24 sm:py-32">
      <Container>
        <AnimateIn>
          <div className="relative mx-auto max-w-3xl text-center">
            <span
              className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 select-none text-[9rem] font-extrabold tracking-tight text-gray-950/[0.03] sm:text-[13rem]"
              aria-hidden="true"
            >
              SOCIAL
            </span>
            <div className="relative">
              <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-[#0077cc]/5 px-4 py-2">
                <Icon name="heart" className="h-4 w-4 text-[#0077cc]" />
                <span className="text-sm font-semibold text-[#0077cc]">
                  The Social Network
                </span>
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                Other trackers are spreadsheets.{' '}
                <span className="bg-gradient-to-r from-[#0077cc] to-cyan-500 bg-clip-text text-transparent">
                  This is a feed.
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Every other tracker makes eating feel like data entry. InstaCal
                makes it feel like posting. Follow friends, discover meals near
                you, and turn every bite into content.
              </p>
            </div>
          </div>
        </AnimateIn>

        {features.map((feature, index) => {
          const phoneFirst = index % 2 === 0
          return (
            <div
              key={feature.id}
              className="mt-24 grid items-center gap-12 sm:mt-32 lg:grid-cols-2 lg:gap-20"
            >
              <AnimateIn
                className={phoneFirst ? 'order-2 lg:order-1' : 'order-2'}
                delay={0.15}
              >
                <div className="flex justify-center">
                  <ScreenSwitcher feature={feature} />
                </div>
              </AnimateIn>
              <AnimateIn
                className={phoneFirst ? 'order-1 lg:order-2' : 'order-1'}
              >
                <div
                  className={`relative max-w-lg ${phoneFirst ? '' : 'lg:ml-auto'}`}
                >
                  <span
                    className="pointer-events-none absolute -left-4 -top-14 select-none text-8xl font-extrabold text-gray-950/[0.04]"
                    aria-hidden="true"
                  >
                    {feature.number}
                  </span>
                  <div className="relative">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient}`}
                      >
                        <Icon name={feature.icon} className="h-6 w-6 text-white" />
                      </div>
                      {feature.pro && (
                        <span className="rounded-full bg-gradient-to-r from-[#0077cc] to-cyan-400 px-3 py-1 text-xs font-bold text-white">
                          PRO
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-gray-600">
                      {feature.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {feature.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full px-4 py-1.5 text-sm font-medium ${feature.chipBg}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateIn>
            </div>
          )
        })}

        {/* Deeper social features bento */}
        <AnimateIn>
          <div className="mx-auto mt-24 max-w-2xl text-center sm:mt-32">
            <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              And it goes{' '}
              <span className="bg-gradient-to-r from-[#0077cc] to-cyan-500 bg-clip-text text-transparent">
                deeper
              </span>
            </h3>
            <p className="mt-4 text-lg text-gray-600">
              This is not a tracker with a feed bolted on. The whole social
              layer is built in.
            </p>
          </div>
        </AnimateIn>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deeper.map((item, i) => (
            <AnimateIn key={item.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0077cc]/30 hover:bg-white hover:shadow-xl hover:shadow-[#0077cc]/5">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient}`}
                >
                  <Icon name={item.icon} className="h-5 w-5 text-white" />
                </div>
                <h4 className="mt-4 font-bold text-gray-900">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
