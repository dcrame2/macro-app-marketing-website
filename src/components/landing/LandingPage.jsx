'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import {
  Icon,
  Eyebrow,
  ProductPhone,
  SectionHead,
  StoreLinks,
  ScreenshotContext,
} from './LandingUI'

const socialTabs = [
  {
    id: 'feed',
    icon: 'heart',
    title: 'Your feed. Your people.',
    short: 'The feed',
    copy: 'Find tomorrow’s meal idea in a friend’s lunch. Cheer on their latest workout. Keep up with your circle in Following, or discover new people in For You.',
    tags: [
      'For You & Following',
      'Likes, comments & saves',
      'Meals and workouts in one place',
    ],
    screen: 'feed',
  },
  {
    id: 'people',
    icon: 'people',
    title: 'A profile that’s all you.',
    short: 'Profiles',
    copy: 'Your meals, your training, your progress. Build a profile that shows what you’re into, with stories and highlights along the way.',
    tags: [
      'Food & workout grids',
      'Stories & highlights',
      'Public or private profiles',
    ],
    screen: 'profile',
  },
  {
    id: 'discover',
    icon: 'search',
    title: 'Find your next favorite.',
    short: 'Discover',
    copy: 'Get ideas from real plates. Explore recipes, find meals that fit your macros, and save the ones you want to try.',
    tags: [
      'Community meals & recipes',
      'Ideas that fit your goals',
      'Save it for later',
    ],
    screen: 'discover',
  },
  {
    id: 'places',
    icon: 'map',
    title: 'See what’s good nearby.',
    short: 'The map',
    copy: 'Open the map. Find a spot. See what people actually ordered. Food discovery, straight from the community.',
    tags: [
      'Real plates on the map',
      'Restaurant pages',
      'Meal locations & workout routes',
    ],
    screen: 'map',
  },
]

const activityTabs = [
  {
    id: 'food',
    icon: 'camera',
    label: 'Food',
    screen: 'meal',
    eyebrow: 'SNAP. LOG. SHARE.',
    title: (
      <>
        From your camera
        <br />
        to your <em>feed.</em>
      </>
    ),
    copy: 'Take a photo. Get an AI estimate of the ingredients and macros. Make your edits, add a caption, and share it—or keep it just for you.',
    features: [
      'Photo, search, build, label, barcode & saved meals',
      'Review portions and use Fix with AI',
      'Choose who sees each post',
    ],
    note: 'AI nutrition values are estimates. Some logging shortcuts require Pro.',
  },
  {
    id: 'fitness',
    icon: 'run',
    label: 'Fitness',
    screen: 'run',
    eyebrow: 'YOUR TRAINING BELONGS HERE.',
    title: (
      <>
        Post the run.
        <br />
        Share the <em>progress.</em>
      </>
    ),
    copy: 'Runs, rides, lifts, and everything in between. Bring your workouts into the same feed as your food, and let your people see the work.',
    features: [
      'Connect Strava or log a workout manually',
      'Routes, pace, distance & workout details',
      'Apple Health integration on iPhone',
    ],
    note: 'Available workout details depend on the activity and connected source.',
  },
  {
    id: 'tracking',
    icon: 'flame',
    label: 'Progress',
    screen: 'food',
    eyebrow: 'KEEP YOUR MOMENTUM.',
    title: (
      <>
        Your effort.
        <br />
        In <em>perspective.</em>
      </>
    ),
    copy: 'See your food and fitness together. Keep your streak going, unlock achievements, and get context from Coach as your routine takes shape.',
    features: [
      'Food & fitness progress at a glance',
      'Coach notes, daily & weekly recaps',
      'Streaks, achievements & iPhone widgets',
    ],
    note: 'Pro adds deeper charts, unlimited Coach chat, monthly recaps, and more.',
  },
]

