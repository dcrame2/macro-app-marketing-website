'use client'

import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components/Button'
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
      className="block text-base leading-7 tracking-tight text-gray-700"
      {...props}
    />
  )
}

export function Header() {
  return (
    <header>
      <nav>
        <div></div>
        <div className="fixed inset-x-0 top-0 z-50 h-px bg-gray-900/10 backdrop-blur" />
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link
              href="/"
              aria-label="Home"
              className="flex flex-row items-center gap-2"
            >
              <Logo width={42} height={42} className="w-auto" />
              <h3 className="font-bold">InstaCal</h3>
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <PopoverButton
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 ui-not-focus-visible:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
                  </PopoverButton>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <PopoverBackdrop
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
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
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
                        >
                          <div className="space-y-4">
                            <MobileNavLink href="/#features">
                              Features
                            </MobileNavLink>
                            <MobileNavLink href="/#reviews">
                              Reviews
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
            <div className="hidden flex-row gap-4 md:flex">
              <AppStoreLink color="black" />
              <PlayStoreLink color="black" />
            </div>
          </div>
        </Container>
      </nav>
    </header>
  )
}
