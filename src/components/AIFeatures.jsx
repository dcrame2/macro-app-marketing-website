'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/Container'
import { Device } from '@/components/Device'
import { AnimateIn } from '@/components/AnimateIn'
import mealMacrosImg from '@/images/screenshots/v2/meal-macros.webp'

function WandIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      />
    </svg>
  )
}

function ChatIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    </svg>
  )
}

function ChartIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  )
}

function CheckIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  )
}

/* ---------- Scan demo centerpiece ---------- */

const detectedIngredients = [
  { name: 'Ramen Noodles', detail: '7 oz', cal: 390, side: 'right', top: '22%' },
  { name: 'Tonkotsu Broth', detail: '2 cups', cal: 330, side: 'left', top: '40%' },
  { name: 'Pork Belly Chashu', detail: '3 oz', cal: 320, side: 'right', top: '58%' },
]

function ScanDemo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <div ref={ref} className="relative mx-auto w-fit px-10 sm:px-16">
      <div className="relative w-[250px] sm:w-[280px]">
        <div
          className="absolute inset-6 rounded-[3rem] bg-[#0077cc]/35 blur-3xl"
          aria-hidden="true"
        />
        <Device
          className="relative"
          screen={mealMacrosImg}
          alt="InstaCal meal detail for a tonkotsu ramen: 1,260 calories in a ring, protein, carbs, fat, and sugar against the day, a Coach note, the ingredients on the plate, and a Fix with AI button"
        >
          {/* Scan beam */}
          <div
            className="absolute left-0 z-10 h-20 w-full animate-scan"
            aria-hidden="true"
          >
            <div className="h-full w-full bg-gradient-to-b from-transparent via-cyan-400/25 to-cyan-400/60" />
            <div className="h-[2px] w-full bg-cyan-300 shadow-[0_0_16px_2px_rgba(34,211,238,0.8)]" />
          </div>
        </Device>
      </div>

      {/* Detected ingredient chips */}
      {detectedIngredients.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{
            opacity: 0,
            scale: 0.5,
            x: item.side === 'right' ? -12 : 12,
          }}
          animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
          transition={{
            delay: 0.8 + i * 0.5,
            type: 'spring',
            stiffness: 260,
            damping: 18,
          }}
          className={`absolute z-20 ${item.side === 'right' ? 'right-0 sm:right-2' : 'left-0 sm:left-2'}`}
          style={{ top: item.top }}
        >
          <div
            className="animate-float rounded-xl border border-white/10 bg-gray-900/90 px-3 py-2 shadow-xl shadow-black/40 backdrop-blur-md"
            style={{ animationDelay: `${i * 1.2}s` }}
          >
            <div className="flex items-center gap-1.5">
              <CheckIcon className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-white">
                {item.name}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-gray-400">
              {item.detail} · {item.cal} cal
            </p>
          </div>
        </motion.div>
      ))}

      {/* Total card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2.5, type: 'spring', stiffness: 200, damping: 20 }}
        className="absolute -bottom-6 left-1/2 z-20 w-max -translate-x-1/2"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-gray-900/95 px-5 py-3 shadow-2xl shadow-cyan-500/10 backdrop-blur-md">
          <span className="text-xl font-extrabold text-white">1,260</span>
          <span className="-ml-2 text-xs text-gray-400">cal</span>
          <span className="h-4 w-px bg-white/10" />
          <span className="text-xs font-semibold text-emerald-400">40g P</span>
          <span className="text-xs font-semibold text-amber-400">96g C</span>
          <span className="text-xs font-semibold text-rose-400">79g F</span>
        </div>
      </motion.div>
    </div>
  )
}

/* ---------- Card mockups ---------- */

function AIFixMockup() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className="space-y-2.5">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="rounded-lg bg-white/5 px-3 py-2.5"
      >
        <div className="text-[10px] font-medium text-gray-500">You said:</div>
        <div className="mt-0.5 text-xs text-white">
          &quot;The chashu was 5 oz and I skipped the egg&quot;
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 18 }}
        className="rounded-lg border border-green-500/20 bg-green-500/5 px-3 py-2.5"
      >
        <div className="flex items-center gap-1">
          <CheckIcon className="h-3.5 w-3.5 text-green-400" />
          <span className="text-[10px] font-bold text-green-400">Updated</span>
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-300">Pork Belly Chashu</span>
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 line-through">3 oz</span>
              <span className="font-semibold text-white">5 oz</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-rose-400">Soft Boiled Egg</span>
            <span className="font-semibold text-white">removed</span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2 text-xs">
          <span className="text-gray-400">New total</span>
          <span className="font-bold text-white">1,400 cal</span>
        </div>
      </motion.div>
    </div>
  )
}

const coachThread = [
  {
    from: 'coach',
    headline: 'Late Night Ramen Hits Hard',
    verdict: 'Watch',
    text: 'That Tonkotsu Ramen packed in 1,260 cal but left you short on protein. You are at 98g today.',
  },
  {
    from: 'user',
    text: 'What should dinner be tomorrow?',
  },
  {
    from: 'coach',
    text: 'Something lean, 40g protein and under 600 cal. Your saved chicken rice bowl fits. Want me to deal you a plate?',
  },
]

