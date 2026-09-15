import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { validatePost } from './validate.mjs'
import { preparePublication } from './publication.mjs'
const fixture = JSON.parse(
  readFileSync(
    new URL('../../content/blog/high-protein-meal-prep.json', import.meta.url),
    'utf8',
  ),
)
const copy = () => structuredClone(fixture)
test('sourced article passes with real snapshot and real photo', () =>
  assert(validatePost(copy()).words >= 650))
test('chart cannot silently invent numbers', () => {
  const p = copy()
  p.content.sections[0].chart.data[0].value = 99
  assert.throws(() => validatePost(p), /disagrees/)
})
test('small cohorts cannot be charted', () => {
  const p = copy()
  p.content.data_snapshot.periods[1].contributors = 3
  assert.throws(() => validatePost(p), /too small/)
})
test('source URLs cannot contain active script schemes', () => {
  const p = copy()
  p.content.sources[0].url = 'javascript:alert(1)'
  assert.throws(() => validatePost(p), /HTTPS/)
})
test('unresolved citations are rejected', () => {
  const p = copy()
  p.content.sections[0].source_ids = ['missing']
  assert.throws(() => validatePost(p), /Unresolved/)
})
test('AI or arbitrary external cover image is rejected', () => {
  const p = copy()
  p.cover_image = '/images/blog/ai.webp'
  assert.throws(() => validatePost(p), /real community/)
})
test('untracked photos cannot be published', () => {
  const p = copy()
  delete p.cover_meal_id
  assert.throws(() => validatePost(p), /source meal/)
})
test('the publication slot must be a Monday', () => {
  const p = copy()
  p.week_start = '2026-09-15'
  assert.throws(() => validatePost(p), /Monday/)
})

test('unexpected data fields cannot leak into the public dataset', () => {
  const p = copy()
  p.content.data_snapshot.periods[0].profile_ids = ['secret']
  assert.throws(() => validatePost(p), /Unexpected field/)
})

test('existing articles keep weekly publication semantics by default', () => {
  const { sql } = preparePublication(copy())
  assert.match(sql, /'weekly:2026-09-14'/)
  assert.match(sql, /'2026-09-14'::date,'weekly'/)
})

test('launch articles use their own retry key and real publication week', () => {
  const p = copy()
  p.publication_kind = 'launch'
  const { sql } = preparePublication(p)
  assert.match(sql, /'launch:high-protein-meal-prep'/)
  assert.match(sql, /'2026-09-14'::date,'launch'/)
  assert.match(sql, /on conflict do nothing returning slug,week_start/)
})

test('publication kinds cannot bypass the weekly or launch constraints', () => {
  const p = copy()
  p.publication_kind = 'daily'
  assert.throws(() => preparePublication(p), /publication kind/)
})

test('apostrophes in article copy remain inside SQL string literals', () => {
  const p = copy()
  p.title = "A cook's guide to a satisfying lunch"
  assert.match(
    preparePublication(p).sql,
    /'A cook''s guide to a satisfying lunch'/,
  )
})
