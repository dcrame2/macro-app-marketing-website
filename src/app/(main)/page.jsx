import { AIFeatures } from '@/components/AIFeatures'
import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { FeedTicker } from '@/components/FeedTicker'
import { Hero } from '@/components/Hero'
import { LogMethods } from '@/components/LogMethods'
import { Momentum } from '@/components/Momentum'
import { Pricing } from '@/components/Pricing'
import { Reviews } from '@/components/Reviews'
import { SocialFeatures } from '@/components/SocialFeatures'
import { Tracking } from '@/components/Tracking'
import { Widgets } from '@/components/Widgets'

export default function Home() {
  return (
    <>
      <Hero />
      <FeedTicker />
      <SocialFeatures />
      <LogMethods />
      <AIFeatures />
      <Tracking />
      <Momentum />
      <Widgets />
      <Pricing />
      <Reviews />
      <Faqs />
      <CallToAction />
    </>
  )
}