function CoachMockup() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className="space-y-2.5">
      {coachThread.map((message, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            delay: i * 0.5,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className={
            message.from === 'user'
              ? 'ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-[#0077cc] px-3 py-2 text-xs text-white'
              : 'mr-auto max-w-[90%] rounded-xl rounded-bl-sm bg-white/10 px-3 py-2 text-xs leading-relaxed text-gray-200'
          }
        >
          {message.headline && (
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="font-bold text-white">{message.headline}</span>
              <span className="rounded-full bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-300">
                {message.verdict}
              </span>
            </div>
          )}
          {message.text}
        </motion.div>
      ))}
    </div>
  )
}

function InsightsMockup() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className="space-y-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 text-base font-black text-white">
          84
        </div>
        <div>
          <div className="text-xs font-bold text-white">Days logged, last 12 weeks</div>
          <div className="text-[11px] text-gray-400">
            0 missed. Sundays are the most common gap.
          </div>
        </div>
      </motion.div>
      <div className="space-y-2">
        {[
          { label: 'Protein vs target', score: 57, color: 'bg-emerald-500' },
          { label: 'Days on target', score: 71, color: 'bg-[#0077cc]' },
          { label: 'Training goal pace', score: 85, color: 'bg-orange-500' },
        ].map((item, i) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between text-[11px]">
              <span className="text-gray-400">{item.label}</span>
              <span className="font-semibold text-white">{item.score}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-gray-800">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${item.score}%` } : {}}
                transition={{
                  delay: 0.3 + i * 0.15,
                  duration: 0.8,
                  ease: 'easeOut',
                }}
                className={`h-full rounded-full ${item.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Cards config ---------- */

const aiCards = [
  {
    title: 'Fix with AI',
    badge: 'FREE',
    badgeStyle: 'border-green-500/30 bg-green-500/20 text-green-400',
    icon: WandIcon,
    description:
      'Wrong portion? Missing ingredient? Say it in plain English and the whole plate recalculates.',
    mockup: AIFixMockup,
  },
  {
    title: 'InstaCal Coach',
    badge: 'IN YOUR DMS',
    badgeStyle: 'border-[#0077cc]/30 bg-[#0077cc]/20 text-sky-300',
    icon: ChatIcon,
    description:
      'A coach that reads every meal and workout you log, recaps your day, and answers questions right in your DMs. Notes are free. Unlimited chat is Pro.',
    mockup: CoachMockup,
  },
  {
    title: 'Insight Pages',
    badge: 'PRO',
    badgeStyle: 'border-[#0077cc]/30 bg-[#0077cc]/20 text-sky-300',
    icon: ChartIcon,
    description:
      "Every tracking box opens a full page of charts with the Coach's read: calories, macros, streak, burned, distance, training, trends, and progress.",
    mockup: InsightsMockup,
  },
]

export function AIFeatures() {
  return (
    <section
      id="ai"
      className="relative overflow-hidden bg-gray-950 py-24 sm:py-32"
    >
      <div
        className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[#0077cc]/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <AnimateIn amount={0.3}>
            <div className="mx-auto max-w-xl text-center lg:text-left">
              <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 lg:mx-0">
                <WandIcon className="h-4 w-4 text-[#0077cc]" />
                <span className="text-sm font-semibold text-[#0077cc]">
                  AI-Powered
                </span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                You take the photo.
                <br />
                <span className="bg-gradient-to-r from-[#0077cc] to-cyan-400 bg-clip-text text-transparent">
                  AI does the math.
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-400">
                Point your camera at any plate. InstaCal breaks it into
                ingredients, weighs the portions, totals the macros, and tells
                you where that leaves your day. No typing, no database digging,
                no guesswork.
              </p>
              <ul className="mt-8 space-y-3 text-left">
                {[
                  'Per-ingredient breakdown from a single photo',
                  'Every plate scored against your goal, like Fits Build Muscle',
                  'Wrong guess? Fix it in plain English, for free',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0077cc]/20">
                      <CheckIcon className="h-3 w-3 text-cyan-400" />
                    </span>
                    <span className="text-sm text-gray-300 sm:text-base">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.2} amount={0.3}>
            <ScanDemo />
          </AnimateIn>
        </div>

        <div className="mx-auto mt-24 grid max-w-6xl gap-5 sm:mt-28 md:grid-cols-3">
          {aiCards.map((card, i) => (
            <AnimateIn key={card.title} delay={i * 0.15} amount={0.3}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#0077cc]/30 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-[#0077cc]/10">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0077cc]/20 to-cyan-500/10 ring-1 ring-[#0077cc]/20">
                    <card.icon className="h-5 w-5 text-[#0077cc]" />
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${card.badgeStyle}`}
                  >
                    {card.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-400">
                  {card.description}
                </p>
                <div className="mt-5 rounded-xl bg-gray-900/80 p-4 ring-1 ring-white/5">
                  <card.mockup />
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
