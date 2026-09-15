import Image from 'next/image'
import Link from 'next/link'
import { BLOG_CATEGORIES, SITE_URL } from '@/lib/blog/config'
import { getPosts, formatDate } from '@/lib/blog/data'
import { BlogCTA } from '@/components/BlogArticle'
import '@/styles/journal.css'

export async function generateMetadata({ searchParams }) {
  const filtered = Boolean(searchParams.topic || searchParams.page)
  return {
    title: 'The InstaCal Blog | Food, Fitness & Real Life',
    description:
      'Practical nutrition, strength training, meal ideas and honest community insights. Learn something useful. Put it into practice with InstaCal.',
    alternates: {
      canonical: `${SITE_URL}/blog`,
      types: { 'application/rss+xml': '/blog/feed.xml' },
    },
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: 'The InstaCal Blog',
      description: 'Eat well. Move more. Find your people.',
      url: `${SITE_URL}/blog`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
  }
}

export default async function Blog({ searchParams }) {
  const category = BLOG_CATEGORIES.includes(searchParams.topic)
    ? searchParams.topic
    : ''
  const page = Math.min(
    Math.max(parseInt(searchParams.page, 10) || 1, 1),
    10000,
  )
  const posts = await getPosts(category, page, 12)
  const next = await getPosts(category, page + 1, 12)
  const [featured, ...rest] = posts
  const pageHref = (n) =>
    `/blog?${new URLSearchParams({ ...(category ? { topic: category } : {}), page: String(n) })}`
  return (
    <div className="journal">
      <section className="journal-masthead">
        <div className="journal-width">
          <div className="journal-topline">
            <span>
              <span className="journal-dot" /> THE INSTACAL BLOG
            </span>
            <Link href="/blog/editorial">
              Good questions. Honest answers. ↗
            </Link>
          </div>
          <h1>
            Eat well. Move more.
            <br />
            <em>Make it your thing.</em>
          </h1>
          <p>
            Food worth making. Fitness that fits your life.
            <br />A fresh perspective, backed by research and our community.
          </p>
        </div>
      </section>
      <div className="journal-width journal-content">
        <nav aria-label="Blog topics" className="journal-topics">
          <Link href="/blog" aria-current={!category ? 'page' : undefined}>
            All stories
          </Link>
          {BLOG_CATEGORIES.map((topic) => (
            <Link
              href={`/blog?topic=${encodeURIComponent(topic)}`}
              key={topic}
              aria-current={category === topic ? 'page' : undefined}
            >
              {topic}
            </Link>
          ))}
        </nav>
        {featured ? (
          <>
            <article className="journal-feature">
              <Link
                href={`/blog/${featured.slug}`}
                className="journal-feature-image"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src={featured.cover_image}
                  alt={featured.cover_alt}
                  fill
                  priority
                  sizes="(max-width: 800px) 100vw, 60vw"
                />
              </Link>
              <div className="journal-feature-copy">
                <p className="journal-kicker">
                  {featured.category} <span> / </span>{' '}
                  {page === 1 && !category
                    ? 'The latest story'
                    : 'From the blog'}
                </p>
                <h2>
                  <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p>{featured.description}</p>
                <div className="journal-feature-bottom">
                  <time dateTime={featured.published_at}>
                    {formatDate(featured.published_at)}
                  </time>
                  <Link
                    href={`/blog/${featured.slug}`}
                    aria-label={`Read ${featured.title}`}
                    className="journal-arrow"
                  >
                    ↗
                  </Link>
                </div>
              </div>
            </article>
            {rest.length > 0 && (
              <section className="journal-grid" aria-label="More stories">
                {rest.map((post) => (
                  <article className="journal-card" key={post.slug}>
                    <Link href={`/blog/${post.slug}`}>
                      <div className="journal-card-image">
                        <Image
                          src={post.cover_image}
                          alt={post.cover_alt}
                          fill
                          sizes="(max-width: 600px) 100vw, 33vw"
                        />
                      </div>
                      <p className="journal-kicker">{post.category}</p>
                      <h2>{post.title}</h2>
                      <p>{post.description}</p>
                      <time dateTime={post.published_at}>
                        {formatDate(post.published_at)}
                      </time>
                    </Link>
                  </article>
                ))}
              </section>
            )}
          </>
        ) : (
          <div className="journal-empty">
            <p className="journal-kicker">A little room to grow</p>
            <h2>
              {category
                ? `${category} stories are on the way.`
                : 'Our next chapter starts here.'}
            </h2>
            <p>Explore the latest food and fitness stories in the blog.</p>
            <Link href="/blog">Browse all stories →</Link>
          </div>
        )}
        {(page > 1 || next.length > 0) && (
          <nav aria-label="Article pages" className="journal-pagination">
            {page > 1 && <Link href={pageHref(page - 1)}>← Newer stories</Link>}
            <span>Page {page}</span>
            {next.length > 0 && (
              <Link href={pageHref(page + 1)}>Older stories →</Link>
            )}
          </nav>
        )}
        <section className="journal-promise">
          <p className="journal-kicker">A healthier kind of feed</p>
          <div>
            <h2>
              Curiosity looks
              <br />
              good on you.
            </h2>
            <p>
              We turn research, everyday questions and anonymous community
              patterns into ideas you can actually use. Every number has
              context. Every story has a next step.
              <br />
              <Link href="/blog/editorial">Meet our editorial standards ↗</Link>
            </p>
          </div>
        </section>
        <BlogCTA />
      </div>
    </div>
  )
}
