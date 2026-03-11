import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'InstaCal - Health Tracking Meets Social'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #030712 0%, #0a1628 50%, #030712 100%)',
          position: 'relative',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,119,204,0.25) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {/* App name */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            InstaCal
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              background: 'linear-gradient(90deg, #0077cc, #22d3ee)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.3,
            }}
          >
            Health Tracking Meets Social.
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 20,
              color: 'rgba(156,163,175,1)',
              marginTop: 16,
              lineHeight: 1.5,
            }}
          >
            AI-powered nutrition & fitness tracking · Free on iOS & Android
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: 'rgba(107,114,128,1)',
            }}
          >
            theinstacal.app
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
