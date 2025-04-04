'use client'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { TextField } from '@/components/Fields'
import { Logo, Logomark } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import qrCode from '@/images/qr-code.svg'
import { AppStoreLink } from './AppStoreLink'
import { PlayStoreLink } from './PlayStoreLink'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'

function QrCodeBorder(props) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Footer() {
  const [hovered, setHovered] = useState(false)
  let timeoutRef = useRef(null)
  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-gray-900">
              <Logo />
              <div className="ml-4">
                <p className="text-base font-semibold">InstaCal</p>
                <p className="mt-1 text-sm">
                  Your Smartest Calorie Tracking App
                </p>
              </div>
            </div>
            <nav className="mt-11 flex flex-col gap-2 sm:flex-row sm:gap-8">
              <div className="flex gap-4">
                <NavLinks />
              </div>
              <Link
                href="/privacy"
                className="relative -mx-5 -my-2 block w-fit rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0 sm:inline-flex"
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current)
                  setHovered(true)
                }}
                onMouseLeave={() => {
                  timeoutRef.current = setTimeout(() => setHovered(false), 200)
                }}
              >
                <AnimatePresence>
                  {hovered && (
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-gray-100"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.15 } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">Privacy Policy</span>
              </Link>
            </nav>
          </div>
          <div className="group relative -mx-4 flex items-center self-stretch p-4 transition-colors hover:bg-gray-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6">
            <div className="flex justify-center gap-3">
              <AppStoreLink color="black" />
              <PlayStoreLink color="white" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center border-t border-gray-200 pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6">
          <form className="flex w-full justify-center md:w-auto">
            <TextField
              type="email"
              aria-label="Email address"
              placeholder="Email address"
              autoComplete="email"
              required
              className="w-60 min-w-0 shrink"
            />
            <Button
              type="submit"
              color="#0077cc"
              className="ml-4 flex-none bg-[#0077cc]"
            >
              <span className="hidden text-white lg:inline">
                Join our newsletter
              </span>
              <span className="text-white lg:hidden">Join newsletter</span>
            </Button>
          </form>
          <p className="mt-6 text-sm text-gray-500 md:mt-0">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
