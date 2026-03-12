'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { AppStoreLink } from '@/components/AppStoreLink'
import { PlayStoreLink } from '@/components/PlayStoreLink'
import homeScreen from '@/images/screenshots/home.jpg'

const subtitles = [
  'Health Tracking Meets Social.',
  'Snap a Photo. Get Instant Macros.',
  'AI-Powered Nutrition Coaching.',
  'Track Workouts & Meals Together.',
  'See What Friends Are Eating.',
]

function AnimatedSubtitle() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % subtitles.length)
        setVisible(true)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={`inline-block bg-gradient-to-r from-[#0077cc] to-cyan-400 bg-clip-text text-transparent transition-all duration-400 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
    >
      {subtitles[index]}
    </span>
  )
}

function PhoneMockup({ children, className = '' }) {
  return (
    <div className={className}>
      <div className="relative mx-auto w-[260px] overflow-hidden rounded-[2.5rem] border-[6px] border-gray-800 bg-gray-900 shadow-2xl shadow-[#0077cc]/20 ring-1 ring-white/10 sm:w-[280px]">
        <div className="absolute left-1/2 top-0 z-10 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-gray-800" />
        <div className="relative aspect-[9/19.5] overflow-hidden bg-white">
          {children}
        </div>
      </div>
    </div>
  )
}

function FloatingCard({ children, className = '', style }) {
  return (
    <div
      className={`absolute rounded-2xl border border-white/10 bg-gray-900/80 px-4 py-3 shadow-xl shadow-black/20 backdrop-blur-md ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

function StarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-950 pb-20 pt-32 sm:pb-32 sm:pt-44">
      {/* Animated gradient background */}
      <div
        className="animate-pulse-glow absolute -left-40 -top-20 h-[600px] w-[600px] rounded-full bg-[#0077cc]/20 blur-[128px]"
        aria-hidden="true"
      />
      <div
        className="animate-pulse-glow absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[128px]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-500/5 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* Desktop: side-by-side | Mobile: stacked */}
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Left: Text content */}
          <div className="max-w-2xl text-center lg:text-left">
            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto mb-8 flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-sm lg:mx-0"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-300">
                Rated 5.0 on the App Store
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-6xl font-extrabold tracking-tight text-white sm:text-8xl"
            >
              InstaCal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-2 text-2xl font-semibold sm:text-3xl"
            >
              <AnimatedSubtitle />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl lg:mx-0"
            >
              The AI-powered calorie tracker that feels like social media. Snap a
              photo of any meal, get instant macros, share with friends, and
              discover what people eat near you.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4 lg:justify-start"
            >
              <AppStoreLink color="white" />
              <PlayStoreLink color="white" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-4 text-sm text-gray-500"
            >
              Free forever. Upgrade to Pro anytime.
            </motion.p>
          </div>

          {/* Right: Phone with floating UI elements */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-16 shrink-0 px-12 lg:mt-0"
          >
            <PhoneMockup>
              <Image
                src={homeScreen}
                alt="InstaCal home dashboard showing daily calorie tracking with macro breakdown rings"
                fill
                className="object-cover object-top"
                sizes="280px"
                priority
              />
            </PhoneMockup>

            {/* Floating: Macro ring */}
            <FloatingCard className="-left-4 top-8 animate-float px-2.5 py-2 sm:-left-16 sm:top-12 sm:px-4 sm:py-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative h-8 w-8 sm:h-10 sm:w-10">
                  <svg className="h-8 w-8 -rotate-90 sm:h-10 sm:w-10" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="rgb(55 65 81)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#0077cc" strokeWidth="3" strokeDasharray="70 100" strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white sm:text-[10px]">
                    70%
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-white sm:text-xs">1,680 cal</p>
                  <p className="text-[8px] text-gray-400 sm:text-[10px]">of 2,400 goal</p>
                </div>
              </div>
            </FloatingCard>

            {/* Floating: AI scan result */}
            <FloatingCard className="-right-2 top-1/4 animate-float-delayed px-2.5 py-2 sm:-right-20 sm:top-1/3 sm:px-4 sm:py-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#0077cc]/20 sm:h-7 sm:w-7 sm:rounded-lg">
                  <span className="text-xs sm:text-sm">✨</span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-white sm:text-xs">AI Scanned</p>
                  <p className="text-[8px] text-gray-400 sm:text-[10px]">420 cal · 32g protein</p>
                </div>
              </div>
            </FloatingCard>

            {/* Floating: Social comment */}
            <FloatingCard className="-left-6 bottom-1/3 animate-float px-2.5 py-2 sm:-left-20 sm:bottom-1/4 sm:px-4 sm:py-3" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 sm:h-6 sm:w-6" />
                <div>
                  <p className="text-[10px] font-semibold text-white sm:text-xs">Nice meal! 🔥</p>
                  <p className="text-[8px] text-gray-400 sm:text-[10px]">2 min ago</p>
                </div>
              </div>
            </FloatingCard>

            {/* Floating: Streak badge */}
            <FloatingCard className="-right-1 bottom-20 animate-float px-2.5 py-2 sm:-right-14 sm:bottom-16 sm:px-4 sm:py-3" style={{ animationDelay: '3s' }}>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-sm sm:text-lg">🔥</span>
                <div>
                  <p className="text-[10px] font-semibold text-white sm:text-xs">12 Day Streak</p>
                  <p className="text-[8px] text-gray-400 sm:text-[10px]">Keep it up!</p>
                </div>
              </div>
            </FloatingCard>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-8 border-t border-white/10 pt-10">
          {[
            { value: '5.0', label: 'App Store Rating' },
            { value: '6', label: 'Ways to Log' },
            { value: '$0', label: 'To Get Started' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-gray-500 sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
