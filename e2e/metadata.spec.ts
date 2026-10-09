import { expect, type Page, test } from '@playwright/test'
import { siteConfig } from '../src/lib/site-config'
import { fetchProjectPaths } from './support/sitemap'

const STATIC_PATHS: readonly string[] = ['/', '/my-claude-code-workflow']

/** The homepage canonical is the bare origin, with no trailing slash. */
const expectedCanonical = (path: string): string =>
  path === '/' ? siteConfig.url : `${siteConfig.url}${path}`

const countOccurrences = (haystack: string, needle: string): number =>
  haystack.split(needle).length - 1

const checkRouteMetadata = async (page: Page, path: string): Promise<void> => {
  const response = await page.goto(path)
  expect.soft(response?.status(), `${path} status`).toBe(200)

  await expect
    .soft(page.locator('link[rel="canonical"]'), `${path} canonical`)
    .toHaveAttribute('href', expectedCanonical(path))

  const title = await page.title()
  expect
    .soft(countOccurrences(title, siteConfig.name), `${path} title "${title}" repeats the name`)
    .toBeLessThanOrEqual(1)

  await expect
    .soft(page.locator('meta[property="og:image"]').first(), `${path} og:image`)
    .toHaveAttribute('content', /^https?:\/\/\S+/)
}

test.describe('per-route metadata', () => {
  for (const path of STATIC_PATHS) {
    test(`${path} has canonical, single-name title and og:image`, async ({ page }) => {
      await checkRouteMetadata(page, path)
    })
  }

  test('every project page in the sitemap has canonical, title and og:image', async ({
    page,
    request,
  }) => {
    for (const path of await fetchProjectPaths(request)) {
      await test.step(path, () => checkRouteMetadata(page, path))
    }
  })
})
