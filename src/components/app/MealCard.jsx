'use client'

import Link from 'next/link'
import { MacroRow } from './MacroBadge'
import { Avatar } from './Avatar'
import { timeAgo } from '@/lib/utils'

export function MealCard({ meal, showAuthor = false, author }) {
  const imageUrl = meal.imageUrl || meal.images?.url
  const mealName = meal.name || 'Untitled Meal'

  return (
    <Link
      href={`/m/${meal.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] transition-all duration-300 hover:bg-white/[0.06] hover:ring-white/[0.1] hover:shadow-2xl hover:shadow-brand-500/5"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={mealName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <svg className="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12" />
            </svg>
          </div>
        )}
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Calorie badge on image */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 rounded-lg bg-black/50 px-2.5 py-1 text-sm font-bold text-white backdrop-blur-sm">
            🔥 {Math.round(meal.calories || 0)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5 p-4">
        {showAuthor && author && (
          <Link
            href={`/profile/${author.username || author.id}`}
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Avatar src={author.avatar_url} name={author.name} size="xs" />
            <span className="text-xs font-medium text-gray-400 transition-colors hover:text-white">
              {author.name || author.username}
            </span>
            {meal.created_at && (
              <span className="text-xs text-gray-600">· {timeAgo(meal.created_at)}</span>
            )}
          </Link>
        )}

        <h3 className="truncate text-sm font-semibold text-white">{mealName}</h3>

        <MacroRow meal={meal} />

        {meal.place_name && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
            </svg>
            <span className="truncate">{meal.place_name}</span>
          </div>
        )}
      </div>
    </Link>
  )
}

export function MealCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06]">
      <div className="aspect-square animate-pulse bg-white/[0.05]" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-2/3 animate-pulse rounded bg-white/[0.05]" />
        <div className="flex gap-1.5">
          <div className="h-6 w-16 animate-pulse rounded-lg bg-white/[0.05]" />
          <div className="h-6 w-16 animate-pulse rounded-lg bg-white/[0.05]" />
          <div className="h-6 w-16 animate-pulse rounded-lg bg-white/[0.05]" />
        </div>
      </div>
    </div>
  )
}
