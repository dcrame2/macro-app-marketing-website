import { notFound } from 'next/navigation'
import { SharedBody, sharedMetadata } from '@/components/shared/pages'
import { idFromSlug } from '@/lib/sharePage'

// A plate by its name: /meals/teriyaki-chicken-9447. The words in the address are for the reader; the trailing number is
// what is looked up. Always a web page (the path is not one the app claims).
export async function generateMetadata({ params }) {
  const id = idFromSlug((await params).slug)
  return id ? sharedMetadata('meal', id) : {}
}

export default async function Page({ params, searchParams }) {
  const id = idFromSlug((await params).slug)
  if (!id) notFound()
  return <SharedBody type="meal" id={id} searchParams={searchParams} />
}
