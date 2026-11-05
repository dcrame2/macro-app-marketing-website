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

// November 5 captures of @dylan on the 3.5x app (iPhone 16 Pro Max). The
// light/tracking-food file is older and shows Fitness, so it stays unused.
export const screens = {
  heroProfile: {
    light: flyerProfile,
    alt: 'Dylan’s InstaCal profile with story highlights and a grid of a lifting session’s muscle map, plated meals, and a 13-mile run route',
  },
  heroFeed: {
    dark: flyerFeed,
    alt: 'InstaCal Home with today’s calories and protein left, the day’s run, meals, and lift on a timeline, and a salad from the For you feed',
  },
  feed: {
    light: lightFeed,
    dark: darkFeed,
    alt: 'InstaCal Home with today’s calories left, a timeline of the day’s run, meals, and lift, a 268-day streak, and the For you feed',
  },
  profile: {
    light: lightProfile,
    dark: darkProfile,
    alt: 'InstaCal profile with story highlights and a grid of plated meals, a run route, and a muscle map for a lifting session',
  },
  map: {
    light: lightMap,
    dark: darkMap,
    alt: 'InstaCal map with meal locations around Chicago and a restaurant showing what people ordered',
  },
  discover: {
    light: lightExplore,
    dark: darkExplore,
    alt: 'InstaCal Explore with lunches people loved right now, browse doors for high protein, under 500 calories, recipes, breakfast, routes, and lifts',
  },
  meal: {
    light: lightMeal,
    dark: darkMeal,
    alt: 'Eggs Benedict with bacon in InstaCal with calories, macros, likes, and how the meal fits the day and a build-muscle goal',
  },
  run: {
    light: lightRun,
    dark: darkRun,
    alt: 'A 13.4-mile run in InstaCal with its Chicago lakefront route, moving time, pace, calories burned, and heart rate',
  },
  fitness: {
    light: lightFitness,
    dark: darkFitness,
    alt: 'InstaCal Fitness progress with movement, distance, workouts, Coach, body, and routes',
  },
  food: {
    dark: darkFood,
    alt: 'InstaCal Food progress with calories left, macro bars, days on target this week, a 268-day streak, awards, and a live challenge',
  },
  workouts: {
    light: lightWorkouts,
    dark: darkWorkouts,
    alt: 'InstaCal workout profile showing run routes, rides, and muscle maps for strength training',
  },
}
