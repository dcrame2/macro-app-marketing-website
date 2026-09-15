import { Suspense } from 'react'
import { EmailPreferences } from '@/components/EmailPreferences'

// Linked from the footer of every InstaCal email: ?t=<token>, and for the
// Unsubscribe link &s=<scope>&on=0. The switches are saved by the app's
// `email-unsubscribe` function; this page only draws them. It used to be drawn
// by the function itself, but Supabase serves a function's HTML as plain text
// on its own domain, so it showed up as a page of code.
export const metadata = {
  title: 'Email preferences',
  robots: { index: false, follow: false },
  // The token in the address is the only key to someone's settings; never
  // hand it to another site in a Referer header.
  referrer: 'no-referrer',
}

export default function EmailPreferencesPage() {
  return (
    <Suspense fallback={null}>
      <EmailPreferences />
    </Suspense>
  )
}
