'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import mealScan from '@/images/app-images/meal_scan.png'
import barcode from '@/images/app-images/barcode.jpg'
import nutritionLabel from '@/images/app-images/nutrition_label.jpg'
import foodSearch from '@/images/app-images/food_search.jpg'
import buildMeal from '@/images/app-images/build_meal.jpg'
import savedMeal from '@/images/app-images/saved_meal.jpg'

const methods = [
  {
    name: 'Photo Scan',
    tagline: 'Snap. Done.',
    description:
      'Take a photo of any meal and our AI instantly identifies every ingredient and breaks down the macros. Home-cooked, restaurant plates, anything.',
    icon: CameraIcon,
    color: 'from-blue-500 to-cyan-400',
    free: true,
    image: mealScan,
  },
  {
    name: 'Barcode Scan',
    tagline: 'Scan. Post. Go.',
    description:
      'Point your camera at any product barcode and instantly pull up exact nutrition facts. No typing, no searching. Scan and post in under 2 seconds.',
    icon: BarcodeIcon,
    color: 'from-purple-500 to-pink-400',
    free: false,
    image: barcode,
  },
  {
    name: 'Label Scan',
    tagline: 'Read the label for you.',
    description:
      'Our AI reads nutrition labels with your camera and extracts all the data automatically. Perfect for packaged foods without a barcode.',
    icon: LabelIcon,
    color: 'from-green-500 to-emerald-400',
    free: true,
    image: nutritionLabel,
  },
  {
    name: 'Food Search',
    tagline: 'Search anything.',
    description:
      'Search our massive food database with natural language. Type "chicken burrito bowl" or "grande oat milk latte" and get accurate macros instantly.',
    icon: SearchIcon,
    color: 'from-orange-500 to-amber-400',
    free: true,
    image: foodSearch,
  },
  {
    name: 'Build a Meal',
    tagline: 'Piece it together.',
    description:
      'Build complex meals ingredient by ingredient. Perfect for recipes, meal prep, or when you know exactly what went into your plate.',
    icon: BuildIcon,
    color: 'from-rose-500 to-red-400',
    free: true,
    image: buildMeal,
  },
  {
    name: 'Saved Meals',
    tagline: 'One-tap repeats.',
    description:
      'Bookmark your favorite meals and post them again with a single tap. Great for meal prep, regular breakfasts, or go-to orders.',
    icon: SavedIcon,
    color: 'from-indigo-500 to-violet-400',
    free: false,
    image: savedMeal,
  },
]

function CameraIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    </svg>
  )
}

function BarcodeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
    </svg>
  )
}

function LabelIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  )
}

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  )
}

function BuildIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

function SavedIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
  )
}

function PhoneMockup({ children, hideNotch = false }) {
  return (
    <div className="relative mx-auto w-[260px] overflow-hidden rounded-[2.5rem] border-[6px] border-gray-800 bg-gray-900 shadow-2xl shadow-[#0077cc]/10 ring-1 ring-white/10 sm:w-[300px]">
      {!hideNotch && (
        <div className="absolute left-1/2 top-0 z-10 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-gray-800" />
      )}
      <div className="relative aspect-[9/19.5] overflow-hidden bg-white">
        {children}
      </div>
    </div>
  )
}

function MethodCard({ method, isActive, onClick, index }) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5 ${
        isActive
          ? 'border-[#0077cc]/40 bg-[#0077cc]/5 shadow-lg shadow-[#0077cc]/10 ring-1 ring-[#0077cc]/20'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br sm:h-12 sm:w-12 ${method.color}`}
        >
          <method.icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900">{method.name}</h3>
            {!method.free && (
              <span className="rounded-full bg-gradient-to-r from-[#0077cc] to-cyan-400 px-2.5 py-0.5 text-[10px] font-bold text-white">
                PRO
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-gray-500">{method.tagline}</p>
        </div>
        <svg
          className={`h-5 w-5 flex-shrink-0 transition-transform ${isActive ? 'rotate-90 text-[#0077cc]' : 'text-gray-300'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </button>
  )
}

export function LogMethods() {
  const [activeMethod, setActiveMethod] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="features" className="bg-gray-50 py-24 sm:py-32" ref={sectionRef}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-[#0077cc]/5 px-4 py-2">
            <svg className="h-4 w-4 text-[#0077cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            </svg>
            <span className="text-sm font-semibold text-[#0077cc]">6 Ways to Post</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Post Any Meal, Any Way
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Whether you are eating out, cooking at home, or meal prepping,
            there is a way to snap it, post it, and share it in seconds.
          </p>
        </motion.div>

        {/* Mobile: Tab bar + phone */}
        <div className="mt-12 lg:hidden">
          {/* Scrollable tabs */}
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-4 scrollbar-hide">
            {methods.map((method, i) => (
              <button
                key={method.name}
                onClick={() => setActiveMethod(i)}
                className={`flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                  activeMethod === i
                    ? 'bg-[#0077cc] text-white shadow-lg shadow-[#0077cc]/20'
                    : 'bg-white text-gray-700 ring-1 ring-gray-200'
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${method.color}`}
                >
                  <method.icon className="h-3.5 w-3.5 text-white" />
                </div>
                {method.name}
                {!method.free && (
                  <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                    activeMethod === i
                      ? 'bg-white/20 text-white'
                      : 'bg-[#0077cc]/10 text-[#0077cc]'
                  }`}>
                    PRO
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Phone + description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMethod}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-8 flex flex-col items-center"
            >
              <div className="mb-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {methods[activeMethod].name}
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-gray-600">
                  {methods[activeMethod].description}
                </p>
              </div>
              <PhoneMockup hideNotch={activeMethod < 3}>
                <Image
                  src={methods[activeMethod].image}
                  alt={`InstaCal ${methods[activeMethod].name} feature`}
                  fill
                  className="object-cover object-top"
                  sizes="300px"
                />
              </PhoneMockup>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop: Cards + phone side by side */}
        <div className="mt-16 hidden gap-16 lg:grid lg:grid-cols-2">
          {/* Method cards */}
          <div className="space-y-3">
            {methods.map((method, i) => (
              <MethodCard
                key={method.name}
                method={method}
                isActive={activeMethod === i}
                onClick={() => setActiveMethod(i)}
                index={i}
              />
            ))}
          </div>

          {/* Active method detail with phone mockup */}
          <div className="flex items-center justify-center">
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMethod}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900">
                      {methods[activeMethod].name}
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-gray-600">
                      {methods[activeMethod].description}
                    </p>
                  </div>
                  <PhoneMockup hideNotch={activeMethod < 3}>
                    <Image
                      src={methods[activeMethod].image}
                      alt={`InstaCal ${methods[activeMethod].name} feature`}
                      fill
                      className="object-cover object-top"
                      sizes="300px"
                    />
                  </PhoneMockup>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
