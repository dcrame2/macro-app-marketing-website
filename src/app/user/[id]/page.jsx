import { DeepLinkLanding } from '@/components/DeepLinkLanding'
import { getReferralInviter } from '@/lib/referralInviter'
import { cleanCode } from '@/lib/sharePage'
import { SharedProfile } from '@/components/shared/SharedProfile'
import { getProfilePage, profileJsonLd, profileMetadata } from '@/components/shared/profilePage'

// The profile link the app claims: it opens the app when installed, and is this page when not.
export async function generateMetadata({ params }) {
  const { id } = await params
  return profileMetadata(await getProfilePage(id), `/user/${id}`)
}

export default async function Page({ params, searchParams }) {
  const { id } = await params
  const code = cleanCode((await searchParams)?.r)
  const [page, inviter] = await Promise.all([getProfilePage(id), code ? getReferralInviter(code) : null])
  if (!page) return <DeepLinkLanding type="user" id={id} />
  const jsonLd = profileJsonLd(page)
  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      ) : null}
      <SharedProfile profile={page} inviter={inviter} code={inviter ? code : null} />
    </>
  )
}
