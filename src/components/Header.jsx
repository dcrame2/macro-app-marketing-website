'use client'

import Link from 'next/link'
import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Logo } from '@/components/Logo'
import { Icon } from '@/components/landing/LandingUI'

// What a visitor can look at without the app: one menu on a desktop, a
// labelled group on a phone.
const explore = [
  ['Plates', '/explore', 'What people are eating today'],
  ['Workouts', '/explore?f=workouts', 'Runs, rides and lifts'],
  ['Recipes', '/recipes', 'With the macros worked out'],
  ['Macro calculator', '/calculator', 'Your calories and protein'],
]

const links = [
  ['The social side', '/#social'],
  ['Food & fitness', '/#features'],
  ['Pricing', '/#pricing'],
  ['Blog', '/blog'],
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
              <Menu as="div" className="ic-nav-menu">
                <MenuButton className="ic-nav-menu-button">
                  Explore
                  <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </MenuButton>
                <MenuItems className="ic-nav-menu-items">
                  {explore.map(([label, href, line]) => (
                    <MenuItem key={href}>
                      <Link href={href}>
                        <strong>{label}</strong>
                        <span>{line}</span>
                      </Link>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
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
              <span className="ic-mobile-nav-label">Explore</span>
              {explore.map(([label, href]) => (
                <PopoverButton as={Link} key={href} href={href}>
                  {label}
                  <Icon name="arrow" />
                </PopoverButton>
              ))}
              <span className="ic-mobile-nav-label">InstaCal</span>
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
