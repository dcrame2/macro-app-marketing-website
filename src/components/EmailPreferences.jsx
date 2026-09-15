'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import logo from '@/images/logos/InstaCal_logo.png'

const API =
  (process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://rrcwrqstlvauzdsjfriq.supabase.co') +
  '/functions/v1/email-unsubscribe'

const SCOPES = [
  {
    key: 'weekly',
    field: 'email_weekly',
    label: 'Weekly recap',
    sub: 'Your week in numbers every Monday, and your Wrapped at the start of each month',
  },
  {
    key: 'reads',
    field: 'email_reads',
    label: 'Reads and check-ins',
    sub: "A short read on Wednesdays and Saturdays, and a note if you've been away",
  },
  {
    key: 'tips',
    field: 'email_tips',
    label: 'Getting started',
    sub: 'A few tips in your first two weeks',
  },
  {
    key: 'product',
    field: 'email_product',
    label: "What's new",
    sub: 'The occasional note from the team about new features',
  },
]

const NAME = {
  all: 'all InstaCal emails',
  weekly: 'the weekly recap',
  reads: 'reads and check-ins',
  tips: 'getting-started emails',
  product: "what's-new emails",
}

async function call(body) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({ ok: false, error: 'failed' }))
  if (!data.ok) throw new Error(data.error || 'failed')
  return data
}

const isOn = (state, scope) =>
  scope === 'all'
    ? !state.opted_out
    : !state.opted_out && !!state[SCOPES.find((s) => s.key === scope).field]

