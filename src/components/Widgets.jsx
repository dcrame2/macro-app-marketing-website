'use client'

import Image from 'next/image'
import { Container } from '@/components/Container'
import { Device } from '@/components/Device'
import { AnimateIn } from '@/components/AnimateIn'
import homeScreenImg from '@/images/widgets/home-screen.webp'
import todayImg from '@/images/widgets/today-dark.webp'
import logImg from '@/images/widgets/log-dark.webp'
import streakImg from '@/images/widgets/streak-dark.webp'
import friendsImg from '@/images/widgets/friends-dark.webp'
import moveImg from '@/images/widgets/move-dark.webp'

const widgets = [
  {
    name: 'Today',
    text: 'Calories left, three macro bars, and the run that opened them up.',
    image: todayImg,
    alt: 'InstaCal Today widget: 1,560 calories left of 2,800, protein, carbs, and fat bars, and a 3.1 mile run',
    rotate: '-rotate-2',
  },
  {
    name: 'Log a meal',
    text: 'Straight to the camera. Barcode, search, build, and saved one tap away.',
    image: logImg,
    alt: 'InstaCal Log a meal widget with a Snap a meal camera button plus Barcode, Search, Build, and Saved shortcuts',
    rotate: 'rotate-1',
  },
  {
    name: 'Streak',
    text: 'The flame, the count, and whether today is logged yet.',
    image: streakImg,
    alt: 'InstaCal Streak widget showing a 12 day streak with seven day dots and Logged today',
    rotate: '-rotate-1',
  },
  {
    name: 'Friends',
    text: 'Who posted today, with calories on the photo.',
    image: friendsImg,
    alt: 'InstaCal Friends widget with three meal photos from marcus, sarah.k, and priya and five posted today',
    rotate: 'rotate-2',
  },
  {
    name: 'Move',
    text: 'Your last workout with the route, burn, duration, and pace.',
    image: moveImg,
    alt: 'InstaCal Move widget: last workout, a 3.1 mile run with the route drawn, 320 kcal burned, 28:14, 9:06 per mile',
    rotate: '-rotate-2',
  },
]

export function Widgets() {
  return (
    <section id="widgets" className="overflow-hidden bg-gray-50 py-24 sm:py-32">
      <Container>
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-[#0077cc]/5 px-4 py-2">
              <svg
                className="h-4 w-4 text-[#0077cc]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
              <span className="text-sm font-semibold text-[#0077cc]">
                Widgets
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Your day, on the
              <span className="block bg-gradient-to-r from-[#0077cc] to-cyan-500 bg-clip-text text-transparent">
                Home Screen.
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Six Home Screen widgets and two for the Lock Screen. Today&apos;s
              ring, a one tap camera, your streak, what friends posted, and your
              last workout. Every tap deep links straight into the app. iPhone,
              iOS 17 and up.
            </p>
          </div>
        </AnimateIn>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <AnimateIn>
            <div className="relative mx-auto w-[260px] sm:w-[300px]">
              <div
                className="absolute inset-6 rounded-[3rem] bg-[#0077cc]/30 blur-3xl"
                aria-hidden="true"
              />
              <Device
                className="relative"
                screen={homeScreenImg}
                alt="An iPhone Home Screen with InstaCal widgets: Today, Log a meal, Streak, and Friends"
              />
            </div>
          </AnimateIn>

          <div className="grid gap-5 sm:grid-cols-2">
            {widgets.map((widget, i) => (
              <AnimateIn
                key={widget.name}
                delay={i * 0.08}
                className={i === widgets.length - 1 ? 'sm:col-span-2 sm:mx-auto sm:w-1/2' : ''}
              >
                <figure
                  className={`group ${widget.rotate} transition-transform duration-500 hover:rotate-0 hover:scale-[1.03]`}
                >
                  <div className="overflow-hidden rounded-[22px] shadow-2xl shadow-gray-900/25 ring-1 ring-black/10">
                    <Image
                      src={widget.image}
                      alt={widget.alt}
                      sizes="(min-width: 640px) 340px, 90vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-3 px-1">
                    <div className="text-sm font-bold text-gray-900">
                      {widget.name}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-600">{widget.text}</p>
                  </figcaption>
                </figure>
              </AnimateIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
