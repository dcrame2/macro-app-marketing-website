'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'

import { Container } from '@/components/Container'

const reviews = [
  {
    title: 'Game Changer',
    body: 'This app has allowed me to hit my fitness goals by coming up with a plan for calorie intake and making it as easy as possible by snapping a picture to ensure I am on the right path. I couldn\'t recommend it more!',
    author: 'DoubleDs13',
    rating: 5,
  },
  {
    title: 'Smoothest app to use!',
    body: 'This has been the smoothest app to use. It has helped me with my weight loss journey!',
    author: 'Xavi!15',
    rating: 5,
  },
  {
    title: 'Phenomenal App',
    body: 'For those out there who have had trouble tracking your Macros/calories, this is the best app out there. I\'ve tried them all and InstaCal is the only app that I would highly recommend to those who want to improve their eating habits or have just started making a healthy lifestyle change. It is extremely user friendly and definitely worth the money.',
    author: 'Uriiiii9',
    rating: 5,
  },
  {
    title: 'Sensational',
    body: 'This literally changed the game in terms of trying to reach my fitness goals. I realized quickly I wasn\'t eating enough protein. The breakdown made it easy to hit all my macros.',
    author: 'Mikeyyyy mikee',
    rating: 5,
  },
  {
    title: 'Wow!',
    body: 'Such a a cool app! Love the nutrition facts from just a picture',
    author: 'jcvbbjh',
    rating: 5,
  },
  {
    title: 'Tracker you have always wanted',
    body: 'This app is solid. Tracking calories, all my meal data, scan barcodes of products, meal plan, search massive library of pre-stored foods, and goal setting. This app paired with my other trackers for exercise and overall health is the complete package.',
    author: 'Mr HubSpot',
    rating: 5,
  },
  {
    title: 'Easiest app out there',
    body: 'If you have a busy schedule and feel like not enough time to track your calories this is the perfect app. Where ever I\'m at no matter the situation or time I can always count on the is app the keep me on track.',
    author: 'Pochicken2',
    rating: 5,
  },
  {
    title: 'Practical and helpful',
    body: 'Wonderful app that makes calorie tracking easy. Taking a photo of my food makes it much less intrusive to track calories and macros compared to traditional methods. I could never keep myself going with the previous apps, but this one is a breeze.',
    author: 'ShadowZaik',
    rating: 5,
  },
  {
    title: 'Game changer',
    body: 'Just what I needed to easily track everything i eat',
    author: 'Joins27393825',
    rating: 5,
  },
  {
    title: 'Best calorie tracker!',
    body: 'Great and easy calorie tracker. Every time I use it, I\'m more impressed by how well it picks up every snack or meal. Perfect for everyday and real world use at restaurants where you might not have access to the back of the packaging',
    author: 'Nathan022',
    rating: 5,
  },
  {
    title: 'Great app!!!',
    body: 'Really love the layout of this app, set it up and its quick and easy. Gonna make big progress with this for sure.',
    author: 'Enrico Aquino',
    rating: 5,
  },
]

function StarIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function StarRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(5).keys()].map((index) => (
        <StarIcon
          key={index}
          className={clsx(
            'h-5 w-5',
            rating > index ? 'fill-yellow-400' : 'fill-gray-300',
          )}
        />
      ))}
    </div>
  )
}

function Review({ title, body, author, rating, className, ...props }) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ]
  }, [])

  return (
    <figure
      className={clsx(
        'animate-fade-in rounded-3xl border border-gray-100 bg-white p-6 opacity-0 shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <StarRating rating={rating} />
        <p className="mt-4 text-lg font-bold leading-6">
          &ldquo;{title}&rdquo;
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{body}</p>
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0077cc] to-cyan-400 text-xs font-bold text-white">
          {author[0].toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-700">{author}</span>
      </figcaption>
    </figure>
  )
}

function splitArray(array, numParts) {
  let result = []
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result
}

function ReviewColumn({ reviews, className, reviewClassName, msPerPixel = 0 }) {
  let columnRef = useRef(null)
  let [columnHeight, setColumnHeight] = useState(0)
  let duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    if (!columnRef.current) return

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration }}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  )
}

function ReviewGrid() {
  let containerRef = useRef(null)
  let isInView = useInView(containerRef, { once: true, amount: 0.4 })
  let columns = splitArray(reviews, 3)
  let column1 = columns[0]
  let column2 = columns[1]
  let column3 = splitArray(columns[2], 2)

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= column1.length + column3[0].length && 'md:hidden',
                reviewIndex >= column1.length && 'lg:hidden',
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? 'lg:hidden' : ''
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white" />
    </div>
  )
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="bg-white pb-16 pt-20 sm:pb-24 sm:pt-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-yellow-50 px-4 py-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-3.5 w-3.5 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-yellow-700">5.0 Average</span>
          </div>
          <h2
            id="reviews-title"
            className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
          >
            Loved by Real Users
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From fitness beginners to macro pros, people love how easy and
            effective InstaCal makes nutrition tracking.
          </p>
        </div>
        <ReviewGrid />
      </Container>
    </section>
  )
}
