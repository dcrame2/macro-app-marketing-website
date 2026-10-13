import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { getSharePreview, handleOf, workoutStats } from '@/lib/sharePreview'

export const runtime = 'nodejs'

const SIZE = { width: 1200, height: 630 }
const INK = '#ffffff'
const DIM = 'rgba(255,255,255,0.72)'
const BLUE = '#1A8EE6'
// The feed card's pastel macro pills.
const PILLS = [
  { key: 'protein', label: 'protein', bg: '#FFE1E1', ink: '#8A1F1F' },
  { key: 'carbs', label: 'carbs', bg: '#FFF1C9', ink: '#7A5200' },
  { key: 'fat', label: 'fat', bg: '#DDEBFF', ink: '#143F7A' },
]
const MAX_PHOTO_BYTES = 6 * 1024 * 1024

/**
 * A photo as a data URL the renderer can draw: JPEG or PNG only (it cannot
 * decode WebP), asked for at the card's size through Supabase's image
 * transform and, failing that, as stored. Null leaves the card without one.
 */
async function photoData(url, width, height) {
  if (!url || !/^https?:\/\//.test(url)) return null
  const sized = url.includes('/storage/v1/object/public/')
    ? `${url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/')}?width=${width}&height=${height}&resize=cover&quality=80`
    : null
  for (const candidate of [sized, url]) {
    if (!candidate) continue
    try {
      const res = await fetch(candidate, { headers: { Accept: 'image/jpeg,image/png' }, cache: 'no-store' })
      if (!res.ok) continue
      const type = (res.headers.get('content-type') || '').split(';')[0]
      if (type !== 'image/jpeg' && type !== 'image/png') continue
      const bytes = Buffer.from(await res.arrayBuffer())
      if (bytes.length === 0 || bytes.length > MAX_PHOTO_BYTES) continue
      return `data:${type};base64,${bytes.toString('base64')}`
    } catch {
      // try the next one
    }
  }
  return null
}

const n = (value) => Math.round(Number(value) || 0).toLocaleString('en-US')

/** A name sized from its length, so a long one wraps instead of clipping. */
const titleSize = (text, roomy) => {
  const len = String(text || '').length
  if (len <= 18) return roomy ? 84 : 68
  if (len <= 34) return roomy ? 66 : 54
  return roomy ? 52 : 44
}

function Signature({ logo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <img src={logo} width={44} height={44} style={{ borderRadius: 11 }} />
      <div style={{ display: 'flex', fontSize: 30, fontWeight: 900, color: INK, letterSpacing: '-1px' }}>InstaCal</div>
    </div>
  )
}

function Byline({ author, avatar, verb }) {
  const who = handleOf(author)
  if (!who) return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      {avatar ? (
        <img src={avatar} width={52} height={52} style={{ borderRadius: 26, objectFit: 'cover' }} />
      ) : null}
      <div style={{ display: 'flex', fontSize: 28, fontWeight: 600, color: DIM }}>
        {verb} {who}
      </div>
    </div>
  )
}

function Card({ photo, logo, children }) {
  const textWidth = photo ? SIZE.width - SIZE.height : SIZE.width
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#030712',
        fontFamily: 'Inter',
        position: 'relative',
      }}
    >
      {photo ? (
        <img src={photo} width={SIZE.height} height={SIZE.height} style={{ objectFit: 'cover' }} />
      ) : null}
      <div
        style={{
          position: 'absolute',
          top: -220,
          right: -160,
          width: 620,
          height: 620,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,119,204,0.34) 0%, transparent 65%)',
          display: 'flex',
        }}
      />
      <div
        style={{
          width: textWidth,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: photo ? '54px 52px' : '64px 80px',
          position: 'relative',
        }}
      >
        {children}
        <Signature logo={logo} />
      </div>
    </div>
  )
}

