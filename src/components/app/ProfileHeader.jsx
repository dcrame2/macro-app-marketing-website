'use client'

import { useState } from 'react'
import { Avatar } from './Avatar'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function ProfileHeader({
  profile,
  followers: initialFollowers,
  following,
  postCount,
  followStatus: initialStatus,
  isOwnProfile,
  currentUserId,
}) {
  const [followStatus, setFollowStatus] = useState(initialStatus)
  const [followers, setFollowers] = useState(initialFollowers)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleFollow() {
    if (!currentUserId) {
      router.push('/login')
      return
    }
    if (loading) return
    setLoading(true)

    const supabase = createClient()

    if (followStatus) {
      // Unfollow
      await supabase
        .from('follows')
        .delete()
        .eq('follower_id', currentUserId)
        .eq('following_id', profile.id)
      setFollowStatus(null)
      if (followStatus === 'accepted') setFollowers((f) => f - 1)
    } else {
      // Follow
      const status = profile.is_public ? 'accepted' : 'pending'
      await supabase.from('follows').insert({
        follower_id: currentUserId,
        following_id: profile.id,
        status,
      })
      setFollowStatus(status)
      if (status === 'accepted') setFollowers((f) => f + 1)
    }
    setLoading(false)
  }

  return (
    <div className="mb-10 pt-4">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {/* Avatar */}
        <Avatar
          src={profile.avatar_url}
          name={profile.name}
          size="2xl"
          className="ring-4 ring-brand-500/20"
        />

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <h1 className="text-2xl font-bold text-white">
              {profile.name || profile.username}
            </h1>
            {profile.streak_count > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/15 px-3 py-1 text-sm font-medium text-orange-400">
                🔥 {profile.streak_count}
              </span>
            )}
          </div>

          {profile.username && (
            <p className="mt-0.5 text-sm text-gray-500">@{profile.username}</p>
          )}

          {profile.bio && (
            <p className="mt-3 max-w-lg text-sm text-gray-300">{profile.bio}</p>
          )}

          {/* Stats */}
          <div className="mt-5 flex items-center justify-center gap-8 sm:justify-start">
            <div className="text-center">
              <span className="text-lg font-bold text-white">{postCount}</span>
              <span className="ml-1.5 text-sm text-gray-500">posts</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold text-white">{followers}</span>
              <span className="ml-1.5 text-sm text-gray-500">followers</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold text-white">{following}</span>
              <span className="ml-1.5 text-sm text-gray-500">following</span>
            </div>
          </div>

          {/* Follow button */}
          {!isOwnProfile && (
            <button
              onClick={handleFollow}
              disabled={loading}
              className={`mt-5 rounded-xl px-8 py-2.5 text-sm font-semibold transition-all disabled:opacity-50 ${
                followStatus === 'accepted'
                  ? 'bg-white/[0.08] text-white ring-1 ring-white/10 hover:bg-white/[0.12]'
                  : followStatus === 'pending'
                    ? 'bg-white/[0.05] text-gray-400 ring-1 ring-white/10'
                    : 'bg-brand-500 text-white hover:bg-brand-400 hover:shadow-lg hover:shadow-brand-500/25'
              }`}
            >
              {followStatus === 'accepted'
                ? 'Following'
                : followStatus === 'pending'
                  ? 'Requested'
                  : 'Follow'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
