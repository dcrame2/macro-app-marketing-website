'use client'

import { useEffect, useState } from 'react'

const until = (iso, now) => {
  const mins = Math.max(0, Math.floor((new Date(iso).getTime() - now) / 60000))
  const d = Math.floor(mins / 1440)
  const h = Math.floor((mins % 1440) / 60)
  const m = mins % 60
  if (d > 0) return `${d}d ${h}h`
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`
  return `${m}m`
}

/** "3d 6h", counting down in the visitor's browser; blank until it has mounted. */
export function RaceCountdown({ to }) {
  const [now, setNow] = useState(null)
  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(t)
  }, [])
  return <span suppressHydrationWarning>{now === null ? '' : until(to, now)}</span>
}

/** "Saturday, Nov 21 at 9:00 AM", in the visitor's own time. */
export function RaceInstant({ at }) {
  const [text, setText] = useState('')
  useEffect(() => {
    const d = new Date(at)
    setText(
      `${d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })} at ${d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`,
    )
  }, [at])
  return <span suppressHydrationWarning>{text}</span>
}
