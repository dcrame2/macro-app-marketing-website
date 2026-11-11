import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { getSharePreview, handleOf, workoutStats } from '@/lib/sharePreview'
import { getSharePage } from '@/lib/sharePage'

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

/** The cards for pages with no one thing behind them: /api/og/site/<key>. */
const SITE_CARDS = {
  calculator: { eyebrow: 'MACRO CALCULATOR', title: 'What should you eat in a day?', line: 'Your calories, protein, carbs and fat in six answers. Free.' },
  recipes: { eyebrow: 'RECIPES', title: 'Recipes with the macros done', line: 'Ingredients, method, calories and protein. From real people.' },
}

/** Up to four photos as the card's right half: one, two side by side, or a 2 x 2. */
function Mosaic({ photos }) {
  const tile = (src, w, h) => <img key={src.slice(-24) + w} src={src} width={w} height={h} style={{ objectFit: 'cover' }} />
  if (photos.length >= 4) {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', width: 600, height: 630, gap: 4 }}>
        {photos.slice(0, 4).map((src) => tile(src, 298, 313))}
      </div>
    )
  }
  if (photos.length >= 2) {
    return (
      <div style={{ display: 'flex', width: 600, height: 630, gap: 4 }}>
        {photos.slice(0, 2).map((src) => tile(src, 298, 630))}
      </div>
    )
  }
  return <div style={{ display: 'flex', width: 600, height: 630 }}>{tile(photos[0], 600, 630)}</div>
}

/** Words on the left, a mosaic of photos on the right (or the words alone). */
function SplitCard({ photos, logo, children }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#030712', fontFamily: 'Inter', position: 'relative' }}>
      <div
        style={{
          position: 'absolute', top: -220, left: -160, width: 620, height: 620, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,119,204,0.34) 0%, transparent 65%)', display: 'flex',
        }}
      />
      <div
        style={{
          width: photos.length ? 600 : 1200, height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: photos.length ? '54px 48px' : '64px 80px', position: 'relative',
        }}
      >
        {children}
        <Signature logo={logo} />
      </div>
      {photos.length ? <Mosaic photos={photos} /> : null}
    </div>
  )
}

/**
 * The card as a JPEG. The renderer only writes PNG, and a card that is mostly
 * photographs came to about 1 MB that way - past what some apps will fetch
 * for a link preview. The same pixels as a JPEG are a fifth of that. If the
 * conversion fails the PNG is served as it was.
 */
