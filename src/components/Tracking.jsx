'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { Device } from '@/components/Device'
import { AnimateIn } from '@/components/AnimateIn'
import foodImg from '@/images/screenshots/v2/tracking-food.webp'
import fitnessImg from '@/images/screenshots/v2/tracking-fitness.webp'
import workoutMapImg from '@/images/screenshots/v2/workout-map.webp'
import workoutNetImg from '@/images/screenshots/v2/workout-net.webp'

const pages = [
  {
    id: 'food',
    label: 'Food',
    image: foodImg,
    alt: 'InstaCal Food tracking page: a week strip, a calories ring with 411 left, macro bars, days on target, a 210 day streak, a Coach note, and the latest award',
    boxes: [
      {
        emoji: '🎯',
        color: 'from-[#0077cc] to-sky-400',
        title: 'Calories',
        text: 'A ring that fills as you post. Burned calories open it back up.',
      },
      {
        emoji: '🥩',
        color: 'from-emerald-500 to-green-400',
        title: 'Macros',
        text: 'Carbs, fat, protein, and sugar, each against your target.',
      },
      {
        emoji: '🔥',
        color: 'from-orange-500 to-amber-400',
        title: 'Streak',
        text: '210 days and counting. Seven dots for the last seven days.',
      },
      {
        emoji: '📅',
        color: 'from-green-500 to-emerald-400',
        title: 'This week',
        text: 'Days on target, within 80 to 110% of your calorie goal.',
      },
      {
        emoji: '🧠',
        color: 'from-[#0077cc] to-indigo-500',
        title: 'Coach',
        text: 'A read on your latest meal, written the moment you log it.',
      },
      {
        emoji: '🏅',
        color: 'from-yellow-400 to-amber-500',
        title: 'Awards',
        text: 'Your latest badge and how many of the 88 you have earned.',
      },
    ],
  },
  {
    id: 'fitness',
    label: 'Fitness',
    image: fitnessImg,
    alt: 'InstaCal Fitness tracking page: burned calories, miles run this week, workouts last week, training goals, a Coach note, and body weight trend',
    boxes: [
      {
        emoji: '🔥',
        color: 'from-orange-500 to-red-500',
        title: 'Burned',
        text: '2,751 kcal in a day, active minutes, and a bar per day.',
      },
      {
        emoji: '🏃',
        color: 'from-green-500 to-emerald-400',
        title: 'Distance',
        text: 'Miles this week for your main sport, or minutes if you lift.',
      },
      {
        emoji: '📆',
        color: 'from-[#0077cc] to-sky-400',
        title: 'This week',
        text: '12 workouts, hours active, and calories burned.',
      },
      {
        emoji: '🥇',
        color: 'from-cyan-500 to-teal-400',
        title: 'Goals',
        text: 'Run, ride, swim, lift. A bar per training goal and who is on pace.',
      },
      {
        emoji: '🧠',
        color: 'from-[#0077cc] to-indigo-500',
        title: 'Coach',
        text: 'The same coach, now reading your training and your fuel.',
      },
      {
        emoji: '⚖️',
        color: 'from-violet-500 to-purple-500',
        title: 'Body',
        text: 'Weight check-ins with a sparkline. Down 7 lb since March.',
      },
    ],
  },
]

const workoutTags = [
  'Strava',
  'Apple Health',
  'Routes',
  'Splits & Pace',
  'Heart Rate Zones',
  'Net Calories',
]

