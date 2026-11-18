'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ACTIVITY, GOALS, macroTargets, planId } from '@/lib/macroTargets'
import { num } from '@/lib/sharePage'
import { GetApp, storeForApp } from './GetApp'
import { PlateCard } from '@/components/explore/PlateCard'

const field =
  'h-12 w-full rounded-xl border border-white/10 bg-[#0B1220] px-3 text-base font-semibold text-[#F8FAFC] outline-none focus:border-[#0077cc] focus:ring-2 focus:ring-[#0077cc]/25'

function Choice({ legend, options, value, onChange, columns }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-xs font-bold uppercase tracking-[0.1em] text-[#9CA8BB]">{legend}</legend>
      <div className={`grid gap-2 ${columns}`}>
        {options.map((option) => {
          const on = option.key === value
          return (
            <label
              key={option.key}
              className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-2 text-center text-sm font-bold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#0077cc]/40 ${
                on ? 'border-[#0077cc] bg-[#0077cc]/20 text-[#6CC4FF]' : 'border-white/10 bg-[#0B1220] text-[#F8FAFC]'
              }`}
            >
              <input
                type="radio"
                name={legend}
                className="sr-only"
                checked={on}
                onChange={() => onChange(option.key)}
              />
              {option.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function Number({ id, label, unit, value, onChange, min, max }) {
  return (
    <label htmlFor={id} className="flex min-w-0 flex-1 flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#9CA8BB]">{label}</span>
      <span className="relative block">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${field} pr-10`}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#9CA8BB]">
          {unit}
        </span>
      </span>
    </label>
  )
}

const BAR = { protein: '#3FAE5A', carbs: '#E0B400', fat: '#E8703A' }

/**
 * The macro calculator (2026-11-10): six answers, the same formula the app
 * uses, and the day's numbers the moment they are complete - no email, no
 * button to press. Under the result, recipes that fit one meal of that day.
 */
export function MacroCalculator({ numeral, plates, code }) {
  const [sex, setSex] = useState('male')
  const [metric, setMetric] = useState(false)
  const [age, setAge] = useState('30')
  const [feet, setFeet] = useState('5')
  const [inches, setInches] = useState('9')
  const [cm, setCm] = useState('175')
  const [weight, setWeight] = useState('170')
  const [activity, setActivity] = useState('Lightly Active')
  const [goal, setGoal] = useState('Lose Fat')

  const answers = useMemo(() => {
    const w = parseFloat(weight)
    return {
      weightLb: metric ? w / 0.45359237 : w,
      heightCm: metric ? parseFloat(cm) : (parseFloat(feet) || 0) * 30.48 + (parseFloat(inches) || 0) * 2.54,
      age: parseFloat(age),
      sex,
      activity,
      goal,
    }
  }, [sex, metric, age, feet, inches, cm, weight, activity, goal])
  const result = useMemo(() => macroTargets(answers), [answers])

  // The answers follow the person into the app: kept with this phone's
  // signals (as a shared meal is), so onboarding opens with them filled in.
  // Once they have settled after a change, and again on the way to the store.
  const plan = useMemo(() => planId(answers), [answers])
  const touched = useRef(false)
  const sent = useRef(null)
  const keep = (id) => {
    if (!id || sent.current === id) return
    sent.current = id
    storeForApp({ code, target: { type: 'plan', id } })
  }
  useEffect(() => {
    if (!touched.current) {
      touched.current = true
      return undefined
    }
    const timer = setTimeout(() => keep(plan), 2500)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan])

  const switchUnits = (next) => {
    if (next === metric) return
    const w = parseFloat(weight)
    if (next) {
      setCm(String(Math.round((parseFloat(feet) || 0) * 30.48 + (parseFloat(inches) || 0) * 2.54)))
      if (w > 0) setWeight(String(Math.round(w * 0.45359237)))
    } else {
      const total = (parseFloat(cm) || 0) / 2.54
      setFeet(String(Math.floor(total / 12)))
      setInches(String(Math.round(total % 12)))
      if (w > 0) setWeight(String(Math.round(w / 0.45359237)))
    }
    setMetric(next)
  }

  // A third of the day, give or take: what one meal of this plan looks like.
  const fits = useMemo(() => {
    if (!result) return []
    const perMeal = result.calories / 3
    return plates
      .filter((p) => p.calories <= perMeal * 1.15 && p.calories >= perMeal * 0.45 && p.protein >= (result.protein / 3) * 0.6)
      .slice(0, 4)
  }, [plates, result])

  const delta = result ? result.calories - result.maintenance : 0
  const share = (grams, perGram) => (result ? Math.round(((grams * perGram) / result.calories) * 100) : 0)

  return (
    <div className="flex flex-col gap-11">
      <div className="grid gap-5 lg:grid-cols-2 lg:items-start lg:gap-6">
      <form className="flex flex-col gap-5 rounded-[18px] border border-white/10 bg-[#0B1220] p-4 lg:p-6" onSubmit={(e) => e.preventDefault()}>
        <Choice
          legend="Your goal"
          options={GOALS}
          value={goal}
          onChange={setGoal}
          columns="grid-cols-3"
        />
        <div className="flex gap-3">
          <Choice
            legend="Sex"
            options={[
              { key: 'male', label: 'Male' },
              { key: 'female', label: 'Female' },
            ]}
            value={sex}
            onChange={setSex}
            columns="grid-cols-2"
          />
          <Choice
            legend="Units"
            options={[
              { key: 'us', label: 'lb · ft' },
              { key: 'metric', label: 'kg · cm' },
            ]}
            value={metric ? 'metric' : 'us'}
            onChange={(key) => switchUnits(key === 'metric')}
            columns="grid-cols-2"
          />
        </div>
        <div className="flex gap-3">
          <Number id="calc-age" label="Age" unit="yr" value={age} onChange={setAge} min={13} max={100} />
          <Number id="calc-weight" label="Weight" unit={metric ? 'kg' : 'lb'} value={weight} onChange={setWeight} min={30} max={700} />
        </div>
        {metric ? (
          <div className="flex gap-3">
            <Number id="calc-cm" label="Height" unit="cm" value={cm} onChange={setCm} min={100} max={250} />
          </div>
        ) : (
          <div className="flex gap-3">
            <Number id="calc-feet" label="Height" unit="ft" value={feet} onChange={setFeet} min={3} max={8} />
            <Number id="calc-inches" label="Inches" unit="in" value={inches} onChange={setInches} min={0} max={11} />
          </div>
        )}
        <Choice legend="How active you are" options={ACTIVITY} value={activity} onChange={setActivity} columns="grid-cols-2" />
      </form>

      <div className="flex flex-col gap-5 lg:sticky lg:top-[102px]">
      <section aria-live="polite" className="flex flex-col gap-4 rounded-[18px] border border-white/10 bg-[#0B1220] p-4 lg:p-6">
        <h2 className="ic-explore-label !mb-0">Your day</h2>
        {result ? (
          <>
            <p className="flex items-baseline gap-2">
              <span className={`${numeral} text-[56px] leading-[60px] text-[#F8FAFC]`}>{num(result.calories)}</span>
              <span className="text-[15px] font-semibold text-[#9CA8BB]">calories a day</span>
            </p>
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-[#030712]" aria-hidden="true">
              <span style={{ width: `${share(result.protein, 4)}%`, background: BAR.protein }} />
              <span style={{ width: `${share(result.carbs, 4)}%`, background: BAR.carbs }} />
              <span style={{ width: `${share(result.fat, 9)}%`, background: BAR.fat }} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ['Protein', result.protein, BAR.protein],
                ['Carbs', result.carbs, BAR.carbs],
                ['Fat', result.fat, BAR.fat],
              ].map(([label, grams, color]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#9CA8BB]">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: color }} />
                    {label}
                  </span>
                  <span className={`${numeral} text-[28px] leading-8 text-[#F8FAFC]`}>{num(grams)}g</span>
                </div>
              ))}
            </div>
            <p className="text-sm leading-5 text-[#9CA8BB]">
              You burn about {num(result.maintenance)} calories a day.{' '}
              {delta < 0
                ? `This plan eats ${num(-delta)} under that, about ${(Math.round((-delta * 7 * 10) / 3500) / 10).toFixed(1)} lb a week.`
                : delta > 0
                  ? `This plan eats ${num(delta)} over that, enough to build without piling on fat.`
                  : 'This plan matches it.'}
            </p>
          </>
        ) : (
          <p className="text-[15px] leading-[21px] text-[#9CA8BB]">Fill in your age, height and weight and your numbers appear here.</p>
        )}
      </section>

      <div className="flex flex-col gap-3 rounded-[18px] border border-white/10 bg-[#0B1220] p-4 lg:p-6">
        <p className="text-xl font-extrabold leading-[25px] text-[#F8FAFC]">Now hit it without the math</p>
        <p className="text-[15px] leading-[21px] text-[#9CA8BB]">
          InstaCal reads a photo of your plate and counts it against these numbers. Free to start.
        </p>
        <GetApp code={code} label="Track it free" target={plan ? `plan:${plan}` : null} onGo={() => keep(plan)} />
        <p className="text-center text-[13px] text-[#9CA8BB]">Your answers come with you: the app opens with this plan filled in.</p>
      </div>
      </div>
      </div>

      {fits.length >= 2 ? (
        <section>
          <h2 className="ic-explore-label">{`Meals that fit · about ${num(Math.round(result.calories / 3 / 10) * 10)} cal each`}</h2>
          <div className="ic-plates">
            {fits.map((plate) => (
              <PlateCard key={plate.id} plate={plate} code={code} />
            ))}
          </div>
          <a href={code ? `/recipes?r=${code}` : '/recipes'} className="ic-text-link ic-plates-more">
            All recipes
          </a>
        </section>
      ) : null}
    </div>
  )
}
