import { expect, test } from '@playwright/test'

/**
 * Playwright port of `VerticalDrawer.cy.tsx` in this folder.
 *
 * The drawer renders through a MUI Portal, so every query for its content goes
 * through `page` rather than the `mount()` locator, which is scoped to `#root`.
 * Only the recorder input lives inside `#root`.
 *
 * Note `{ exact: true }` on the role names below: Playwright matches the
 * accessible name as a case-insensitive *substring* by default, whereas Testing
 * Library's `findByRole` matches the full string. Without it, 'Menu Item 1' also
 * matches 'Menu Item 10' and trips strict mode.
 */
const STORY = 'navigations/web/__shared__/VerticalDrawer/VerticalDrawer'

const NAV_ITEMS = [
  'Dashboard',
  'Profile',
  'Settings',
  ...Array.from({ length: 10 }, (_, index) => `Menu Item ${index + 1}`),
]

test.describe('VerticalDrawer Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
  })

  test('displays accessible navigation with scrollable content', async ({ mount, page }) => {
    await mount(`${STORY}/Default`)

    await expect(page.getByRole('presentation')).toBeVisible()
    await expect(page.getByRole('img', { name: /logo/i })).toBeVisible()

    await test.step('Every nav item renders with its icon and label', async () => {
      const nav = page.getByRole('navigation')

      for (const title of NAV_ITEMS) {
        const item = nav.getByRole('button', { name: title, exact: true })
        await expect(item).toBeVisible()
        await expect(item.locator('span[aria-hidden="true"]')).toBeVisible()
        await expect(item.getByText(title, { exact: true })).toBeVisible()
      }
    })

    await test.step('Content region clips and overflows its box', async () => {
      const region = page.getByRole('region', { name: 'scrollable content' })
      await expect(region).toHaveCSS('overflow', 'hidden')

      const { scrollHeight, clientHeight } = await region.evaluate((el) => ({
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
      }))
      expect(scrollHeight).toBeGreaterThanOrEqual(clientHeight)
    })
  })

  test('closes navigation when route changes', async ({ mount, page }) => {
    const component = await mount(`${STORY}/RecordsCloseNav`)
    const recorded = component.getByTestId('close-nav-count')

    // VerticalDrawer's `useEffect(..., [pathname])` fires once on mount while
    // openNav is true, so onCloseNav has already been called before any
    // navigation happens. The Cypress original asserted only
    // `should('have.been.called')`, which this mount-time call satisfies on its
    // own — the popstate dispatch below never affected the result.
    await expect(recorded).toHaveValue('1')

    await test.step('A popstate event does not re-trigger it', async () => {
      await page.evaluate(() => window.dispatchEvent(new Event('popstate')))

      // `usePathname()` has no router context here, so it does not change and
      // the effect does not re-run. Asserting the count is unchanged documents
      // that this test never exercised the route-change path it is named for.
      await expect(recorded).toHaveValue('1')
    })
  })
})
