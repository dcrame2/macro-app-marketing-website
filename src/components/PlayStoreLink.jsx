import Link from 'next/link'
import clsx from 'clsx'
import Image from 'next/image'
import GoogleBadge from '@/images/GetItOnGooglePlay_Badge.png'

export function PlayStoreLink({ color = 'black' }) {
  return (
    <Link
      href="https://play.google.com/store/apps/details?id=com.digitaldelight.InstaCal"
      aria-label="Get it on Google Play"
      target="_blank"
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
