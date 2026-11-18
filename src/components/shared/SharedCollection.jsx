import { num, sized } from '@/lib/sharePage'
import { ShareBeacon } from './GetApp'
import { PlateGrid } from './PlateList'
import { AuthorRow, CallToAction, Eyebrow, Footer, InviteStrip, Page, Stat, StickyBar, TopBar } from './parts'

/**
 * A collection someone shared (2026-11-10): one link to a set of plates -
 * "High-protein dinners", "What I eat in a week". The cover is the plates
 * themselves, as on the app's own collection page; each one opens its recipe
 * or its plate. After an install the app opens on the person who made it.
 */
export function SharedCollection({ collection, inviter, code }) {
  const plates = collection.plates
  const covers = plates.filter((p) => p.image_url).slice(0, 4)
  const n = plates.length
  const avg = (key) => (n ? Math.round(plates.reduce((a, p) => a + (p[key] || 0), 0) / n) : 0)
  const recipes = plates.filter((p) => p.recipe_steps > 0).length
  const name = collection.author.name ?? collection.author.username

  return (
    <Page
      bar={
        <StickyBar
          type="user"
          id={collection.author.id}
          code={code}
          title={`Keep all ${n} in your pocket`}
          sub="Save them to your own cookbook, free"
          action="Save these"
        />
      }
    >
      <ShareBeacon type="user" id={collection.author.id} code={code} />
      <TopBar type="user" id={collection.author.id} code={code} />
      <InviteStrip inviter={inviter} line="sent you this collection" />
      {covers.length > 0 ? (
        <div className={`grid aspect-[4/3] w-full gap-px bg-[#030712] ${covers.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {covers.map((plate, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={plate.id}
              src={sized(plate.image_url, 480, covers.length > 2 ? 360 : 720)}
              alt=""
              className={`h-full w-full bg-[#111A2B] object-cover ${covers.length === 3 && index === 0 ? 'row-span-2' : ''}`}
            />
          ))}
        </div>
      ) : null}

      <main className="flex flex-col gap-[22px] pb-2 pt-3.5">
        <AuthorRow author={collection.author} sub="shared a collection" likes={0} code={code} />
        <div className="flex flex-col gap-2.5 px-4">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#9CA8BB]">
            {`Collection · ${n} ${n === 1 ? 'plate' : 'plates'}`}
          </span>
          <h1 className="text-[28px] font-extrabold leading-[34px] text-[#F8FAFC]">{collection.title}</h1>
          {collection.description ? (
            <p className="whitespace-pre-line text-[15px] leading-[21px] text-[#9CA8BB]">{collection.description}</p>
          ) : null}
          {n > 0 ? (
            <div className="flex justify-between rounded-2xl border border-white/10 bg-[#0B1220] px-4 py-3.5">
              <Stat value={num(avg('calories'))} label="avg calories" />
              <Stat value={`${num(avg('protein'))}g`} label="avg protein" />
              {recipes > 0 ? <Stat value={num(recipes)} label={recipes === 1 ? 'recipe' : 'recipes'} /> : null}
            </div>
          ) : null}
        </div>

        {n > 0 ? (
          <section className="flex flex-col gap-2.5">
            <Eyebrow>Tap one for the numbers and the recipe</Eyebrow>
            <PlateGrid plates={plates} code={code} by />
          </section>
        ) : (
          <p className="px-4 py-8 text-center text-[15px] text-[#9CA8BB]">Nothing in this collection is public right now.</p>
        )}

        <CallToAction
          type="user"
          id={collection.author.id}
          code={code}
          head="Keep these in your pocket"
          sub={`Save any of them to your own cookbook and log one in a tap when you eat it. Follow ${name} for the next ones. Free to start.`}
        />
      </main>
      <Footer />
    </Page>
  )
}
