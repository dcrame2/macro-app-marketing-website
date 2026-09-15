import Link from 'next/link'
import { AppStoreLink } from '@/components/AppStoreLink'
import { PlayStoreLink } from '@/components/PlayStoreLink'

export function SourceLinks({ ids = [], sources }) {
  if (!ids.length) return null
  return (
    <p className="journal-sources-inline">
      Sources:{' '}
      {ids.map((id, index) => {
        const source = sources.find((item) => item.id === id)
        return source ? (
          <span key={id}>
            {index > 0 && ' · '}
            <a href={source.url}>{source.label}</a>
          </span>
        ) : null
      })}
    </p>
  )
}

export function ArticleBody({ content }) {
  return (
    <div className="journal-prose">
      <p className="journal-lead">{content.lead}</p>
      <aside className="journal-takeaways" aria-label="Key takeaways">
        <p className="journal-kicker">The quick read</p>
        <ul>
          {content.takeaways.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>
      {content.sections.map((section) => (
        <section key={section.id} id={section.id}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          {section.bullets?.length > 0 && (
            <ul>
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {section.steps?.length > 0 && (
            <ol>
              {section.steps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          )}
          {section.table && (
            <div
              className="journal-table-wrap"
              role="region"
              aria-label={section.heading}
              tabIndex={0}
            >
              <table>
                <thead>
                  <tr>
                    {section.table.headers.map((item) => (
                      <th key={item} scope="col">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) =>
                        j === 0 ? (
                          <th scope="row" key={j}>
                            {cell}
                          </th>
                        ) : (
                          <td key={j}>{cell}</td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {section.chart && (
            <figure className="journal-chart">
              <figcaption>{section.chart.title}</figcaption>
              <p className="journal-chart-unit">
                {section.chart.unit} · scale starts at zero
              </p>
              {section.chart.data.map((item) => (
                <div className="journal-chart-row" key={item.label}>
                  <div>
                    <span>{item.label}</span>
                    <strong>
                      {item.value} {section.chart.unit}
                    </strong>
                  </div>
                  <div className="journal-chart-track" aria-hidden="true">
                    <div
                      style={{
                        width: `${(item.value / Math.max(...section.chart.data.map((point) => point.value), 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
              <p className="journal-chart-note">{section.chart.note}</p>
            </figure>
          )}
          <SourceLinks ids={section.source_ids} sources={content.sources} />
        </section>
      ))}
      {content.faqs?.length > 0 && (
        <section id="questions">
          <h2>A few good questions</h2>
          {content.faqs.map((item) => (
            <details key={item.question} className="journal-faq">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
              <SourceLinks ids={item.source_ids} sources={content.sources} />
            </details>
          ))}
        </section>
      )}
      <section id="sources" className="journal-methodology">
        <p className="journal-kicker">Behind the article</p>
        <h2>Sources & methodology</h2>
        <p>{content.methodology}</p>
        <ol>
          {content.sources.map((source) => (
            <li id={`source-${source.id}`} key={source.id}>
              <a href={source.url}>{source.label}</a>
              <span> · Accessed {source.accessed_at}</span>
            </li>
          ))}
        </ol>
        <p>
          Written by InstaCal Editorial with AI assistance. Educational
          information for adults; individual needs vary.{' '}
          <Link href="/blog/editorial">How we write and use data →</Link>
        </p>
      </section>
    </div>
  )
}

export function BlogCTA() {
  return (
    <aside className="journal-cta">
      <div>
        <p className="journal-kicker">Put it into practice</p>
        <h2>
          A little more know-how.
          <br />A lot more momentum.
        </h2>
        <p>
          Log a meal. Find your next favorite. Bring your friends along.
          <br className="hidden sm:block" /> Make food and fitness part of your
          everyday with InstaCal.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <AppStoreLink color="black" />
        <PlayStoreLink color="black" />
      </div>
    </aside>
  )
}
