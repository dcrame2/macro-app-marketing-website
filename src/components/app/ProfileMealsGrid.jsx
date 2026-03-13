'use client'

import { useState } from 'react'
import { MealCard } from './MealCard'

export function ProfileMealsGrid({ meals }) {
  const [view, setView] = useState('grid')

  return (
    <>
      {/* View toggle */}
      <div className="mb-6 flex items-center gap-2 border-b border-white/[0.06] pb-4">
        <button
          onClick={() => setView('grid')}
          className={`rounded-lg p-2 transition-all ${
            view === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'
          }`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
          </svg>
        </button>
        <button
          onClick={() => setView('list')}
          className={`rounded-lg p-2 transition-all ${
            view === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'
          }`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
          </svg>
        </button>
        <span className="ml-auto text-sm text-gray-500">{meals.length} meals</span>
      </div>

      {/* Grid/List */}
      <div
        className={
          view === 'grid'
            ? 'grid grid-cols-3 gap-1 sm:gap-2'
            : 'grid grid-cols-1 gap-4 sm:grid-cols-2'
        }
      >
        {meals.map((meal) =>
          view === 'grid' ? (
            <GridThumbnail key={meal.id} meal={meal} />
          ) : (
            <MealCard key={meal.id} meal={meal} />
          ),
        )}
      </div>

      {meals.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 text-5xl">📸</div>
          <p className="text-lg font-medium text-gray-400">No meals yet</p>
        </div>
      )}
    </>
  )
}

function GridThumbnail({ meal }) {
  const imageUrl = meal.imageUrl || meal.images?.url

  return (
    <a
      href={`/m/${meal.id}`}
      className="group relative aspect-square overflow-hidden rounded-lg bg-white/[0.03] transition-all hover:opacity-90"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={meal.name || ''}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <span className="text-2xl">🍽️</span>
        </div>
      )}
      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="text-sm font-bold text-white">
          🔥 {Math.round(meal.calories || 0)}
        </span>
      </div>
    </a>
  )
}
