import { expect, type Locator, type Page, test } from '@playwright/test'

const DESKTOP = { width: 1280, height: 900 } as const
const MOBILE = { width: 390, height: 844 } as const

interface NodePosition {
  id: string
  cx: string
  cy: string
}

const graphOf = (page: Page): Locator =>
  page.getByRole('group', { name: /interactive tech stack graph/i })

/** Graph nodes are focusable circles with role="button" inside the labelled svg group. */
const nodesOf = (page: Page): Locator => graphOf(page).getByRole('button')

const skillListHeading = (page: Page): Locator =>
  page.getByRole('heading', { name: /skills and the projects that use them/i })

const readPositions = (nodes: Locator): Promise<NodePosition[]> =>
  nodes.evaluateAll(elements =>
    elements.map(element => ({
      id: element.getAttribute('data-node-id') ?? '',
      cx: element.getAttribute('cx') ?? '',
      cy: element.getAttribute('cy') ?? '',
    })),
  )

const TABBABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'

/** Focuses whatever tab stop comes right before `target` in document order. */
const focusTabStopBefore = (target: Locator): Promise<void> =>
  target.evaluate((element, selector) => {
    const stops = Array.from(document.querySelectorAll<HTMLElement | SVGElement>(selector))
    const previous = stops[stops.indexOf(element) - 1]
    if (!previous) throw new Error('focusTabStopBefore: no tab stop precedes the target')
    previous.focus()
  }, TABBABLE)

const expectDesktopGraph = async (page: Page): Promise<void> => {
  await expect(graphOf(page)).toBeVisible()
  await expect.poll(() => nodesOf(page).count()).toBeGreaterThan(1)
  await expect(skillListHeading(page)).toBeHidden()
}

const expectMobileList = async (page: Page): Promise<void> => {
  await expect(graphOf(page)).toHaveCount(0)
  await expect(skillListHeading(page)).toBeVisible()
}

test.describe('tech stack graph, desktop', () => {
  test.use({ viewport: DESKTOP })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await graphOf(page).scrollIntoViewIfNeeded()
    await expectDesktopGraph(page)
  })

  test('clicking a node leaves the other nodes where they were', async ({ page }) => {
    const nodes = nodesOf(page)
    const target = nodes.first()
    const targetId = await target.getAttribute('data-node-id')
    const before = await readPositions(nodes)

    await target.click()
    await expect(target).toHaveAttribute('aria-pressed', 'true')
    // Give any (unwanted) simulation restart time to move nodes.
    await page.waitForTimeout(800)

    const others = (positions: NodePosition[]): NodePosition[] =>
      positions.filter(position => position.id !== targetId)
    expect(others(await readPositions(nodes))).toEqual(others(before))
  })

  test('Tab moves focus onto a graph node', async ({ page }) => {
    await focusTabStopBefore(nodesOf(page).first())
    await page.keyboard.press('Tab')
    await expect(nodesOf(page).first()).toBeFocused()
  })
})

test.describe('tech stack graph, mobile', () => {
  test.use({ viewport: MOBILE })

  test('shows the skills-to-projects list and no graph svg', async ({ page }) => {
    await page.goto('/')
    await skillListHeading(page).scrollIntoViewIfNeeded()
    await expectMobileList(page)
  })
})

test('resizing 1280 -> 390 -> 1280 switches between graph and list', async ({ page }) => {
  await page.setViewportSize(DESKTOP)
  await page.goto('/')
  await graphOf(page).scrollIntoViewIfNeeded()
  await expectDesktopGraph(page)

  await page.setViewportSize(MOBILE)
  await expectMobileList(page)

  await page.setViewportSize(DESKTOP)
  await expectDesktopGraph(page)
})
