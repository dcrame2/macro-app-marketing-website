import lightFeed from '@/images/screenshots/current/light/hero-feed.webp'
import darkFeed from '@/images/screenshots/current/dark/hero-feed.webp'
import lightProfile from '@/images/screenshots/current/light/profile.webp'
import darkProfile from '@/images/screenshots/current/dark/profile.webp'
import lightMap from '@/images/screenshots/current/light/map.webp'
import darkMap from '@/images/screenshots/current/dark/map.webp'
import lightExplore from '@/images/screenshots/current/light/explore.webp'
import darkExplore from '@/images/screenshots/current/dark/explore.webp'
import lightMeal from '@/images/screenshots/current/light/meal-macros.webp'
import darkMeal from '@/images/screenshots/current/dark/meal-macros.webp'
import lightRun from '@/images/screenshots/current/light/workout-map.webp'
import darkRun from '@/images/screenshots/current/dark/workout-map.webp'
import lightFitness from '@/images/screenshots/current/light/tracking-fitness.webp'
import darkFitness from '@/images/screenshots/current/dark/tracking-fitness.webp'
import darkFood from '@/images/screenshots/current/dark/tracking-food.webp'
import lightWorkouts from '@/images/screenshots/current/light/workouts-grid.webp'
import darkWorkouts from '@/images/screenshots/current/dark/workouts-grid.webp'
import flyerProfile from '@/images/screenshots/gym-flyers/profile-light.webp'
import flyerFeed from '@/images/screenshots/gym-flyers/social-feed-dark.webp'

// Verified October 12 captures. The source's light/tracking-food file shows
// Fitness, so it is deliberately excluded instead of mislabeled as Food.
export const screens = {
  heroProfile: {
    light: flyerProfile,
    alt: 'Dylan’s InstaCal profile with All selected and a grid of meals, rides, and strength workouts',
  },
  heroFeed: {
    dark: flyerFeed,
    alt: 'InstaCal Following feed showing Dylan’s eggs Benedict meal with calories, macros, likes, and comments',
  },
  feed: {
    light: lightFeed,
    dark: darkFeed,
    alt: 'InstaCal Following feed with a shared eggs Benedict meal, macros, likes, and comments',
  },
  profile: {
    light: lightProfile,
    dark: darkProfile,
    alt: 'InstaCal profile with story highlights and a grid of meals, runs, and strength workouts',
  },
  map: {
    light: lightMap,
    dark: darkMap,
    alt: 'InstaCal map with meal locations around Chicago and a restaurant showing what people ordered',
  },
  discover: {
    light: lightExplore,
    dark: darkExplore,
    alt: 'InstaCal Search with meals that fit your macros, trending recipes, and real community plates',
  },
  meal: {
    light: lightMeal,
    dark: darkMeal,
    alt: 'Eggs Benedict in InstaCal with calories, protein, carbs, fat, and how the meal fits the day',
  },
  run: {
    light: lightRun,
    dark: darkRun,
    alt: 'A morning run in InstaCal with a Chicago route, distance, time, calories burned, and heart rate',
  },
  fitness: {
    light: lightFitness,
    dark: darkFitness,
    alt: 'InstaCal Fitness progress with movement, distance, workouts, Coach, body, and routes',
  },
  food: {
    dark: darkFood,
    alt: 'InstaCal Food progress with calorie and macro summaries, days on target, streak, Coach, and awards',
  },
  workouts: {
    light: lightWorkouts,
    dark: darkWorkouts,
    alt: 'InstaCal workout profile showing run routes, rides, and muscle maps for strength training',
  },
}
