import { expect, test } from '@playwright/test'

/**
 * Playwright port of `NavSectionHorizontal.cy.tsx` in this folder.
 *
 * Two divergences, both noted at the assertion:
 *  - the active-item test asserts the `active` class rather than the Cypress
 *    original's `should('have.css', 'background-color')`, which passes for any
 *    element because it supplies no expected value;
 *  - the hover test compares hovered against unhovered background, which Cypress
 *    could not do — `.trigger('mouseover')` fires a synthetic event and never
 *    activates CSS `:hover`, whereas Playwright's `hover()` moves the real mouse.
 */
const STORY = 'navigations/web/__shared__/NavSectionHorizontal/NavSectionHorizontal'

const NAV_ITEMS = [
  { title: 'Dashboard', path: '/dashboard' },
  { title: 'Profile', path: '/profile' },
  { title: 'Settings', path: '/settings' },
]

test.describe('NavSectionHorizontal', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
  })

  test('renders all navigation items in a horizontal layout', async ({ mount }) => {
    const component = await mount(`${STORY}/Default`)

    await expect(component.locator('[data-testid="nav-section-horizontal"]')).toBeAttached()

    await test.step('Each item is a visible link with its href', async () => {
      for (const item of NAV_ITEMS) {
        const link = component.getByRole('link', { name: item.title })
        await expect(link).toBeVisible()
        await expect(link).toHaveAttribute('href', item.path)
      }
    })

    await expect(component.locator('[data-testid="nav-section-horizontal-items"]')).toHaveCSS(
      'gap',
      '6px',
    )
    await expect(component.getByRole('link')).toHaveCount(NAV_ITEMS.length)
  })

  test('highlights the active navigation item', async ({ mount }) => {
    const component = await mount(`${STORY}/ActiveDashboard`)

    const dashboard = component.getByRole('link', { name: 'Dashboard' })
    await expect(dashboard).toHaveAttribute('href', '/dashboard')

    // NavList sets className="active" on the matching item. The Cypress original
    // asserted `have.css('background-color')` with no value, which is vacuous.
    await expect(dashboard.locator('.active')).toBeAttached()

    await test.step('Non-matching items are not active', async () => {
      for (const item of ['Profile', 'Settings']) {
        await expect(
          component.getByRole('link', { name: item }).locator('.active'),
        ).not.toBeAttached()
      }
    })
  })

  test('displays navigation items with accessible icons and labels', async ({ mount }) => {
    const component = await mount(`${STORY}/Default`)

    for (const item of NAV_ITEMS) {
      await test.step(item.title, async () => {
        const link = component.getByRole('link', { name: item.title })
        await expect(link.locator('span[aria-hidden="true"]')).toBeVisible()
        await expect(link.locator('.label')).toHaveText(item.title)
      })
    }
  })

  test('provides visual feedback on hover', async ({ mount, page }) => {
    const component = await mount(`${STORY}/Default`)

    const button = component
      .getByRole('link', { name: 'Dashboard' })
      .locator('.MuiListItemButton-root')

    const resting = await button.evaluate((el) => getComputedStyle(el).backgroundColor)

    await button.hover()
    await expect(button).not.toHaveCSS('background-color', resting)

    await test.step('Background returns to resting once the pointer leaves', async () => {
      await page.mouse.move(0, 0)
      await expect(button).toHaveCSS('background-color', resting)
    })
  })
})
