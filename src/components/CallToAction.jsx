'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { AppStoreLink } from '@/components/AppStoreLink'
import { Container } from '@/components/Container'
import { PlayStoreLink } from '@/components/PlayStoreLink'
import socialFeed from '@/images/screenshots/social-feed.PNG'
import slidesImg from '@/images/screenshots/slides.jpg'

function PhoneMockup({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative mx-auto w-[200px] overflow-hidden rounded-[2rem] border-[5px] border-gray-700 bg-gray-800 shadow-2xl shadow-[#0077cc]/30 ring-1 ring-white/10 sm:w-[220px]">
        <div className="absolute left-1/2 top-0 z-10 h-5 w-20 -translate-x-1/2 rounded-b-xl bg-gray-700" />
        <div className="relative aspect-[9/19.5] overflow-hidden bg-white">
          {children}
        </div>
      </div>
    </div>
  )
}

export function CallToAction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="relative overflow-hidden bg-gray-950 py-24 sm:py-32" ref={ref}>
      {/* Background effects */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <div className="h-[600px] w-[900px] rounded-full bg-[#0077cc]/20 blur-[150px]" />
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
            {/* Text content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6 flex justify-center gap-0.5 lg:justify-start">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-6 w-6 fill-yellow-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Your Food
                <br />
                <span className="bg-gradient-to-r from-[#0077cc] to-cyan-400 bg-clip-text text-transparent">
                  Deserves A Feed
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-400">
                Join the social network built for food and fitness. Post meals,
                follow friends, discover places, and hit your goals together.
                Free to download, free to use.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                <AppStoreLink color="white" />
                <PlayStoreLink color="white" />
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Available on iOS and Android. No credit card required.
              </p>
            </div>

            {/* Phone mockups */}
            <div className="flex gap-4 sm:gap-6">
              <PhoneMockup className="-rotate-6">
                <Image
                  src={socialFeed}
                  alt="InstaCal social feed with friends meal posts, likes, and comments"
                  fill
                  className="object-cover object-top"
                  sizes="220px"
                />
              </PhoneMockup>
              <PhoneMockup className="hidden rotate-6 translate-y-8 sm:block">
                <Image
                  src={slidesImg}
                  alt="InstaCal slides view showing full-screen meal photos and location tags"
                  fill
                  className="object-cover object-top"
                  sizes="220px"
                />
              </PhoneMockup>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