const faqs = [
  [
    'Is InstaCal a social app or a food tracker?',
    'Both. Share meals and workouts, follow friends, and discover ideas from real people. When you log food, InstaCal also helps you understand the calories and macros behind your plate. You can enjoy the social side without making tracking your main focus.',
  ],
  [
    'What can I use for free?',
    'Photo logging, food search, building meals, the social feed, stories, messages, saving meals, challenges, and everyday progress tracking are included. Pro adds features such as barcode scanning, one-tap saved-meal logging, unlimited Coach chat, deeper insights, and the full Wrapped story.',
  ],
  [
    'How does the AI photo scan work?',
    'Take a photo and InstaCal estimates the ingredients, portions, calories, and macros. You can review and edit the result before logging, or describe a correction with Fix with AI. Photo-based nutrition values are estimates, especially for portions and hidden ingredients.',
  ],
  [
    'Can I bring my workouts into InstaCal?',
    'Yes. Connect Strava, connect Apple Health on iPhone, or log a workout manually. Runs, rides, and lifts can sit alongside your meals, with routes and workout details when they are available from your activity.',
  ],
  [
    'Can I choose who sees my posts?',
    'Yes. Choose a public or private profile, control whether you appear in discovery and on the map, and choose the visibility of individual posts. A meal can go to your feed, your profile, or stay only for you.',
  ],
  [
    'What if my friends aren’t on InstaCal yet?',
    'Start with For You and Discover to find meals, workouts, and people who share your interests. Follow the accounts you like to build your feed. Send your friends the download link when you’re ready to bring your circle over.',
  ],
]

function moveTabFocus(event, items, prefix, active, setActive) {
  const focused = items.findIndex(
    (item) => `${prefix}-${item.id}` === event.target.id,
  )
  const current = focused < 0 ? active : focused
  let index = current
  if (event.key === 'ArrowRight') index = (current + 1) % items.length
  else if (event.key === 'ArrowLeft')
    index = (current + items.length - 1) % items.length
  else if (event.key === 'Home') index = 0
  else if (event.key === 'End') index = items.length - 1
  else return
  event.preventDefault()
  setActive(index)
  document.getElementById(`${prefix}-${items[index].id}`)?.focus()
}

function Hero() {
  return (
    <section className="ic-hero" aria-labelledby="ic-hero-title">
      <div className="ic-hero-glow" aria-hidden="true" />
      <div className="ic-wrap ic-hero-grid">
        <div className="ic-hero-copy">
          <Eyebrow>FOOD. FITNESS. FRIENDS.</Eyebrow>
          <h1 id="ic-hero-title">
            Social media for
            <br />
            <em>food & fitness.</em>
          </h1>
          <p className="ic-hero-description">
            Share your meals. Post your workouts. Find your people.
          </p>
          <StoreLinks light />
          <div className="ic-hero-proof">
            <a
              href="https://apps.apple.com/us/app/instacal/id6743951306"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ic-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </span>
              <strong>5.0</strong>
              <span>on the App Store</span>
            </a>
            <span className="ic-proof-divider" />
            <span>Free on iOS & Android</span>
          </div>
          <a href="#social" className="ic-text-link">
            Explore InstaCal <Icon name="arrow" />
          </a>
        </div>
        <div className="ic-hero-visual">
          <ProductPhone
            screen="workouts"
            theme="dark"
            className="ic-hero-back"
            priority
            sizes="(max-width: 699px) 210px, 260px"
          />
          <ProductPhone
            screen="feed"
            theme="dark"
            className="ic-hero-front"
            priority
            sizes="(max-width: 699px) 245px, 285px"
          />
          <div className="ic-feed-card ic-hero-meal">
            <span className="ic-card-icon">
              <Icon name="camera" />
            </span>
            <div>
              <strong>Your plate. The full picture.</strong>
              <span>AI-powered calories & macros</span>
            </div>
          </div>
          <div className="ic-feed-card ic-hero-run">
            <span className="ic-card-icon">
              <Icon name="run" />
            </span>
            <div>
              <strong>Morning run</strong>
              <span>
                <b>3.03 mi</b>
                <i />
                31:02
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="ic-wrap ic-hero-bottom">
        <span>YOUR LIFE, IN ONE FEED.</span>
        <a href="#social">
          <Icon name="people" />
          Connect
        </a>
        <a href="#features">
          <Icon name="camera" />
          Share
        </a>
        <a href="#features">
          <Icon name="flame" />
          Progress
        </a>
        <a href="#social" className="ic-scroll-hint">
          Take a look <span>↓</span>
        </a>
      </div>
    </section>
  )
}

