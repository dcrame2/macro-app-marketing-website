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
    default:
      'InstaCal - AI Calorie Tracker & Social Nutrition App | Track Macros with Photos',
  },
  description:
    'The AI-powered calorie tracker with a social twist. Snap a photo to instantly track macros, share meals with friends, discover food on a map, and chat with an AI dietitian. Free on iOS & Android.',
  keywords: [
    'calorie tracker',
    'macro tracker',
    'nutrition app',
    'AI food scanner',
    'photo calorie counter',
    'social fitness app',
    'meal tracking app',
    'food diary',
    'macro counting',
    'barcode scanner food',
    'AI nutrition',
    'fitness tracker',
    'diet app',
    'food tracking social media',
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
    title: 'InstaCal - AI Calorie Tracker & Social Nutrition App',
    description:
      'Snap a photo to instantly track macros, share meals with friends, discover food on a map, and chat with an AI dietitian. Free on iOS & Android.',
    url: 'https://www.theinstacal.app/',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'InstaCal - Health Tracking Meets Social',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InstaCal - AI Calorie Tracker & Social Nutrition App',
    description:
      'Snap a photo to instantly track macros, share meals with friends, discover food on a map. Free on iOS & Android.',
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
