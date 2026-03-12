'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/Container'
import socialFeedImg from '@/images/screenshots/social-feed.PNG'
import slidesImg from '@/images/screenshots/slides.jpg'
import mapImg from '@/images/screenshots/map.jpg'
import profileImg from '@/images/screenshots/profile.jpg'

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
      <div className="relative mx-auto w-[260px] overflow-hidden rounded-[2.5rem] border-[6px] border-gray-800 bg-gray-900 shadow-2xl ring-1 ring-white/10 sm:w-[290px]">
        <div className="absolute left-1/2 top-0 z-10 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-gray-800" />
        <div className="relative aspect-[9/19.5] overflow-hidden bg-white">
          {children}
        </div>
      </div>
    </div>
  )
}

export function SocialFeatures() {
  return (
    <section id="social" className="overflow-hidden bg-white py-24 sm:py-32">
      <Container>
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-[#0077cc]/5 px-4 py-2">
              <svg className="h-4 w-4 text-[#0077cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <span className="text-sm font-semibold text-[#0077cc]">Social</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Nutrition Meets{' '}
              <span className="bg-gradient-to-r from-[#0077cc] to-cyan-500 bg-clip-text text-transparent">
                Social Media
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              InstaCal is the only calorie tracker with a full social
              experience. Share meals, discover food near you, follow friends,
              and stay accountable together.
            </p>
          </div>
        </AnimateIn>

        {/* Feature 1: Social Feed */}
        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimateIn className="order-2 lg:order-1">
            <div className="flex justify-center">
              <PhoneMockup>
                <Image
                  src={socialFeedImg}
                  alt="InstaCal social feed showing friends meals with full nutrition breakdown, likes and comments"
                  fill
                  className="object-cover object-top"
                  sizes="290px"
                />
              </PhoneMockup>
            </div>
          </AnimateIn>
          <AnimateIn className="order-1 lg:order-2" delay={0.2}>
            <div className="max-w-lg">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Your Food Feed
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                See what your friends are eating in a beautiful meal feed. Every
                post shows the full nutrition breakdown including calories, protein,
                carbs, and fat with the actual food photo. Like, comment,
                bookmark, and share meals that inspire you.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {['Likes & Comments', 'Bookmark Meals', 'Share Posts', 'Macro Badges'].map((tag) => (
                  <span key={tag} className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Feature 2: Slides/Reels */}
        <div className="mt-32 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimateIn delay={0.1}>
            <div className="max-w-lg lg:ml-auto">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Swipe Through Meals
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Full-screen meal discovery, like TikTok but for food. Swipe
                through stunning meal photos from the community with full
                nutrition facts and restaurant locations. Filter by
                &quot;For You&quot; or &quot;Nearby&quot; to find meals that
                match your goals.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {['Full-Screen Photos', 'Location Tags', 'For You Algorithm', 'Nearby Filter'].map((tag) => (
                  <span key={tag} className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className="flex justify-center">
              <PhoneMockup>
                <Image
                  src={slidesImg}
                  alt="InstaCal slides view with full-screen meal photos, location tags, and nutrition overlay"
                  fill
                  className="object-cover object-top"
                  sizes="290px"
                />
              </PhoneMockup>
            </div>
          </AnimateIn>
        </div>

        {/* Feature 3: Nearby Map */}
        <div className="mt-32 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimateIn className="order-2 lg:order-1">
            <div className="flex justify-center">
              <PhoneMockup>
                <Image
                  src={mapImg}
                  alt="InstaCal map view showing meal pins at restaurants across Chicago with search and explore features"
                  fill
                  className="object-cover object-top"
                  sizes="290px"
                />
              </PhoneMockup>
            </div>
          </AnimateIn>
          <AnimateIn className="order-1 lg:order-2" delay={0.2}>
            <div className="max-w-lg">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0077cc] to-cyan-500">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <span className="rounded-full bg-gradient-to-r from-[#0077cc] to-cyan-400 px-3 py-1 text-xs font-bold text-white">
                  PRO
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Explore Meals on the Map
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                See every meal posted at restaurants and places near you on an
                interactive map. Tap any pin to see what people ordered, check
                the macros, save your favorite spots, and get directions.
                Discover the best meals around your city.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {['Interactive Map', 'Restaurant Pages', 'Save Favorites', 'Get Directions'].map((tag) => (
                  <span key={tag} className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Feature 4: Profile & Community */}
        <div className="mt-32 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimateIn delay={0.1}>
            <div className="max-w-lg lg:ml-auto">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Your Fitness Profile
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Your profile is your visual food journal. Every meal you log
                builds your grid, just like Instagram but for nutrition. Track
                your streak, share your profile, follow friends, and build a
                community that keeps each other accountable. Go private or
                public anytime.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {['Photo Grid', 'Streak Tracking', 'Follow Friends', 'Privacy Controls'].map((tag) => (
                  <span key={tag} className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className="flex justify-center">
              <PhoneMockup>
                <Image
                  src={profileImg}
                  alt="InstaCal profile page showing meal photo grid, streak counter, followers and post count"
                  fill
                  className="object-cover object-top"
                  sizes="290px"
                />
              </PhoneMockup>
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
