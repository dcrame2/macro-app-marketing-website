import { LandingPage } from '@/components/landing/LandingPage'
import { HomeRecipes, TodayFive } from '@/components/explore/Plates'
import { getSharePage } from '@/lib/sharePage'

// The plates are the app's own and change through the day.
export const revalidate = 300

export default async function Home() {
  const [explore, recipes] = await Promise.all([getSharePage('explore'), getSharePage('recipes')])
  return (
    <LandingPage
      afterHero={<TodayFive five={explore?.five} pool={explore?.pool ?? 0} sessions={explore?.sessions} />}
      afterSocial={<HomeRecipes plates={recipes?.plates} />}
    />
  )
}
