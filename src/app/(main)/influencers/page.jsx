import React from 'react'
import { Container } from '@/components/Container'
import Hero from '@/components/influencers/Hero'

const CONFIG = {
  brand: {
    name: 'InstaCal',
    primary: '#0077cc',
    accent: '#00c2ff',
  },
  ctas: {
    applyUrl: '/influencers/apply',
    mediaKitUrl: '/media-kit.pdf',
    contactEmail: 'partnerships@instacal.app',
  },
  socialHandle: '@instacal.app',
  pricing: {
    currency: '$',
    tiers: [
      {
        label: 'Nano (1k–9.9k)',
        story: 15,
        feedPost: 35,
        reelTiktok: 50,
        bundle: 85,
      },
      {
        label: 'Micro (10k–49.9k)',
        story: 30,
        feedPost: 60,
        reelTiktok: 90,
        bundle: 165,
      },
      {
        label: 'Growth (50k–199k)',
        story: 40,
        feedPost: 75,
        reelTiktok: 100,
        bundle: 190,
      },
      {
        label: 'Established (200k–499k)',
        story: 60,
        feedPost: 120,
        reelTiktok: 160,
        bundle: 295,
      },
      {
        label: 'Pro (500k–1M)',
        story: 100,
        feedPost: 200,
        reelTiktok: 275,
        bundle: 500,
      },
      {
        label: 'Elite (1M+)',
        story: 175,
        feedPost: 350,
        reelTiktok: 475,
        bundle: 850,
      },
    ],
    notes: [
      'Competitive entry rates balancing reach and ROI; final quotes may adjust for audience quality, engagement, and region.',
      'Bundles include: 1 Story (3 frames), 1 Reel/TikTok (15–45s), 1 IG Feed Post (photo or carousel).',
      'Whitelisting/paid amplification rights are priced separately (see Usage Rights).',
      'Performance bonuses available for top-performing creators (install or engagement-based).',
    ],
  },
  bullets: {
    whatWeWant: [
      'Show how easy it is to track a real meal in InstaCal (screen record or over‑the‑shoulder).',
      'Take a photo/video of a meal and use InstaCal’s AI to estimate macros — react in your style.',
      'Share a quick daily routine: add breakfast → log water → check macros.',
      'Talk about staying consistent without being obsessive (our brand POV).',
      'Compare “guessing” vs. “InstaCal awareness” in a fun, positive way.',
    ],
    deliverables: [
      'Story: 3 frames minimum (tag {handle}, link sticker to trackable link).',
      'Reel/TikTok: 15–45s vertical, native sound or voiceover, on‑screen text, clear CTA.',
      'IG Feed Post: single photo or carousel; first slide must mention InstaCal in caption.',
    ],
    mustHaves: [
      'Speak authentically — no crash‑diet or extreme‑restriction claims.',
      'Always tag {handle} and use the trackable link we provide.',
      'Avoid before/after weight‑loss claims; focus on awareness and consistency.',
      'FTC compliance: include #ad or Paid Partnership tag where required.',
    ],
    usageRights: [
      'Organic repost on {brand} owned socials for 60 days included.',
      'Paid ads whitelisting: +25% of fee per 30 days (platform‑specific).',
      'Website usage: +15% of fee per 90 days.',
    ],
    tracking: [
      'Unique link (UTM) + optional promo code for attribution.',
      'We’ll share performance snapshots within 7–10 days of posting.',
    ],
    payment: [
      'Payment via ACH/PayPal within 7 business days of deliverable approval.',
      '50% deposit for projects > $1,500 (non‑refundable once production starts).',
      'Reshoots/major revisions beyond agreed brief may incur an additional fee.',
    ],
    faq: [
      {
        q: 'Can I pitch a concept?',
        a: 'Absolutely. Share your idea in the application — we love creator‑led concepts that fit our brand POV.',
      },
      {
        q: 'Do you provide a script?',
        a: 'We’ll give talking points and CTA options. Keep your authentic voice and style.',
      },
      {
        q: 'Is exclusivity required?',
        a: 'Category exclusivity (nutrition/calorie‑tracking) for 30 days post‑publish is preferred for bundles; negotiable otherwise.',
      },
      {
        q: 'Can I work with you long‑term?',
        a: 'Yes! Consistent creators perform best. We offer 3‑month and 6‑month retainers with bonus incentives.',
      },
    ],
  },
}

function Replace(props) {
  var text = props.text
  Object.keys(props.map || {}).forEach(function (k) {
    text = text.split('{' + k + '}').join(props.map[k])
  })
  return <>{text}</>
}

