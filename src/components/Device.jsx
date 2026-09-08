import Image from 'next/image'
import clsx from 'clsx'

import frame from '@/images/device/iphone-frame.png'

/*
 * The frame is 1022 x 2082. Its screen sits at (52, 46), measures 918 x 1990
 * and has 126px corners. These are the same numbers the App Store screenshot
 * generator uses, so the site and the store listing share one device.
 */
const SCREEN = {
  left: `${(52 / 1022) * 100}%`,
  top: `${(46 / 2082) * 100}%`,
  width: `${(918 / 1022) * 100}%`,
  height: `${(1990 / 2082) * 100}%`,
  borderRadius: `${(126 / 918) * 100}% / ${(126 / 1990) * 100}%`,
}

export function Device({
  screen,
  alt,
  className,
  priority = false,
  sizes = '(min-width: 640px) 320px, 260px',
  children,
}) {
  return (
    <div
      className={clsx('relative aspect-[1022/2082] select-none', className)}
    >
      <Image
        src={frame}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        priority={priority}
        className="pointer-events-none object-contain"
      />
      <div className="absolute overflow-hidden bg-black" style={SCREEN}>
        <Image
          src={screen}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
        {children}
      </div>
    </div>
  )
}
