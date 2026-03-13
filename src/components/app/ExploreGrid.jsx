'use client'

import { useState } from 'react'
import { MealCard, MealCardSkeleton } from './MealCard'
import { createClient } from '@/lib/supabase/client'

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'High Protein', value: 'protein' },
  { label: 'Low Cal', value: 'lowcal' },
  { label: 'Photo Meals', value: 'photo' },
  { label: 'Build Meals', value: 'build' },
]

export function ExploreGrid({ initialMeals }) {
  const [meals, setMeals] = useState(initialMeals)
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)

  const filtered = meals.filter((meal) => {
    if (filter === 'all') return true
    if (filter === 'protein') return (meal.protein || 0) >= 30
    if (filter === 'lowcal') return (meal.calories || 0) <= 400
    if (filter === 'photo') return meal.upload_method === 'photo'
    if (filter === 'build') return meal.is_build_meal
    return true
  })

  async function loadMore() {
    if (loading) return
    setLoading(true)
    const supabase = createClient()
    const lastMeal = meals[meals.length - 1]
    const { data } = await supabase
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
      .lt('created_at', lastMeal?.created_at)
      .order('created_at', { ascending: false })
      .limit(12)

    if (data) {
      const formatted = data.map((m) => ({
        ...m,
        imageUrl: m.images?.url || null,
        author: m.profiles,
      }))
      setMeals((prev) => [...prev, ...formatted])
    }
    setLoading(false)
  }

  return (
    <>
      {/* Filter pills */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filter === f.value
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                : 'bg-white/[0.05] text-gray-400 hover:bg-white/[0.08] hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((meal) => (
          <MealCard key={meal.id} meal={meal} showAuthor author={meal.author} />
        ))}
        {loading &&
          Array.from({ length: 8 }).map((_, i) => <MealCardSkeleton key={i} />)}
      </div>

      {/* Load more */}
      {filtered.length > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="rounded-xl bg-white/[0.05] px-8 py-3 text-sm font-medium text-gray-400 transition-all hover:bg-white/[0.08] hover:text-white disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 text-5xl">🍽️</div>
          <p className="text-lg font-medium text-gray-400">No meals found</p>
          <p className="mt-1 text-sm text-gray-600">Try a different filter</p>
        </div>
      )}
    </>
  )
}
