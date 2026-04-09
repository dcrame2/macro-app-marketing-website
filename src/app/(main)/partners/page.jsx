'use client'

import { useState } from 'react'
import { Container } from '@/components/Container'
import { TextField, SelectField } from '@/components/Fields'
import { Button } from '@/components/Button'

const formClasses =
  'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-[#0077cc] focus:outline-none focus:ring-[#0077cc] sm:text-sm'

const requiredLabel = (text) => (
  <>
    {text}{' '}
    <span className="text-red-500" aria-hidden="true">
      *
    </span>
    <span className="sr-only">(required)</span>
  </>
)

const initialForm = {
  fullName: '',
  email: '',
  instagram: '',
  tiktok: '',
  youtube: '',
  x: '',
  preferredContact: 'Email',
  notes: '',
  company: '', // honeypot
}

export default function PartnersPage() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <Container>
      <div className="relative my-10 overflow-hidden rounded-2xl bg-white p-6 text-gray-900 sm:p-10 lg:p-14">
        {/* Decorative glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -z-0 h-72 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#0077cc]/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0077cc]/20 bg-[#0077cc]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0077cc]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0077cc] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0077cc]" />
            </span>
            Now accepting creators
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Become an InstaCal{' '}
            <span className="bg-gradient-to-r from-[#0077cc] to-[#00b4e6] bg-clip-text text-transparent">
              Partner
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            Promote InstaCal across your channels and get paid for it. We work
            with fitness, nutrition, and wellness creators of any audience
            size. Every partner gets free Pro and daily performance reports.
          </p>
        </div>

        <div className="relative mt-14 border-t border-gray-100 pt-12">
          <h2 className="mb-2 text-2xl font-semibold">Apply</h2>
          <p className="mb-2 text-gray-600">
            Fill out the form below. We review every application and reach out
            if there&apos;s a fit.
          </p>
          <p className="mb-6 text-sm text-gray-500">
            <span className="text-red-500" aria-hidden="true">
              *
            </span>{' '}
            indicates a required field
          </p>

          {status === 'success' ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-900">
              <h3 className="mb-2 text-lg font-semibold">
                Thanks for applying!
              </h3>
              <p>
                We&apos;ve received your application and will be in touch if
                we&apos;d like to move forward.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
              <TextField
                label={requiredLabel('Full name')}
                name="fullName"
                type="text"
                required
                value={form.fullName}
                onChange={handleChange}
              />
              <TextField
                label={requiredLabel('Email')}
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                label="Instagram handle"
                name="instagram"
                type="text"
                placeholder="@yourhandle"
                value={form.instagram}
                onChange={handleChange}
              />
              <TextField
                label="TikTok handle"
                name="tiktok"
                type="text"
                placeholder="@yourhandle"
                value={form.tiktok}
                onChange={handleChange}
              />
              <TextField
                label="YouTube channel"
                name="youtube"
                type="text"
                placeholder="@yourchannel"
                value={form.youtube}
                onChange={handleChange}
              />
              <TextField
                label="X (Twitter) handle"
                name="x"
                type="text"
                placeholder="@yourhandle"
                value={form.x}
                onChange={handleChange}
              />
              <SelectField
                label={requiredLabel('Best way to contact you')}
                name="preferredContact"
                required
                value={form.preferredContact}
                onChange={handleChange}
                className="sm:col-span-2"
              >
                <option>Email</option>
                <option>Instagram</option>
                <option>TikTok</option>
                <option>YouTube</option>
                <option>X</option>
              </SelectField>

              <div className="sm:col-span-2">
                <label
                  htmlFor="partner-notes"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Anything else you&apos;d like us to know?
                </label>
                <textarea
                  id="partner-notes"
                  name="notes"
                  rows={4}
                  value={form.notes}
                  onChange={handleChange}
                  className={formClasses}
                />
              </div>

              {/* Honeypot, hidden from real users */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-10000px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                }}
              >
                <label htmlFor="partner-company">Company</label>
                <input
                  id="partner-company"
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>

              {status === 'error' && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900 sm:col-span-2">
                  {errorMessage}
                </div>
              )}

              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  variant="solid"
                  color="cyan"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto"
                >
                  {status === 'submitting' ? 'Submitting…' : 'Submit application'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Container>
  )
}
