import assert from 'node:assert/strict'
const categories = [
  'Nutrition',
  'Weight loss',
  'Weight gain',
  'Muscle',
  'Workouts',
  'Recipes',
  'Community',
]
export function validatePost(post) {
  const text = (value, min, max, field) =>
    assert(
      typeof value === 'string' &&
        value.trim().length >= min &&
        value.length <= max,
      `${field} must be ${min}–${max} characters`,
    )
  assert(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(post.slug), 'Invalid slug')
  assert(
    !['editorial', 'feed', 'feed-xml'].includes(post.slug),
    'Reserved slug',
  )
  assert(
    /^\d{4}-\d{2}-\d{2}$/.test(post.week_start) &&
      new Date(`${post.week_start}T00:00:00Z`).getUTCDay() === 1,
    'week_start must be a Monday',
  )
  text(post.title, 10, 100, 'Title')
  text(post.description, 50, 180, 'Description')
  assert(categories.includes(post.category), 'Unknown category')
  text(post.primary_keyword, 3, 100, 'Primary keyword')
  assert(
    Array.isArray(post.secondary_keywords) &&
      post.secondary_keywords.length <= 8,
    'Provide at most eight secondary keywords',
  )
  post.secondary_keywords.forEach((value) =>
    text(value, 3, 100, 'Secondary keyword'),
  )
  assert(
    /^https:\/\/rrcwrqstlvauzdsjfriq\.supabase\.co\/storage\/v1\/object\/public\/images\/[a-zA-Z0-9/_.-]+$/.test(
      post.cover_image,
    ),
    'Use an eligible real community image',
  )
  assert(
    Number.isInteger(post.cover_meal_id) && post.cover_meal_id > 0,
    'Record the source meal ID privately',
  )
  text(post.cover_alt, 10, 240, 'Image alt')
  text(post.cover_caption, 10, 300, 'Image caption')
  const c = post.content
  assert(c && typeof c === 'object', 'Content required')
  if (c.data_snapshot) {
    const snapshot = c.data_snapshot
    const allowed = [
      'window_start',
      'window_end_exclusive',
      'previous_window_start',
      'minimum_contributors',
      'minimum_records',
      'periods',
      'methodology',
    ]
    assert(
      Object.keys(snapshot).every((key) => allowed.includes(key)),
      'Unexpected field in public data snapshot',
    )
    assert(
      snapshot.minimum_contributors >= 20 && snapshot.minimum_records >= 100,
      'Unsafe publication thresholds',
    )
    assert(
      Array.isArray(snapshot.periods) && snapshot.periods.length <= 2,
      'Invalid periods',
    )
    for (const period of snapshot.periods) {
      assert(
        Object.keys(period).every((key) =>
          [
            'period',
            'meals',
            'contributors',
            'valid_protein_meals',
            'mean_protein_g',
            'median_protein_g',
          ].includes(key),
        ),
        'Unexpected field in public cohort',
      )
      assert(
        ['current', 'previous'].includes(period.period) &&
          period.meals >= 100 &&
          period.contributors >= 20,
        'Community cohort is too small',
      )
    }
  }
  text(c.lead, 60, 1200, 'Lead')
  text(c.methodology, 100, 3500, 'Methodology')
  assert(
    Array.isArray(c.takeaways) &&
      c.takeaways.length >= 2 &&
      c.takeaways.length <= 5,
    'Provide 2–5 takeaways',
  )
  c.takeaways.forEach((value) => text(value, 15, 500, 'Takeaway'))
  assert(
    Array.isArray(c.sources) && c.sources.length >= 3,
    'Provide community evidence and at least two external sources',
  )
  const sourceIds = new Set()
  let external = 0
  for (const source of c.sources) {
    assert(
      /^[a-z0-9-]+$/.test(source.id) && !sourceIds.has(source.id),
      'Source IDs must be unique',
    )
    sourceIds.add(source.id)
    text(source.label, 5, 200, 'Source label')
    const url = new URL(source.url)
    assert(
      url.protocol === 'https:' && !url.username && !url.password,
      'Sources require HTTPS URLs',
    )
    if (url.hostname !== 'www.theinstacal.app') external++
    assert(
      /^\d{4}-\d{2}-\d{2}$/.test(source.accessed_at),
      'Source access date required',
    )
  }
  assert(external >= 2, 'At least two external sources required')
  const checkSources = (ids) =>
    assert(
      Array.isArray(ids) && ids.every((id) => sourceIds.has(id)),
      'Unresolved source reference',
    )
  assert(
    Array.isArray(c.sections) && c.sections.length >= 4,
    'At least four substantive sections required',
  )
  const ids = new Set(['sources', 'questions'])
  for (const section of c.sections) {
    assert(
      /^[a-z0-9-]+$/.test(section.id) && !ids.has(section.id),
      'Section IDs must be unique',
    )
    ids.add(section.id)
    text(section.heading, 5, 150, 'Heading')
    checkSources(section.source_ids)
    for (const field of ['paragraphs', 'bullets', 'steps'])
      if (section[field]) {
        assert(Array.isArray(section[field]), `${field} must be an array`)
        section[field].forEach((value) => text(value, 5, 3500, field))
      }
    if (section.table) {
      assert(
        section.table.headers.length >= 2 && section.table.rows.length >= 1,
        'Empty table',
      )
      section.table.headers.forEach((value) =>
        text(value, 1, 200, 'Table heading'),
      )
      section.table.rows.forEach((row) => {
        assert(row.length === section.table.headers.length, 'Uneven table')
        row.forEach((value) => text(value, 1, 600, 'Table cell'))
      })
    }
    if (section.chart) {
      const chart = section.chart
      text(chart.title, 5, 200, 'Chart title')
      text(chart.unit, 1, 60, 'Chart unit')
      text(chart.note, 30, 1000, 'Chart limitations')
      assert(
        chart.data.length >= 2 &&
          chart.data.length <= 10 &&
          section.source_ids.length > 0,
        'Chart requires data and a source',
      )
      for (const point of chart.data) {
        text(point.label, 2, 120, 'Chart label')
        assert(
          Number.isFinite(point.value) && point.value >= 0,
          'Chart values must be finite and non-negative',
        )
        // Community charts must reproduce the archived query exactly.
        assert(
          [
            'mean_protein_g',
            'median_protein_g',
            'meals',
            'contributors',
          ].includes(point.metric),
          'Use an audited community metric',
        )
        const period = c.data_snapshot?.periods?.find(
          (item) => item.period === point.period,
        )
        assert(
          period && period.meals >= 100 && period.contributors >= 20,
          'Community cohort is too small',
        )
        assert(
          period[point.metric] === point.value,
          'Chart disagrees with its data snapshot',
        )
      }
    }
  }
  assert(
    Array.isArray(c.faqs) && c.faqs.length >= 2,
    'At least two FAQs required',
  )
  c.faqs.forEach((faq) => {
    text(faq.question, 10, 200, 'FAQ question')
    text(faq.answer, 30, 1800, 'FAQ answer')
    checkSources(faq.source_ids)
  })
  const copy = [
    c.lead,
    ...c.sections.flatMap((s) => [
      s.heading,
      ...(s.paragraphs || []),
      ...(s.bullets || []),
      ...(s.steps || []),
    ]),
    ...c.faqs.flatMap((f) => [f.question, f.answer]),
  ].join(' ')
  const words = copy.split(/\s+/).length
  assert(
    words >= 650 && words <= 2500,
    `Article has ${words} words; expected 650–2500`,
  )
  assert(JSON.stringify(post).length < 75000, 'Article too large')
  return { words, sources: c.sources.length }
}
