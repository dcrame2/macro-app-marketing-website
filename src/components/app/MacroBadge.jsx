import clsx from 'clsx'

const macroStyles = {
  calories: {
    bg: 'bg-blue-500/15',
    text: 'text-blue-400',
    label: 'Cal',
  },
  protein: {
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    label: 'Protein',
  },
  carbs: {
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    label: 'Carbs',
  },
  fat: {
    bg: 'bg-orange-500/15',
    text: 'text-orange-400',
    label: 'Fat',
  },
  sugar: {
    bg: 'bg-pink-500/15',
    text: 'text-pink-400',
    label: 'Sugar',
  },
}

export function MacroBadge({ type, value, size = 'sm' }) {
  const style = macroStyles[type]
  if (!style) return null
  const display = value != null ? Math.round(value) : 0

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-lg font-medium',
        style.bg,
        style.text,
        size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2 py-1 text-xs',
      )}
    >
      <span className="font-bold">{display}{type === 'calories' ? '' : 'g'}</span>
      <span className="opacity-70">{style.label}</span>
    </span>
  )
}

export function MacroRow({ meal, size = 'sm' }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <MacroBadge type="calories" value={meal.calories} size={size} />
      <MacroBadge type="protein" value={meal.protein} size={size} />
      <MacroBadge type="carbs" value={meal.carbs} size={size} />
      <MacroBadge type="fat" value={meal.fat} size={size} />
    </div>
  )
}
