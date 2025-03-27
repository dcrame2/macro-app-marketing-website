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
    default: 'Cal-Pal AI - Your Smartest Calorie Tracking Pal.',
  },
  description:
    'Scan meals, barcodes, or labels in seconds. Cal-Pal AI uses intelligent recognition to make tracking your nutrition seamless, accurate, and lightning fast.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={clsx('bg-gray-50 antialiased', inter.variable)}>
      <body>{children}</body>
    </html>
  )
}
