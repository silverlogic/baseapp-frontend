import { type Locator, expect, test } from '@playwright/test'

/**
 * Playwright port of `NavHorizontal.cy.tsx` in this folder.
 *
 * Open-drawer content is portaled outside `#root`, so those queries go through
 * `page`; the closed/desktop cases stay inside the `mount()` locator. Role names
 * carry `{ exact: true }` because Playwright matches accessible names as
 * substrings by default.
 */
const STORY = 'navigations/web/NavHorizontal/NavHorizontal'

const NAV_ITEMS = [
  { title: 'Dashboard', path: '/dashboard' },
  { title: 'Profile', path: '/profile' },
  { title: 'Settings', path: '/settings' },
  { title: 'Analytics', path: '/analytics' },
  { title: 'Reports', path: '/reports' },
]

const expectNavLinks = async (scope: Locator, { withHref = true } = {}) => {
  for (const item of NAV_ITEMS) {
    const link = scope.getByRole('link', { name: item.title, exact: true })
    await expect(link).toBeVisible()
    if (withHref) await expect(link).toHaveAttribute('href', item.path)
  }
}

test.describe('NavHorizontal', () => {
  test('displays accessible drawer menu on mobile screens', async ({ mount, page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const component = await mount(`${STORY}/Open`)

    await expect(page.getByRole('presentation')).toBeVisible()
    await expectNavLinks(page.getByRole('navigation'), { withHref: false })

    // Satisfied by VerticalDrawer's mount-time `useEffect(..., [pathname])` —
    // the Cypress original's `should('have.been.called')` needed no interaction.
    await expect(component.getByTestId('close-nav-count')).toHaveValue('1')
  })

  test('displays horizontal navigation bar with accessible tabs on desktop', async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 })

    const component = await mount(`${STORY}/ClosedLight`)

    await expect(page.locator('[role="presentation"]')).not.toBeAttached()
    await expectNavLinks(component)
  })

  test('adapts styling based on theme mode while maintaining accessibility', async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 })

    const dashboardColour = async (scope: Locator) =>
      scope
        .getByRole('link', { name: 'Dashboard', exact: true })
        .evaluate((el) => getComputedStyle(el).color)

    const light = await mount(`${STORY}/ClosedLight`)
    const lightColour = await dashboardColour(light)

    const dark = await mount(`${STORY}/ClosedDark`)
    const darkColour = await dashboardColour(dark)

    // The Cypress original asserted `should('have.css', 'color')` with no
    // expected value, which passes for any element. Comparing the two modes
    // actually tests the adaptation the test is named for.
    expect(darkColour).not.toBe(lightColour)

    await test.step('Links stay accessible in dark mode', async () => {
      await expectNavLinks(dark)
    })
  })

  test('provides accessible navigation with scroll on tablet screens', async ({ mount, page }) => {
    await page.setViewportSize({ width: 800, height: 600 })

    const component = await mount(`${STORY}/Open`)

    await expectNavLinks(page.getByRole('presentation'))
    await expect(component.getByTestId('close-nav-count')).toHaveValue('1')
  })
})