function Switch({ on, busy, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={busy}
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-60 ${
        on ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
          on ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

function PrimaryButton({ children, onClick, busy }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-base font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
    >
      {busy ? 'Saving…' : children}
    </button>
  )
}

export function EmailPreferences() {
  const params = useSearchParams()
  const token = params.get('t') || ''
  const askScope = NAME[params.get('s')] ? params.get('s') : null
  const askOn = params.get('on') !== '0'

  const [status, setStatus] = useState('loading') // loading | ready | expired | error
  const [state, setState] = useState(null)
  const [confirming, setConfirming] = useState(Boolean(askScope))
  const [busy, setBusy] = useState(null)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('expired')
      return
    }
    call({ t: token })
      .then((data) => {
        setState(data)
        setStatus('ready')
        // The link asks for what is already true: say so, ask nothing.
        if (askScope && isOn(data, askScope) === askOn) {
          setConfirming(false)
          setNotice(
            askScope === 'all'
              ? askOn
                ? 'Email is already on.'
                : "You're already unsubscribed."
              : `${capitalize(NAME[askScope])} ${askScope === 'weekly' ? 'is' : 'are'} already ${askOn ? 'on' : 'off'}.`,
          )
        }
      })
      .catch((e) => setStatus(e.message === 'expired' ? 'expired' : 'error'))
  }, [token, askScope, askOn])

  // Drop the one-time request from the address once it has been answered, so
  // a refresh shows the switches instead of asking again.
  function settle() {
    setConfirming(false)
    window.history.replaceState(null, '', `/email?t=${encodeURIComponent(token)}`)
  }

  async function apply(scope, on) {
    setBusy(scope)
    setNotice('')
    try {
      const data = await call({ t: token, s: scope, on })
      setState(data)
      setNotice(
        scope === 'all'
          ? on
            ? 'Email is back on.'
            : "Done. You're unsubscribed."
          : `Turned ${on ? 'on' : 'off'} ${NAME[scope]}.`,
      )
      settle()
    } catch (e) {
      setStatus(e.message === 'expired' ? 'expired' : 'error')
    } finally {
      setBusy(null)
    }
  }

  const firstName = state?.name ? String(state.name).split(' ')[0] : ''

  let body
  if (status === 'loading') {
    body = (
      <div className="animate-pulse space-y-4" aria-label="Loading">
        <div className="h-7 w-2/3 rounded-lg bg-gray-100" />
        <div className="h-4 w-1/2 rounded bg-gray-100" />
        <div className="h-14 rounded-xl bg-gray-100" />
        <div className="h-14 rounded-xl bg-gray-100" />
      </div>
    )
  } else if (status === 'expired') {
    body = (
      <>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          This link doesn&apos;t work anymore
        </h1>
        <p className="mt-2 text-[15px] leading-6 text-gray-600">
          Open your newest email from InstaCal and use the link at the bottom
          of it.
        </p>
      </>
    )
  } else if (status === 'error') {
    body = (
      <>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Something went wrong
        </h1>
        <p className="mt-2 text-[15px] leading-6 text-gray-600">
          Nothing was changed. Try again in a minute.
        </p>
        <div className="mt-6">
          <PrimaryButton onClick={() => window.location.reload()}>
            Try again
          </PrimaryButton>
        </div>
      </>
    )
  } else if (confirming) {
    const scopeInfo = SCOPES.find((s) => s.key === askScope)
    body = askOn ? (
      <>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Turn {NAME[askScope]} back on?
        </h1>
        {scopeInfo && (
          <p className="mt-2 text-[15px] leading-6 text-gray-600">
            {scopeInfo.sub}.
          </p>
        )}
        <div className="mt-6 space-y-3">
          <PrimaryButton busy={busy === askScope} onClick={() => apply(askScope, true)}>
            Turn on
          </PrimaryButton>
          <button
            type="button"
            onClick={settle}
            className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Choose which emails instead
          </button>
        </div>
      </>
    ) : (
      <>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {askScope === 'all'
            ? 'Unsubscribe from all InstaCal emails?'
            : `Stop ${NAME[askScope]}?`}
        </h1>
        <p className="mt-2 text-[15px] leading-6 text-gray-600">
          {askScope === 'all'
            ? "You won't get recaps, reads or news from us. Emails about your account, like password resets, still come."
            : `${scopeInfo.sub}. You'll keep getting the rest.`}
        </p>
        <div className="mt-6 space-y-3">
          <PrimaryButton busy={busy === askScope} onClick={() => apply(askScope, false)}>
            {askScope === 'all' ? 'Unsubscribe' : 'Turn off'}
          </PrimaryButton>
          <button
            type="button"
            onClick={settle}
            className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Choose which emails instead
          </button>
        </div>
      </>
    )
  } else if (state.opted_out) {
    body = (
      <>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          You&apos;re unsubscribed
        </h1>
        <p className="mt-2 text-[15px] leading-6 text-gray-600">
          InstaCal won&apos;t email you again{firstName ? `, ${firstName}` : ''}.
          Emails about your account, like password resets, still come.
        </p>
        <div className="mt-6">
          <PrimaryButton busy={busy === 'all'} onClick={() => apply('all', true)}>
            Turn email back on
          </PrimaryButton>
        </div>
      </>
    )
  } else {
    body = (
      <>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Email preferences
        </h1>
        <p className="mt-2 text-[15px] leading-6 text-gray-600">
          Pick what lands in your inbox{firstName ? `, ${firstName}` : ''}.
          Changes save as you go.
        </p>
        <ul className="mt-5 divide-y divide-gray-100">
          {SCOPES.map((s) => (
            <li key={s.key} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-[15px] font-semibold text-gray-900">{s.label}</p>
                <p className="mt-0.5 text-[13px] leading-5 text-gray-500">{s.sub}</p>
              </div>
              <Switch
                label={s.label}
                on={!!state[s.field]}
                busy={busy !== null}
                onChange={(on) => apply(s.key, on)}
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => apply('all', false)}
          className="mt-4 text-sm font-semibold text-red-600 hover:text-red-700 disabled:opacity-60"
        >
          Unsubscribe from everything
        </button>
      </>
    )
  }

  return (
    <div className="flex min-h-screen justify-center bg-gray-50 px-4 py-10 sm:items-center">
      <div className="w-full max-w-md">
        <a href="/" className="mb-5 flex items-center gap-2.5">
          <Image src={logo} alt="" width={36} height={36} className="rounded-[10px]" priority />
          <span className="text-lg font-extrabold tracking-tight text-gray-900">InstaCal</span>
        </a>
        {notice && (
          <div role="status" className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 ring-1 ring-green-100">
            {notice}
          </div>
        )}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
          {body}
        </div>
      </div>
    </div>
  )
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
