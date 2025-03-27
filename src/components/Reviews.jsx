'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'

import { Container } from '@/components/Container'

const reviews = [
  {
    title: 'It really works.',
    body: 'I scanned my lunch and Cal-Pal told me exactly what I was eating. I’ve never tracked so consistently in my life.',
    author: 'MacroMachine',
    rating: 5,
  },
  {
    title: 'You need this app.',
    body: 'I used to dread tracking food. Now I just scan it. Cal-Pal is like having a dietitian in your pocket.',
    author: 'FitnessNewbie123',
    rating: 5,
  },
  {
    title: 'This shouldn’t be legal.',
    body: 'Cal-Pal AI recognizes my meals faster than I can chew. How is this not banned for being too good?',
    author: 'SnackDetective',
    rating: 5,
  },
  {
    title: 'Screw food scales.',
    body: 'I used to weigh every gram. Now I just take a photo. This app gave me my life back.',
    author: 'ExScaleUser',
    rating: 5,
  },
  {
    title: 'I love it!',
    body: 'I’ve been tracking macros for 5 years. Cal-Pal just made it fun again. I actually look forward to logging.',
    author: 'CoachErica',
    rating: 5,
  },
  {
    title: 'Too good to be true.',
    body: 'I thought it was a gimmick. But I scanned my dinner and it nailed every ingredient. What kind of sorcery is this?',
    author: 'SkepticalToBeliever',
    rating: 5,
  },
  {
    title: 'Wish I could give 6 stars',
    body: 'I’ve tried MyFitnessPal, Cronometer, you name it. Nothing comes close to the simplicity of Cal-Pal AI.',
    author: 'TechieLifter',
    rating: 5,
  },
  {
    title: 'Got shredded by accident.',
    body: 'Didn’t change my workouts. Just used Cal-Pal daily. Now I have abs. Guess it really is about the food.',
    author: 'MacrosOverCardio',
    rating: 5,
  },
  {
    title: 'No more guesswork!',
    body: 'I used to eyeball portions and pray. Now I scan and know exactly what’s going in my body. Game changer.',
    author: 'MealPrepMom',
    rating: 5,
  },
  {
    title: 'I’m 14 and hitting my protein goal.',
    body: 'Started tracking with Cal-Pal because my older brother uses it. Now I know what 150g of protein looks like.',
    author: 'GainsKid',
    rating: 5,
  },
  {
    title: 'Started meal prepping like a pro.',
    body: 'Cal-Pal made me realize I was eating way more carbs than I thought. Now my prep is dialed in and I feel amazing.',
    author: 'MealPrepQueen',
    rating: 5,
  },
  {
    title: 'It’s like having a coach.',
    body: 'Every time I scan food, I get this weird sense of accountability. It’s like Cal-Pal is watching me (in a good way).',
    author: 'WatchedByAI',
    rating: 5,
  },
  {
    title: 'Quit calorie counting apps.',
    body: 'I deleted three other tracking apps after using Cal-Pal for one week. It’s just that much better.',
    author: 'OneAppToRuleThemAll',
    rating: 5,
  },
  {
    title: 'Don’t download this app',
    body: 'Unless you want to finally stick to your macros and feel in control of your diet for once.',
    author: 'MacroBoss89',
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
            rating > index ? 'fill-[#0077cc]' : 'fill-gray-300',
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
        'animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5',
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <StarRating rating={rating} />
        <p className="mt-4 text-lg font-semibold leading-6 before:content-['“'] after:content-['”']">
          {title}
        </p>
        <p className="mt-3 text-base leading-7">{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-gray-600 before:content-['–_']">
        {author}
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
    if (!columnRef.current) {
      return
    }

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
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
                reviewIndex >= column1.length + column3[0].length &&
                  'md:hidden',
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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50" />
    </div>
  )
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pb-16 pt-20 sm:pb-24 sm:pt-32"
    >
      <Container>
        <h2
          id="reviews-title"
          className="text-3xl font-medium tracking-tight text-gray-900 sm:text-center"
        >
          What Cal-Pal AI Users Are Saying
        </h2>
        <p className="mt-2 text-lg text-gray-600 sm:text-center">
          From fitness beginners to macro pros, people love how easy and
          effective Cal-Pal AI makes nutrition tracking.
        </p>
        <ReviewGrid />
      </Container>
    </section>
  )
}
