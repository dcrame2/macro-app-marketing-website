/**
 * The app's own formula, line for line (`src/lib/utils/nutritionTargets.ts`
 * and `weightMath.ts` in the app): Mifflin-St Jeor times an activity
 * multiplier, 20% off to lose fat or 10% on to build, floored at 1,200.
 * Protein is 1.0 g per lb (0.8 on maintenance), fat 28% of calories, carbs
 * the rest. The calculator must land on the number the app will give the
 * same person, so change the two together.
 */
export const ACTIVITY = [
  { key: 'Sedentary', label: 'Mostly sitting', multiplier: 1.2 },
  { key: 'Lightly Active', label: 'Lightly active', multiplier: 1.375 },
  { key: 'Moderately Active', label: 'Active', multiplier: 1.55 },
  { key: 'Very Active', label: 'Very active', multiplier: 1.725 },
]

export const GOALS = [
  { key: 'Lose Fat', label: 'Lose fat', factor: 0.8 },
  { key: 'Maintain Weight', label: 'Maintain', factor: 1 },
  { key: 'Build Muscle', label: 'Build muscle', factor: 1.1 },
]

const KG_PER_LB = 0.45359237
const round5 = (n) => Math.max(0, Math.round(n / 5) * 5)

export const macroTargets = ({ weightLb, heightCm, age, sex, activity, goal }) => {
  if (!(weightLb > 0) || !(heightCm > 0) || !(age > 0)) return null
  const constant = sex === 'male' ? 5 : sex === 'female' ? -161 : -78
  const bmr = 10 * weightLb * KG_PER_LB + 6.25 * heightCm - 5 * age + constant
  const multiplier = ACTIVITY.find((a) => a.key === activity)?.multiplier ?? 1.4
  const tdee = bmr * multiplier
  const factor = GOALS.find((g) => g.key === goal)?.factor ?? 1
  const calories = Math.max(1200, Math.round((tdee * factor) / 10) * 10)
  const protein = round5(weightLb * (goal === 'Maintain Weight' ? 0.8 : 1.0))
  const fat = round5((calories * 0.28) / 9)
  const carbs = Math.max(0, round5((calories - protein * 4 - fat * 9) / 4))
  return { calories, protein, carbs, fat, maintenance: Math.round(tdee / 10) * 10 }
}

/**
 * The six answers as the short id the app reads back after an install:
 * "m-30-175-170-l-l" = sex, age, height in cm, weight in lb, activity
 * (s l m v), goal (l m b). Null when a number is missing or out of range.
 * The app's `lib/referral/calculatorPlan.ts` parses exactly this.
 */
export const planId = ({ weightLb, heightCm, age, sex, activity, goal }) => {
  const whole = (n, lo, hi) => (Number.isFinite(n) && n >= lo && n <= hi ? Math.round(n) : null)
  const a = whole(age, 13, 100)
  const h = whole(heightCm, 100, 250)
  const w = whole(weightLb, 60, 700)
  if (!a || !h || !w) return null
  const act = { Sedentary: 's', 'Lightly Active': 'l', 'Moderately Active': 'm', 'Very Active': 'v' }[activity] ?? 'l'
  const g = { 'Lose Fat': 'l', 'Maintain Weight': 'm', 'Build Muscle': 'b' }[goal] ?? 'm'
  return `${sex === 'female' ? 'f' : sex === 'male' ? 'm' : 'o'}-${a}-${h}-${w}-${act}-${g}`
}