function Chip({ children, className = '', style }) {
  return (
    <div
      className={`absolute z-30 whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-lg shadow-gray-900/10 ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export function Tracking() {
  const [activeId, setActiveId] = useState('food')
  const active = pages.find((page) => page.id === activeId)

  return (
    <section id="tracking" className="overflow-hidden bg-white py-24 sm:py-32">
      <Container>
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-[#0077cc]/5 px-4 py-2">
              <svg
                className="h-4 w-4 text-[#0077cc]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                />
              </svg>
              <span className="text-sm font-semibold text-[#0077cc]">
                Tracking
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Know where
              <span className="block bg-gradient-to-r from-[#0077cc] to-cyan-500 bg-clip-text text-transparent">
                your day stands.
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Every post you make counts toward the day automatically. One
              page for Food, one for Fitness, six boxes each, and every box
              opens a full page of charts. No double entry, no second app.
            </p>
          </div>
        </AnimateIn>

        {/* Food | Fitness switcher */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimateIn>
            <div className="flex flex-col items-center">
              <div
                className="flex w-[240px] rounded-full bg-gray-100 p-1"
                role="tablist"
                aria-label="Tracking page"
              >
                {pages.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    role="tab"
                    aria-selected={activeId === page.id}
                    onClick={() => setActiveId(page.id)}
                    className={`relative flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
                      activeId === page.id
                        ? 'text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {activeId === page.id && (
                      <motion.span
                        layoutId="tracking-tab"
                        className="absolute inset-0 rounded-full bg-gray-950"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{page.label}</span>
                  </button>
                ))}
              </div>

              <div className="relative mt-8 w-[260px] sm:w-[300px]">
                <div className="relative aspect-[1022/2082]">
                  {pages.map((page) => (
                    <motion.div
                      key={page.id}
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        opacity: activeId === page.id ? 1 : 0,
                        scale: activeId === page.id ? 1 : 0.97,
                      }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      style={{ pointerEvents: activeId === page.id ? 'auto' : 'none' }}
                    >
                      <Device className="w-full" screen={page.image} alt={page.alt} />
                    </motion.div>
                  ))}
                </div>
                <Chip className="-left-4 top-24 animate-float sm:-left-14">
                  {activeId === 'food' ? '🎯 411 cal left' : '🔥 2,751 kcal burned'}
                </Chip>
                <Chip
                  className="-right-4 bottom-28 animate-float-delayed sm:-right-14"
                  style={{ animationDelay: '1.2s' }}
                >
                  {activeId === 'food' ? '🔥 210 day streak' : '🏃 19 mi this week'}
                </Chip>
              </div>
            </div>
          </AnimateIn>

          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {active.id === 'food'
                    ? 'The Food page.'
                    : 'The Fitness page.'}
                </h3>
                <p className="mt-3 text-lg text-gray-600">
                  {active.id === 'food'
                    ? 'One day at a glance, then the meals you posted underneath it.'
                    : 'What you burned, how far you went, and whether your goals are on pace.'}
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {active.boxes.map((box) => (
                    <div
                      key={box.title}
                      className="flex gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-[#0077cc]/30 hover:bg-white"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg ${box.color}`}
                      >
                        {box.emoji}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{box.title}</div>
                        <p className="mt-0.5 text-sm leading-relaxed text-gray-600">
                          {box.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Workouts: burned meets eaten */}
        <div className="mt-28 grid items-center gap-12 sm:mt-36 lg:grid-cols-2 lg:gap-16">
          <AnimateIn>
            <div className="max-w-lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-2xl">
                  🏃
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Burned meets eaten.
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Log a run by hand or sync Strava and Apple Health. Every session
                lands in the feed with the route drawn in, splits, pace, heart
                rate zones, and the net effect on your day: eaten, burned, and
                what is left. Lifts, rides, swims, and yoga count too.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {workoutTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <div className="relative mx-auto flex w-fit items-end justify-center px-4 sm:px-8">
              <div className="relative z-10 w-[160px] translate-x-3 -rotate-6 sm:w-[250px] sm:translate-x-8">
                <Device
                  screen={workoutMapImg}
                  alt="An InstaCal workout: a 9.06 mile lunch run drawn as a route through Chicago on a map, with likes and comments"
                  sizes="250px"
                />
              </div>
              <div className="relative z-20 -ml-6 w-[170px] -translate-y-4 rotate-3 sm:-ml-10 sm:w-[260px] sm:-translate-y-6">
                <Device
                  screen={workoutNetImg}
                  alt="An InstaCal workout: distance, time, pace, climb, heart rate, calories burned, the net effect on the day, and heart rate zones"
                  sizes="260px"
                />
              </div>
              <Chip className="left-0 top-16 animate-float">
                🏃 9.06 mi · 8:43 /mi
              </Chip>
              <Chip
                className="right-0 bottom-24 animate-float-delayed sm:-right-4"
                style={{ animationDelay: '1.5s' }}
              >
                🔥 −1,006 kcal · 381 left
              </Chip>
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
