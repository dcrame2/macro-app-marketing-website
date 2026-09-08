'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { Device } from '@/components/Device'
import { AppStoreLink } from '@/components/AppStoreLink'
import { PlayStoreLink } from '@/components/PlayStoreLink'
import feedImg from '@/images/screenshots/v2/hero-feed.webp'
import exploreImg from '@/images/screenshots/v2/explore.webp'

function FloatingCard({ children, className = '', style }) {
  return (
    <div
      className={`absolute z-20 rounded-2xl border border-white/10 bg-gray-900/85 shadow-xl shadow-black/30 backdrop-blur-md ${className}`}
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

function HeartIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  )
}

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

const heroStats = [
  { value: '5.0', label: 'App Store rating' },
  { value: '88', label: 'Badges to earn' },
  { value: '$0', label: 'To get started' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-950 pb-10 pt-32 sm:pt-44">
      {/* Animated gradient background */}
      <div
        className="absolute -left-40 -top-20 h-[600px] w-[600px] animate-pulse-glow rounded-full bg-[#0077cc]/25 blur-[128px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-40 bottom-0 h-[500px] w-[500px] animate-pulse-glow rounded-full bg-cyan-500/15 blur-[128px]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Left: Text content */}
          <div className="max-w-2xl text-center lg:text-left">
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

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl"
            >
              Where food
              <br />
              <span className="animate-gradient-x bg-gradient-to-r from-[#0077cc] via-cyan-400 to-[#0077cc] bg-[length:200%_auto] bg-clip-text text-transparent">
                meets your feed.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl lg:mx-0"
            >
              InstaCal turns every meal into a post. Follow your friends, find
              a plate that fits your macros, see where people actually eat, and
              let the tracking run itself.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4 lg:justify-start"
            >
              <AppStoreLink color="white" />
              <PlayStoreLink color="white" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-4 text-sm text-gray-500"
            >
              Free forever. Upgrade to Pro anytime.
            </motion.p>
          </div>

          {/* Right: Phone fan with floating social UI */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-16 shrink-0 px-12 lg:mt-0 lg:px-16"
          >
            {/* Back phone: Explore */}
            <div className="absolute -right-2 top-8 hidden w-[250px] rotate-[8deg] scale-[0.92] opacity-80 sm:block sm:w-[280px] lg:-right-8">
              <Device
                screen={exploreImg}
                alt="InstaCal Explore with calories and protein left today, the Plate Deck, meals that fit your macros, and trending recipes"
              />
            </div>

            {/* Front phone: the feed */}
            <div className="relative w-[250px] -rotate-3 sm:w-[280px]">
              <div
                className="absolute inset-6 rounded-[3rem] bg-[#0077cc]/40 blur-3xl"
                aria-hidden="true"
              />
              <Device
                className="relative"
                screen={feedImg}
                alt="InstaCal feed showing @dylan's steak with broccolini post with calories, carbs, fat, protein, and sugar"
                priority
              />
            </div>

            {/* Floating: like */}
            <FloatingCard className="-left-4 top-10 animate-float px-3 py-2.5 sm:-left-14 sm:px-4 sm:py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500/15">
                  <HeartIcon className="h-4 w-4 text-pink-500" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">
                    mia_lifts liked your meal
                  </p>
                  <p className="text-[10px] text-gray-400">just now</p>
                </div>
              </div>
            </FloatingCard>

            {/* Floating: goal fit */}
            <FloatingCard className="-right-6 top-1/3 animate-float-delayed px-3 py-2.5 sm:-right-16 sm:px-4 sm:py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15">
                  <CheckIcon className="h-4 w-4 text-emerald-400" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">
                    Fits Build Muscle
                  </p>
                  <p className="text-[10px] text-gray-400">53 g protein</p>
                </div>
              </div>
            </FloatingCard>

            {/* Floating: comment */}
            <FloatingCard
              className="-left-8 bottom-1/4 animate-float px-3 py-2.5 sm:-left-20 sm:px-4 sm:py-3"
              style={{ animationDelay: '1.5s' }}
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
                <div>
                  <p className="text-xs font-semibold text-white">
                    &quot;What are the macros?? 🔥&quot;
                  </p>
                  <p className="text-[10px] text-gray-400">2 min ago</p>
                </div>
              </div>
            </FloatingCard>

            {/* Floating: streak */}
            <FloatingCard
              className="-right-2 bottom-12 animate-float px-3 py-2.5 sm:-right-10 sm:px-4 sm:py-3"
              style={{ animationDelay: '3s' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🔥</span>
                <div>
                  <p className="text-xs font-semibold text-white">
                    210 day streak
                  </p>
                  <p className="text-[10px] text-gray-400">legendary</p>
                </div>
              </div>
            </FloatingCard>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-8 border-t border-white/10 pt-10">
          {heroStats.map((stat) => (
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
