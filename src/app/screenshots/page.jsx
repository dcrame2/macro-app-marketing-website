'use client'

import { useRef, useEffect, useCallback, useState, createContext, useContext } from 'react'

const W = 1284
const H = 2778

// iPhone wallpaper dimensions (iPhone 15 Pro Max)
const WW = 1290
const WH = 2796

const IMG = {
  home: '/screenshots/home.png',
  barcode: '/screenshots/barcode.png',
  label_scanner: '/screenshots/label-scanner.png',
  build_meal: '/screenshots/build-meal.png',
  food_search: '/screenshots/food-search.png',
  saved_meals: '/screenshots/saved-meals.png',
  meal_detail: '/screenshots/meal-detail.png',
  social_feed: '/screenshots/social-feed.png',
  slides: '/screenshots/slides.jpg',
  map: '/screenshots/map.jpg',
  progress: '/screenshots/progress.png',
  calories: '/screenshots/calories.png',
  profile: '/screenshots/profile.png',
  photo_scan: '/screenshots/photo-scan.png',
  tracking: '/screenshots/tracking.png',
  icon: '/instacal-icon.png',
}

// ====== PHONE VARIANT CONTEXT ======
const PhoneVariantContext = createContext('iphone')

// ====== PHONE COMPONENT ======
function Phone({ src, style, className = '' }) {
  const variant = useContext(PhoneVariantContext)

  if (variant === 'android') {
    // Android phone — thinner bezels, punch-hole camera, flatter corners, dark frame
    const sL = ((14 / 366) * 100).toFixed(2)
    const sT = ((14 / 729) * 100).toFixed(2)
    const sW = ((338 / 366) * 100).toFixed(2)
    const sH = ((701 / 729) * 100).toFixed(2)
    const br = ((28 / 338) * 100).toFixed(1)
    const brY = ((28 / 701) * 100).toFixed(1)

    return (
      <div
        className={className}
        style={{ position: 'absolute', aspectRatio: '366/729', ...style }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            borderRadius: '10%/5%',
            background: 'linear-gradient(180deg,#2a2a2a 0%,#1a1a1a 100%)',
            boxShadow:
              '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.3)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: `${sL}%`,
              top: `${sT}%`,
              width: `${sW}%`,
              height: `${sH}%`,
              borderRadius: `${br}%/${brY}%`,
              overflow: 'hidden',
              background: '#000',
            }}
          >
            <img
              src={src}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
              }}
              draggable={false}
              alt=""
            />
          </div>
          {/* Punch-hole camera */}
          <div
            style={{
              position: 'absolute',
              top: '2.2%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '3.2%',
              height: '1.6%',
              background: '#000',
              borderRadius: '50%',
              zIndex: 5,
              boxShadow: 'inset 0 0 3px rgba(0,0,0,0.8)',
            }}
          />
          {/* Subtle edge highlight */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '15%',
              right: '15%',
              height: 1,
              background:
                'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)',
            }}
          />
        </div>
      </div>
    )
  }

  // iPhone (default)
  const sL = ((24 / 366) * 100).toFixed(2)
  const sT = ((24 / 729) * 100).toFixed(2)
  const sW = ((316 / 366) * 100).toFixed(2)
  const sH = ((684 / 729) * 100).toFixed(2)
  const br = ((42 / 316) * 100).toFixed(1)
  const brY = ((42 / 684) * 100).toFixed(1)

  return (
    <div
      className={className}
      style={{ position: 'absolute', aspectRatio: '366/729', ...style }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: '14.5%/7.1%',
          background: 'linear-gradient(180deg,#fafafa 0%,#e6e6e6 100%)',
          boxShadow:
            '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.15)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: `${sL}%`,
            top: `${sT}%`,
            width: `${sW}%`,
            height: `${sH}%`,
            borderRadius: `${br}%/${brY}%`,
            overflow: 'hidden',
            background: '#000',
          }}
        >
          <img
            src={src}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
            }}
            draggable={false}
            alt=""
          />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '1.8%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '26%',
            height: '2.8%',
            background: '#111',
            borderRadius: 100,
            zIndex: 5,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: 1,
            background:
              'linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)',
          }}
        />
      </div>
    </div>
  )
}

// ====== GLOW COMPONENT ======
function Glow({ color, w, h, top, left, blur = 120, opacity = 0.3 }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: `${w}%`,
        height: `${h}%`,
        top: `${top}%`,
        left: `${left}%`,
        background: color,
        borderRadius: '50%',
        filter: `blur(${blur}px)`,
        opacity,
        pointerEvents: 'none',
      }}
    />
  )
}

// ====== CAPTION COMPONENT ======
function Caption({
  label,
  headline,
  labelColor = '#4da6ff',
  headlineColor = '#fff',
  style = {},
}) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        paddingTop: H * 0.14,
        ...style,
      }}
    >
      <div
        style={{
          fontSize: W * 0.028,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: labelColor,
          marginBottom: W * 0.015,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: W * 0.092,
          fontWeight: 800,
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          color: headlineColor,
        }}
        dangerouslySetInnerHTML={{ __html: headline }}
      />
    </div>
  )
}

