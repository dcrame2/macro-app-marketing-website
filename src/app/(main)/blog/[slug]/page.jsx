import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getPosts, formatDate } from '@/lib/blog/data'
import { SITE_URL } from '@/lib/blog/config'
import { ArticleBody, BlogCTA } from '@/components/BlogArticle'
import '@/styles/journal.css'

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Story not found', robots: { index: false } }
  const url = `${SITE_URL}/blog/${post.slug}`
  return {
    title: post.title,
    description: post.description,
    keywords: [post.primary_keyword, ...post.secondary_keywords],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: ['InstaCal Editorial'],
      images: [{ url: post.cover_image, alt: post.cover_alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.cover_image],
    },
  }
}

export default async function Article({ params }) {
  const post = await getPost(params.slug)
  if (!post) notFound()
  const related = (await getPosts('', 1, 4))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3)
  const content = post.content
  const words = JSON.stringify(content.sections).split(/\s+/).length
  const structured = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: [post.cover_image],
        datePublished: post.published_at,
        dateModified: post.updated_at,
        author: {
          '@type': 'Organization',
          name: 'InstaCal Editorial',
          url: `${SITE_URL}/blog/editorial`,
        },
        publisher: { '@type': 'Organization', name: 'InstaCal', url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        articleSection: post.category,
        citation: content.sources.map((source) => source.url),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Journal',
            item: `${SITE_URL}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `${SITE_URL}/blog/${post.slug}`,
          },
        ],
      },
    ],
  }
  return (
    <div className="journal journal-article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, '\\u003c'),
        }}
      />
      <div className="journal-width">
        <nav className="journal-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">InstaCal</Link>
          <span>/</span>
          <Link href="/blog">Journal</Link>
          <span>/</span>
          <span>{post.category}</span>
        </nav>
        <header className="journal-article-header">
          <p className="journal-kicker">
            {post.category} <span> / </span> The InstaCal Journal
          </p>
          <h1>{post.title}</h1>
          <p className="journal-deck">{post.description}</p>
          <div className="journal-byline">
            <span className="journal-author-mark">i</span>
            <div>
              <Link href="/blog/editorial">InstaCal Editorial</Link>
              <p>
                <time dateTime={post.published_at}>
                  {formatDate(post.published_at)}
                </time>
                <span> · </span>
                {Math.max(1, Math.ceil(words / 220))} min read
              </p>
            </div>
          </div>
        </header>
        <figure className="journal-cover">
          <div>
            <Image
              src={post.cover_image}
              alt={post.cover_alt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
          <figcaption>{post.cover_caption}</figcaption>
        </figure>
        <div className="journal-reading-layout">
          <aside className="journal-toc">
            <p className="journal-kicker">In this story</p>
            <nav aria-label="Table of contents">
              {content.sections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>
                  {section.heading}
                </a>
              ))}
              <a href="#sources">Sources & methodology</a>
            </nav>
          </aside>
          <ArticleBody content={content} />
        </div>
        <BlogCTA />
        {related.length > 0 && (
          <section className="journal-related">
            <p className="journal-kicker">Keep your curiosity going</p>
            <h2>One good read deserves another.</h2>
            <div className="journal-grid">
              {related.map((item) => (
                <article key={item.slug}>
                  <Link href={`/blog/${item.slug}`}>
                    <p className="journal-kicker">{item.category}</p>
                    <h3>{item.title} ↗</h3>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
        <Link href="/blog" className="journal-back">
          ← Back to all stories
        </Link>
      </div>
    </div>
  )
}
