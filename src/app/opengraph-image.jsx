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
          background: '#030712',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* Top-left glow */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: -150,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(0,119,204,0.3) 0%, transparent 65%)',
          }}
        />

        {/* Bottom-right glow */}
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            right: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 65%)',
          }}
        />

        {/* Center glow behind text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(0,119,204,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
            position: 'relative',
          }}
        >
          {/* Logo icon */}
          <img
            src="https://www.theinstacal.app/instacal-icon.png"
            width={80}
            height={80}
            style={{
              borderRadius: 20,
              marginBottom: 24,
            }}
          />

          {/* App name - extra bold */}
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-4px',
              lineHeight: 1,
            }}
          >
            InstaCal
          </div>

          {/* Subtitle - gradient */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              background: 'linear-gradient(90deg, #0077cc, #22d3ee)',
              backgroundClip: 'text',
              color: 'transparent',
              marginTop: 12,
              lineHeight: 1.3,
            }}
          >
            Health Tracking Meets Social.
          </div>

          {/* Feature pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 32,
            }}
          >
            {['AI Nutrition', 'Social Feed', 'Workout Tracking'].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: 'rgba(209,213,219,1)',
                    padding: '8px 20px',
                    borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                  }}
                >
                  {label}
                </div>
              ),
            )}
          </div>
        </div>

        {/* Bottom: URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 16,
            fontWeight: 500,
            color: 'rgba(107,114,128,1)',
          }}
        >
          theinstacal.app
        </div>
      </div>
    ),
    { ...size },
  )
}
