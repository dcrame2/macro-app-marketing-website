import { dayOf, num, sized, splitServing } from '@/lib/sharePage'
import { ShareBeacon } from './GetApp'
import {
  AuthorRow,
  CallToAction,
  Card,
  Eyebrow,
  Footer,
  InviteStrip,
  MacroPills,
  Page,
  PlateTiles,
  Stat,
  StickyBar,
  TopBar,
  numeral,
} from './parts'

const METHOD = {
  photo: 'logged from a photo',
  build: 'built from ingredients',
  barcode: 'scanned',
  label: 'scanned from a label',
  search: 'logged',
  saved: 'logged',
}

/**
 * A shared meal as a page: the photo, the numbers, what is on the plate and,
 * when the meal carries one, the recipe. Before 2026-11-10 this link opened a
 * logo and an "Open in App" button.
 */
export function SharedMeal({ meal, inviter, code }) {
  const recipe = meal.recipe
  const minutes = recipe ? (recipe.prep_minutes ?? 0) + (recipe.cook_minutes ?? 0) : 0
  const day = dayOf(meal.logged_at)
  const sub = recipe
    ? [meal.author.name, 'shared a recipe'].filter(Boolean).join(' ')
    : [day, METHOD[meal.method]].filter(Boolean).join(' · ')
  const handle = meal.author.username ? `@${meal.author.username}` : meal.author.name

  return (
    <Page
      bar={
        <StickyBar
          type="meal"
          id={meal.id}
          code={code}
          title={recipe ? 'Keep this recipe' : 'Log this in one tap'}
          sub="Free on InstaCal"
          action={recipe ? 'Save recipe' : 'Get the app'}
        />
      }
    >
      <ShareBeacon type="meal" id={meal.id} code={code} />
      <TopBar type="meal" id={meal.id} code={code} />
      <InviteStrip inviter={inviter} line={recipe ? 'sent you this recipe' : 'shared this with you'} />
      {meal.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sized(meal.image_url, 960, 1080)}
          alt={meal.title}
          className="aspect-[8/9] w-full bg-[#DDE3EA] object-cover"
        />
      ) : null}

      <main className="flex flex-col gap-[22px] pb-2 pt-3.5">
        <AuthorRow author={meal.author} sub={sub} likes={meal.likes} code={code} />

        <div className="flex flex-col gap-2.5 px-4">
          {recipe ? (
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#566170]">Recipe</span>
          ) : null}
          <h1 className="text-2xl font-extrabold leading-[30px] text-[#10151C]">{meal.title}</h1>
          {meal.caption ? (
            <p className="whitespace-pre-line text-[15px] leading-[21px] text-[#566170]">{meal.caption}</p>
          ) : recipe?.intro ? (
            <p className="whitespace-pre-line text-[15px] leading-[21px] text-[#566170]">{recipe.intro}</p>
          ) : null}
          {meal.place ? <p className="text-[13px] font-semibold text-[#566170]">At {meal.place}</p> : null}

          {recipe ? (
            <div className="flex justify-between rounded-2xl border border-[#DDE3EA] bg-white px-4 py-3.5">
              <Stat value={num(meal.calories)} label="calories" />
              <Stat value={`${num(meal.protein)}g`} label="protein" />
              {minutes > 0 ? <Stat value={num(minutes)} label="minutes" /> : null}
              {recipe.servings ? (
                <Stat value={num(recipe.servings)} label={recipe.servings === 1 ? 'serving' : 'servings'} />
              ) : null}
            </div>
          ) : (
            <>
              <p className="flex items-baseline gap-2">
                <span className={`${numeral} text-[44px] leading-[50px]`}>{num(meal.calories)}</span>
                <span className="text-[15px] font-semibold text-[#566170]">calories</span>
              </p>
              <MacroPills protein={meal.protein} carbs={meal.carbs} fat={meal.fat} />
            </>
          )}
        </div>

        {meal.ingredients.length > 0 ? (
          <section className="flex flex-col gap-2.5">
            <Eyebrow>{recipe ? 'Ingredients' : `On the plate · ${meal.ingredients.length}`}</Eyebrow>
            <Card className="!py-1.5">
              {meal.ingredients.map((row, index) => {
                const { name, serving } = splitServing(row.name)
                return (
                  <div
                    key={`${row.name}-${index}`}
                    className={`flex items-center justify-between gap-3 py-2.5 ${index < meal.ingredients.length - 1 ? 'border-b border-[#DDE3EA]' : ''}`}
                  >
                    <span className="flex min-w-0 flex-col">
                      <span className="text-[15px] font-semibold leading-5 text-[#10151C]">{name}</span>
                      {serving ? <span className="text-[13px] leading-[18px] text-[#566170]">{serving}</span> : null}
                    </span>
                    {row.calories > 0 ? (
                      <span className={`${numeral} flex-none text-lg text-[#10151C]`}>{num(row.calories)}</span>
                    ) : null}
                  </div>
                )
              })}
            </Card>
          </section>
        ) : null}

        {recipe ? (
          <section className="flex flex-col gap-2.5">
            <Eyebrow>{`Method · ${recipe.steps.length} ${recipe.steps.length === 1 ? 'step' : 'steps'}`}</Eyebrow>
            <Card className="gap-3.5">
              <ol className="flex flex-col gap-3.5">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`${numeral} flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-[#E3F0FA] text-base text-[#0A5C9E]`}
                    >
                      {index + 1}
                    </span>
                    <span className="pt-1 text-[15px] leading-[22px] text-[#10151C]">{step}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </section>
        ) : null}

        <CallToAction
          type="meal"
          id={meal.id}
          code={code}
          head={recipe ? 'Cook it in the app' : 'Log this plate in one tap'}
          sub={
            recipe
              ? 'Save it to your cookbook and log it in one tap when you eat it. Free to start.'
              : 'InstaCal reads a photo of your food and does the numbers. Free to start.'
          }
        />

        {meal.more.length >= 2 ? (
          <section className="flex flex-col gap-2.5">
            <Eyebrow>{`More from ${handle}`}</Eyebrow>
            <PlateTiles plates={meal.more} code={code} />
          </section>
        ) : null}
      </main>
      <Footer />
    </Page>
  )
}

/** schema.org Recipe, so a search engine can show a shared recipe as one. */
export function recipeJsonLd(meal) {
  if (!meal?.recipe) return null
  const iso = (m) => (m ? `PT${Math.round(m)}M` : undefined)
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: meal.title,
    image: meal.image_url ? [meal.image_url] : undefined,
    author: { '@type': 'Person', name: meal.author.username ?? meal.author.name ?? 'InstaCal member' },
    description: meal.recipe.intro ?? undefined,
    prepTime: iso(meal.recipe.prep_minutes),
    cookTime: iso(meal.recipe.cook_minutes),
    recipeYield: meal.recipe.servings ? String(meal.recipe.servings) : undefined,
    recipeIngredient: meal.ingredients.map((row) => {
      const { name, serving } = splitServing(row.name)
      return serving ? `${serving} ${name}` : name
    }),
    recipeInstructions: meal.recipe.steps.map((text) => ({ '@type': 'HowToStep', text })),
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${meal.calories} calories`,
      proteinContent: `${meal.protein} g`,
      carbohydrateContent: `${meal.carbs} g`,
      fatContent: `${meal.fat} g`,
    },
  }
}