function SocialExplorer() {
  const [active, setActive] = useState(0)
  const [theme, setTheme] = useState('dark')
  const tab = socialTabs[active]
  return (
    <section id="social" className="ic-social ic-section">
      <div className="ic-wrap">
        <SectionHead
          eyebrow="THIS IS YOUR KIND OF SOCIAL"
          description="See what your friends are eating, find your next meal, and keep each other moving. Your next idea could start with their latest post."
        >
          Built around
          <br />
          <em>what you’re into.</em>
        </SectionHead>
        <div className="ic-explorer">
          <div
            className="ic-tablist"
            role="tablist"
            aria-label="Explore the social app"
            onKeyDown={(event) =>
              moveTabFocus(event, socialTabs, 'social-tab', active, setActive)
            }
          >
            {socialTabs.map((item, index) => (
              <button
                type="button"
                id={`social-tab-${item.id}`}
                role="tab"
                key={item.id}
                aria-selected={index === active}
                tabIndex={index === active ? 0 : -1}
                aria-controls="social-panel"
                onClick={() => setActive(index)}
              >
                <Icon name={item.icon} />
                {item.short}
              </button>
            ))}
          </div>
          <div
            className="ic-explorer-grid"
            id="social-panel"
            role="tabpanel"
            aria-labelledby={`social-tab-${tab.id}`}
            tabIndex={0}
          >
            <div className="ic-explorer-copy" key={tab.id}>
              <span className="ic-chapter">
                0{active + 1} / CONNECT & DISCOVER
              </span>
              <h3>{tab.title}</h3>
              <p>{tab.copy}</p>
              <ul className="ic-check-list">
                {tab.tags.map((tag) => (
                  <li key={tag}>
                    <Icon name="check" />
                    {tag}
                  </li>
                ))}
              </ul>
              <a href="#download" className="ic-text-link">
                Get in on it <Icon name="arrow" />
              </a>
            </div>
            <div className="ic-explorer-visual">
              <div
                className="ic-theme-switch"
                role="group"
                aria-label="App screenshot appearance"
              >
                <button
                  type="button"
                  aria-label="Show light mode"
                  aria-pressed={theme === 'light'}
                  onClick={() => setTheme('light')}
                >
                  <Icon name="sun" />
                  Light
                </button>
                <button
                  type="button"
                  aria-label="Show dark mode"
                  aria-pressed={theme === 'dark'}
                  onClick={() => setTheme('dark')}
                >
                  <Icon name="moon" />
                  Dark
                </button>
              </div>
              <ProductPhone
                key={`${tab.screen}-${theme}`}
                screen={tab.screen}
                theme={theme}
                className="ic-explorer-phone"
              />
              <span className="ic-preview-caption">
                <Icon name="expand" />
                Tap to explore the actual app
              </span>
            </div>
          </div>
        </div>
        <div className="ic-social-extras">
          <article>
            <span className="ic-extra-icon">
              <Icon name="camera" />
            </span>
            <h3>Keep the story going.</h3>
            <p>
              The meal you just made. The run you just finished. Share photos,
              clips, and polls, then keep your favorites in highlights.
            </p>
            <span>STORIES & HIGHLIGHTS</span>
          </article>
          <article>
            <span className="ic-extra-icon">
              <Icon name="message" />
            </span>
            <h3>Bring your circle closer.</h3>
            <p>
              Turn a saved plate into dinner plans. Send meals and workouts to
              friends, or get everyone together in a group chat.
            </p>
            <span>DIRECT & GROUP MESSAGES</span>
          </article>
          <article>
            <span className="ic-extra-icon">
              <Icon name="trophy" />
            </span>
            <h3>Show up together.</h3>
            <p>
              Pick a goal, bring a friend, and keep each other going. Join
              challenges with your circle or the wider community.
            </p>
            <span>FRIEND & COMMUNITY CHALLENGES</span>
          </article>
        </div>
      </div>
    </section>
  )
}

