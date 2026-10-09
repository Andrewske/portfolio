import { expect, test } from '@playwright/test'

const MISSION_START = 'Shipping fast'

// `reducedMotion` is a browser-context option, not a top-level fixture.
test.use({ contextOptions: { reducedMotion: 'reduce' } })

test('hero mission text is fully shown at once under reduced motion', async ({ page }) => {
  await page.goto('/')
  // Screen-reader copy always holds the full text; use it as the expected value.
  const fullText = await page
    .locator('span.sr-only')
    .filter({ hasText: MISSION_START })
    .textContent()
  expect(fullText ?? '').toContain(MISSION_START)

  // The visual copy hides untyped text with visibility:hidden, which innerText skips.
  // Typing takes ~5s, so a short timeout only passes when nothing is animated.
  const visualCopy = page.locator('span[aria-hidden="true"]').filter({ hasText: MISSION_START })
  await expect(visualCopy).toHaveText(`${fullText}"`, { useInnerText: true, timeout: 2_500 })
})
