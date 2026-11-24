import { DeepLinkLanding } from '@/components/DeepLinkLanding'
import { getReferralInviter } from '@/lib/referralInviter'
import { cleanCode } from '@/lib/sharePage'
import { SharedProfile } from '@/components/shared/SharedProfile'
import { getProfilePage, profileJsonLd, profileMetadata } from '@/components/shared/profilePage'

// A profile by its handle: /u/dylan. Always a web page (the path is not one the app claims).
export async function generateMetadata({ params }) {
  const { username } = await params
  return profileMetadata(await getProfilePage(username), `/u/${username}`)
}

export default async function Page({ params, searchParams }) {
  const { username } = await params
  const code = cleanCode((await searchParams)?.r)
  const [page, inviter] = await Promise.all([getProfilePage(username), code ? getReferralInviter(code) : null])
  if (!page) return <DeepLinkLanding type="user" id={username} code={inviter ? code : null} inviter={inviter} />
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
