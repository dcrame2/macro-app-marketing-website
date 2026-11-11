import { getSharePage, profilePath } from '@/lib/sharePage'

const SITE = 'https://theinstacal.app'

/** "Follow Dylan (@dylan) on InstaCal": the profile's metadata at any of its addresses. */
export function profileMetadata(page, fallbackPath) {
  if (!page) {
    return {
      title: 'Follow me on InstaCal',
      description: 'See what I eat and how I train on InstaCal.',
      robots: { index: false, follow: false },
      openGraph: { images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
    }
  }
  const who = page.name ? `${page.name} (@${page.username})` : `@${page.username}`
  const title = `Follow ${who} on InstaCal`
  const description =
    (page.bio ? `${String(page.bio).replace(/\s+/g, ' ').slice(0, 110)} · ` : '') +
    (page.is_public
      ? `${Number(page.posts || 0).toLocaleString('en-US')} posts. See what ${page.name ?? `@${page.username}`} eats and how they train.`
      : 'Follow in the app to see their plates.')
  const url = `${SITE}${page.username ? profilePath(page) : fallbackPath}`
  const image = `/api/og/user/${page.id}`
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: page.indexable ? undefined : { index: false, follow: false },
    openGraph: { title, description, url, type: 'profile', images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    // Safari's own banner: opens the app on this person when it is installed.
    other: { 'apple-itunes-app': `app-id=6743951306, app-argument=instacal://user/${page.id}` },
  }
}

/** schema.org ProfilePage, so a search engine reads the page as a person's. */
export function profileJsonLd(page) {
  if (!page?.is_public || !page.indexable) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: page.name ?? page.username,
      alternateName: `@${page.username}`,
      description: page.bio ?? undefined,
      image: page.avatar_url ?? undefined,
      url: `${SITE}${profilePath(page)}`,
      interactionStatistic: [
        { '@type': 'InteractionCounter', interactionType: 'https://schema.org/FollowAction', userInteractionCount: page.followers ?? 0 },
        { '@type': 'InteractionCounter', interactionType: 'https://schema.org/WriteAction', userInteractionCount: page.posts ?? 0 },
      ],
    },
  }
}

export const getProfilePage = (idOrHandle) => getSharePage('user', idOrHandle)
