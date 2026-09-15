// Kept apart from referralInviter.js: that file imports React's server-only
// `cache`, and the landing page is a client component.

/** 14 → "2 weeks", 7 → "a week", 30 → "a month", else "n days". */
export function proLength(days) {
  if (!days) return null
  if (days === 7) return 'a week'
  if (days === 30) return 'a month'
  if (days % 7 === 0) return `${days / 7} weeks`
  return `${days} days`
}
