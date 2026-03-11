'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Container } from '@/components/Container'

const faqs = [
  {
    question: 'How accurate is the photo meal scanning?',
    answer:
      'Our AI is trained on millions of food images and delivers highly accurate macro estimates. For complex or mixed dishes, you can use Fix with AI to refine any details — totally free.',
  },
  {
    question: 'What makes InstaCal different from MyFitnessPal?',
    answer:
      'InstaCal is built around AI and social. Snap a photo instead of searching databases. See what your friends eat, discover meals on a map, and get personalized AI nutrition advice. No tedious manual logging.',
  },
  {
    question: 'Is InstaCal really free?',
    answer:
      'Yes. Photo scanning, food search, label scanning, meal building, social feed, slides, following, AI Fix, calorie tracking, and workout logging are all completely free. Pro unlocks barcode scanning, saved meals, AI Dietitian, AI Insights, and advanced stats.',
  },
  {
    question: 'Can I track workouts too?',
    answer:
      'Yes. Log workouts manually or connect Strava or Apple Health to auto-import. Your burned calories are factored into your net calorie tracking.',
  },
  {
    question: 'How does the social feed work?',
    answer:
      'Follow friends to see their meals in your feed. Discover new content through Slides, explore meals on a nearby map, and engage with likes and comments. You control your privacy — go public or private anytime.',
  },
  {
    question: 'Can I save and reuse meals?',
    answer:
      'With Pro, you can bookmark any meal and re-log it with a single tap. Perfect for meal prep, daily go-tos, or favorite restaurant orders.',
  },
  {
    question: 'What is the AI Dietitian?',
    answer:
      'A Pro feature that lets you chat with an AI nutritionist that knows your eating history, goals, and preferences. Ask it anything — "Am I eating enough protein?" or "What should I eat for dinner?"',
  },
  {
    question: 'Is my data private?',
    answer:
      'Completely. Your data is encrypted and never sold. You control your profile visibility — set it to private to require follow approval, hide from discover, or opt out of the map.',
  },
  {
    question: 'What platforms is InstaCal on?',
    answer:
      'InstaCal is available on iOS and Android. Download from the App Store or Google Play.',
  },
]

function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <h3 className="pr-4 text-base font-semibold text-gray-900 sm:text-lg">
          {question}
        </h3>
        <div
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen ? 'bg-[#0077cc] text-white rotate-45' : 'bg-gray-100 text-gray-600'
          }`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm leading-relaxed text-gray-600 sm:text-base sm:leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faqs() {
  const [openIndex, setOpenIndex] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="bg-gray-50 py-24 sm:py-32"
      ref={ref}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="faqs-title"
              className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Have more questions?{' '}
              <a
                href="mailto:support@theinstacal.app"
                className="font-semibold text-[#0077cc] underline underline-offset-4 transition-colors hover:text-[#005fa3]"
              >
                Reach out to us
              </a>
              .
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