function Activity() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    function followSectionLink() {
      const section = window.location.hash.slice(1)
      const index = activityTabs.findIndex((item) => item.id === section)
      if (index >= 0) setActive(index)
    }
    followSectionLink()
    window.addEventListener('hashchange', followSectionLink)
    return () => window.removeEventListener('hashchange', followSectionLink)
  }, [])
  const tab = activityTabs[active]
  return (
    <section id="features" className="ic-activity ic-section">
      <span id="food" className="ic-anchor" />
      <span id="fitness" className="ic-anchor" />
      <span id="tracking" className="ic-anchor" />
      <span id="ai" className="ic-anchor" />
      <div className="ic-wrap">
        <div className="ic-activity-heading">
          <Eyebrow>BUILT FOR YOUR EVERYDAY</Eyebrow>
          <div
            className="ic-activity-tabs"
            role="tablist"
            aria-label="Explore food, fitness, and progress"
            onKeyDown={(event) =>
              moveTabFocus(
                event,
                activityTabs,
                'activity-tab',
                active,
                setActive,
              )
            }
          >
            {activityTabs.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`activity-tab-${item.id}`}
                aria-selected={active === index}
                aria-controls="activity-panel"
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
              >
                <Icon name={item.icon} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div
          className="ic-activity-grid"
          id="activity-panel"
          role="tabpanel"
          aria-labelledby={`activity-tab-${tab.id}`}
          tabIndex={0}
        >
          <div className="ic-activity-visual">
            <div className="ic-activity-glow" />
            <ProductPhone
              key={tab.screen}
              screen={tab.screen}
              theme="dark"
              className="ic-activity-phone"
            />
            <span className="ic-activity-caption">
              <Icon name={tab.icon} />
              {tab.eyebrow}
            </span>
          </div>
          <div className="ic-activity-copy" key={tab.id}>
            <h2>{tab.title}</h2>
            <p>{tab.copy}</p>
            <ul className="ic-check-list">
              {tab.features.map((feature) => (
                <li key={feature}>
                  <Icon name="check" />
                  {feature}
                </li>
              ))}
            </ul>
            <a href="#download" className="ic-text-link">
              Make it part of your day <Icon name="arrow" />
            </a>
            <small>{tab.note}</small>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="ic-pricing ic-section">
      <div className="ic-wrap">
        <SectionHead eyebrow="START FREE. MAKE IT YOURS." center>
          Your people. Your goals.
          <br />
          <em>Your call.</em>
        </SectionHead>
        <div className="ic-plan-grid">
          <article className="ic-plan">
            <span className="ic-plan-label">INSTACAL</span>
            <div className="ic-plan-heading">
              <h3>Jump right in.</h3>
              <span className="ic-plan-price">$0</span>
            </div>
            <p>Everything you need to share, connect, and get going.</p>
            <ul className="ic-check-list">
              {[
                'Social feed, stories & messages',
                'Photo logging, food search & meal building',
                'Saved meals, progress & challenges',
                'Coach notes, daily & weekly recaps',
              ].map((x) => (
                <li key={x}>
                  <Icon name="check" />
                  {x}
                </li>
              ))}
            </ul>
            <a href="#download" className="ic-button ic-button-white">
              Get InstaCal free <Icon name="arrow" />
            </a>
            <small>Available on iOS & Android.</small>
          </article>
          <article className="ic-plan ic-plan-pro">
            <span className="ic-plan-label">
              INSTACAL <span>PRO</span>
            </span>
            <div className="ic-plan-heading">
              <h3>Go deeper.</h3>
              <Icon name="spark" />
            </div>
            <p>More insight into the habits you’re building.</p>
            <ul className="ic-check-list">
              {[
                'Everything in free',
                'Unlimited Coach chat & deeper charts',
                'Barcode scanning & one-tap saved meals',
                'Full Wrapped story & monthly recaps',
              ].map((x) => (
                <li key={x}>
                  <Icon name="check" />
                  {x}
                </li>
              ))}
            </ul>
            <a href="#download" className="ic-button ic-button-blue">
              Explore Pro in the app <Icon name="arrow" />
            </a>
            <small>
              Choose your plan in the app. Prices shown before subscribing.
            </small>
          </article>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section id="faqs" className="ic-faq ic-section">
      <div className="ic-wrap ic-faq-grid">
        <div>
          <Eyebrow>THE DETAILS</Eyebrow>
          <h2>Got questions?</h2>
          <p>Here’s what to know before you jump in.</p>
          <Link href="/privacy" className="ic-text-link">
            Privacy comes with it <Icon name="arrow" />
          </Link>
        </div>
        <div>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Icon name="plus" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Download() {
  const [shareStatus, setShareStatus] = useState('')
  const [showShareLink, setShowShareLink] = useState(false)
  const shareUrl = 'https://www.theinstacal.app/'

  async function shareWithFriend() {
    setShareStatus('')
    setShowShareLink(false)
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'InstaCal — Social media for food & fitness',
          text: 'Share meals, post workouts, and keep each other moving. Check out InstaCal.',
          url: shareUrl,
        })
        return
      } catch (error) {
        // Closing the native share sheet should not trigger a clipboard write.
        if (error.name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl)
      setShareStatus('Link copied. Send it to a friend.')
    } catch {
      setShareStatus('Send your friend this link:')
      setShowShareLink(true)
    }
  }

  return (
    <section id="download" className="ic-download">
      <div className="ic-wrap ic-download-inner">
        <div>
          <Eyebrow>FOOD. FITNESS. FRIENDS.</Eyebrow>
          <h2>
            Your feed.
            <br />
            <em>Starts with you.</em>
          </h2>
          <p>A meal idea. A workout. A reason to show up together.</p>
          <ol className="ic-start-steps" aria-label="Get started with InstaCal">
            <li>
              <span>01</span>
              <strong>Download InstaCal.</strong>
            </li>
            <li>
              <span>02</span>
              <strong>Follow friends. Discover new people.</strong>
            </li>
            <li>
              <span>03</span>
              <strong>Share your first meal or workout.</strong>
            </li>
          </ol>
          <StoreLinks light />
          <span className="ic-download-note">
            Free to start. Available on iOS & Android.
          </span>
          <div className="ic-share-invite">
            <button
              type="button"
              className="ic-text-link"
              onClick={shareWithFriend}
            >
              <Icon name="diagonal" />
              Share with a friend
            </button>
            <div className="ic-share-status" role="status">
              {shareStatus}
              {showShareLink && <a href={shareUrl}>{shareUrl}</a>}
            </div>
          </div>
        </div>
        <div className="ic-download-visual">
          <ProductPhone
            screen="profile"
            theme="dark"
            className="ic-download-profile"
          />
          <ProductPhone
            screen="feed"
            theme="dark"
            className="ic-download-feed"
          />
        </div>
      </div>
    </section>
  )
}

