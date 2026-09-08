const row1 = [
  {
    user: 'dylan',
    avatar: 'from-sky-400 to-blue-600',
    emoji: '🥙',
    meal: 'Beef Kofta Rice Bowl',
    place: 'KALA Modern Greek',
    cal: 885,
    protein: 55,
    likes: 12,
    comments: 3,
  },
  {
    user: 'anthony',
    avatar: 'from-emerald-400 to-teal-600',
    emoji: '🥩',
    meal: 'Steak And Eggs With Avocado',
    place: 'Home Kitchen',
    cal: 980,
    protein: 72,
    likes: 24,
    comments: 5,
  },
  {
    user: 'josh',
    avatar: 'from-violet-400 to-purple-600',
    emoji: '🌮',
    meal: 'Birria Tacos With Consome',
    place: 'La Chaparrita',
    cal: 760,
    protein: 41,
    likes: 18,
    comments: 4,
  },
  {
    user: 'samantha',
    avatar: 'from-pink-400 to-rose-600',
    emoji: '🍣',
    meal: 'Shrimp Tempura Sushi Roll',
    place: 'Sushi San',
    cal: 540,
    protein: 28,
    likes: 31,
    comments: 7,
  },
  {
    user: 'dylan',
    avatar: 'from-sky-400 to-blue-600',
    emoji: '🍜',
    meal: 'Pork Belly Rice Bowl',
    place: 'Seoul Grill',
    cal: 760,
    protein: 25,
    likes: 9,
    comments: 2,
  },
  {
    user: 'marcus',
    avatar: 'from-amber-400 to-orange-600',
    emoji: '🍗',
    meal: 'Chicken Rice Bowl',
    place: 'Naf Naf Grill',
    cal: 690,
    protein: 48,
    likes: 14,
    comments: 1,
  },
]

const row2 = [
  {
    user: 'josh',
    avatar: 'from-violet-400 to-purple-600',
    emoji: '🫔',
    meal: 'Chicken Tikka Kathi Roll',
    place: 'Wow Bao',
    cal: 610,
    protein: 34,
    likes: 11,
    comments: 2,
  },
  {
    user: 'emily',
    avatar: 'from-cyan-400 to-sky-600',
    emoji: '🍝',
    meal: 'Rigatoni Bolognese',
    place: "Mama Luigi's",
    cal: 820,
    protein: 38,
    likes: 27,
    comments: 6,
  },
  {
    user: 'anthony',
    avatar: 'from-emerald-400 to-teal-600',
    emoji: '💪',
    meal: 'Afternoon Weight Training',
    place: 'workout · 45 min',
    cal: -280,
    protein: null,
    likes: 16,
    comments: 3,
  },
  {
    user: 'sarah',
    avatar: 'from-fuchsia-400 to-pink-600',
    emoji: '🥗',
    meal: 'Chicken Rice Bowl With Salad',
    place: 'Sweetgreen',
    cal: 520,
    protein: 42,
    likes: 22,
    comments: 4,
  },
  {
    user: 'marcus',
    avatar: 'from-amber-400 to-orange-600',
    emoji: '🥞',
    meal: 'Protein Pancakes With Berries',
    place: 'Home Kitchen',
    cal: 480,
    protein: 39,
    likes: 35,
    comments: 8,
  },
  {
    user: 'emily',
    avatar: 'from-cyan-400 to-sky-600',
    emoji: '🌯',
    meal: 'Steak Cilantro Lime Burrito',
    place: "Red's Fresh Kitchen",
    cal: 300,
    protein: 30,
    likes: 13,
    comments: 2,
  },
]

function HeartIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  )
}

function CommentIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
      />
    </svg>
  )
}

function PostCard({ post }) {
  return (
    <div className="flex w-[340px] shrink-0 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-sm">
      <div className="relative shrink-0">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 text-2xl ring-1 ring-white/10">
          {post.emoji}
        </div>
        <div
          className={`absolute -bottom-1.5 -right-1.5 h-6 w-6 rounded-full border-2 border-gray-950 bg-gradient-to-br ${post.avatar}`}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{post.meal}</p>
        <p className="truncate text-xs text-gray-400">
          @{post.user} · {post.place}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
              post.cal < 0
                ? 'bg-red-500/15 text-red-400'
                : 'bg-[#0077cc]/20 text-sky-300'
            }`}
          >
            {post.cal} cal
          </span>
          {post.protein !== null && (
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
              {post.protein}g protein
            </span>
          )}
          <span className="ml-auto flex items-center gap-1 text-[11px] text-gray-500">
            <HeartIcon className="h-3.5 w-3.5 text-pink-500" />
            {post.likes}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-gray-500">
            <CommentIcon className="h-3.5 w-3.5" />
            {post.comments}
          </span>
        </div>
      </div>
    </div>
  )
}

function TickerRow({ posts, reverse = false, duration = '55s' }) {
  const doubled = [...posts, ...posts]
  return (
    <div
      className="group flex overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className={`flex w-max gap-4 pr-4 ${
          reverse ? 'animate-marquee-x-reverse' : 'animate-marquee-x'
        } [animation-play-state:running] group-hover:[animation-play-state:paused]`}
        style={{ '--marquee-duration': duration }}
      >
        {doubled.map((post, i) => (
          <PostCard key={`${post.user}-${post.meal}-${i}`} post={post} />
        ))}
      </div>
    </div>
  )
}

export function FeedTicker() {
  return (
    <section
      className="relative overflow-hidden bg-gray-950 pb-20 pt-4 sm:pb-28"
      aria-label="Live feed of community meal posts"
    >
      <div className="relative mb-10 text-center">
        <div className="mx-auto flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-sm font-semibold text-gray-300">
            Live from the feed
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <TickerRow posts={row1} duration="55s" />
        <TickerRow posts={row2} reverse duration="70s" />
      </div>
    </section>
  )
}