// ====== SLIDE DEFINITIONS ======
const slideConfigs = [
  // 1: HERO
  {
    name: 'Hero',
    bg: 'linear-gradient(165deg, #060612 0%, #001a3d 35%, #003d80 70%, #0066bb 100%)',
    render: () => (
      <>
        <Glow
          color="#0077cc"
          w={80}
          h={25}
          top={18}
          left={10}
          blur={160}
          opacity={0.25}
        />
        <Glow
          color="#00aaff"
          w={45}
          h={18}
          top={55}
          left={50}
          blur={120}
          opacity={0.15}
        />
        <Glow
          color="#0044aa"
          w={50}
          h={15}
          top={75}
          left={-5}
          blur={100}
          opacity={0.2}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            paddingTop: H * 0.06,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: W * 0.13,
              height: W * 0.13,
              marginBottom: W * 0.028,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '-30%',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(0,119,204,0.45) 0%, rgba(0,119,204,0) 70%)',
                pointerEvents: 'none',
              }}
            />
            <img
              src={IMG.icon}
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                zIndex: 1,
              }}
              alt=""
            />
          </div>
          <div
            style={{
              fontSize: W * 0.026,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: '#4da6ff',
              marginBottom: W * 0.018,
            }}
          >
            AI-Powered Nutrition
          </div>
          <div
            style={{
              fontSize: W * 0.105,
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.035em',
              color: '#fff',
            }}
          >
            Health Tracking
            <br />
            Meets Social
          </div>
          <div
            style={{
              fontSize: W * 0.033,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.45)',
              marginTop: W * 0.022,
              letterSpacing: '0.04em',
            }}
          >
            Snap. Track. Share.
          </div>
        </div>
        <Phone
          src={IMG.tracking}
          style={{
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%) translateY(13%)',
            width: W * 0.82,
            zIndex: 5,
          }}
        />
      </>
    ),
  },

  // 2: AI MEAL SCAN
  {
    name: 'AI Meal Scan',
    bg: 'linear-gradient(180deg, #000000 0%, #080e1a 40%, #0d1f35 100%)',
    render: () => (
      <>
        <Glow
          color="#0077cc"
          w={70}
          h={20}
          top={40}
          left={15}
          blur={160}
          opacity={0.15}
        />
        <Glow
          color="#0055aa"
          w={40}
          h={15}
          top={25}
          left={55}
          blur={100}
          opacity={0.12}
        />
        {/* Scan brackets */}
        {[
          {
            top: H * 0.3,
            left: W * 0.05,
            borderLeft: '3px solid #0077cc',
            borderTop: '3px solid #0077cc',
          },
          {
            top: H * 0.3,
            right: W * 0.05,
            borderRight: '3px solid #0077cc',
            borderTop: '3px solid #0077cc',
          },
          {
            bottom: H * 0.2,
            left: W * 0.05,
            borderLeft: '3px solid #0077cc',
            borderBottom: '3px solid #0077cc',
          },
          {
            bottom: H * 0.2,
            right: W * 0.05,
            borderRight: '3px solid #0077cc',
            borderBottom: '3px solid #0077cc',
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: W * 0.1,
              height: W * 0.1,
              zIndex: 15,
              opacity: 0.7,
              ...s,
            }}
          />
        ))}
        <Caption
          label="AI-Powered"
          headline="Snap a Photo.<br/>Know Your Macros."
        />
        <Phone
          src={IMG.photo_scan}
          style={{
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%) translateY(10%)',
            width: W * 0.84,
            zIndex: 5,
          }}
        />
      </>
    ),
  },

  // 3: SOCIAL FEED (LIGHT)
  {
    name: 'Social Feed',
    bg: 'linear-gradient(165deg, #f2f6fa 0%, #e4edf7 40%, #d4e3f5 100%)',
    render: () => (
      <>
        <Glow
          color="#0077cc"
          w={50}
          h={20}
          top={8}
          left={55}
          blur={140}
          opacity={0.1}
        />
        <Glow
          color="#80bfff"
          w={40}
          h={18}
          top={55}
          left={-10}
          blur={120}
          opacity={0.12}
        />
        <div
          style={{
            position: 'absolute',
            top: H * 0.33,
            left: W * 0.03,
            padding: `${W * 0.018}px ${W * 0.035}px`,
            borderRadius: 100,
            background: '#fff',
            color: '#222',
            fontSize: W * 0.025,
            fontWeight: 700,
            boxShadow: '0 8px 28px rgba(0,0,0,0.1)',
            transform: 'rotate(-5deg)',
            zIndex: 12,
          }}
        >
          915 cal
        </div>
        <div
          style={{
            position: 'absolute',
            top: H * 0.38,
            left: W * 0.015,
            padding: `${W * 0.015}px ${W * 0.03}px`,
            borderRadius: 100,
            background: '#0077cc',
            color: '#fff',
            fontSize: W * 0.023,
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(0,119,204,0.35)',
            transform: 'rotate(3deg)',
            zIndex: 12,
          }}
        >
          3 likes
        </div>
        <Caption
          label="Social"
          headline="See What Your<br/>Friends Eat."
          labelColor="#0077cc"
          headlineColor="#111"
        />
        <Phone
          src={IMG.social_feed}
          style={{
            bottom: 0,
            right: W * -0.01,
            transform: 'translateY(10%)',
            width: W * 0.82,
            zIndex: 5,
          }}
        />
      </>
    ),
  },

  // 4: STORIES
  {
    name: 'Stories',
    bg: 'linear-gradient(165deg, #0a0812 0%, #1a1028 45%, #120a22 100%)',
    render: () => (
      <>
        <Glow
          color="#7c3aed"
          w={60}
          h={25}
          top={22}
          left={20}
          blur={150}
          opacity={0.2}
        />
        <Glow
          color="#0077cc"
          w={40}
          h={18}
          top={60}
          left={50}
          blur={120}
          opacity={0.15}
        />
        <Glow
          color="#a855f7"
          w={30}
          h={12}
          top={75}
          left={5}
          blur={100}
          opacity={0.1}
        />
        <Caption
          label="Slides"
          headline="Share Your<br/>Meal Moments."
          labelColor="#a78bfa"
        />
        <Phone
          src={IMG.slides}
          style={{
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%) translateY(8%)',
            width: W * 0.8,
            zIndex: 5,
          }}
        />
      </>
    ),
  },

  // 5: MAP (LIGHT)
  {
    name: 'Map',
    bg: 'linear-gradient(165deg, #ffffff 0%, #f2f8ff 35%, #e3effc 100%)',
    render: () => (
      <>
        <Glow
          color="#0077cc"
          w={45}
          h={18}
          top={60}
          left={28}
          blur={150}
          opacity={0.08}
        />
        <div
          style={{
            position: 'absolute',
            top: H * 0.31,
            left: W * 0.07,
            width: W * 0.05,
            height: W * 0.05,
            background: '#0077cc',
            borderRadius: '50%',
            boxShadow:
              '0 0 24px rgba(0,119,204,0.5), 0 0 60px rgba(0,119,204,0.2)',
            zIndex: 12,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: H * 0.36,
            right: W * 0.06,
            width: W * 0.035,
            height: W * 0.035,
            background: '#0077cc',
            borderRadius: '50%',
            opacity: 0.5,
            boxShadow: '0 0 20px rgba(0,119,204,0.4)',
            zIndex: 12,
          }}
        />
        <Caption
          label="Discover"
          headline="Find Food<br/>Near You."
          labelColor="#0077cc"
          headlineColor="#111"
        />
        <Phone
          src={IMG.map}
          style={{
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%) translateY(14%)',
            width: W * 0.84,
            zIndex: 5,
          }}
        />
      </>
    ),
  },

  // 6: PROGRESS
  {
    name: 'Progress',
    bg: 'linear-gradient(165deg, #060612 0%, #0a1a2e 45%, #0d2844 100%)',
    render: () => (
      <>
        <Glow
          color="#00cc88"
          w={55}
          h={20}
          top={22}
          left={22}
          blur={140}
          opacity={0.12}
        />
        <Glow
          color="#0077cc"
          w={40}
          h={18}
          top={60}
          left={50}
          blur={110}
          opacity={0.15}
        />
        <div
          style={{
            position: 'absolute',
            top: H * 0.34,
            right: W * 0.035,
            padding: `${W * 0.025}px ${W * 0.04}px`,
            borderRadius: 20,
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            zIndex: 12,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: W * 0.055,
              fontWeight: 800,
              color: '#4ade80',
              lineHeight: 1,
            }}
          >
            30
          </div>
          <div
            style={{
              fontSize: W * 0.02,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.45)',
              marginTop: 4,
            }}
          >
            day streak
          </div>
        </div>
        <Caption
          label="Progress"
          headline="Track Your<br/>Goals."
          labelColor="#4ade80"
        />
        <Phone
          src={IMG.progress}
          style={{
            bottom: 0,
            left: W * 0.06,
            transform: 'translateY(10%)',
            width: W * 0.84,
            zIndex: 5,
          }}
        />
      </>
    ),
  },

  // 7: DAILY MACROS (LIGHT) — Two phones
  {
    name: 'Daily Macros',
    bg: 'linear-gradient(165deg, #f8fafc 0%, #edf3fb 45%, #dde8f4 100%)',
    render: () => (
      <>
        <Glow
          color="#0077cc"
          w={50}
          h={20}
          top={18}
          left={25}
          blur={140}
          opacity={0.08}
        />
        <Caption
          label="Your Dashboard"
          headline="Every Macro.<br/>Every Day."
          labelColor="#0077cc"
          headlineColor="#111"
        />
        <Phone
          src={IMG.home}
          style={{
            bottom: 0,
            left: W * -0.06,
            transform: 'translateY(16%) rotate(-5deg)',
            width: W * 0.64,
            zIndex: 3,
            opacity: 0.4,
          }}
        />
        <Phone
          src={IMG.calories}
          style={{
            bottom: 0,
            right: W * -0.02,
            transform: 'translateY(10%)',
            width: W * 0.82,
            zIndex: 5,
          }}
        />
      </>
    ),
  },

  // 8: MORE FEATURES
  {
    name: 'More Features',
    bg: 'linear-gradient(165deg, #060612 0%, #001433 40%, #002966 85%, #003d80 100%)',
    render: () => {
      const features = [
        'Barcode Scanner',
        'AI Dietitian',
        'Nutrition Labels',
        'Food Search',
        'Build a Meal',
        'Saved Meals',
        'Macro Insights',
        'Weekly Charts',
      ]
      const coming = ['Apple Watch', 'Widgets', 'Recipes']
      return (
        <>
          <Glow
            color="#0077cc"
            w={65}
            h={25}
            top={30}
            left={18}
            blur={160}
            opacity={0.18}
          />
          <Glow
            color="#00aaff"
            w={40}
            h={18}
            top={65}
            left={50}
            blur={120}
            opacity={0.1}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '8% 10%',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: W * 0.17,
                height: W * 0.17,
                marginBottom: W * 0.05,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '-35%',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(0,119,204,0.5) 0%, rgba(0,119,204,0) 65%)',
                  pointerEvents: 'none',
                }}
              />
              <img
                src={IMG.icon}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  zIndex: 1,
                }}
                alt=""
              />
            </div>
            <div
              style={{
                fontSize: W * 0.09,
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                color: '#fff',
                marginBottom: W * 0.055,
              }}
            >
              And So
              <br />
              Much More.
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: W * 0.02,
                marginBottom: W * 0.05,
              }}
            >
              {features.map((f) => (
                <span
                  key={f}
                  style={{
                    padding: `${W * 0.018}px ${W * 0.038}px`,
                    borderRadius: 100,
                    fontSize: W * 0.028,
                    fontWeight: 600,
                    background: 'rgba(0,119,204,0.15)',
                    color: '#4da6ff',
                    border: '1px solid rgba(0,119,204,0.3)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
            <div
              style={{
                fontSize: W * 0.02,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.25)',
                marginBottom: W * 0.025,
              }}
            >
              Coming Soon
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: W * 0.02,
                marginBottom: W * 0.06,
              }}
            >
              {coming.map((f) => (
                <span
                  key={f}
                  style={{
                    padding: `${W * 0.016}px ${W * 0.035}px`,
                    borderRadius: 100,
                    fontSize: W * 0.026,
                    fontWeight: 600,
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.28)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </>
      )
    },
  },

  // 9: PROFILE (LIGHT)
  {
    name: 'Profile',
    bg: 'linear-gradient(165deg, #f8fafc 0%, #eef4fb 40%, #e0ecf8 100%)',
    render: () => (
      <>
        <Glow
          color="#0077cc"
          w={50}
          h={20}
          top={12}
          left={50}
          blur={140}
          opacity={0.08}
        />
        <Glow
          color="#80bfff"
          w={35}
          h={15}
          top={60}
          left={-5}
          blur={110}
          opacity={0.1}
        />
        <div
          style={{
            position: 'absolute',
            top: H * 0.32,
            right: W * 0.05,
            padding: `${W * 0.018}px ${W * 0.035}px`,
            borderRadius: 100,
            background: '#fff',
            color: '#0077cc',
            fontSize: W * 0.025,
            fontWeight: 700,
            boxShadow: '0 8px 24px rgba(0,119,204,0.2)',
            transform: 'rotate(-3deg)',
            zIndex: 12,
          }}
        >
          1,077 posts
        </div>
        <Caption
          label="Your Profile"
          headline="Build Your<br/>Food Identity."
          labelColor="#0077cc"
          headlineColor="#111"
        />
        <Phone
          src={IMG.profile}
          style={{
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%) translateY(12%)',
            width: W * 0.84,
            zIndex: 5,
          }}
        />
      </>
    ),
  },

  // 10: BRAND SPLASH — logo snow vibe, no phone
  {
    name: 'Brand Splash',
    bg: 'linear-gradient(165deg, #060612 0%, #001433 50%, #002255 100%)',
    render: () => {
      const logos = Array.from({ length: 60 }, (_, i) => {
        const size = 14 + ((i * 7) % 50)
        const x = (i * 23.7 + 5) % 100
        const y = (i * 17.3 + 3) % 100
        const rot = -30 + ((i * 41) % 60)
        const op = 0.03 + ((i * 3) % 8) * 0.015
        return { size, x, y, rot, op, i }
      })
      return (
        <>
          {/* Background glows */}
          <div
            style={{
              position: 'absolute',
              width: '80%',
              height: '35%',
              top: '15%',
              left: '10%',
              background: 'radial-gradient(ellipse, rgba(0,119,204,0.15) 0%, transparent 60%)',
              filter: 'blur(120px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '60%',
              height: '25%',
              bottom: '10%',
              right: '-5%',
              background: 'radial-gradient(ellipse, rgba(0,80,180,0.12) 0%, transparent 60%)',
              filter: 'blur(100px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '50%',
              height: '20%',
              bottom: '30%',
              left: '-10%',
              background: 'radial-gradient(ellipse, rgba(0,60,160,0.1) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
          />
          {/* Falling logos */}
          {logos.map(({ size, x, y, rot, op, i: idx }) => (
            <img
              key={`logo${idx}`}
              src={IMG.icon}
              alt=""
              style={{
                position: 'absolute',
                width: size,
                height: size,
                left: `${x}%`,
                top: `${y}%`,
                transform: `rotate(${rot}deg)`,
                opacity: op,
                filter: size > 40 ? 'drop-shadow(0 0 8px rgba(0,119,204,0.15))' : 'none',
                zIndex: 1,
              }}
            />
          ))}
          {/* Center content */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Logo with glow */}
            <div
              style={{
                position: 'relative',
                width: W * 0.22,
                height: W * 0.22,
                marginBottom: W * 0.045,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '-50%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,119,204,0.5) 0%, rgba(0,119,204,0) 60%)',
                  pointerEvents: 'none',
                }}
              />
              <img
                src={IMG.icon}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  zIndex: 1,
                  filter: 'drop-shadow(0 0 40px rgba(0,119,204,0.5))',
                }}
                alt=""
              />
            </div>
            {/* App name */}
            <div
              style={{
                fontSize: W * 0.13,
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                textShadow: '0 0 60px rgba(0,119,204,0.35)',
                marginBottom: W * 0.025,
              }}
            >
              InstaCal
            </div>
            {/* Tagline */}
            <div
              style={{
                fontSize: W * 0.03,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Snap · Track · Share
            </div>
          </div>
          {/* Vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 60% 55% at 50% 50%, transparent 30%, rgba(4,4,12,0.6) 100%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
        </>
      )
    },
  },
]

// ====== WALLPAPER DEFINITIONS ======
const wallpaperConfigs = [
  // 1: DEEP SPACE NEBULA
  {
    name: 'Deep Space',
    render: () => (
      <div
        style={{
          width: WW,
          height: WH,
          position: 'relative',
          overflow: 'hidden',
          background: '#020108',
        }}
      >
        {/* Star field */}
        {Array.from({ length: 120 }, (_, i) => (
          <div
            key={`s${i}`}
            style={{
              position: 'absolute',
              width: i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
              height: i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
              borderRadius: '50%',
              background:
                i % 7 === 0 ? '#4da6ff' : i % 11 === 0 ? '#a78bfa' : '#fff',
              opacity: 0.15 + (i % 10) * 0.08,
              top: `${(i * 23.7) % 100}%`,
              left: `${(i * 31.3) % 100}%`,
            }}
          />
        ))}
        {/* Deep nebula layers */}
        <div
          style={{
            position: 'absolute',
            width: '180%',
            height: '60%',
            top: '15%',
            left: '-40%',
            background:
              'radial-gradient(ellipse, rgba(0,80,180,0.15) 0%, rgba(0,40,120,0.08) 30%, transparent 65%)',
            filter: 'blur(80px)',
            transform: 'rotate(-15deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '120%',
            height: '40%',
            top: '30%',
            left: '-10%',
            background:
              'radial-gradient(ellipse, rgba(100,40,180,0.12) 0%, transparent 60%)',
            filter: 'blur(100px)',
            transform: 'rotate(10deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '80%',
            height: '35%',
            bottom: '10%',
            right: '-20%',
            background:
              'radial-gradient(ellipse, rgba(0,119,204,0.1) 0%, transparent 60%)',
            filter: 'blur(90px)',
          }}
        />
        {/* Main logo glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: WW * 0.7,
            height: WW * 0.7,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(0,119,204,0.3) 0%, rgba(0,119,204,0.08) 35%, rgba(0,60,150,0.03) 55%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Orbital rings */}
        {[0.38, 0.55, 0.75].map((size, i) => (
          <div
            key={`r${i}`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: WW * size,
              height: WW * size,
              transform: `translate(-50%, -50%) rotate(${-15 + i * 25}deg)`,
              borderRadius: '50%',
              border: `1px solid rgba(0,119,204,${0.12 - i * 0.03})`,
            }}
          />
        ))}
        {/* Logo */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: WW * 0.18,
              height: WW * 0.18,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '-50%',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(0,119,204,0.5) 0%, rgba(0,119,204,0) 60%)',
                pointerEvents: 'none',
              }}
            />
            <img
              src="/instacal-icon.png"
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                zIndex: 1,
                filter: 'drop-shadow(0 0 30px rgba(0,119,204,0.4))',
              }}
              alt=""
            />
          </div>
          <div
            style={{
              marginTop: WW * 0.04,
              fontSize: WW * 0.04,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              opacity: 0.6,
              textShadow: '0 0 20px rgba(0,119,204,0.3)',
            }}
          >
            InstaCal
          </div>
        </div>
        {/* Subtle vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </div>
    ),
  },

  // 2: LOGO SNOW — tiny InstaCal logos falling like snow everywhere
  {
    name: 'Logo Snow',
    render: () => {
      const logos = Array.from({ length: 55 }, (_, i) => {
        const size = 18 + ((i * 7) % 40)
        const x = (i * 23.7 + 5) % 100
        const y = (i * 17.3 + 3) % 100
        const rot = -30 + ((i * 41) % 60)
        const op = 0.04 + ((i * 3) % 8) * 0.02
        return { size, x, y, rot, op, i }
      })
      return (
        <div
          style={{
            width: WW,
            height: WH,
            position: 'relative',
            overflow: 'hidden',
            background:
              'linear-gradient(165deg, #060612 0%, #001433 50%, #002255 100%)',
          }}
        >
          {/* Background glows */}
          <div
            style={{
              position: 'absolute',
              width: '70%',
              height: '30%',
              top: '10%',
              left: '15%',
              background:
                'radial-gradient(ellipse, rgba(0,119,204,0.12) 0%, transparent 60%)',
              filter: 'blur(100px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '50%',
              height: '25%',
              bottom: '15%',
              right: '0%',
              background:
                'radial-gradient(ellipse, rgba(0,80,180,0.1) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
          />
          {/* Falling logos */}
          {logos.map(({ size, x, y, rot, op, i: idx }) => (
            <img
              key={`logo${idx}`}
              src="/instacal-icon.png"
              alt=""
              style={{
                position: 'absolute',
                width: size,
                height: size,
                left: `${x}%`,
                top: `${y}%`,
                transform: `rotate(${rot}deg)`,
                opacity: op,
                filter:
                  size > 40
                    ? 'drop-shadow(0 0 8px rgba(0,119,204,0.15))'
                    : 'none',
              }}
            />
          ))}
          {/* Center hero — big INSTACAL text */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: WW * 0.14,
                height: WW * 0.14,
                marginBottom: WW * 0.03,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '-45%',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(0,119,204,0.4) 0%, rgba(0,119,204,0) 60%)',
                  pointerEvents: 'none',
                }}
              />
              <img
                src="/instacal-icon.png"
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  zIndex: 1,
                  filter: 'drop-shadow(0 0 30px rgba(0,119,204,0.5))',
                }}
                alt=""
              />
            </div>
            <div
              style={{
                fontSize: WW * 0.09,
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                textShadow: '0 0 40px rgba(0,119,204,0.3)',
              }}
            >
              InstaCal
            </div>
            <div
              style={{
                marginTop: WW * 0.015,
                fontSize: WW * 0.024,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Snap. Track. Share.
            </div>
          </div>
          {/* Top fade for clock */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '12%',
              background:
                'linear-gradient(to bottom, rgba(6,6,18,0.95), transparent)',
            }}
          />
          {/* Vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 60% 55% at 50% 50%, transparent 35%, rgba(4,4,12,0.6) 100%)',
            }}
          />
        </div>
      )
    },
  },

  // 3: GIANT SLANT — massive INSTACAL text slanted across the entire screen
  {
    name: 'Giant Slant',
    render: () => (
      <div
        style={{
          width: WW,
          height: WH,
          position: 'relative',
          overflow: 'hidden',
          background: '#030308',
        }}
      >
        {/* Background gradient wash */}
        <div
          style={{
            position: 'absolute',
            width: '150%',
            height: '100%',
            top: 0,
            left: '-25%',
            background:
              'linear-gradient(135deg, rgba(0,30,80,0.3) 0%, transparent 40%, rgba(0,60,150,0.15) 60%, transparent 80%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Giant slanted text — multiple layers for depth */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-25deg)',
            whiteSpace: 'nowrap',
            zIndex: 2,
          }}
        >
          {/* Shadow layer */}
          <div
            style={{
              fontSize: WW * 0.28,
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: `3px rgba(0,119,204,0.06)`,
              letterSpacing: '-0.03em',
              position: 'absolute',
              top: 8,
              left: 8,
              filter: 'blur(2px)',
            }}
          >
            INSTACAL
          </div>
          {/* Outline layer */}
          <div
            style={{
              fontSize: WW * 0.28,
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: `2px rgba(0,119,204,0.15)`,
              letterSpacing: '-0.03em',
              position: 'relative',
            }}
          >
            INSTACAL
          </div>
        </div>
        {/* Second text — offset, bigger, even more faded */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-25deg)',
            whiteSpace: 'nowrap',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: WW * 0.22,
              fontWeight: 900,
              color: 'rgba(0,119,204,0.04)',
              letterSpacing: '-0.02em',
            }}
          >
            INSTACAL
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '70%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-25deg)',
            whiteSpace: 'nowrap',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: WW * 0.22,
              fontWeight: 900,
              color: 'rgba(0,119,204,0.04)',
              letterSpacing: '-0.02em',
            }}
          >
            INSTACAL
          </div>
        </div>
        {/* Glow behind the main text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-25deg)',
            width: WW * 2,
            height: WW * 0.3,
            background:
              'linear-gradient(90deg, transparent, rgba(0,119,204,0.06), rgba(0,119,204,0.1), rgba(0,119,204,0.06), transparent)',
            filter: 'blur(60px)',
            zIndex: 1,
          }}
        />
        {/* Horizontal light streak across the text */}
        <div
          style={{
            position: 'absolute',
            top: '48%',
            left: 0,
            right: 0,
            height: 1,
            background:
              'linear-gradient(90deg, transparent 10%, rgba(0,119,204,0.2) 30%, rgba(100,180,255,0.4) 50%, rgba(0,119,204,0.2) 70%, transparent 90%)',
            zIndex: 5,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '48%',
            left: 0,
            right: 0,
            height: WW * 0.03,
            background:
              'linear-gradient(90deg, transparent, rgba(0,119,204,0.04), rgba(0,119,204,0.08), rgba(0,119,204,0.04), transparent)',
            filter: 'blur(15px)',
            zIndex: 4,
          }}
        />
        {/* Logo + name centered */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: WW * 0.16,
              height: WW * 0.16,
              marginBottom: WW * 0.025,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '-50%',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(0,119,204,0.45) 0%, rgba(0,119,204,0) 55%)',
                pointerEvents: 'none',
              }}
            />
            <img
              src="/instacal-icon.png"
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                zIndex: 1,
                filter: 'drop-shadow(0 0 40px rgba(0,119,204,0.5))',
              }}
              alt=""
            />
          </div>
          <div
            style={{
              fontSize: WW * 0.065,
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-0.01em',
              textShadow: '0 0 30px rgba(0,119,204,0.4)',
            }}
          >
            InstaCal
          </div>
        </div>
        {/* Top fade for clock */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '12%',
            background:
              'linear-gradient(to bottom, rgba(3,3,8,0.95), transparent)',
          }}
        />
        {/* Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 55% 50% at 50% 50%, transparent 30%, rgba(3,3,8,0.7) 100%)',
          }}
        />
      </div>
    ),
  },

  // 4: STACKED TYPE — INSTACAL repeated vertically, filling the screen, one line pops
  {
    name: 'Type Wall',
    render: () => {
      const rows = 14
      const highlightRow = 6
      return (
        <div
          style={{
            width: WW,
            height: WH,
            position: 'relative',
            overflow: 'hidden',
            background: '#050508',
          }}
        >
          {/* Ambient glow behind highlight row */}
          <div
            style={{
              position: 'absolute',
              top: `${(highlightRow / rows) * 100}%`,
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: WW * 1.2,
              height: WH * 0.12,
              background:
                'radial-gradient(ellipse, rgba(0,119,204,0.2) 0%, rgba(0,119,204,0.05) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          {/* Stacked text */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 2,
            }}
          >
            {Array.from({ length: rows }, (_, i) => {
              const isHighlight = i === highlightRow
              const dist = Math.abs(i - highlightRow)
              const opacity = isHighlight
                ? 1
                : Math.max(0.03, 0.15 - dist * 0.02)
              const color = isHighlight ? '#fff' : `rgba(0,119,204,${opacity})`
              const size = isHighlight ? WW * 0.115 : WW * 0.1
              return (
                <div
                  key={`row${i}`}
                  style={{
                    fontSize: size,
                    fontWeight: 900,
                    color,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    whiteSpace: 'nowrap',
                    textShadow: isHighlight
                      ? '0 0 50px rgba(0,119,204,0.5), 0 0 100px rgba(0,119,204,0.2)'
                      : 'none',
                    position: 'relative',
                  }}
                >
                  INSTACAL
                  {isHighlight && (
                    <>
                      {/* Glow line under the highlight */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: -2,
                          left: '10%',
                          right: '10%',
                          height: 2,
                          background:
                            'linear-gradient(90deg, transparent, rgba(0,119,204,0.6), transparent)',
                          filter: 'blur(1px)',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: -8,
                          left: '20%',
                          right: '20%',
                          height: 8,
                          background:
                            'linear-gradient(90deg, transparent, rgba(0,119,204,0.15), transparent)',
                          filter: 'blur(8px)',
                        }}
                      />
                    </>
                  )}
                </div>
              )
            })}
          </div>
          {/* Logo overlay in center of highlight text */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 15,
            }}
          >
            <div
              style={{
                position: 'relative',
                width: WW * 0.12,
                height: WW * 0.12,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '-40%',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(0,119,204,0.5) 0%, rgba(0,119,204,0) 55%)',
                  pointerEvents: 'none',
                }}
              />
              <img
                src="/instacal-icon.png"
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  zIndex: 1,
                  filter: 'drop-shadow(0 0 30px rgba(0,119,204,0.6))',
                }}
                alt=""
              />
            </div>
          </div>
          {/* Top fade for clock */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '14%',
              background:
                'linear-gradient(to bottom, rgba(5,5,8,1), rgba(5,5,8,0.8), transparent)',
              zIndex: 5,
            }}
          />
          {/* Bottom fade for dock */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '10%',
              background:
                'linear-gradient(to top, rgba(5,5,8,0.9), transparent)',
              zIndex: 5,
            }}
          />
        </div>
      )
    },
  },

  // 5: 6 WAYS TO LOG — showcasing all 6 logging methods with phones fanned out
  {
    name: '6 Ways to Log',
    render: () => {
      const methods = [
        { img: IMG.photo_scan, label: 'Photo', color: '#0077cc' },
        { img: IMG.barcode, label: 'Barcode', color: '#7c3aed' },
        { img: '/screenshots/label-scanner.png', label: 'Label', color: '#10b981' },
        { img: '/screenshots/food-search.png', label: 'Search', color: '#f59e0b' },
        { img: '/screenshots/build-meal.png', label: 'Build', color: '#ef4444' },
        { img: '/screenshots/saved-meals.png', label: 'Saved', color: '#6366f1' },
      ]
      return (
        <div style={{ width: WW, height: WH, position: 'relative', overflow: 'hidden', background: 'linear-gradient(165deg, #060612 0%, #001030 50%, #001845 100%)' }}>
          <Glow color="#0077cc" w={80} h={30} top={10} left={10} blur={160} opacity={0.2} />
          <Glow color="#7c3aed" w={50} h={20} top={65} left={45} blur={120} opacity={0.12} />
          {/* Title */}
          <div style={{ position: 'absolute', top: WH * 0.05, left: 0, right: 0, zIndex: 20, textAlign: 'center' }}>
            <div style={{ fontSize: WW * 0.03, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#4da6ff', marginBottom: WW * 0.015 }}>
              6 Ways to Log
            </div>
            <div style={{ fontSize: WW * 0.09, fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', color: '#fff' }}>
              Your Meal,<br />Your Way.
            </div>
          </div>
          {/* Fan of 6 phones — 3 on each side, overlapping */}
          {methods.map((m, i) => {
            const phoneW = WW * 0.38
            const angles = [-18, -10, -3, 3, 10, 18]
            const xOffsets = [-WW * 0.28, -WW * 0.17, -WW * 0.06, WW * 0.06, WW * 0.17, WW * 0.28]
            const yOffsets = [WH * 0.06, WH * 0.02, 0, 0, WH * 0.02, WH * 0.06]
            return (
              <div key={`fan${i}`} style={{ position: 'absolute', bottom: -WH * 0.08, left: '50%', transform: `translateX(${xOffsets[i]}px) rotate(${angles[i]}deg)`, width: phoneW, zIndex: 10 + (3 - Math.abs(i - 2.5)), marginBottom: yOffsets[i] }}>
                <div style={{ width: '100%', aspectRatio: '366/729', position: 'relative', borderRadius: '14.5%/7.1%', overflow: 'hidden', background: '#1a1a1a', boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${m.color}22` }}>
                  <img src={m.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div style={{ textAlign: 'center', marginTop: WW * 0.015, fontSize: WW * 0.022, fontWeight: 700, color: m.color, textShadow: `0 0 20px ${m.color}44` }}>
                  {m.label}
                </div>
              </div>
            )
          })}
        </div>
      )
    },
  },

  // 6: SOCIAL COLLAGE — tilted grid of real meal photos from the social feed
  {
    name: 'Social Collage',
    render: () => {
      const screens = [
        IMG.social_feed, IMG.slides, IMG.profile,
        IMG.meal_detail, IMG.home, IMG.map,
        IMG.calories, IMG.progress, IMG.social_feed,
        IMG.slides, IMG.profile, IMG.meal_detail,
      ]
      return (
        <div style={{ width: WW, height: WH, position: 'relative', overflow: 'hidden', background: '#050508' }}>
          {/* Tilted grid of screenshots */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-12deg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: WW * 0.025,
            width: WW * 1.4,
            zIndex: 2,
          }}>
            {screens.map((src, i) => (
              <div key={`col${i}`} style={{
                aspectRatio: '9/16',
                borderRadius: WW * 0.025,
                overflow: 'hidden',
                opacity: [0, 2, 3, 5, 8, 11].includes(i) ? 0.8 : 0.35,
                transform: i % 2 === 0 ? 'translateY(-8%)' : 'translateY(8%)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
            ))}
          </div>
          {/* Dark overlay for readability */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)', zIndex: 5 }} />
          {/* Content on top */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, textAlign: 'center' }}>
            <div style={{ position: 'relative', width: WW * 0.18, height: WW * 0.18, margin: '0 auto', marginBottom: WW * 0.04 }}>
              <div style={{ position: 'absolute', inset: '-40%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,119,204,0.5) 0%, rgba(0,119,204,0) 60%)', pointerEvents: 'none' }} />
              <img src={IMG.icon} style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 0 40px rgba(0,119,204,0.5))' }} alt="" />
            </div>
            <div style={{ fontSize: WW * 0.1, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.95, textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
              Health Tracking<br />Meets Social.
            </div>
            <div style={{ marginTop: WW * 0.03, fontSize: WW * 0.028, fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
              Snap · Track · Share · Discover
            </div>
          </div>
        </div>
      )
    },
  },

  // 7: MAP DISCOVERY — the map feature front and center, showing food near you
  {
    name: 'Map Discovery',
    render: () => (
      <div style={{ width: WW, height: WH, position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #001030 0%, #001845 30%, #002255 100%)' }}>
        {/* Big map screenshot as background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <img src={IMG.map} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.25, filter: 'blur(2px) saturate(0.6)' }} />
        </div>
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,16,48,0.7) 0%, rgba(0,16,48,0.4) 40%, rgba(0,16,48,0.85) 100%)', zIndex: 2 }} />
        {/* Floating map pins */}
        {[
          { top: '22%', left: '18%', size: 50, op: 0.6 },
          { top: '30%', right: '15%', size: 40, op: 0.4 },
          { top: '58%', left: '12%', size: 35, op: 0.3 },
          { top: '65%', right: '22%', size: 45, op: 0.5 },
          { top: '42%', left: '72%', size: 30, op: 0.25 },
        ].map((pin, i) => (
          <div key={`pin${i}`} style={{ position: 'absolute', ...pin, width: pin.size, height: pin.size, borderRadius: '50%', background: '#0077cc', opacity: pin.op, boxShadow: `0 0 ${pin.size}px rgba(0,119,204,0.5), 0 0 ${pin.size * 2}px rgba(0,119,204,0.15)`, zIndex: 4 }} />
        ))}
        {/* Center phone showing map */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <div style={{ width: WW * 0.55, aspectRatio: '366/729', position: 'relative', borderRadius: '14.5%/7.1%', overflow: 'hidden', background: '#1a1a1a', boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(0,119,204,0.2)' }}>
            <img src={IMG.map} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
        </div>
        {/* Top text */}
        <div style={{ position: 'absolute', top: WH * 0.06, left: 0, right: 0, zIndex: 15, textAlign: 'center' }}>
          <div style={{ fontSize: WW * 0.03, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#4da6ff', marginBottom: WW * 0.012 }}>Discover</div>
          <div style={{ fontSize: WW * 0.085, fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', color: '#fff' }}>
            What&apos;s Cooking<br />Near You.
          </div>
        </div>
        {/* Bottom stats */}
        <div style={{ position: 'absolute', bottom: WH * 0.06, left: 0, right: 0, zIndex: 15, display: 'flex', justifyContent: 'center', gap: WW * 0.08 }}>
          {[
            { num: '24', label: 'Places' },
            { num: '156', label: 'Meals' },
            { num: '12', label: 'Friends' },
          ].map((stat, i) => (
            <div key={`st${i}`} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: WW * 0.06, fontWeight: 800, color: '#fff' }}>{stat.num}</div>
              <div style={{ fontSize: WW * 0.02, fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // 8: STATS DASHBOARD — data viz style showing macros and progress
  {
    name: 'Stats Dashboard',
    render: () => {
      const bars = [65, 82, 45, 90, 73, 58, 88]
      const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
      return (
        <div style={{ width: WW, height: WH, position: 'relative', overflow: 'hidden', background: 'linear-gradient(165deg, #060612 0%, #0a1a2e 45%, #0d2844 100%)' }}>
          <Glow color="#0077cc" w={60} h={25} top={20} left={20} blur={150} opacity={0.15} />
          <Glow color="#10b981" w={40} h={18} top={55} left={55} blur={120} opacity={0.1} />
          {/* Title */}
          <div style={{ position: 'absolute', top: WH * 0.05, left: 0, right: 0, zIndex: 10, textAlign: 'center' }}>
            <div style={{ fontSize: WW * 0.03, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#4ade80', marginBottom: WW * 0.012 }}>Progress</div>
            <div style={{ fontSize: WW * 0.085, fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', color: '#fff' }}>
              Your Week<br />At a Glance.
            </div>
          </div>
          {/* Big macro ring — center */}
          <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
            <div style={{ width: WW * 0.5, height: WW * 0.5, borderRadius: '50%', border: '8px solid rgba(255,255,255,0.05)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Progress arc — using border trick */}
              <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '8px solid transparent', borderTopColor: '#0077cc', borderRightColor: '#0077cc', borderBottomColor: '#0077cc', transform: 'rotate(-45deg)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: WW * 0.1, fontWeight: 800, color: '#fff', lineHeight: 1 }}>2,050</div>
                <div style={{ fontSize: WW * 0.025, fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>calories today</div>
              </div>
            </div>
          </div>
          {/* Macro pills row */}
          <div style={{ position: 'absolute', top: '62%', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: WW * 0.03 }}>
            {[
              { label: 'Carbs', value: '241g', color: '#0077cc' },
              { label: 'Fat', value: '62g', color: '#ef4444' },
              { label: 'Protein', value: '143g', color: '#10b981' },
            ].map((macro, i) => (
              <div key={`mac${i}`} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: `${WW * 0.02}px ${WW * 0.03}px`, textAlign: 'center' }}>
                <div style={{ fontSize: WW * 0.035, fontWeight: 800, color: macro.color }}>{macro.value}</div>
                <div style={{ fontSize: WW * 0.018, fontWeight: 500, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{macro.label}</div>
              </div>
            ))}
          </div>
          {/* Bar chart */}
          <div style={{ position: 'absolute', bottom: WH * 0.08, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', alignItems: 'flex-end', gap: WW * 0.035 }}>
            {bars.map((h, i) => (
              <div key={`bar${i}`} style={{ textAlign: 'center' }}>
                <div style={{
                  width: WW * 0.07,
                  height: WW * h * 0.004,
                  borderRadius: WW * 0.015,
                  background: i === 6 ? 'linear-gradient(180deg, #0077cc, #00aaff)' : 'rgba(255,255,255,0.08)',
                  boxShadow: i === 6 ? '0 0 20px rgba(0,119,204,0.4)' : 'none',
                  marginBottom: WW * 0.012,
                }} />
                <div style={{ fontSize: WW * 0.02, fontWeight: 600, color: i === 6 ? '#4da6ff' : 'rgba(255,255,255,0.25)' }}>{days[i]}</div>
              </div>
            ))}
          </div>
          {/* Streak badge */}
          <div style={{
            position: 'absolute',
            top: '32%',
            right: WW * 0.08,
            zIndex: 15,
            padding: `${WW * 0.02}px ${WW * 0.035}px`,
            borderRadius: 16,
            background: 'rgba(74,222,128,0.1)',
            border: '1px solid rgba(74,222,128,0.2)',
          }}>
            <div style={{ fontSize: WW * 0.05, fontWeight: 800, color: '#4ade80', lineHeight: 1 }}>30</div>
            <div style={{ fontSize: WW * 0.016, fontWeight: 500, color: 'rgba(74,222,128,0.5)', marginTop: 2 }}>day streak</div>
          </div>
        </div>
      )
    },
  },
]

// ====== SLIDE COMPONENT ======
function Slide({ config, index, slideRef, phoneVariant = 'iphone' }) {
  return (
    <PhoneVariantContext.Provider value={phoneVariant}>
      <div
        ref={slideRef}
        style={{
          width: W,
          height: H,
          position: 'absolute',
          top: 0,
          left: 0,
          transformOrigin: 'top left',
          overflow: 'hidden',
          fontFamily: "'Inter', -apple-system, sans-serif",
          background: config.bg,
        }}
      >
        {config.render()}
      </div>
    </PhoneVariantContext.Provider>
  )
}

// ====== MAIN PAGE ======
export default function ScreenshotsPage() {
  const slideRefs = useRef([])
  const containerRefs = useRef([])
  const androidSlideRefs = useRef([])
  const androidContainerRefs = useRef([])
  const wallpaperRefs = useRef([])
  const wallpaperContainerRefs = useRef([])
  const [exporting, setExporting] = useState(null) // index or 'all'

  // Scale slides to fit cards
  const rescale = useCallback(() => {
    containerRefs.current.forEach((container, i) => {
      const root = slideRefs.current[i]
      if (container && root) {
        root.style.transform = `scale(${container.clientWidth / W})`
      }
    })
    androidContainerRefs.current.forEach((container, i) => {
      const root = androidSlideRefs.current[i]
      if (container && root) {
        root.style.transform = `scale(${container.clientWidth / W})`
      }
    })
    wallpaperContainerRefs.current.forEach((container, i) => {
      const root = wallpaperRefs.current[i]
      if (container && root) {
        root.style.transform = `scale(${container.clientWidth / WW})`
      }
    })
  }, [])

  useEffect(() => {
    rescale()
    window.addEventListener('resize', rescale)
    return () => window.removeEventListener('resize', rescale)
  }, [rescale])

  // Load html-to-image from CDN on first use
  const htmlToImageRef = useRef(null)
  const loadHtmlToImage = useCallback(async () => {
    if (htmlToImageRef.current) return htmlToImageRef.current
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src =
        'https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.js'
      script.onload = () => {
        htmlToImageRef.current = window.htmlToImage
        resolve(window.htmlToImage)
      }
      script.onerror = reject
      document.head.appendChild(script)
    })
  }, [])

  const exportSlide = useCallback(
    async (index) => {
      const el = slideRefs.current[index]
      if (!el) return

      const htmlToImage = await loadHtmlToImage()

      // Move to on-screen for capture
      const origTransform = el.style.transform
      el.style.transform = 'none'
      el.style.position = 'fixed'
      el.style.left = '0px'
      el.style.top = '0px'
      el.style.zIndex = '-1'

      const opts = { width: W, height: H, pixelRatio: 1, cacheBust: true }

      // Double-call trick: first warms fonts/images, second is clean
      await htmlToImage.toPng(el, opts)
      const dataUrl = await htmlToImage.toPng(el, opts)

      // Restore
      el.style.transform = origTransform
      el.style.position = 'absolute'
      el.style.left = '0px'
      el.style.top = '0px'
      el.style.zIndex = ''

      const a = document.createElement('a')
      a.href = dataUrl
      const name = slideConfigs[index].name.toLowerCase().replace(/\s+/g, '-')
      a.download = `${String(index + 1).padStart(2, '0')}-${name}-${W}x${H}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    [loadHtmlToImage],
  )

  const exportWallpaper = useCallback(
    async (index) => {
      const el = wallpaperRefs.current[index]
      if (!el) return

      const htmlToImage = await loadHtmlToImage()

      const origTransform = el.style.transform
      el.style.transform = 'none'
      el.style.position = 'fixed'
      el.style.left = '0px'
      el.style.top = '0px'
      el.style.zIndex = '-1'

      const opts = { width: WW, height: WH, pixelRatio: 1, cacheBust: true }

      await htmlToImage.toPng(el, opts)
      const dataUrl = await htmlToImage.toPng(el, opts)

      el.style.transform = origTransform
      el.style.position = 'absolute'
      el.style.left = '0px'
      el.style.top = '0px'
      el.style.zIndex = ''

      const a = document.createElement('a')
      a.href = dataUrl
      const name = wallpaperConfigs[index].name
        .toLowerCase()
        .replace(/\s+/g, '-')
      a.download = `wallpaper-${String(index + 1).padStart(2, '0')}-${name}-${WW}x${WH}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    [loadHtmlToImage],
  )

  const downloadWallpaper = useCallback(
    async (index) => {
      setExporting(`w${index}`)
      try {
        await exportWallpaper(index)
      } catch (e) {
        console.error('Wallpaper export failed:', e)
        alert('Export failed. Try using Cmd+Shift+4 to screenshot instead.')
      }
      setExporting(null)
    },
    [exportWallpaper],
  )

  const downloadOne = useCallback(
    async (index) => {
      setExporting(index)
      try {
        await exportSlide(index)
      } catch (e) {
        console.error('Export failed:', e)
        alert('Export failed. Try using Cmd+Shift+4 to screenshot instead.')
      }
      setExporting(null)
    },
    [exportSlide],
  )

  const downloadAll = useCallback(async () => {
    setExporting('all')
    for (let i = 0; i < slideConfigs.length; i++) {
      try {
        await exportSlide(i)
        await new Promise((r) => setTimeout(r, 500))
      } catch (e) {
        console.error(`Slide ${i + 1} export failed:`, e)
      }
    }
    setExporting(null)
  }, [exportSlide])

  // Android-specific export functions
  const exportAndroidSlide = useCallback(
    async (index) => {
      const el = androidSlideRefs.current[index]
      if (!el) return

      const htmlToImage = await loadHtmlToImage()

      const origTransform = el.style.transform
      el.style.transform = 'none'
      el.style.position = 'fixed'
      el.style.left = '0px'
      el.style.top = '0px'
      el.style.zIndex = '-1'

      const opts = { width: W, height: H, pixelRatio: 1, cacheBust: true }

      await htmlToImage.toPng(el, opts)
      const dataUrl = await htmlToImage.toPng(el, opts)

      el.style.transform = origTransform
      el.style.position = 'absolute'
      el.style.left = '0px'
      el.style.top = '0px'
      el.style.zIndex = ''

      const a = document.createElement('a')
      a.href = dataUrl
      const name = slideConfigs[index].name.toLowerCase().replace(/\s+/g, '-')
      a.download = `android-${String(index + 1).padStart(2, '0')}-${name}-${W}x${H}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    [loadHtmlToImage],
  )

  const downloadOneAndroid = useCallback(
    async (index) => {
      setExporting(`a${index}`)
      try {
        await exportAndroidSlide(index)
      } catch (e) {
        console.error('Export failed:', e)
        alert('Export failed. Try using Cmd+Shift+4 to screenshot instead.')
      }
      setExporting(null)
    },
    [exportAndroidSlide],
  )

  const downloadAllAndroid = useCallback(async () => {
    setExporting('all-android')
    for (let i = 0; i < slideConfigs.length; i++) {
      try {
        await exportAndroidSlide(i)
        await new Promise((r) => setTimeout(r, 500))
      } catch (e) {
        console.error(`Android slide ${i + 1} export failed:`, e)
      }
    }
    setExporting(null)
  }, [exportAndroidSlide])

  return (
    <div
      style={{
        background: '#0a0a0a',
        minHeight: '100vh',
        padding: '40px 20px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 700,
          color: '#fff',
          marginBottom: 6,
        }}
      >
        InstaCal — App Store Screenshots
      </h1>
      <p
        style={{
          textAlign: 'center',
          color: '#666',
          fontSize: 13,
          marginBottom: 24,
          lineHeight: 1.6,
        }}
      >
        1320 × 2868px (6.9&quot; iPhone) — Click Download on any slide to save
        as PNG.
      </p>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <button
          onClick={downloadAll}
          disabled={exporting !== null}
          style={{
            padding: '10px 28px',
            background: exporting ? '#333' : '#0077cc',
            color: exporting ? '#666' : '#fff',
            border: 'none',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'inherit',
            cursor: exporting ? 'wait' : 'pointer',
          }}
        >
          {exporting === 'all' ? 'Exporting...' : 'Download All Screenshots'}
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
          maxWidth: 1400,
          margin: '0 auto',
        }}
      >
        {slideConfigs.map((config, i) => (
          <div
            key={i}
            style={{
              background: '#151515',
              borderRadius: 14,
              overflow: 'hidden',
              border: '1px solid #2a2a2a',
              transition: 'transform 0.2s',
            }}
          >
            <div
              ref={(el) => (containerRefs.current[i] = el)}
              style={{
                width: '100%',
                aspectRatio: `${W}/${H}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Slide
                config={config}
                index={i}
                slideRef={(el) => (slideRefs.current[i] = el)}
              />
            </div>
            <div
              style={{
                textAlign: 'center',
                padding: 10,
                fontSize: 12,
                fontWeight: 600,
                color: '#777',
              }}
            >
              {String(i + 1).padStart(2, '0')} — {config.name}
            </div>
            <button
              onClick={() => downloadOne(i)}
              disabled={exporting !== null}
              style={{
                display: 'block',
                width: 'calc(100% - 20px)',
                margin: '0 10px 10px',
                padding: 8,
                background: exporting === i ? '#333' : '#0077cc',
                color: exporting === i ? '#666' : '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'inherit',
                cursor: exporting !== null ? 'wait' : 'pointer',
              }}
            >
              {exporting === i ? 'Exporting...' : 'Download PNG'}
            </button>
          </div>
        ))}
      </div>

      {/* ====== ANDROID SCREENSHOTS SECTION ====== */}
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ borderTop: '1px solid #222', margin: '60px 0 40px' }} />
        <h2
          style={{
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 700,
            color: '#fff',
            marginBottom: 6,
          }}
        >
          Android Screenshots
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: '#666',
            fontSize: 13,
            marginBottom: 24,
            lineHeight: 1.6,
          }}
        >
          1320 × 2868px — Same layouts with Android phone frame
        </p>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <button
            onClick={downloadAllAndroid}
            disabled={exporting !== null}
            style={{
              padding: '10px 28px',
              background: exporting ? '#333' : '#34a853',
              color: exporting ? '#666' : '#fff',
              border: 'none',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'inherit',
              cursor: exporting ? 'wait' : 'pointer',
            }}
          >
            {exporting === 'all-android' ? 'Exporting...' : 'Download All Android Screenshots'}
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
          maxWidth: 1400,
          margin: '0 auto',
        }}
      >
        {slideConfigs.map((config, i) => (
          <div
            key={`a${i}`}
            style={{
              background: '#151515',
              borderRadius: 14,
              overflow: 'hidden',
              border: '1px solid #2a2a2a',
              transition: 'transform 0.2s',
            }}
          >
            <div
              ref={(el) => (androidContainerRefs.current[i] = el)}
              style={{
                width: '100%',
                aspectRatio: `${W}/${H}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Slide
                config={config}
                index={i}
                slideRef={(el) => (androidSlideRefs.current[i] = el)}
                phoneVariant="android"
              />
            </div>
            <div
              style={{
                textAlign: 'center',
                padding: 10,
                fontSize: 12,
                fontWeight: 600,
                color: '#777',
              }}
            >
              {String(i + 1).padStart(2, '0')} — {config.name}
            </div>
            <button
              onClick={() => downloadOneAndroid(i)}
              disabled={exporting !== null}
              style={{
                display: 'block',
                width: 'calc(100% - 20px)',
                margin: '0 10px 10px',
                padding: 8,
                background: exporting === `a${i}` ? '#333' : '#34a853',
                color: exporting === `a${i}` ? '#666' : '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'inherit',
                cursor: exporting !== null ? 'wait' : 'pointer',
              }}
            >
              {exporting === `a${i}` ? 'Exporting...' : 'Download PNG'}
            </button>
          </div>
        ))}
      </div>

      {/* ====== WALLPAPERS SECTION ====== */}
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ borderTop: '1px solid #222', margin: '60px 0 40px' }} />
        <h2
          style={{
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 700,
            color: '#fff',
            marginBottom: 6,
          }}
        >
          iPhone Wallpapers
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: '#555',
            fontSize: 13,
            marginBottom: 32,
          }}
        >
          1290 × 2796px (iPhone 15 Pro Max) — designed to work with your clock
          &amp; dock
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
          maxWidth: 1400,
          margin: '0 auto',
        }}
      >
        {wallpaperConfigs.map((config, i) => (
          <div
            key={`w${i}`}
            style={{
              background: '#151515',
              borderRadius: 14,
              overflow: 'hidden',
              border: '1px solid #2a2a2a',
              transition: 'transform 0.2s',
            }}
          >
            <div
              ref={(el) => (wallpaperContainerRefs.current[i] = el)}
              style={{
                width: '100%',
                aspectRatio: `${WW}/${WH}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                ref={(el) => (wallpaperRefs.current[i] = el)}
                style={{
                  width: WW,
                  height: WH,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transformOrigin: 'top left',
                  overflow: 'hidden',
                  fontFamily: "'Inter', -apple-system, sans-serif",
                }}
              >
                {config.render()}
              </div>
            </div>
            <div
              style={{
                textAlign: 'center',
                padding: 10,
                fontSize: 12,
                fontWeight: 600,
                color: '#777',
              }}
            >
              {config.name}
            </div>
            <button
              onClick={() => downloadWallpaper(i)}
              disabled={exporting !== null}
              style={{
                display: 'block',
                width: 'calc(100% - 20px)',
                margin: '0 10px 10px',
                padding: 8,
                background: exporting === `w${i}` ? '#333' : '#0077cc',
                color: exporting === `w${i}` ? '#666' : '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'inherit',
                cursor: exporting !== null ? 'wait' : 'pointer',
              }}
            >
              {exporting === `w${i}` ? 'Exporting...' : 'Download PNG'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
