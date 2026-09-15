import { cache } from 'react'

const FUNCTIONS =
  (process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://rrcwrqstlvauzdsjfriq.supabase.co') + '/functions/v1'

/**
 * Who sent an invite code: `{ kind, name, avatar_url, trial_days }`, or null
 * for an unknown code or when the lookup is unavailable (the page then falls
 * back to the plain invite). Asked of the app's `deferred-link` function,
 * which the page already calls without a Supabase key. `cache` shares one
 * request between generateMetadata and the page.
 */
export const getReferralInviter = cache(async (code) => {
  try {
    const res = await fetch(`${FUNCTIONS}/deferred-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'lookup', code }),
      next: { revalidate: 300 },
    })
    if (!res.ok) return null
    const data = await res.json()
    const inviter = data?.inviter
    return inviter?.name ? inviter : null
  } catch {
    return null
  }
})