export default function InfluencerPartnerships() {
  const pricing = CONFIG.pricing
  const bullets = CONFIG.bullets
  const socialHandle = CONFIG.socialHandle
  const brand = CONFIG.brand
  const ctas = CONFIG.ctas

  return (
    <>
      <Hero />
      <Container>
        <article className="prose prose-slate dark:prose-invert my-10 max-w-none">
          {/* Header */}
          <header className="not-prose text-center">
            <h1 className="mb-4 text-4xl font-bold">
              InstaCal Influencer Partnerships
            </h1>
            <p className="text-slate-600">
              Create authentic content that helps people eat smarter — we’ll
              handle links, tracking, and quick payouts.
            </p>
          </header>

          {/* What We’re Looking For */}
          <section>
            <h2>What We’re Looking For</h2>
            <ul>
              {bullets.whatWeWant.map(function (t) {
                return (
                  <li key={t}>
                    <Replace
                      text={t}
                      map={{ handle: socialHandle, brand: brand.name }}
                    />
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Deliverables */}
          <section>
            <h2>Deliverables & Formats</h2>
            <ul>
              {bullets.deliverables.map(function (t) {
                return (
                  <li key={t}>
                    <Replace
                      text={t}
                      map={{ handle: socialHandle, brand: brand.name }}
                    />
                  </li>
                )
              })}
            </ul>
            <p className="text-sm text-slate-600">
              Tip: For Reels/TikToks, open InstaCal on camera, log a real meal,
              add quick on‑screen text (e.g., “Logged lunch in 12s”), and end
              with a clear CTA like “Try it free.”
            </p>
          </section>

          {/* Pricing */}
          <section>
            <h2>Pricing by Follower Tier</h2>
            <p>
              Transparent starter rates. Final quotes depend on audience quality
              and scope.
            </p>
            <div className="not-prose overflow-hidden rounded-xl border border-slate-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-700">
                        Tier
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-700">
                        Story
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-700">
                        IG Feed Post
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-700">
                        Reel/TikTok
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-700">
                        Bundle
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricing.tiers.map(function (t, i) {
                      return (
                        <tr
                          key={t.label}
                          className={i % 2 ? 'bg-white' : 'bg-slate-50/40'}
                        >
                          <td className="px-4 py-3 font-medium">{t.label}</td>
                          <td className="px-4 py-3">
                            {pricing.currency}
                            {t.story.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            {pricing.currency}
                            {t.feedPost.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            {pricing.currency}
                            {t.reelTiktok.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 font-semibold">
                            {pricing.currency}
                            {t.bundle.toLocaleString()}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-slate-200 bg-white p-4 text-xs text-slate-600">
                <ul className="list-disc space-y-1 pl-5">
                  {pricing.notes.map(function (n) {
                    return <li key={n}>{n}</li>
                  })}
                </ul>
              </div>
            </div>
          </section>

          {/* Must‑Haves */}
          <section>
            <h2>Must‑Haves & Brand Fit</h2>
            <ul>
              {bullets.mustHaves.map(function (t) {
                return (
                  <li key={t}>
                    <Replace
                      text={t}
                      map={{ handle: socialHandle, brand: brand.name }}
                    />
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Usage Rights */}
          <section>
            <h2>Usage Rights & Whitelisting</h2>
            <ul>
              {bullets.usageRights.map(function (t) {
                return (
                  <li key={t}>
                    <Replace text={t} map={{ brand: brand.name }} />
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Tracking */}
          <section>
            <h2>Tracking & Attribution</h2>
            <ul>
              {bullets.tracking.map(function (t) {
                return <li key={t}>{t}</li>
              })}
            </ul>
            <p className="text-sm text-slate-600">
              We’ll provide a unique link and (optionally) a creator code for
              Stories/Reels/Feed captions. You’ll get credit for every install
              from your content.
            </p>
          </section>

          {/* Payment */}
          <section>
            <h2>Payment & Timeline</h2>
            <ul>
              {bullets.payment.map(function (t) {
                return <li key={t}>{t}</li>
              })}
            </ul>
          </section>

          {/* FAQs */}
          <section>
            <h2>FAQs</h2>
            <div className="not-prose divide-y divide-slate-200 rounded-xl border border-slate-200">
              {bullets.faq.map(function (f, i) {
                return (
                  <details key={i} className="group p-4 open:bg-slate-50">
                    <summary className="flex cursor-pointer list-none items-center justify-between">
                      <span className="text-base font-medium">{f.q}</span>
                      <span className="text-slate-400 transition-transform group-open:rotate-180">
                        ⌄
                      </span>
                    </summary>
                    <p className="mt-2 text-slate-700">{f.a}</p>
                  </details>
                )
              })}
            </div>
          </section>

          {/* CTA Footer */}
          <section className="not-prose">
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={ctas.applyUrl}
                className="rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm"
                style={{ backgroundColor: CONFIG.brand.primary }}
              >
                Apply Now
              </a>
              <a
                href={ctas.mediaKitUrl}
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold"
              >
                Download Media Kit
              </a>
              <a
                href={`mailto:${ctas.contactEmail}`}
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold"
              >
                Contact Partnerships
              </a>
            </div>
          </section>
        </article>
      </Container>
    </>
  )
}
