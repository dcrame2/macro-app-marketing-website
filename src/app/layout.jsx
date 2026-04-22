import { Inter } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  metadataBase: new URL('https://www.theinstacal.app'),
  title: {
    template: '%s - InstaCal',
    default: 'InstaCal: The Social App for Food & Fitness',
  },
  description:
    'Where food meets your feed. Post meals, follow friends, discover food on a map, and track your macros automatically. The social network for food and fitness. Free on iOS & Android.',
  keywords: [
    'social food app',
    'food social network',
    'meal sharing app',
    'social media for food',
    'food feed app',
    'share meals with friends',
    'food discovery app',
    'social fitness app',
    'BeReal for food',
    'Instagram for food',
    'AI food scanner',
    'photo calorie counter',
    'calorie tracker with friends',
    'macro tracker',
    'meal tracking app',
    'instacal',
  ],
  authors: [{ name: 'InstaCal' }],
  creator: 'InstaCal',
  publisher: 'InstaCal',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'InstaCal',
    title: 'InstaCal: The Social App for Food & Fitness',
    description:
      'Where food meets your feed. Post meals, follow friends, discover food on a map, and track your macros automatically. Free on iOS & Android.',
    url: 'https://www.theinstacal.app/',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'InstaCal - Where Food Meets Your Feed',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InstaCal: The Social App for Food & Fitness',
    description:
      'Where food meets your feed. Post meals, follow friends, discover food on a map, and track your macros automatically. Free on iOS & Android.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: 'https://www.theinstacal.app/',
  },
  category: 'Health & Fitness',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={clsx('bg-gray-950 antialiased', inter.variable)}>
      <head>
        <link rel="canonical" href="https://www.theinstacal.app/" />
      </head>
      <body>{children}</body>
    </html>
  )
}
