import { notFound } from 'next/navigation'
import { SharedBody, sharedMetadata } from '@/components/shared/pages'
import { idFromSlug } from '@/lib/sharePage'

// A session by its name: /workouts/push-day-117364. The words in the address are for the reader; the trailing number is
// what is looked up. Always a web page (the path is not one the app claims).
export async function generateMetadata({ params }) {
  const id = idFromSlug((await params).slug)
  return id ? sharedMetadata('workout', id) : {}
}

export default async function Page({ params, searchParams }) {
  const id = idFromSlug((await params).slug)
  if (!id) notFound()
  return <SharedBody type="workout" id={id} searchParams={searchParams} />
}
