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
import lightProgress from '@/images/screenshots/current/light/progress.webp'
import darkProgress from '@/images/screenshots/current/dark/progress.webp'
import lightDay from '@/images/screenshots/current/light/friend-day.webp'
import darkDay from '@/images/screenshots/current/dark/friend-day.webp'
import lightSayIt from '@/images/screenshots/current/light/say-it.webp'
import darkSayIt from '@/images/screenshots/current/dark/say-it.webp'
import lightWorkouts from '@/images/screenshots/current/light/workouts-grid.webp'
import darkWorkouts from '@/images/screenshots/current/dark/workouts-grid.webp'
import heroProfile from '@/images/screenshots/current/light/hero-profile-full.webp'
import heroHome from '@/images/screenshots/current/dark/hero-home-full.webp'

// November 25 captures of @dylan on the 3.81 app (iPhone 16 Pro Max), taken
// against a local copy of the database arranged for the shots. Map, Explore,
// the meal, the run and the workouts grid are the November 5 set.
export const screens = {
  heroProfile: {
    light: heroProfile,
    alt: 'Dylan’s InstaCal profile with a 288-day streak, story highlights, and a grid of plated meals, a lifting session’s muscle map, and a run',
  },
  heroFeed: {
    dark: heroHome,
    alt: 'InstaCal Home with calories and protein left today, a 288-day streak, friends’ day circles, and an acai bowl in the feed',
  },
  feed: {
    light: lightFeed,
    dark: darkFeed,
    alt: 'InstaCal Home with calories and protein left today, a row of friends’ day circles, and the feed under it',
  },
  day: {
    light: lightDay,
    dark: darkDay,
    alt: 'A friend’s day in InstaCal: a grilled chicken salad with its calories and macros, one of five pages that also hold a run and a lift',
  },
  profile: {
    light: lightProfile,
    dark: darkProfile,
    alt: 'InstaCal profile with story highlights and a grid of plated meals, a run, and a muscle map for a lifting session',
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
  sayIt: {
    light: lightSayIt,
    dark: darkSayIt,
    alt: 'Say it in InstaCal: one sentence about a steak dinner and a 5-mile run turned into a meal with three foods and a run, ready to log',
  },
  progress: {
    light: lightProgress,
    dark: darkProgress,
    alt: 'InstaCal Progress with calories left, macro bars, weekly training goals, calories burned, days on target, run mileage, and muscles hit this week',
  },
  workouts: {
    light: lightWorkouts,
    dark: darkWorkouts,
    alt: 'InstaCal workout profile showing run routes, rides, and muscle maps for strength training',
  },
}
