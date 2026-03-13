'use client'

import { MealCard } from './MealCard'

export function FeedView({ meals }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} showAuthor author={meal.author} />
      ))}
    </div>
  )
}
