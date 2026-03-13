import { createClient } from '@/lib/supabase/server'
import { ExploreGrid } from '@/components/app/ExploreGrid'

export const metadata = {
  title: 'Explore - InstaCal',
}

export default async function ExplorePage() {
  const supabase = await createClient()

  // Fetch public meals with images, ordered by most recent
  const { data: meals } = await supabase
    .from('meals')
    .select(`
      id, name, calories, protein, carbs, fat, sugar, quantity,
      upload_method, is_build_meal,
      place_name,
      created_at,
      images ( url, blurhash ),
      profiles!inner ( id, name, username, avatar_url, is_public )
    `)
    .eq('is_hidden', false)
    .eq('profiles.is_public', true)
    .not('images', 'is', null)
    .order('created_at', { ascending: false })
    .limit(24)

  const formattedMeals = (meals || []).map((m) => ({
    ...m,
    imageUrl: m.images?.url || null,
    blurhash: m.images?.blurhash || null,
    author: m.profiles,
  }))

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero section */}
      <div className="mb-10 pt-4">
        <h1 className="bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          Discover Meals
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          See what people are eating around the world
        </p>
      </div>

      <ExploreGrid initialMeals={formattedMeals} />
    </div>
  )
}
