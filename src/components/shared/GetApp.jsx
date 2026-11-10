'use client'

import { useEffect, useState } from 'react'

const APP_STORE_URL = 'https://apps.apple.com/us/app/instacal/id6743951306'
const ANDROID_PACKAGE = 'com.digitaldelight.InstaCal'
const DEFERRED_LINK_URL =
  (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rrcwrqstlvauzdsjfriq.supabase.co') +
  '/functions/v1/deferred-link'

const usePlatform = () => {
  const [platform, setPlatform] = useState('other')
  useEffect(() => {
    const ua = navigator.userAgent
    if (/iPad|iPhone|iPod/.test(ua)) setPlatform('ios')
    else if (/Android/.test(ua)) setPlatform('android')
  }, [])
  return platform
}

/** The store for this phone. Android's link carries the code and the target through the install. */
const storeUrl = (platform, type, id, code) => {
  if (platform !== 'android') return APP_STORE_URL
  const referrer = [code ? `referral_code=${code}` : null, `share_target=${type}:${id}`]
    .filter(Boolean)
    .join('&')
  return `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}&referrer=${encodeURIComponent(referrer)}`
}

const appUrl = (type, id, code) => `instacal://${type}/${id}${code ? `?r=${code}` : ''}`

/**
 * Remembers this visit so the app can pick it up after a fresh install: the
 * phone's signals, the invite code the link carried and what was shared. The
 * app asks once on first launch (`match`) and opens on the same thing.
 * Draws nothing.
 */
export function ShareBeacon({ type, id, code }) {
  useEffect(() => {
    fetch(DEFERRED_LINK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'store',
        code: code ?? '',
        target: { type, id: String(id) },
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
  }, [type, id, code])
  return null
}

/** The top bar's button: the app if it is installed. */
export function OpenInApp({ type, id, code }) {
  return (
    <a
      href={appUrl(type, id, code)}
      className="flex h-11 items-center rounded-full bg-[#0077cc] px-[18px] text-[15px] font-semibold text-white hover:bg-[#0068b3]"
    >
      Open in app
    </a>
  )
}

/** The page's two buttons: get the app from this phone's store, or open it. */
export function GetApp({ type, id, code, label = 'Get InstaCal' }) {
  const platform = usePlatform()
  return (
    <div className="flex flex-col gap-3">
      <a
        href={storeUrl(platform, type, id, code)}
        className="flex h-[52px] items-center justify-center rounded-full bg-[#0077cc] text-base font-bold text-white hover:bg-[#0068b3]"
      >
        {label}
      </a>
      <a
        href={appUrl(type, id, code)}
        className="flex h-12 items-center justify-center rounded-full border border-[#DDE3EA] text-[15px] font-semibold text-[#10151C] hover:bg-[#F6F8FA]"
      >
        I already have it
      </a>
      {platform === 'other' ? (
        <p className="text-center text-[13px] text-[#566170]">
          On iPhone and Android.{' '}
          <a className="font-semibold text-[#0068b3]" href={storeUrl('android', type, id, code)}>
            Google Play
          </a>
        </p>
      ) : null}
    </div>
  )
}
