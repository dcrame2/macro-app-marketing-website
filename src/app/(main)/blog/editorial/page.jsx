import Link from 'next/link'
import { SITE_URL } from '@/lib/blog/config'
import '@/styles/journal.css'

export const metadata = {
  title: 'Our Editorial Standards | InstaCal Journal',
  description:
    'How InstaCal uses research, public community data, real photos and clear sourcing to create useful food and fitness stories.',
  alternates: { canonical: `${SITE_URL}/blog/editorial` },
}

export default function Editorial() {
  return (
    <div className="journal">
      <div className="journal-width">
        <article className="journal-policy">
          <Link href="/blog">← The journal</Link>
          <h1>
            Good questions.
            <br />
            Honest answers.
          </h1>
          <p>
            The InstaCal Journal helps adults make sense of food, training and
            the everyday habits around them. Our goal is simple: leave you with
            something useful to try and a clearer understanding of why.
          </p>
          <h2>Research with receipts</h2>
          <p>
            Health and fitness claims link to primary research, public health
            agencies or professional guidance. We distinguish research findings
            from our own practical suggestions. A single study is a piece of
            evidence, not a universal rule. We do not promise weight loss,
            muscle gain or medical outcomes.
          </p>
          <h2>Real community. Clear limits.</h2>
          <p>
            Community statistics come from public, discoverable, non-hidden
            posts. Team and coach accounts are excluded from aggregate insights.
            We report a cohort only when it contains at least 20 contributors
            and 100 records. Small groups are suppressed.
          </p>
          <p>
            Logged meals are not a complete record of anyone’s diet. Nutrition
            values may be estimated, and frequent loggers can contribute more
            observations. A change in logged protein does not establish a change
            in someone’s health, diet or results. Every data story explains its
            dates, sample and method.
          </p>
          <h2>Photos from real life</h2>
          <p>
            Community images are checked for public visibility and permission to
            be featured, and are captioned accurately. We avoid identifying
            details. We do not generate food or fitness photos with AI. A
            pictured meal is not evidence of a tested recipe or a promised
            result.
          </p>
          <h2>Useful, original writing</h2>
          <p>
            InstaCal Editorial uses AI to assist with research, analysis and
            writing. Articles follow these editorial rules and link to the
            evidence they rely on. We do not claim that an article has been
            reviewed by a dietitian or physician unless a named professional
            actually reviewed it.
          </p>
          <p>
            Our articles are general education for adults. Individual needs
            differ, especially during pregnancy, with a medical condition or
            with an eating-disorder history. A qualified clinician or registered
            dietitian can help adapt guidance to you.
          </p>
          <h2>Corrections and photo removal</h2>
          <p>
            Spot an error or want a photo removed? Email{' '}
            <a href="mailto:support@theinstacal.app">support@theinstacal.app</a>{' '}
            with the article link. We correct material errors and update the
            article date. Community content follows our{' '}
            <Link href="/privacy">privacy policy</Link>.
          </p>
          <h2>What connects it all</h2>
          <p>
            InstaCal brings food, fitness and friends together. Our journal
            makes that experience more useful: understand a meal, discover an
            idea, track a workout, and build a routine you want to return to.
          </p>
        </article>
      </div>
    </div>
  )
}
