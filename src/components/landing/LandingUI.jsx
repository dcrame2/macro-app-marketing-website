'use client'

import Image from 'next/image'
import { createContext, useContext } from 'react'
import { AppStoreLink } from '@/components/AppStoreLink'
import { PlayStoreLink } from '@/components/PlayStoreLink'
import { screens } from './screens'

export const ScreenshotContext = createContext(() => {})

const paths = {
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  diagonal: 'M6 18 18 6M6 6h12v12',
  heart:
    'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  check: 'm5 12 4 4L19 6',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  moon: 'M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z',
  map: 'm9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Zm0 0V3m6 3v15',
  people:
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M13 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  camera:
    'M14.5 4h-5L7 7H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-4l-2.5-3ZM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  spark: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z',
  run: 'm13 7-3 5 4 3-2 6m-2-9-4-1-3 4m8-7 5 3 4-1M16 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z',
  message: 'M21 11.5a8.5 8.5 0 0 1-8.5 8.5H3l1.5-5A8.5 8.5 0 1 1 21 11.5Z',
  bookmark: 'M6 3h12v18l-6-4-6 4V3Z',
  plus: 'M12 5v14M5 12h14',
  x: 'm6 6 12 12M6 18 18 6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  expand: 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5',
  trophy:
    'M8 3h8v7a4 4 0 0 1-8 0V3Zm0 2H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4m-4 2v5m-4 2h8',
  flame:
    'M12 3c1 5 6 7 6 12a6 6 0 1 1-12 0c0-3 2-5 3-7 0 3 1 4 2 4 2-2 2-5 1-9Z',
  lock: 'M6 10h12v11H6V10Zm2 0V6a4 4 0 0 1 8 0v4',
  plate: 'M4 2v7a3 3 0 0 0 6 0V2M7 2v20M19 2c-3 3-4 6-4 10h4m0-10v20',
  search: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
}

export function Icon({ name, className = '', filled = false, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`ic-icon ${className}`}
      {...props}
    >
      <path d={paths[name] || paths.spark} />
    </svg>
  )
}

export function StoreLinks({ light = false, className = '' }) {
  return (
    <div className={`ic-store-links ${className}`}>
      <AppStoreLink color={light ? 'white' : 'black'} />
      <PlayStoreLink color={light ? 'white' : 'black'} />
    </div>
  )
}

export function ProductPhone({
  screen = 'feed',
  theme = 'light',
  className = '',
  priority = false,
  sizes = '(max-width: 640px) 240px, 340px',
}) {
  const showScreenshot = useContext(ScreenshotContext)
  const item = screens[screen]
  const image = item[theme] || item.dark || item.light
  return (
    <button
      type="button"
      className={`ic-phone ${className}`}
      onClick={() => showScreenshot({ image, alt: item.alt })}
      aria-label={`Enlarge ${item.alt}`}
    >
      <span className="ic-phone-screen">
        <Image
          src={image}
          alt={item.alt}
          fill
          priority={priority}
          sizes={sizes}
        />
      </span>
      <span className="ic-phone-enlarge">
        <Icon name="expand" />
        <span>Take a closer look</span>
      </span>
    </button>
  )
}

export function Eyebrow({ children, light = false }) {
  return (
    <p className={`ic-eyebrow ${light ? 'ic-eyebrow-light' : ''}`}>
      <span />
      {children}
    </p>
  )
}

export function SectionHead({
  eyebrow,
  children,
  description,
  center = false,
}) {
  return (
    <div className={`ic-section-head ${center ? 'ic-center' : ''}`}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{children}</h2>
      </div>
      {description && <p className="ic-section-description">{description}</p>}
    </div>
  )
}