export function LandingPage() {
  const [screenshot, setScreenshot] = useState(null)
  return (
    <ScreenshotContext.Provider value={setScreenshot}>
      <div className="ic-site">
        <Hero />
        <SocialExplorer />
        <Activity />
        <Pricing />
        <FAQ />
        <Download />
      </div>
      <Dialog
        open={!!screenshot}
        onClose={() => setScreenshot(null)}
        className="ic-screenshot-dialog"
      >
        <div className="ic-dialog-backdrop" />
        <div className="ic-dialog-position">
          <DialogPanel className="ic-dialog-panel">
            <DialogTitle className="sr-only">
              {screenshot?.alt || 'App screenshot'}
            </DialogTitle>
            <button
              type="button"
              onClick={() => setScreenshot(null)}
              className="ic-dialog-close"
              aria-label="Close screenshot"
            >
              <Icon name="x" />
            </button>
            {screenshot && (
              <Image
                src={screenshot.image}
                alt={screenshot.alt}
                width={900}
                height={1955}
                sizes="(max-width: 640px) 90vw, 420px"
                className="ic-full-screenshot"
              />
            )}
            <span className="ic-dialog-caption">INSTACAL · THE ACTUAL APP</span>
          </DialogPanel>
        </div>
      </Dialog>
    </ScreenshotContext.Provider>
  )
}
