import { SharedBody, sharedMetadata } from '@/components/shared/pages'

// The link the app shares: it opens the app when it is installed, and is this
// page when it is not.
export async function generateMetadata({ params }) {
  const { id } = await params
  return sharedMetadata('workout', id)
}

export default async function Page({ params, searchParams }) {
  const { id } = await params
  return <SharedBody type="workout" id={id} searchParams={searchParams} />
}
