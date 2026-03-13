'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Avatar } from './Avatar'

export function SearchView() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('people')

  const search = useCallback(
    async (q) => {
      if (!q || q.length < 2) {
        setResults([])
        return
      }
      setLoading(true)
      const supabase = createClient()

      if (tab === 'people') {
        const { data } = await supabase
          .from('profiles')
          .select('id, name, username, avatar_url, bio, is_public')
          .or(`name.ilike.%${q}%,username.ilike.%${q}%`)
          .limit(20)
        setResults(data || [])
      } else {
        const { data } = await supabase
          .from('meals')
          .select(`
            id, name, calories, protein, carbs, fat, created_at,
            images ( url ),
            profiles ( id, name, username, avatar_url )
          `)
          .ilike('name', `%${q}%`)
          .eq('is_hidden', false)
          .not('images', 'is', null)
          .order('created_at', { ascending: false })
          .limit(20)
        setResults(
          (data || []).map((m) => ({
            ...m,
            imageUrl: m.images?.url || null,
            author: m.profiles,
          })),
        )
      }
      setLoading(false)
    },
    [tab],
  )

  function handleChange(e) {
    const val = e.target.value
    setQuery(val)
    // Debounce-ish
    clearTimeout(window.__searchTimeout)
    window.__searchTimeout = setTimeout(() => search(val), 300)
  }

  function handleTabChange(t) {
    setTab(t)
    setResults([])
    if (query.length >= 2) {
      setTimeout(() => search(query), 50)
    }
  }

  return (
    <>
      {/* Search input */}
      <div className="relative mb-6">
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={tab === 'people' ? 'Search by name or username...' : 'Search meals...'}
          className="w-full rounded-2xl border-0 bg-white/[0.05] py-4 pl-12 pr-4 text-white placeholder-gray-500 ring-1 ring-white/[0.06] transition-all focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-brand-500/50"
        />
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => handleTabChange('people')}
          className={`rounded-xl px-5 py-2 text-sm font-medium transition-all ${
            tab === 'people'
              ? 'bg-white/10 text-white'
              : 'text-gray-500 hover:bg-white/[0.05] hover:text-white'
          }`}
        >
          People
        </button>
        <button
          onClick={() => handleTabChange('meals')}
          className={`rounded-xl px-5 py-2 text-sm font-medium transition-all ${
            tab === 'meals'
              ? 'bg-white/10 text-white'
              : 'text-gray-500 hover:bg-white/[0.05] hover:text-white'
          }`}
        >
          Meals
        </button>
      </div>

      {/* Results */}
      {loading && (
        <div className="flex justify-center py-10">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-2">
          {tab === 'people'
            ? results.map((profile) => (
                <Link
                  key={profile.id}
                  href={`/profile/${profile.username || profile.id}`}
                  className="flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/[0.06] transition-all hover:bg-white/[0.06]"
                >
                  <Avatar src={profile.avatar_url} name={profile.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white">
                      {profile.name || profile.username}
                    </p>
                    {profile.username && (
                      <p className="text-sm text-gray-500">@{profile.username}</p>
                    )}
                    {profile.bio && (
                      <p className="mt-0.5 truncate text-xs text-gray-600">{profile.bio}</p>
                    )}
                  </div>
                  {!profile.is_public && (
                    <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  )}
                </Link>
              ))
            : results.map((meal) => (
                <Link
                  key={meal.id}
                  href={`/m/${meal.id}`}
                  className="flex items-center gap-4 rounded-2xl bg-white/[0.03] p-3 ring-1 ring-white/[0.06] transition-all hover:bg-white/[0.06]"
                >
                  {meal.imageUrl && (
                    <img
                      src={meal.imageUrl}
                      alt=""
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium text-white">{meal.name}</p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      🔥 {Math.round(meal.calories || 0)} · {Math.round(meal.protein || 0)}g protein
                    </p>
                  </div>
                  {meal.author && (
                    <span className="text-xs text-gray-600">
                      {meal.author.name || meal.author.username}
                    </span>
                  )}
                </Link>
              ))}
        </div>
      )}

      {!loading && query.length >= 2 && results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-3 text-4xl">🔍</div>
          <p className="text-gray-400">No results found</p>
          <p className="mt-1 text-sm text-gray-600">Try a different search</p>
        </div>
      )}

      {!loading && query.length < 2 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-3 text-4xl">✨</div>
          <p className="text-gray-400">Start typing to search</p>
        </div>
      )}
    </>
  )
}
