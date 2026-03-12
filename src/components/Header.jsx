'use client'

import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import { AppStoreLink } from './AppStoreLink'
import { PlayStoreLink } from './PlayStoreLink'

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronUpIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobileNavLink(props) {
  return (
    <PopoverButton
      as={Link}
      className="block text-base font-medium leading-7 tracking-tight text-gray-700 transition-colors hover:text-[#0077cc]"
      {...props}
    />
  )
}

export function Header() {
  return (
    <header>
      <Popover as="nav">
        {({ open }) => (
          <>
            <div className="fixed inset-x-0 top-0 z-50 bg-gray-950/80 backdrop-blur-xl" />
            <Container className="relative z-50 flex justify-between py-5">
              <div className="relative z-10 flex items-center gap-16">
                <Link
                  href="/"
                  aria-label="Home"
                  className="flex flex-row items-center gap-2.5"
                >
                  <Logo width={36} height={36} className="w-auto" />
                  <h3
                    className={`text-lg font-bold tracking-tight transition-colors ${
                      open ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    InstaCal
                  </h3>
                </Link>
                <div className="hidden lg:flex lg:gap-10">
                  <NavLinks />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="lg:hidden">
                  <PopoverButton
                    className={`relative z-10 -m-2 inline-flex items-center rounded-lg p-2 ui-not-focus-visible:outline-none ${
                      open
                        ? 'stroke-gray-900 hover:bg-gray-100'
                        : 'stroke-white hover:bg-white/10 active:stroke-gray-400'
                    }`}
                    aria-label="Toggle site navigation"
                  >
                    {open ? (
                      <ChevronUpIcon className="h-6 w-6" />
                    ) : (
                      <MenuIcon className="h-6 w-6" />
                    )}
                  </PopoverButton>
                </div>
                <div className="hidden flex-row gap-4 md:flex">
                  <AppStoreLink color="white" />
                  <PlayStoreLink color="white" />
                </div>
              </div>
            </Container>
            <AnimatePresence initial={false}>
              {open && (
                <>
                  <PopoverBackdrop
                    static
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-gray-900/60 backdrop-blur"
                  />
                  <PopoverPanel
                    static
                    as={motion.div}
                    initial={{ opacity: 0, y: -32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: -32,
                      transition: { duration: 0.2 },
                    }}
                    className="absolute inset-x-0 top-0 z-40 origin-top rounded-b-2xl bg-white px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
                  >
                    <div className="space-y-4">
                      <MobileNavLink href="/#features">
                        Features
                      </MobileNavLink>
                      <MobileNavLink href="/#ai">AI</MobileNavLink>
                      <MobileNavLink href="/#social">
                        Social
                      </MobileNavLink>
                      <MobileNavLink href="/#pricing">
                        Pricing
                      </MobileNavLink>
                      <MobileNavLink href="/#faqs">FAQs</MobileNavLink>
                    </div>
                    <div className="mt-8 flex w-fit flex-col gap-4">
                      <AppStoreLink color="black" />
                      <PlayStoreLink color="black" />
                    </div>
                  </PopoverPanel>
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </Popover>
    </header>
  )
}
