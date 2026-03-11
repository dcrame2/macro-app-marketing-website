'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/Container'
import { AppStoreLink } from '@/components/AppStoreLink'
import { PlayStoreLink } from '@/components/PlayStoreLink'

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

const freeFeatures = [
  'Photo meal scanning with AI',
  'Nutrition label scanning',
  'Manual food search',
  'Build your own meals',
  'Fix with AI corrections',
  'Social feed, slides, & discover',
  'Follow friends & community',
  'Likes, comments, & sharing',
  'Daily calorie tracking & charts',
  'Workout logging',
  'Streak tracking',
]

const proFeatures = [
  'Everything in Free, plus:',
  'Barcode scanning',
  'Save & bookmark meals',
  'AI Dietitian chat',
  'AI Insights & health scores',
  'Full macro charts (protein, carbs, fat, sugar)',
  'Extended stats (60/90 day views)',
  'Nearby meals map',
  'My Meals map view',
  'Nearby Slides',
  'Priority feature updates',
]

function CheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function Pricing() {
  const [yearly, setYearly] = useState(true)

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="bg-gray-50 py-24 sm:py-32"
    >
      <Container>
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-[#0077cc]/5 px-4 py-2">
              <svg className="h-4 w-4 text-[#0077cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
              <span className="text-sm font-semibold text-[#0077cc]">Pricing</span>
            </div>
            <h2
              id="pricing-title"
              className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
            >
              Start Free.{' '}
              <span className="bg-gradient-to-r from-[#0077cc] to-cyan-500 bg-clip-text text-transparent">
                Go Pro
              </span>{' '}
              When Ready.
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              InstaCal is packed with features for free. Upgrade to Pro to
              unlock the full experience.
            </p>

            {/* Billing toggle */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className={`text-sm font-medium ${!yearly ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setYearly(!yearly)}
                className={`relative h-7 w-14 rounded-full transition-colors ${yearly ? 'bg-[#0077cc]' : 'bg-gray-300'}`}
              >
                <div
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${yearly ? 'translate-x-7' : 'translate-x-0.5'}`}
                />
              </button>
              <span className={`text-sm font-medium ${yearly ? 'text-gray-900' : 'text-gray-500'}`}>
                Yearly
              </span>
              {yearly && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  Save 69%
                </span>
              )}
            </div>
          </div>
        </AnimateIn>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Free tier */}
          <AnimateIn delay={0.1}>
            <div className="h-full rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Free</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Everything you need to start tracking
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-extrabold text-gray-900">$0</span>
                  <span className="text-sm text-gray-500">/forever</span>
                </div>
              </div>

              <div className="my-8 h-px bg-gray-100" />

              <ul className="space-y-3">
                {freeFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex gap-3">
                <AppStoreLink color="black" />
                <PlayStoreLink color="black" />
              </div>
            </div>
          </AnimateIn>

          {/* Pro tier */}
          <AnimateIn delay={0.2}>
            <div className="relative h-full rounded-3xl border-2 border-[#0077cc] bg-white p-8 shadow-xl shadow-[#0077cc]/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-gradient-to-r from-[#0077cc] to-cyan-400 px-5 py-1.5 text-sm font-bold text-white shadow-lg shadow-[#0077cc]/25">
                  Most Popular
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Pro</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Unlock the full InstaCal experience
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {yearly ? '$2.49' : '$7.99'}
                    </span>
                    <span className="text-sm text-gray-500">/mo</span>
                  </div>
                  {yearly && (
                    <p className="mt-0.5 text-xs font-semibold text-[#0077cc]">
                      $29.99 billed yearly
                    </p>
                  )}
                </div>
              </div>

              <div className="my-8 h-px bg-gray-100" />

              <ul className="space-y-3">
                {proFeatures.map((feature, i) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-3 ${i === 0 ? 'font-semibold' : ''}`}
                  >
                    <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0077cc]" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex gap-3">
                <AppStoreLink color="black" />
                <PlayStoreLink color="black" />
              </div>
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
