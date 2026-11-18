import { Oswald } from 'next/font/google'
import { num, platePath, sized, withCode } from '@/lib/sharePage'

// The app's numeral face; declared here so a client component can draw a card
// without pulling in the shared pages' parts.
const oswald = Oswald({ subsets: ['latin'], weight: '600', display: 'swap' })
const numeral = oswald.className

/**
 * A public plate as the site draws it (2026-11-16): the photo, the name, its
 * calories and protein, and who posted it. Opens the plate's own page (the
 * recipe page when it carries one). `code` is an invite code to carry along.
 */
export function PlateCard({ plate, eager = false, code = null }) {
  return (
    <a href={withCode(platePath(plate), code)} className="ic-plate">
      <span className="ic-plate-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sized(plate.image_url, 520, 520)} alt="" loading={eager ? 'eager' : 'lazy'} />
        {plate.rank ? <span className={`ic-plate-rank ${numeral}`}>{plate.rank}</span> : null}
        {plate.recipe_steps > 0 ? (
          <span className="ic-plate-tag">{plate.minutes ? `Recipe · ${plate.minutes} min` : 'Recipe'}</span>
        ) : null}
      </span>
      <span className="ic-plate-body">
        <strong>{plate.title}</strong>
        <span className="ic-plate-nums">
          <b className={numeral}>{num(plate.calories)}</b>
          <small>CAL</small>
          <em>{num(plate.protein)}g protein</em>
        </span>
        {plate.author?.username ? (
          <span className="ic-plate-by">
            {plate.author.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={sized(plate.author.avatar_url, 56, 56)} alt="" loading="lazy" />
            ) : (
              <i aria-hidden="true" />
            )}
            @{plate.author.username}
          </span>
        ) : null}
      </span>
    </a>
  )
}

