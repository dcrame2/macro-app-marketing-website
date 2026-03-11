'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/Container'

function AnimateIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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

function WandIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  )
}

function ChatIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  )
}

function SparklesIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  )
}

function AIFixMockup() {
  return (
    <div className="space-y-2">
      <div className="rounded-lg bg-white/5 px-2.5 py-2">
        <div className="text-[9px] font-medium text-gray-500">You said:</div>
        <div className="mt-0.5 text-[11px] text-white">&quot;The chicken is 8oz, add ranch&quot;</div>
      </div>
      <div className="rounded-lg border border-green-500/20 bg-green-500/5 px-2.5 py-2">
        <div className="flex items-center gap-1">
          <svg className="h-3 w-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
          <span className="text-[9px] font-bold text-green-400">Updated</span>
        </div>
        <div className="mt-1.5 space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-300">Chicken</span>
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 line-through">6oz</span>
              <span className="font-semibold text-white">8oz</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium text-green-400">+ Ranch</span>
            <span className="font-semibold text-white">2 tbsp</span>
          </div>
        </div>
        <div className="mt-1.5 flex items-center justify-between border-t border-white/10 pt-1.5 text-[11px]">
          <span className="text-gray-400">New total</span>
          <span className="font-bold text-white">580 cal</span>
        </div>
      </div>
    </div>
  )
}

function AIDietitianMockup() {
  return (
    <div className="space-y-2">
      <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-[#0077cc] px-3 py-2 text-[11px] text-white">
        Am I eating too many carbs this week?
      </div>
      <div className="mr-auto max-w-[85%] rounded-xl rounded-bl-sm bg-white/10 px-3 py-2 text-[11px] leading-relaxed text-gray-200">
        Your carbs are at 48% — above your 40% target. Try a protein-focused dinner tonight.
      </div>
      <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-[#0077cc] px-3 py-2 text-[11px] text-white">
        Greek yogurt with berries?
      </div>
      <div className="mr-auto max-w-[85%] rounded-xl rounded-bl-sm bg-white/10 px-3 py-2 text-[11px] leading-relaxed text-gray-200">
        Great choice! ~18g protein, only 15g carbs.
      </div>
    </div>
  )
}

function AIInsightsMockup() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 text-sm font-black text-white">
          87
        </div>
        <div>
          <div className="text-[11px] font-bold text-white">Health Score</div>
          <div className="text-[10px] text-gray-400">Great protein balance</div>
        </div>
      </div>
      <div className="space-y-1.5">
        {[
          { label: 'Protein', score: 92, color: 'bg-blue-500' },
          { label: 'Fiber', score: 78, color: 'bg-green-500' },
          { label: 'Micros', score: 85, color: 'bg-amber-500' },
        ].map((item) => (
          <div key={item.label}>
            <div className="mb-0.5 flex items-center justify-between text-[10px]">
              <span className="text-gray-400">{item.label}</span>
              <span className="font-semibold text-white">{item.score}</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-gray-800">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AIFeatures() {
  return (
    <section id="ai" className="relative overflow-hidden bg-gray-950 py-24 sm:py-32">
      {/* Background glow */}
      <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[#0077cc]/10 blur-[120px]" aria-hidden="true" />
      <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" aria-hidden="true" />

      <Container className="relative">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <svg className="h-4 w-4 text-[#0077cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              <span className="text-sm font-semibold text-[#0077cc]">AI-Powered</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Your AI Nutrition{' '}
              <span className="bg-gradient-to-r from-[#0077cc] to-cyan-400 bg-clip-text text-transparent">
                Assistant
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              InstaCal does not just track — it thinks. Fix mistakes instantly,
              get personalized advice, and understand your nutrition at a deeper
              level.
            </p>
          </div>
        </AnimateIn>

        {/* 3-column grid */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-3 md:grid-cols-3">
          {/* AI Fix */}
          <AnimateIn>
            <div className="group h-full rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-all duration-500 hover:border-[#0077cc]/30 hover:bg-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#0077cc]/20 to-cyan-500/10 ring-1 ring-[#0077cc]/20">
                  <WandIcon className="h-3.5 w-3.5 text-[#0077cc]" />
                </div>
                <span className="rounded-full border bg-green-500/20 px-2 py-0.5 text-[9px] font-bold text-green-400 border-green-500/30">
                  FREE
                </span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-white">Fix with AI</h3>
              <p className="mt-1 text-[11px] leading-relaxed text-gray-400">
                Tell the AI what to fix and it instantly recalculates everything.
              </p>
              <div className="mt-3 rounded-lg bg-gray-900/80 p-3 ring-1 ring-white/5">
                <AIFixMockup />
              </div>
            </div>
          </AnimateIn>

          {/* AI Dietitian */}
          <AnimateIn delay={0.15}>
            <div className="group h-full rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-all duration-500 hover:border-[#0077cc]/30 hover:bg-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#0077cc]/20 to-cyan-500/10 ring-1 ring-[#0077cc]/20">
                  <ChatIcon className="h-3.5 w-3.5 text-[#0077cc]" />
                </div>
                <span className="rounded-full border bg-[#0077cc]/20 px-2 py-0.5 text-[9px] font-bold text-[#0077cc] border-[#0077cc]/30">
                  PRO
                </span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-white">AI Dietitian</h3>
              <p className="mt-1 text-[11px] leading-relaxed text-gray-400">
                Chat with a personal AI dietitian that knows your eating patterns.
              </p>
              <div className="mt-3 rounded-lg bg-gray-900/80 p-3 ring-1 ring-white/5">
                <AIDietitianMockup />
              </div>
            </div>
          </AnimateIn>

          {/* AI Insights */}
          <AnimateIn delay={0.3}>
            <div className="group h-full rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-all duration-500 hover:border-[#0077cc]/30 hover:bg-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#0077cc]/20 to-cyan-500/10 ring-1 ring-[#0077cc]/20">
                  <SparklesIcon className="h-3.5 w-3.5 text-[#0077cc]" />
                </div>
                <span className="rounded-full border bg-[#0077cc]/20 px-2 py-0.5 text-[9px] font-bold text-[#0077cc] border-[#0077cc]/30">
                  PRO
                </span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-white">AI Insights</h3>
              <p className="mt-1 text-[11px] leading-relaxed text-gray-400">
                AI-generated health scores and nutritional insights for every meal.
              </p>
              <div className="mt-3 rounded-lg bg-gray-900/80 p-3 ring-1 ring-white/5">
                <AIInsightsMockup />
              </div>
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
