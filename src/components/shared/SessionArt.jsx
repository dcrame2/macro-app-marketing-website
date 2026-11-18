import figure from '@/lib/bodyFigure.json'

/**
 * What a session looks like when it has no photo, drawn the way the app's
 * profile tile draws it: the route as a line in InstaCal blue, or a marked
 * lift's muscles lit on the two figures, on the dark stage ground.
 *
 * The figure's paths are heavy (about 40 KB), so a page writes them ONCE
 * (`FigureDefs`) and every tile points at them with <use>.
 */

const BLUE = '#3B9BE8'
const BODY = '#3B4A6B'

/** The app's fourteen muscle keys onto the drawing's parts. */
const SLUGS = {
  chest: ['chest'], shoulders: ['deltoids'], triceps: ['triceps'], biceps: ['biceps'], forearms: ['forearm'],
  traps: ['trapezius'], lats: ['upper-back'], lowerback: ['lower-back'], abs: ['abs'], obliques: ['obliques'],
  glutes: ['gluteal'], quads: ['quadriceps'], hamstrings: ['hamstring'], calves: ['calves'],
}

const SIDES = [
  ['f', figure.front, '0 0 724 1448'],
  ['b', figure.back, '724 0 724 1448'],
]

/** Once per page, before any `Figures`. */
export function FigureDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <defs>
        {SIDES.map(([side, parts, viewBox]) => (
          <g key={side}>
            <symbol id={`ic-body-${side}`} viewBox={viewBox}>
              {parts.map((part) => (
                <path key={part.slug} d={part.d} />
              ))}
            </symbol>
            {parts.map((part) => (
              <symbol key={part.slug} id={`ic-${side}-${part.slug}`} viewBox={viewBox}>
                <path d={part.d} />
              </symbol>
            ))}
          </g>
        ))}
      </defs>
    </svg>
  )
}

function Ground({ children, viewBox, label }) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="ic-stage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#101B30" />
          <stop offset="1" stopColor="#070C16" />
        </linearGradient>
        <radialGradient id="ic-stage-glow" cx="0.5" cy="0.38" r="0.6">
          <stop offset="0" stopColor="#0077cc" stopOpacity="0.38" />
          <stop offset="1" stopColor="#0077cc" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="-1000" y="-1000" width="3000" height="3000" fill="url(#ic-stage)" />
      <rect x="-1000" y="-1000" width="3000" height="3000" fill="url(#ic-stage-glow)" />
      {children}
    </svg>
  )
}

const FIGURE_BOX = {
  // A tile keeps its foot clear for the number and the name.
  tile: { w: 300, h: 400, fw: 132, fh: 264, y: 22, gap: 8 },
  wide: { w: 400, h: 300, fw: 130, fh: 260, y: 20, gap: 30 },
  square: { w: 300, h: 300, fw: 126, fh: 252, y: 24, gap: 14 },
  // A square whose foot carries words over the picture.
  bento: { w: 300, h: 300, fw: 100, fh: 200, y: 16, gap: 22 },
}
const ROUTE_BOX = {
  tile: { w: 300, h: 400, size: 210, y: 48 },
  wide: { w: 400, h: 300, size: 230, y: 35 },
  square: { w: 300, h: 300, size: 220, y: 40 },
  bento: { w: 300, h: 300, size: 176, y: 20 },
}

/** Both figures, the marked muscles lit. `fit`: a 3:4 profile tile, the workout page's 4:3 hero, or a square card. */
export function Figures({ muscles, fit = 'tile' }) {
  const lit = new Set((muscles ?? []).flatMap((key) => SLUGS[key] ?? []))
  const has = (parts, slug) => parts.some((part) => part.slug === slug)
  const box = FIGURE_BOX[fit] ?? FIGURE_BOX.tile
  const x0 = (box.w - box.fw * 2 - box.gap) / 2
  return (
    <Ground viewBox={`0 0 ${box.w} ${box.h}`} label="The muscles this session trained">
      {SIDES.map(([side, parts], index) => {
        const at = { x: x0 + index * (box.fw + box.gap), y: box.y, width: box.fw, height: box.fh }
        return (
          <g key={side}>
            <use href={`#ic-body-${side}`} {...at} fill={BODY} />
            {[...lit].filter((slug) => has(parts, slug)).map((slug) => (
              <use key={slug} href={`#ic-${side}-${slug}`} {...at} fill={BLUE} />
            ))}
          </g>
        )
      })}
    </Ground>
  )
}

/** A route's outline (points in a 0-1000 box; no coordinates ever reach the page). */
export function RouteLine({ shape, fit = 'tile' }) {
  const box = ROUTE_BOX[fit] ?? ROUTE_BOX.tile
  const first = shape[0]
  const last = shape[shape.length - 1]
  return (
    <Ground viewBox={`0 0 ${box.w} ${box.h}`} label="The route, as a line">
      <svg x={(box.w - box.size) / 2} y={box.y} width={box.size} height={box.size} viewBox="-60 -60 1120 1120">
        <polyline
          points={shape.map(([x, y]) => `${x},${y}`).join(' ')}
          fill="none"
          stroke={BLUE}
          strokeWidth="26"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={first[0]} cy={first[1]} r="30" fill="#34C759" stroke="#070C16" strokeWidth="10" />
        <circle cx={last[0]} cy={last[1]} r="30" fill="#FF453A" stroke="#070C16" strokeWidth="10" />
      </svg>
    </Ground>
  )
}

/** A session's picture when it has no photo; null when it has neither a route nor marked muscles. */
export function SessionArt({ shape, muscles, fit = 'tile' }) {
  if (shape?.length >= 4) return <RouteLine shape={shape} fit={fit} />
  if (muscles?.length > 0) return <Figures muscles={muscles} fit={fit} />
  return null
}
