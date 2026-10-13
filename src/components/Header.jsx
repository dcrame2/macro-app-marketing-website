'use client'

import Link from 'next/link'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Logo } from '@/components/Logo'
import { Icon } from '@/components/landing/LandingUI'

const links = [
  ['The social side', '/#social'],
  ['Food & fitness', '/#features'],
  ['Pricing', '/#pricing'],
  ['Journal', '/blog'],
]

export function Header() {
  return (
    <header className="ic-header">
      <a href="#main-content" className="ic-skip-link">
        Skip to content
      </a>
      <Popover as="nav" className="ic-wrap ic-nav" aria-label="Main navigation">
        {({ open }) => (
          <>
            <Link href="/" className="ic-brand" aria-label="InstaCal home">
              <Logo width={38} height={38} />
              <span>
                InstaCal<span className="ic-brand-dot">.</span>
              </span>
            </Link>
            <div className="ic-desktop-nav">
              {links.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
            <div className="ic-nav-actions">
              <Link href="/#download" className="ic-nav-download">
                Get InstaCal <Icon name="diagonal" />
              </Link>
              <PopoverButton
                className="ic-menu-button"
                aria-label={open ? 'Close navigation' : 'Open navigation'}
              >
                <Icon name={open ? 'x' : 'menu'} />
              </PopoverButton>
            </div>
            <PopoverPanel className="ic-mobile-nav">
              {links.map(([label, href]) => (
                <PopoverButton as={Link} key={href} href={href}>
                  {label}
                  <Icon name="arrow" />
                </PopoverButton>
              ))}
              <PopoverButton
                as={Link}
                href="/#download"
                className="ic-mobile-get"
              >
                Get InstaCal <Icon name="diagonal" />
              </PopoverButton>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </header>
  )
}
