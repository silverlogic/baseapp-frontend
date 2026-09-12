import { type Locator, expect, test } from '@playwright/test'

/**
 * When the drawer is open its content is portaled outside `#root`, so those
 * queries go through `page`; the closed/desktop case stays inside the `mount()`
 * locator.
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

test.describe('Component: NavCentered', () => {
  test('GIVEN a mobile viewport and an open drawer, THEN the drawer lists every navigation item and the close callback has already fired at mount', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a mobile viewport and an open drawer', async () => {
      await page.setViewportSize({ width: 375, height: 667 })
      return mount(`${STORY}/Open`)
    })

    await test.step('THEN the drawer lists every navigation item', async () => {
      const drawer = page.getByRole('presentation')

      await expect(drawer).toBeVisible()
      await expectNavItems(drawer)
    })

    await test.step('THEN the close callback has already fired at mount', async () => {
      await expect(component.getByTestId('close-nav-count')).toHaveValue('1')
    })
  })

  test('GIVEN a desktop viewport and a closed drawer, THEN the navigation renders inline with spaced items', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a desktop viewport and a closed drawer', async () => {
      await page.setViewportSize({ width: 1280, height: 800 })
      return mount(`${STORY}/Closed`)
    })

    await test.step('THEN no drawer is rendered', async () => {
      await expect(page.locator('[role="presentation"]')).not.toBeAttached()
    })

    await test.step('THEN the navigation renders inline with spaced items', async () => {
      await expect(component.locator('[data-testid="nav-section-horizontal"]')).toBeAttached()
      await expect(component.locator('[data-testid="nav-section-horizontal-items"]')).toHaveCSS(
        'gap',
        '6px',
      )

      await expectNavItems(component)
    })
  })

  test('GIVEN a tablet viewport and an open drawer, THEN the drawer lists every navigation item', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a tablet viewport and an open drawer', async () => {
      await page.setViewportSize({ width: 800, height: 600 })
      return mount(`${STORY}/Open`)
    })

    await test.step('THEN the drawer lists every navigation item', async () => {
      await expectNavItems(page.getByRole('presentation'))
      await expect(component.getByTestId('close-nav-count')).toHaveValue('1')
    })
  })
})
