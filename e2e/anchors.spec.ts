import { expect, type Locator, test } from '@playwright/test'
import { fetchProjectPaths } from './support/sitemap'

/** Distance from the element's top edge to the top of the viewport, in CSS px. */
const topOf = (locator: Locator): Promise<number> =>
  locator.evaluate(element => Math.abs(element.getBoundingClientRect().top))

test.describe('in-page anchors', () => {
  test('homepage has the #projects and #contact targets', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#projects')).toHaveCount(1)
    await expect(page.locator('#contact')).toHaveCount(1)
  })

  test('every href="#..." on the homepage points to an existing id', async ({ page }) => {
    await page.goto('/')
    const hrefs = await page
      .locator('a[href^="#"]')
      .evaluateAll(links => links.map(link => link.getAttribute('href') ?? ''))
    expect(hrefs.length, 'homepage should have in-page links').toBeGreaterThan(0)

    const missing = await page.evaluate(
      (targets: string[]): string[] =>
        targets.filter(href => href.length < 2 || !document.getElementById(href.slice(1))),
      hrefs,
    )
    expect(missing, 'in-page links with no matching id').toEqual([])
  })

  test('"view featured work" scrolls #projects into view', async ({ page }) => {
    await page.goto('/')
    const projects = page.locator('#projects')
    // At 1280x900 the section already peeks in, so assert it ends up at the top instead.
    expect(await topOf(projects)).toBeGreaterThan(100)

    await page.getByRole('link', { name: 'view featured work' }).click()

    await expect(page).toHaveURL(/#projects$/)
    await expect.poll(() => topOf(projects)).toBeLessThan(5)
    await expect(projects).toBeInViewport()
  })

  test('project page "back to projects" link points to /#projects', async ({ page, request }) => {
    const [projectPath] = await fetchProjectPaths(request)
    await page.goto(String(projectPath))
    await expect(page.getByRole('link', { name: /back to projects/i })).toHaveAttribute(
      'href',
      '/#projects',
    )
  })
})
