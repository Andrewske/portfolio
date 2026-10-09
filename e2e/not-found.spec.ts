import { expect, test } from '@playwright/test'

test('unknown project returns 404 with a noindex robots meta', async ({ page }) => {
  const response = await page.goto('/project/does-not-exist')
  expect(response?.status()).toBe(404)
  await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached()
})
