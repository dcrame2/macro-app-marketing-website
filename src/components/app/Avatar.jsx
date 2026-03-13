import clsx from 'clsx'
import { getInitials } from '@/lib/utils'

const sizes = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-xl',
  '2xl': 'h-28 w-28 text-3xl',
}

export function Avatar({ src, name, size = 'md', className }) {
  const sizeClass = sizes[size] || sizes.md

  if (src) {
    return (
      <img
        src={src}
        alt={name || ''}
        className={clsx(
          'rounded-full object-cover ring-2 ring-white/10',
          sizeClass,
          className,
        )}
      />
    )
  }

  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded-full bg-gradient-to-br from-brand-500/30 to-brand-600/30 font-bold text-brand-300 ring-2 ring-white/10',
        sizeClass,
        className,
      )}
    >
      {getInitials(name)}
    </div>
  )
}