export async function GET(_request, { params }) {
  const { type, id } = await params
  const preview = await getSharePreview(type, id)
  if (!preview || preview.kind === 'challenge') {
    // Nothing public to draw: the site's own card.
    return Response.redirect(new URL('/opengraph-image', _request.url), 302)
  }

  const [logoData, interBlack, interSemiBold] = await Promise.all([
    readFile(join(process.cwd(), 'public', 'instacal-icon.png')),
    readFile(join(process.cwd(), 'public', 'Inter-Black.ttf')),
    readFile(join(process.cwd(), 'public', 'Inter-SemiBold.ttf')),
  ])
  const logo = `data:image/png;base64,${logoData.toString('base64')}`

  const isUser = preview.kind === 'user'
  const [photo, avatar] = await Promise.all([
    isUser ? null : photoData(preview.image_url, 630, 630),
    photoData(isUser ? preview.avatar_url : preview.author?.avatar_url, isUser ? 600 : 160, isUser ? 600 : 160),
  ])
  const roomy = !photo

  let body
  if (preview.kind === 'meal') {
    body = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Byline author={preview.author} avatar={avatar} verb="Logged by" />
        <div
          style={{
            display: 'flex',
            fontSize: titleSize(preview.title, roomy),
            fontWeight: 900,
            color: INK,
            letterSpacing: '-2px',
            lineHeight: 1.05,
          }}
        >
          {preview.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <div style={{ display: 'flex', fontSize: roomy ? 120 : 104, fontWeight: 900, color: INK, letterSpacing: '-4px', lineHeight: 1 }}>
            {n(preview.calories)}
          </div>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 600, color: DIM }}>cal</div>
        </div>
        <div style={{ display: 'flex', gap: roomy ? 12 : 8, flexWrap: 'wrap' }}>
          {PILLS.map((pill) => (
            <div
              key={pill.key}
              style={{
                display: 'flex',
                // Beside a photo the column is 526 wide: three pills on one row.
                padding: roomy ? '10px 20px' : '8px 15px',
                borderRadius: 999,
                background: pill.bg,
                color: pill.ink,
                fontSize: roomy ? 26 : 21,
                fontWeight: 600,
              }}
            >
              {n(preview[pill.key])}g {pill.label}
            </div>
          ))}
        </div>
      </div>
    )
  } else if (preview.kind === 'workout') {
    const stats = workoutStats(preview)
    body = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Byline author={preview.author} avatar={avatar} verb="Logged by" />
        {preview.activity ? (
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 600, color: BLUE, letterSpacing: '3px' }}>
            {String(preview.activity).toUpperCase()}
          </div>
        ) : null}
        <div
          style={{
            display: 'flex',
            fontSize: titleSize(preview.title, roomy),
            fontWeight: 900,
            color: INK,
            letterSpacing: '-2px',
            lineHeight: 1.05,
          }}
        >
          {preview.title}
        </div>
        {stats.length ? (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', fontSize: roomy ? 120 : 96, fontWeight: 900, color: INK, letterSpacing: '-4px', lineHeight: 1 }}>
              {stats[0]}
            </div>
            {stats.slice(1).map((s) => (
              <div key={s} style={{ display: 'flex', fontSize: 40, fontWeight: 600, color: DIM }}>
                {s}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    )
  } else {
    body = (
      <div style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
        {avatar ? (
          <img src={avatar} width={220} height={220} style={{ borderRadius: 110, objectFit: 'cover' }} />
        ) : null}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 600, color: BLUE, letterSpacing: '3px' }}>
            FOLLOW ME ON INSTACAL
          </div>
          <div style={{ display: 'flex', fontSize: titleSize(preview.name || preview.username, true), fontWeight: 900, color: INK, letterSpacing: '-2px', lineHeight: 1.05 }}>
            {preview.name || `@${preview.username}`}
          </div>
          <div style={{ display: 'flex', fontSize: 36, fontWeight: 600, color: DIM }}>
            @{preview.username}
            {preview.plates ? ` · ${n(preview.plates)} plates` : ''}
          </div>
        </div>
      </div>
    )
  }

  return new ImageResponse(<Card photo={photo} logo={logo}>{body}</Card>, {
    ...SIZE,
    fonts: [
      { name: 'Inter', data: interBlack, weight: 900, style: 'normal' },
      { name: 'Inter', data: interSemiBold, weight: 600, style: 'normal' },
    ],
    headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
  })
}
