'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/Container'
import progressImg from '@/images/screenshots/progress.jpg'
import caloriesImg from '@/images/screenshots/calories.jpg'

function AnimateIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function PhoneMockup({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative mx-auto w-[260px] overflow-hidden rounded-[2.5rem] border-[6px] border-gray-800 bg-gray-900 shadow-2xl shadow-[#0077cc]/20 ring-1 ring-white/10 sm:w-[290px]">
        <div className="absolute left-1/2 top-0 z-10 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-gray-800" />
        <div className="relative aspect-[9/19.5] overflow-hidden bg-white">
          {children}
        </div>
      </div>
    </div>
  )
}

const statsHighlights = [
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.356 2.082a.75.75 0 01.364.634 4.4 4.4 0 001.447 2.954c1.326 1.222 2.598 2.694 3.263 4.467.668 1.781.65 3.771-.587 5.65a6.762 6.762 0 01-2.818 2.57.75.75 0 01-1.073-.555 4.036 4.036 0 00-.879-1.914c-.412-.476-.98-.868-1.735-.97a.75.75 0 01-.416-1.285c.44-.433.752-.977.852-1.612a3.245 3.245 0 00-.345-2.103c-.393-.676-.95-1.245-1.587-1.775a11.395 11.395 0 00-.644-.49l-.073-.053A.75.75 0 018 7.075c0 .08-.004.159-.012.237A10.143 10.143 0 007.5 9.393a8.63 8.63 0 00-.36-1.093c-.15-.363-.371-.75-.685-1.035a.75.75 0 00-1.205.6c0 .672-.32 1.381-.811 2.028a4.97 4.97 0 01-.654.719A6.757 6.757 0 002.25 14.5c0 1.875.76 3.571 1.99 4.801a.75.75 0 001.037.025 4.082 4.082 0 001.473-3.138.75.75 0 011.33-.476c.483.562.87 1.27 1.083 2.091.074.287.12.585.135.89a.75.75 0 001.162.549A6.74 6.74 0 0012.8 16.5c.052-.154.1-.31.142-.468a.75.75 0 011.42.186 8.24 8.24 0 01-.142 3.015.75.75 0 00.846.937A8.25 8.25 0 0021.75 12c0-2.657-1.248-4.92-2.702-6.646a18.05 18.05 0 00-2.13-2.16 15.49 15.49 0 00-.744-.609.75.75 0 00-.482-.164h-.006a.75.75 0 00-.518.207l-.003.003a15.395 15.395 0 00-2.809 3.451z" />
      </svg>
    ),
    title: 'Streak Tracking',
    description: 'Stay motivated with daily logging streaks. See how many consecutive days you have been on track.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Weekly Charts',
    description: 'See your calorie intake visualized day by day. Compare consumed vs burned across the week.',
    color: 'from-[#0077cc] to-cyan-400',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: 'Days on Target',
    description: 'Track how many days you hit 80%+ of your macro goals. Hit your targets consistently.',
    color: 'from-green-500 to-emerald-400',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: 'Trend Analysis',
    description: 'Weekly trend charts show your trajectory. See if you are moving toward or away from your goals.',
    color: 'from-purple-500 to-violet-400',
  },
]

export function StatsSection() {
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <Container>
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-[#0077cc]/5 px-4 py-2">
              <svg className="h-4 w-4 text-[#0077cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              <span className="text-sm font-semibold text-[#0077cc]">Analytics</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              See Your{' '}
              <span className="bg-gradient-to-r from-[#0077cc] to-cyan-500 bg-clip-text text-transparent">
                Progress
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Beautiful charts, streaks, and insights that keep you motivated
              and on track. Know exactly where you stand every day.
            </p>
          </div>
        </AnimateIn>

        {/* Phone mockups + feature highlights */}
        <div className="mt-20 grid items-center gap-16 lg:grid-cols-2">
          {/* Phone mockups side by side */}
          <AnimateIn>
            <div className="flex justify-center gap-4 sm:gap-6">
              <PhoneMockup className="-rotate-3">
                <Image
                  src={progressImg}
                  alt="InstaCal progress page showing streak counter, daily average, weekly calorie chart with consumed vs burned"
                  fill
                  className="object-cover object-top"
                  sizes="290px"
                />
              </PhoneMockup>
              <PhoneMockup className="hidden rotate-3 translate-y-8 sm:block">
                <Image
                  src={caloriesImg}
                  alt="InstaCal calories detail showing donut chart, top meals ranked by calories, and weekly trend line"
                  fill
                  className="object-cover object-top"
                  sizes="290px"
                />
              </PhoneMockup>
            </div>
          </AnimateIn>

          {/* Feature highlights */}
          <div className="space-y-6">
            {statsHighlights.map((item, i) => (
              <AnimateIn key={item.title} delay={i * 0.1}>
                <div className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#0077cc]/20 hover:shadow-lg hover:shadow-[#0077cc]/5">
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ${item.color}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>

        {/* Workout integration callout */}
        <AnimateIn>
          <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:mt-20 sm:p-10">
            <div className="flex flex-col items-center gap-8 sm:flex-row">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  Workout Tracking Built In
                </h3>
                <p className="mt-3 text-gray-600">
                  Auto-import workouts from Strava or Apple Health. Burned
                  calories factor into your net calorie tracking automatically.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Strava', 'Apple Health'].map((source) => (
                    <span
                      key={source}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                {[
                  { type: 'Running', cal: '420', time: '35 min', color: 'from-red-500 to-orange-500' },
                  { type: 'Weights', cal: '280', time: '45 min', color: 'from-blue-500 to-indigo-500' },
                  { type: 'Cycling', cal: '350', time: '40 min', color: 'from-green-500 to-emerald-500' },
                ].map((workout) => (
                  <div
                    key={workout.type}
                    className="flex w-24 flex-col items-center rounded-2xl border border-gray-100 bg-gray-50 p-3"
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${workout.color}`}>
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                    <span className="mt-2 text-xs font-semibold text-gray-900">{workout.type}</span>
                    <span className="text-[10px] text-gray-500">{workout.time}</span>
                    <span className="mt-1 text-xs font-bold text-red-500">-{workout.cal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
