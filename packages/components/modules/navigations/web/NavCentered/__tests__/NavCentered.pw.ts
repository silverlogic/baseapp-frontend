import { type Locator, expect, test } from '@playwright/test'

/**
 * Playwright port of `NavCentered.cy.tsx` in this folder.
 *
 * When the drawer is open its content is portaled outside `#root`, so those
 * queries go through `page`; the closed/desktop case stays inside the `mount()`
 * locator. Role names use `{ exact: true }` because Playwright matches the
 * accessible name as a substring by default.
 */
const STORY = 'navigations/web/NavCentered/NavCentered'

const NAV_ITEMS = [
  { title: 'Dashboard', path: '/dashboard' },
  { title: 'Profile', path: '/profile' },
  { title: 'Settings', path: '/settings' },
  { title: 'Analytics', path: '/analytics' },
  { title: 'Reports', path: '/reports' },
]

/** Each item renders as a link wrapping a ListItemButton with role="button". */
const expectNavItems = async (scope: Locator) => {
  for (const item of NAV_ITEMS) {
    const link = scope.getByRole('link', { name: item.title, exact: true })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', item.path)
    await expect(link.locator('.MuiListItemButton-root')).toHaveAttribute('role', 'button')
  }
}

test.describe('NavCentered', () => {
  test('provides accessible navigation drawer on mobile screens', async ({ mount, page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const component = await mount(`${STORY}/Open`)
    const drawer = page.getByRole('presentation')

    await expect(drawer).toBeVisible()
    await expectNavItems(drawer)

    // The Cypress original asserted `should('have.been.called')`. That is
    // satisfied by VerticalDrawer's `useEffect(..., [pathname])`, which fires
    // once on mount while openNav is true — see VerticalDrawer.pw.ts.
    await expect(component.getByTestId('close-nav-count')).toHaveValue('1')
  })

  test('displays centered navigation bar with accessible links on desktop', async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 })

    const component = await mount(`${STORY}/Closed`)

    await expect(page.locator('[role="presentation"]')).not.toBeAttached()

    await expect(component.locator('[data-testid="nav-section-horizontal"]')).toBeAttached()
    await expect(component.locator('[data-testid="nav-section-horizontal-items"]')).toHaveCSS(
      'gap',
      '6px',
    )

    await expectNavItems(component)
  })

  test('provides accessible navigation with scroll functionality on tablet', async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 })

    const component = await mount(`${STORY}/Open`)
    const drawer = page.getByRole('presentation')

    await expectNavItems(drawer)
    await expect(component.getByTestId('close-nav-count')).toHaveValue('1')
  })
})
