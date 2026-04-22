import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { LogMethods } from '@/components/LogMethods'
import { AIFeatures } from '@/components/AIFeatures'
import { SocialFeatures } from '@/components/SocialFeatures'
import { StatsSection } from '@/components/StatsSection'
import { Reviews } from '@/components/Reviews'

export default function Home() {
  return (
    <>
      <Hero />
      <SocialFeatures />
      <LogMethods />
      <AIFeatures />
      <StatsSection />
      <Pricing />
      <Reviews />
      <Faqs />
      <CallToAction />
    </>
  )
}
