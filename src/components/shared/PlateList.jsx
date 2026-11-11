import { num, platePath, sized, withCode } from '@/lib/sharePage'
import { numeral } from './parts'

/**
 * Plates as a two-up grid with what a reader needs to choose one: the photo,
 * the name, calories and protein, and for a recipe its minutes. A plate with
 * no photo of its own (a scan) stands on a plain ground with its calories.
 */
export function PlateGrid({ plates, code, by = false }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-4 px-4">
      {plates.map((plate, index) => (
        <a key={plate.id} href={withCode(platePath(plate), code)} className="flex min-w-0 flex-col gap-1.5">
          <span className="relative block aspect-[11/12] w-full overflow-hidden rounded-[14px] bg-[#DDE3EA]">
            {plate.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={sized(plate.image_url, 440, 480)}
                alt=""
                loading={index < 4 ? 'eager' : 'lazy'}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full flex-col items-center justify-center gap-0.5 bg-gradient-to-b from-[#E3F0FA] to-[#DDE3EA]">
                <span className={`${numeral} text-[34px] leading-[38px] text-[#0A5C9E]`}>{num(plate.calories)}</span>
                <span className="text-xs font-semibold text-[#566170]">calories</span>
              </span>
            )}
            {plate.recipe_steps > 0 ? (
              <span className="absolute left-2 top-2 rounded-full bg-black/65 px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.06em] text-white">
                {plate.minutes ? `Recipe · ${plate.minutes} min` : 'Recipe'}
              </span>
            ) : null}
          </span>
          <span className="line-clamp-2 text-sm font-bold leading-[18px] text-[#10151C]">{plate.title}</span>
          <span className="text-[13px] text-[#566170]">
            {num(plate.calories)} cal · {num(plate.protein)}g protein
          </span>
          {by && plate.author?.username ? (
            <span className="text-xs text-[#566170]">by @{plate.author.username}</span>
          ) : null}
        </a>
      ))}
    </div>
  )
}
