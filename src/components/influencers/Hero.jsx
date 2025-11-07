'use client'

import { useState } from 'react'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
  { name: 'Log in', href: '#' },
]

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block dark:fill-gray-900"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                {/* <div className="hidden sm:mb-10 sm:flex">
                  <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-white/10 dark:hover:ring-white/20">
                    Anim aute id magna aliqua ad ad non deserunt sunt.{' '}
                    <a
                      href="#"
                      className="whitespace-nowrap font-semibold text-indigo-600 dark:text-indigo-400"
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      Read more <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div> */}
                <h1 className="text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
                  InstaCal Influencer Partnerships
                </h1>
                <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8 dark:text-gray-400">
                  Create authentic content that helps people eat smarter — we’ll
                  handle links, tracking, and quick payouts.
                </p>
                {/* <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="#"
                    className="shadow-xs rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                  >
                    Get started
                  </a>
                  <a
                    href="#"
                    className="text-sm/6 font-semibold text-gray-900 dark:text-white"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 dark:bg-gray-800">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1483389127117-b6a2102724ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
            className="aspect-3/2 object-cover lg:aspect-auto lg:size-full"
          />
        </div>
      </div>
    </div>
  )
}
