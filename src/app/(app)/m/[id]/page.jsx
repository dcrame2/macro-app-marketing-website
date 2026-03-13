import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { MealDetail } from '@/components/app/MealDetail'

export async function generateMetadata({ params }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: meal } = await supabase
    .from('meals')
    .select('name, calories, protein')
    .eq('id', id)
    .single()

  return {
    title: meal
      ? `${meal.name || 'Meal'} - ${Math.round(meal.calories || 0)} cal - InstaCal`
      : 'Meal - InstaCal',
  }
}

export default async function MealPage({ params }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: meal } = await supabase
    .from('meals')
    .select(`
      id, name, calories, protein, carbs, fat, sugar, quantity,
      upload_method, is_build_meal, description, ai_description,
      health_score, place_name, place_address, place_lat, place_lng,
      created_at, profile_id,
      images ( url, blurhash )
    `)
    .eq('id', id)
    .single()

  if (!meal) notFound()

  // Parallel queries
  const [profileRes, ingredientsRes, likesRes, commentsRes] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, name, username, avatar_url, is_public, streak_count')
      .eq('id', meal.profile_id)
      .single(),
    supabase
      .from('meal_ingredients')
      .select('id, name, calories, protein, carbs, fat, sugar, quantity, images ( url )')
      .eq('meal_id', meal.id)
      .order('id', { ascending: true }),
    supabase
      .from('meal_likes')
      .select('*', { count: 'exact', head: true })
      .eq('meal_id', meal.id),
    supabase
      .from('meal_comments')
      .select(`
        id, content, created_at, parent_comment_id,
        profiles ( id, name, username, avatar_url )
      `)
      .eq('meal_id', meal.id)
      .is('parent_comment_id', null)
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  const formattedMeal = {
    ...meal,
    imageUrl: meal.images?.url || null,
  }

  const ingredients = (ingredientsRes.data || []).map((i) => ({
    ...i,
    imageUrl: i.images?.url || null,
  }))

  const comments = (commentsRes.data || []).map((c) => ({
    ...c,
    author: c.profiles,
  }))

  return (
    <MealDetail
      meal={formattedMeal}
      author={profileRes.data}
      ingredients={ingredients}
      likesCount={likesRes.count || 0}
      comments={comments}
    />
  )
}
