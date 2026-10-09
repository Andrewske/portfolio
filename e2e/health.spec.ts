import { expect, type Page, test } from '@playwright/test'
import { recordConsoleErrors } from './support/console-errors'
import { fetchProjectPaths } from './support/sitemap'

/** Loads the page, scrolls to the bottom so lazy islands mount, and waits for the network. */
const visitFully = async (page: Page, path: string): Promise<void> => {
  await page.goto(path)
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForLoadState('networkidle')
}

test.describe('console health', () => {
  test('homepage logs no console errors', async ({ page }) => {
    const errors = recordConsoleErrors(page)
    await visitFully(page, '/')
    expect(errors()).toEqual([])
  })

  test('a project page logs no console errors', async ({ page, request }) => {
    const [projectPath] = await fetchProjectPaths(request)
    const errors = recordConsoleErrors(page)
    await visitFully(page, String(projectPath))
    expect(errors()).toEqual([])
  })
})