const respond = async (node, fonts) => {
  const headers = { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' }
  const png = new ImageResponse(node, { ...SIZE, fonts, headers })
  try {
    const sharp = (await import('sharp')).default
    const jpeg = await sharp(Buffer.from(await png.clone().arrayBuffer())).jpeg({ quality: 84, mozjpeg: true }).toBuffer()
    return new Response(jpeg, { headers: { ...headers, 'Content-Type': 'image/jpeg' } })
  } catch {
    return png
  }
}

export async function GET(_request, { params }) {
  const { type, id } = await params
  const [logoData, interBlack, interSemiBold] = await Promise.all([
    readFile(join(process.cwd(), 'public', 'instacal-icon.png')),
    readFile(join(process.cwd(), 'public', 'Inter-Black.ttf')),
    readFile(join(process.cwd(), 'public', 'Inter-SemiBold.ttf')),
  ])
  const logo = `data:image/png;base64,${logoData.toString('base64')}`
  const fonts = [
    { name: 'Inter', data: interBlack, weight: 900, style: 'normal' },
    { name: 'Inter', data: interSemiBold, weight: 600, style: 'normal' },
  ]
  const fallback = () => Response.redirect(new URL('/opengraph-image', _request.url), 302)
  const eyebrow = (text) => (
    <div style={{ display: 'flex', fontSize: 26, fontWeight: 600, color: BLUE, letterSpacing: '3px' }}>{text}</div>
  )
  const headline = (text, size) => (
    <div style={{ display: 'flex', fontSize: size, fontWeight: 900, color: INK, letterSpacing: '-2px', lineHeight: 1.05 }}>{text}</div>
  )
  const photosOf = async (plates, count) =>
    (await Promise.all(plates.filter((p) => p.image_url).slice(0, count).map((p) => photoData(p.image_url, 600, 630)))).filter(Boolean)

  // A page with no one thing behind it.
  if (type === 'site') {
    const card = SITE_CARDS[id]
    if (!card) return fallback()
    const hub = await getSharePage('recipes')
    const photos = await photosOf(hub?.plates ?? [], 4)
    return respond(
      <SplitCard photos={photos.length >= 2 ? photos : []} logo={logo}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {eyebrow(card.eyebrow)}
          {headline(card.title, photos.length >= 2 ? 62 : 84)}
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 600, color: DIM, lineHeight: 1.3 }}>{card.line}</div>
        </div>
      </SplitCard>,
      fonts,
    )
  }

  // A shared collection: its name, how much is in it, and its plates.
  if (type === 'collection') {
    const page = await getSharePage('collection', id)
    if (!page) return fallback()
    const [photos, face] = await Promise.all([photosOf(page.plates, 4), photoData(page.author?.avatar_url, 160, 160)])
    const count = page.plates.length
    const recipes = page.plates.filter((p) => p.recipe_steps > 0).length
    return respond(
      <SplitCard photos={photos} logo={logo}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Byline author={page.author} avatar={face} verb="A collection by" />
          {headline(page.title, titleSize(page.title, false))}
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 600, color: DIM }}>
            {`${count} ${count === 1 ? 'plate' : 'plates'}${recipes ? ` · ${recipes} ${recipes === 1 ? 'recipe' : 'recipes'}` : ''}`}
          </div>
        </div>
      </SplitCard>,
      fonts,
    )
  }

  // A profile: the face, the name, and what they post.
  if (type === 'user') {
    const page = await getSharePage('user', id)
    if (!page) return fallback()
    const [photos, face] = await Promise.all([
      page.is_public ? photosOf(page.plates ?? [], 4) : [],
      photoData(page.avatar_url, 400, 400),
    ])
    const mosaic = photos.length >= 2 ? photos : []
    const stats = page.is_public
      ? [`${n(page.posts)} posts`, `${n(page.followers)} followers`, page.streak >= 3 ? `${n(page.streak)} day streak` : null].filter(Boolean)
      : []
    const big = mosaic.length ? 150 : 220
    return respond(
      <SplitCard photos={mosaic} logo={logo}>
        <div style={{ display: 'flex', flexDirection: mosaic.length ? 'column' : 'row', alignItems: mosaic.length ? 'flex-start' : 'center', gap: mosaic.length ? 22 : 44 }}>
          {face ? <img src={face} width={big} height={big} style={{ borderRadius: big / 2, objectFit: 'cover' }} /> : null}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {eyebrow('FOLLOW ME ON INSTACAL')}
            {headline(page.name || `@${page.username}`, mosaic.length ? titleSize(page.name || page.username, false) : titleSize(page.name || page.username, true))}
            <div style={{ display: 'flex', fontSize: 34, fontWeight: 600, color: DIM }}>@{page.username}</div>
            {stats.length ? (
              <div style={{ display: 'flex', fontSize: 28, fontWeight: 600, color: DIM }}>{stats.join(' · ')}</div>
            ) : null}
          </div>
        </div>
      </SplitCard>,
      fonts,
    )
  }

  const preview = await getSharePreview(type, id)
  if (!preview || preview.kind === 'challenge') {
    // Nothing public to draw: the site's own card.
    return fallback()
  }

  const [photo, avatar] = await Promise.all([
    photoData(preview.image_url, 630, 630),
    photoData(preview.author?.avatar_url, 160, 160),
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
  }

  return respond(<Card photo={photo} logo={logo}>{body}</Card>, fonts)
}
