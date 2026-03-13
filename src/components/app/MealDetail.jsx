'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Avatar } from './Avatar'
import { MacroBadge, MacroRow } from './MacroBadge'
import { timeAgo, formatMacro } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

export function MealDetail({ meal, author, ingredients, likesCount: initialLikes, comments }) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)

  async function handleLike() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    if (liked) {
      await supabase
        .from('meal_likes')
        .delete()
        .eq('meal_id', meal.id)
        .eq('profile_id', user.id)
      setLikes((l) => l - 1)
      setLiked(false)
    } else {
      await supabase
        .from('meal_likes')
        .insert({ meal_id: meal.id, profile_id: user.id })
      setLikes((l) => l + 1)
      setLiked(true)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Image */}
        <div className="relative self-start overflow-hidden rounded-3xl bg-white/[0.03] ring-1 ring-white/[0.06]">
          {meal.imageUrl ? (
            <img
              src={meal.imageUrl}
              alt={meal.name || ''}
              className="w-full rounded-3xl object-contain"
            />
          ) : (
            <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <span className="text-6xl">🍽️</span>
            </div>
          )}

          {/* Like button overlay */}
          <div className="absolute right-4 top-4 flex gap-2">
            <button
              onClick={handleLike}
              className={`rounded-full p-2.5 backdrop-blur-md transition-all ${
                liked ? 'bg-red-500/80 text-white' : 'bg-black/40 text-white hover:bg-black/60'
              }`}
            >
              <svg className="h-5 w-5" fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </button>
          </div>

          {/* Health score */}
          {meal.health_score != null && (
            <div className="absolute left-4 top-4">
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur-md ${
                meal.health_score >= 7 ? 'bg-emerald-500/20 text-emerald-300' :
                meal.health_score >= 4 ? 'bg-amber-500/20 text-amber-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {meal.health_score}/10
              </span>
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="flex flex-col gap-6">
          {/* Author */}
          {author && (
            <Link
              href={`/profile/${author.username || author.id}`}
              className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/[0.06] transition-all hover:bg-white/[0.06]"
            >
              <Avatar src={author.avatar_url} name={author.name} size="md" />
              <div>
                <p className="font-semibold text-white">{author.name || author.username}</p>
                {author.username && (
                  <p className="text-sm text-gray-500">@{author.username}</p>
                )}
              </div>
              {author.streak_count > 0 && (
                <span className="ml-auto text-sm text-orange-400">
                  🔥 {author.streak_count}
                </span>
              )}
            </Link>
          )}

          {/* Meal name + time */}
          <div>
            <h1 className="text-2xl font-bold text-white">
              {meal.name || 'Untitled Meal'}
            </h1>
            <p className="mt-1 text-sm text-gray-500">{timeAgo(meal.created_at)}</p>
          </div>

          {/* Description */}
          {(meal.description || meal.ai_description) && (
            <p className="text-sm leading-relaxed text-gray-300">
              {meal.description || meal.ai_description}
            </p>
          )}

          {/* Macros card */}
          <div className="rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/[0.06]">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Nutrition
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <MacroStat label="Calories" value={meal.calories} unit="" color="text-blue-400" />
              <MacroStat label="Protein" value={meal.protein} unit="g" color="text-emerald-400" />
              <MacroStat label="Carbs" value={meal.carbs} unit="g" color="text-amber-400" />
              <MacroStat label="Fat" value={meal.fat} unit="g" color="text-orange-400" />
              {meal.sugar != null && (
                <MacroStat label="Sugar" value={meal.sugar} unit="g" color="text-pink-400" />
              )}
            </div>
          </div>

          {/* Place */}
          {meal.place_name && (
            <div className="flex items-center gap-2 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/[0.06]">
              <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
              </svg>
              <span className="text-sm text-gray-300">{meal.place_name}</span>
              {meal.place_address && (
                <span className="text-xs text-gray-600">· {meal.place_address}</span>
              )}
            </div>
          )}

          {/* Engagement */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <button onClick={handleLike} className="flex items-center gap-1.5 transition-colors hover:text-red-400">
              <svg className="h-4 w-4" fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              {likes} {likes === 1 ? 'like' : 'likes'}
            </button>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
              </svg>
              {comments.length} comments
            </span>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      {ingredients.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-5 text-xl font-bold text-white">Ingredients</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ingredients.map((ing) => (
              <div
                key={ing.id}
                className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/[0.06]"
              >
                {ing.imageUrl && (
                  <img
                    src={ing.imageUrl}
                    alt={ing.name || ''}
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {ing.name || 'Unknown'}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <MacroBadge type="calories" value={ing.calories} />
                    <MacroBadge type="protein" value={ing.protein} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comments */}
      {comments.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-5 text-xl font-bold text-white">Comments</h2>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/[0.06]"
              >
                <Avatar
                  src={comment.author?.avatar_url}
                  name={comment.author?.name}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/profile/${comment.author?.username || comment.author?.id}`}
                      className="text-sm font-semibold text-white hover:text-brand-400"
                    >
                      {comment.author?.name || comment.author?.username}
                    </Link>
                    <span className="text-xs text-gray-600">
                      {timeAgo(comment.created_at)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-300">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MacroStat({ label, value, unit, color }) {
  return (
    <div className="rounded-xl bg-white/[0.03] p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`mt-0.5 text-lg font-bold ${color}`}>
        {formatMacro(value)}
        <span className="text-sm font-normal text-gray-600">{unit}</span>
      </p>
    </div>
  )
}
