const fs = require('node:fs')
const path = require('node:path')
const assert = require('node:assert/strict')
const { chromium } = require(
  process.env.PLAYWRIGHT_PATH ||
    '/Users/dylancramer/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright',
)
const output = path.resolve('artifacts/site-refresh-2026-10-12/dark-direction')
fs.mkdirSync(output, { recursive: true })

async function loadImages(page) {
  await page.evaluate(async () => {
    const images = [...document.querySelectorAll('.ic-site img')]
    images.forEach((image) => {
      image.loading = 'eager'
    })
    await Promise.all(images.map((image) => image.decode()))
  })
}
async function selected(page, selector, attribute = 'aria-selected') {
  await page.waitForFunction(
    ({ selector, attribute }) =>
      document.querySelector(selector)?.getAttribute(attribute) === 'true',
    { selector, attribute },
  )
}
async function run() {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROMIUM_PATH ||
      '/Users/dylancramer/Library/Caches/ms-playwright/chromium_headless_shell-1208/chrome-headless-shell-mac-arm64/chrome-headless-shell',
  })
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: 'reduce',
    })
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('http://127.0.0.1:4174', { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await loadImages(page)
    assert.equal(await page.locator('h1').count(), 1)
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: width > 699 ? 1000 : 844 })
      await page.evaluate(() => window.scrollTo(0, 0))
      await loadImages(page)
      await page.screenshot({
        path: path.join(output, `viewport-${width}.png`),
        fullPage: true,
      })
      await page.screenshot({ path: path.join(output, `hero-${width}.png`) })
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `Horizontal overflow at ${width}px`,
      )
    }
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.getByRole('tab', { name: 'The map', exact: true }).click()
    await selected(page, '#social-tab-places')
    await page.getByRole('button', { name: 'Show light mode' }).click()
    await selected(page, '[aria-label="Show light mode"]', 'aria-pressed')
    await page.getByRole('button', { name: 'Show dark mode' }).click()
    await selected(page, '[aria-label="Show dark mode"]', 'aria-pressed')
    await page.locator('.ic-explorer-phone').click()
    await page.getByRole('dialog').waitFor()
    assert(
      await page
        .getByRole('img', { name: /map with meal locations/ })
        .last()
        .isVisible(),
    )
    await page.screenshot({ path: path.join(output, 'screenshot-dialog.png') })
    await page.keyboard.press('Escape')
    assert.equal(await page.getByRole('dialog').count(), 0)
    await page.getByRole('tab', { name: 'Profiles', exact: true }).focus()
    await page.keyboard.press('ArrowRight')
    await selected(page, '#social-tab-discover')
    await page.keyboard.press('End')
    await selected(page, '#social-tab-places')
    await page.keyboard.press('Home')
    await selected(page, '#social-tab-feed')
    for (const label of ['Fitness', 'Progress', 'Food']) {
      await page.getByRole('tab', { name: label, exact: true }).click()
      await loadImages(page)
      await page
        .locator('#features')
        .screenshot({
          path: path.join(output, `activity-${label.toLowerCase()}.png`),
        })
    }
    await page.getByRole('tab', { name: 'Food', exact: true }).focus()
    await page.keyboard.press('ArrowRight')
    await selected(page, '#activity-tab-fitness')
    await page.getByText('What can I use for free?', { exact: true }).click()
    assert(await page.locator('details[open]').count())
    await page.setViewportSize({ width: 390, height: 844 })
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await page.screenshot({ path: path.join(output, 'mobile-menu.png') })
    await page
      .locator('.ic-mobile-nav')
      .getByRole('link', { name: 'Pricing', exact: true })
      .click()
    assert.equal(await page.locator('.ic-mobile-nav').count(), 0)
    assert(page.url().endsWith('#pricing'))
    for (const anchor of [
      'social',
      'features',
      'food',
      'fitness',
      'tracking',
      'ai',
      'pricing',
      'faqs',
      'download',
      'main-content',
    ])
      assert.equal(await page.locator(`#${anchor}`).count(), 1)
    const missingImages = await page
      .locator('.ic-site img')
      .evaluateAll((images) =>
        images
          .filter((img) => img.complete && !img.naturalWidth)
          .map((img) => img.src),
      )
    assert.deepEqual(missingImages, [])
    assert.deepEqual(errors, [])
    const stores = await page
      .locator('.ic-store-links a')
      .evaluateAll((links) => links.map((link) => link.href))
    assert(
      stores.every(
        (url) =>
          url.includes('apps.apple.com/us/app/instacal/id6743951306') ||
          url.includes(
            'play.google.com/store/apps/details?id=com.digitaldelight.InstaCal',
          ),
      ),
    )
    fs.writeFileSync(
      path.join(output, 'verification.json'),
      JSON.stringify(
        {
          passed: true,
          viewports: [1440, 1024, 768, 390, 320],
          checks: [
            'social tabs and keyboard navigation',
            'light/dark screenshots',
            'screenshot dialog and Escape',
            'food/fitness/progress tabs and keyboard navigation',
            'FAQ disclosure',
            'mobile navigation',
            'download destinations and anchors',
            'no horizontal overflow',
            'all images loaded',
            'no client errors',
          ],
          errors,
        },
        null,
        2,
      ),
    )
    console.log('All landing-page interaction checks passed.')
  } finally {
    await browser.close()
  }
}
run().catch((error) => {
  console.error(error)
  process.exit(1)
})
