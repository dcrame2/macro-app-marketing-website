import { notFound } from 'next/navigation'
import { getReferralInviter } from '@/lib/referralInviter'
import { cleanCode, collectionPath, getSharePage, idFromSlug } from '@/lib/sharePage'
import { SharedCollection } from '@/components/shared/SharedCollection'

const SITE = 'https://theinstacal.app'

// A shared collection: /c/high-protein-dinners-42. Only a collection its
// owner made public answers; anything else is a 404.
export async function generateMetadata({ params }) {
  const id = idFromSlug((await params).slug)
  const page = id ? await getSharePage('collection', id) : null
  if (!page) return { robots: { index: false, follow: false } }
  const n = page.plates.length
  const by = page.author.username ? ` by @${page.author.username}` : ''
  const title = `${page.title} · ${n} ${n === 1 ? 'plate' : 'plates'}`
  const description = page.description || `${n} plates with their macros and recipes${by}, on InstaCal.`
  const image = `/api/og/collection/${page.id}`
  const url = `${SITE}${collectionPath(page)}`
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: page.indexable ? undefined : { index: false, follow: false },
    openGraph: { title, description, url, images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

export default async function Page({ params, searchParams }) {
  const id = idFromSlug((await params).slug)
  const code = cleanCode((await searchParams)?.r)
  const [page, inviter] = await Promise.all([
    id ? getSharePage('collection', id) : null,
    code ? getReferralInviter(code) : null,
  ])
  if (!page) notFound()
  return <SharedCollection collection={page} inviter={inviter} code={inviter ? code : null} />
}
