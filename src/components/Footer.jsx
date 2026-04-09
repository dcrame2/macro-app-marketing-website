'use client'

import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { AppStoreLink } from './AppStoreLink'
import { PlayStoreLink } from './PlayStoreLink'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-gray-950">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center">
              <Logo width={36} height={36} />
              <div className="ml-4">
                <p className="text-base font-bold text-white">InstaCal</p>
                <p className="mt-1 text-sm text-gray-500">
                  AI-Powered Nutrition Tracking
                </p>
              </div>
            </div>
            <nav className="mt-8 flex flex-wrap gap-6">
              {[
                ['Features', '/#features'],
                ['AI', '/#ai'],
                ['Social', '/#social'],
                ['Pricing', '/#pricing'],
                ['FAQs', '/#faqs'],
                ['Privacy', '/privacy'],
                ['Partners', '/partners'],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex gap-3">
            <AppStoreLink color="white" />
            <PlayStoreLink color="white" />
          </div>
        </div>
        <div className="border-t border-white/5 py-6">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} InstaCal. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
