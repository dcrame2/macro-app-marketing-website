'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MealCard, MealCardSkeleton } from './MealCard'

export function NearbyView() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      },
      () => {
        setError('Enable location access to see nearby meals')
        setLoading(false)
      },
    )
  }, [])

  useEffect(() => {
    if (!location) return

    async function fetchNearby() {
      const supabase = createClient()
      // Fetch meals with location data, sorted by proximity
      // Using a simple bounding box approach
      const latRange = 0.15 // ~10 miles
      const lngRange = 0.15

      const { data } = await supabase
        .from('meals')
        .select(`
          id, name, calories, protein, carbs, fat, sugar, quantity,
          upload_method, place_name, place_address, place_lat, place_lng,
          created_at,
          images ( url, blurhash ),
          profiles!inner ( id, name, username, avatar_url, is_public, show_on_map )
        `)
        .eq('is_hidden', false)
        .eq('profiles.is_public', true)
        .eq('profiles.show_on_map', true)
        .not('place_lat', 'is', null)
        .not('place_lng', 'is', null)
        .gte('place_lat', location.lat - latRange)
        .lte('place_lat', location.lat + latRange)
        .gte('place_lng', location.lng - lngRange)
        .lte('place_lng', location.lng + lngRange)
        .not('images', 'is', null)
        .order('created_at', { ascending: false })
        .limit(40)

      const formatted = (data || []).map((m) => {
        // Calculate rough distance
        const dLat = (m.place_lat - location.lat) * 69
        const dLng = (m.place_lng - location.lng) * 54.6
        const distance = Math.sqrt(dLat * dLat + dLng * dLng)

        return {
          ...m,
          imageUrl: m.images?.url || null,
          author: m.profiles,
          distance: distance.toFixed(1),
        }
      })

      // Sort by distance
      formatted.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
      setMeals(formatted)
      setLoading(false)
    }

    fetchNearby()
  }, [location])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 rounded-full bg-white/[0.05] p-6">
          <svg className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
          </svg>
        </div>
        <p className="text-lg font-medium text-gray-400">{error}</p>
        <p className="mt-1 text-sm text-gray-600">
          Check your browser settings and try again
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <MealCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (meals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 text-5xl">📍</div>
        <p className="text-lg font-medium text-gray-400">No meals found nearby</p>
        <p className="mt-1 text-sm text-gray-600">
          Try exploring meals from around the world instead
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {meals.map((meal) => (
        <div key={meal.id} className="relative">
          <MealCard meal={meal} showAuthor author={meal.author} />
          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {meal.distance} mi
          </span>
        </div>
      ))}
    </div>
  )
}
