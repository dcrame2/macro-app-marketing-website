import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ProfileHeader } from '@/components/app/ProfileHeader'
import { ProfileMealsGrid } from '@/components/app/ProfileMealsGrid'

export async function generateMetadata({ params }) {
  const { username } = await params
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('name, username')
    .ilike('username', username.toLowerCase())
    .single()

  return {
    title: profile ? `${profile.name || profile.username} - InstaCal` : 'Profile - InstaCal',
  }
}

export default async function ProfilePage({ params }) {
  const { username } = await params
  const supabase = await createClient()

  // Only select fields we actually display
  const profileFields = 'id, name, username, avatar_url, bio, is_public, streak_count'

  // Try username first, then ID
  let profile
  const { data: byUsername } = await supabase
    .from('profiles')
    .select(profileFields)
    .ilike('username', username)
    .single()

  if (byUsername) {
    profile = byUsername
  } else {
    const { data: byId } = await supabase
      .from('profiles')
      .select(profileFields)
      .eq('id', username)
      .single()
    profile = byId
  }

  if (!profile) notFound()

  // Parallel queries for counts and meals
  const [followersRes, followingRes, mealsRes, workoutsRes] = await Promise.all([
    supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('following_id', profile.id)
      .eq('status', 'accepted'),
    supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('follower_id', profile.id)
      .eq('status', 'accepted'),
    supabase
      .from('meals')
      .select(`
        id, name, calories, protein, carbs, fat, sugar, quantity,
        upload_method, is_build_meal, description, place_name,
        created_at,
        images ( url, blurhash )
      `)
      .eq('profile_id', profile.id)
      .eq('is_hidden', false)
      .order('created_at', { ascending: false })
      .limit(30),
    supabase
      .from('workouts')
      .select('*', { count: 'exact', head: true })
      .eq('profile_id', profile.id)
      .eq('is_hidden', false),
  ])

  const followers = followersRes.count || 0
  const following = followingRes.count || 0
  const meals = (mealsRes.data || []).map((m) => ({
    ...m,
    imageUrl: m.images?.url || null,
    blurhash: m.images?.blurhash || null,
  }))
  const workoutCount = workoutsRes.count || 0
  const postCount = meals.length + workoutCount

  // Check if logged-in user follows this profile
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let followStatus = null
  if (user && user.id !== profile.id) {
    const { data: follow } = await supabase
      .from('follows')
      .select('status')
      .eq('follower_id', user.id)
      .eq('following_id', profile.id)
      .single()
    followStatus = follow?.status || null
  }

  const isOwnProfile = user?.id === profile.id

  return (
    <div className="mx-auto max-w-5xl px-4">
      <ProfileHeader
        profile={profile}
        followers={followers}
        following={following}
        postCount={postCount}
        followStatus={followStatus}
        isOwnProfile={isOwnProfile}
        currentUserId={user?.id}
      />

      {!profile.is_public && !isOwnProfile && followStatus !== 'accepted' ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-white/[0.05] p-6">
            <svg className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-400">This account is private</p>
          <p className="mt-1 text-sm text-gray-600">Follow to see their meals</p>
        </div>
      ) : (
        <ProfileMealsGrid meals={meals} />
      )}
    </div>
  )
}
