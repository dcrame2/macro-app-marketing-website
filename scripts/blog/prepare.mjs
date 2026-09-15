import { readFileSync, writeFileSync } from 'node:fs'
import { preparePublication } from './publication.mjs'
const [input, output] = process.argv.slice(2)
if (!input || !output)
  throw new Error(
    'Usage: node scripts/blog/prepare.mjs article.json /tmp/article.sql',
  )
const post = JSON.parse(readFileSync(input, 'utf8'))
const { sql, report } = preparePublication(post)
writeFileSync(output, sql)
console.log(
  `Validated ${report.words} words and ${report.sources} sources. SQL written to ${output}. No database writes performed.`,
)
