import { expect, type Locator, test } from '@playwright/test'

const widthOf = async (locator: Locator): Promise<number> =>
  (await locator.boundingBox())?.width ?? 0

test.describe('homepage semantics', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has exactly one h1 and one main landmark', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.getByRole('main')).toHaveCount(1)
  })

  test('skip link is the first Tab stop and becomes visible on focus', async ({ page }) => {
    const skipLink = page.getByRole('link', { name: 'Skip to main content' })
    // sr-only: clipped to a 1px box until focused.
    expect(await widthOf(skipLink)).toBeLessThanOrEqual(1)

    await page.keyboard.press('Tab')

    await expect(skipLink).toBeFocused()
    await expect.poll(() => widthOf(skipLink)).toBeGreaterThan(10)
    await expect(skipLink).toHaveAttribute('href', '#main-content')
  })
})
