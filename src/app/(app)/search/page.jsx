import { SearchView } from '@/components/app/SearchView'

export const metadata = {
  title: 'Search - InstaCal',
}

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="mb-8 pt-4">
        <h1 className="text-3xl font-bold text-white">Search</h1>
        <p className="mt-1 text-gray-500">Find people and meals</p>
      </div>
      <SearchView />
    </div>
  )
}
