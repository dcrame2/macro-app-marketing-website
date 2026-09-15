'use client'
export default function BlogError({ reset }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-white">
      <h1 className="text-3xl font-semibold">
        The blog is taking a moment.
      </h1>
      <p className="mt-4 text-gray-400">
        We couldn’t load the stories. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-white px-6 py-3 font-semibold text-gray-950"
      >
        Try again
      </button>
    </div>
  )
}
