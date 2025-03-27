import Link from 'next/link'
import clsx from 'clsx'
import Image from 'next/image'
import GoogleBadge from '@/images/GetItOnGooglePlay_Badge.png'

export function PlayStoreLink({ color = 'black' }) {
  return (
    <Link
      href="#"
      aria-label="Get it on Google Play"
      className={clsx(
        'inline-block rounded-lg transition-colors',
        color === 'black'
          ? 'bg-gray-800 hover:bg-gray-900'
          : 'bg-white hover:bg-gray-50',
      )}
    >
      <Image
        src={GoogleBadge}
        alt="Get it on Google Play"
        width={135}
        height={40}
        className="rounded-lg"
        priority
      />
    </Link>
  )
}
