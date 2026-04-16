'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '@/images/logos/InstaCal_logo.png'

const APP_STORE_URL =
  'https://apps.apple.com/us/app/instacal/id6743951306'
const ANDROID_PACKAGE = 'com.digitaldelight.InstaCal'
const DEFERRED_LINK_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? process.env.NEXT_PUBLIC_SUPABASE_URL + '/functions/v1/deferred-link'
  : null

export function ReferralLanding({ code }) {
  const [platform, setPlatform] = useState('other')

  const deepLink = `instacal://r/${code}`

  // Play Store link with referrer param for deferred deep linking.
  // After install, the app reads the referrer via expo-application
  // and extracts the referral code from it.
  const playStoreUrl = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}&referrer=${encodeURIComponent(`referral_code=${code}`)}`

  useEffect(() => {
    const ua = navigator.userAgent
    if (/iPad|iPhone|iPod/.test(ua)) {
      setPlatform('ios')
    } else if (/Android/.test(ua)) {
      setPlatform('android')
    }

    // Store a device fingerprint so the app can recover the referral code
    // after a fresh install (deferred deep linking). Fire-and-forget.
    if (DEFERRED_LINK_URL) {
      fetch(DEFERRED_LINK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'store',
          code,
          fingerprint: {
            ua: navigator.userAgent,
            sw: screen.width,
            sh: screen.height,
            dpr: window.devicePixelRatio,
            lang: navigator.language,
            tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
            platform: navigator.platform,
          },
        }),
      }).catch(() => {})
    }
  }, [code])

  function handleOpenApp() {
    window.location.href = deepLink
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm text-center">
        <Image
          src={logo}
          alt="InstaCal"
          width={80}
          height={80}
          className="mx-auto rounded-2xl"
          priority
        />

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
          You&apos;ve been invited to InstaCal
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Download the app and enter code{' '}
          <span className="font-bold text-blue-600">{code}</span>{' '}
          during signup to get free Premium days.
        </p>

        <button
          onClick={handleOpenApp}
          className="mt-8 w-full rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Open in App
        </button>

        <div className="mt-6">
          <p className="mb-3 text-xs text-gray-400">
            Don&apos;t have the app yet?
          </p>
          <div className="flex items-center justify-center gap-3">
            {(platform === 'ios' || platform === 'other') && (
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
            )}
            {(platform === 'android' || platform === 'other') && (
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.5 1.449a1 1 0 0 1 0 1.732l-2.5 1.45-2.535-2.535 2.535-2.096zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                Google Play
              </a>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-blue-50 px-4 py-3">
          <p className="text-sm text-blue-700">
            Your code: <span className="font-bold">{code}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
