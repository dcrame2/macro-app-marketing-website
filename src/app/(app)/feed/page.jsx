import { createClient } from '@/lib/supabase/server'
import { FeedView } from '@/components/app/FeedView'
import Link from 'next/link'

export const metadata = {
  title: 'Feed - InstaCal',
}

export default async function FeedPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mb-6 text-6xl">👋</div>
        <h1 className="text-3xl font-bold text-white">Your Feed</h1>
        <p className="mt-3 text-gray-400">
          Log in to see meals from people you follow
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex rounded-xl bg-brand-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-400 hover:shadow-lg hover:shadow-brand-500/25"
        >
          Log In
        </Link>
      </div>
    )
  }

  // Get users this person follows
  const { data: following } = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', user.id)
    .eq('status', 'accepted')

  const followingIds = (following || []).map((f) => f.following_id)

  let meals = []
  if (followingIds.length > 0) {
    const { data } = await supabase
      .from('meals')
      .select(`
        id, name, calories, protein, carbs, fat, sugar, quantity,
        upload_method, is_build_meal, description, health_score,
        place_name, created_at,
        images ( url, blurhash ),
        profiles ( id, name, username, avatar_url )
      `)
      .in('profile_id', followingIds)
      .eq('is_hidden', false)
      .not('images', 'is', null)
      .order('created_at', { ascending: false })
      .limit(20)

    meals = (data || []).map((m) => ({
      ...m,
      imageUrl: m.images?.url || null,
      author: m.profiles,
    }))
  }

  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="mb-8 pt-4">
        <h1 className="text-3xl font-bold text-white">Your Feed</h1>
        <p className="mt-1 text-gray-500">
          {followingIds.length > 0
            ? `Meals from ${followingIds.length} people you follow`
            : 'Follow people to see their meals here'}
        </p>
      </div>

      {meals.length > 0 ? (
        <FeedView meals={meals} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 text-5xl">🌱</div>
          <p className="text-lg font-medium text-gray-400">Your feed is empty</p>
          <p className="mt-1 text-sm text-gray-600">
            Follow people to see their meals here
          </p>
          <Link
            href="/explore"
            className="mt-6 rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-400"
          >
            Explore Meals
          </Link>
        </div>
      )}
    </div>
  )
}
