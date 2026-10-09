import { expect, test } from '@playwright/test'
import { builtProjectPaths, fetchSitemapPaths } from './support/sitemap'

test.describe('sitemap and robots', () => {
  test('robots.txt is served and points at the sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt')
    expect(response.status()).toBe(200)
    expect(await response.text()).toMatch(/^Sitemap: \S+\/sitemap\.xml$/m)
  })

  test('sitemap lists the homepage and every built project page', async ({ request }) => {
    const sitemapPaths = await fetchSitemapPaths(request)
    const projectPaths = builtProjectPaths()

    expect(projectPaths.length, 'build should prerender project pages').toBeGreaterThan(0)
    expect(sitemapPaths).toContain('/')
    expect(sitemapPaths).toEqual(expect.arrayContaining(projectPaths))
  })
})
