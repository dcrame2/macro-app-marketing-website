import { NearbyView } from '@/components/app/NearbyView'

export const metadata = {
  title: 'Nearby Meals - InstaCal',
}

export default function NearbyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="mb-8 pt-4">
        <h1 className="bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
          Nearby Meals
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Discover what people are eating around you
        </p>
      </div>
      <NearbyView />
    </div>
  )
}
