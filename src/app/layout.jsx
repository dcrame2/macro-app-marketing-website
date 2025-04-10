import { Inter } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: {
    template: '%s - Pocket',
    default: 'InstaCal - Your Smartest Calorie Tracking App.',
  },
  description:
    'Scan meals, barcodes, or labels in seconds. InstaCal uses intelligent recognition to make tracking your nutrition seamless, accurate, and lightning fast.',
  openGraph: {
    title: 'InstaCal - Your Smartest Calorie Tracking App.',
    description:
      'Scan meals, barcodes, or labels in seconds. InstaCal uses intelligent recognition to make tracking your nutrition seamless, accurate, and lightning fast.',
    url: 'https://www.theinstacal.app/',
    images: [
      {
        url: '/src/images/logos/InstaCal_logo.png',
        width: 1200,
        height: 630,
        alt: 'InstaCal - Your Smartest Calorie Tracking App.',
      },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={clsx('bg-gray-50 antialiased', inter.variable)}>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-D4KJ9MJ0B8"
        ></script>
        <script>
          window.dataLayer = window.dataLayer || []; function gtag()
          {dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', 'G-D4KJ9MJ0B8');
        </script>
        <meta
          property="og:title"
          content="InstaCal - Your Smartest Calorie Tracking App."
        />
        <meta
          property="og:description"
          content="Scan meals, barcodes, or labels in seconds. InstaCal uses intelligent recognition to make tracking your nutrition seamless, accurate, and lightning fast."
        />
        <meta property="og:url" content="https://www.theinstacal.app" />
        <meta
          property="og:image"
          content="/src/images/logos/InstaCal_logo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          name="twitter:image"
          content="/src/images/logos/InstaCal_logo.png"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
