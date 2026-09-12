import { type Locator, expect, test } from '@playwright/test'

/**
 * Open-drawer content is portaled outside `#root`, so those queries go through
 * `page`; the closed/desktop cases stay inside the `mount()` locator.
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

const dashboardColour = (scope: Locator) =>
  scope
    .getByRole('link', { name: 'Dashboard', exact: true })
    .evaluate((element) => getComputedStyle(element).color)

test.describe('Component: NavHorizontal', () => {
  test('GIVEN a mobile viewport and an open drawer, THEN the drawer lists every navigation item and the close callback has already fired at mount', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a mobile viewport and an open drawer', async () => {
      await page.setViewportSize({ width: 375, height: 667 })
      return mount(`${STORY}/Open`)
    })

    await test.step('THEN the drawer lists every navigation item', async () => {
      await expect(page.getByRole('presentation')).toBeVisible()
      await expectNavLinks(page.getByRole('navigation'), { withHref: false })
    })

    await test.step('THEN the close callback has already fired at mount', async () => {
      await expect(component.getByTestId('close-nav-count')).toHaveValue('1')
    })
  })

  test('GIVEN a desktop viewport and a closed drawer, THEN the navigation renders inline with every href', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a desktop viewport and a closed drawer', async () => {
      await page.setViewportSize({ width: 1280, height: 800 })
      return mount(`${STORY}/ClosedLight`)
    })

    await test.step('THEN the navigation renders inline with every href', async () => {
      await expect(page.locator('[role="presentation"]')).not.toBeAttached()
      await expectNavLinks(component)
    })
  })

  test('GIVEN the navigation in the light theme, WHEN it is rendered in the dark theme, THEN the link colour changes and the links stay accessible', async ({
    mount,
    page,
  }) => {
    const lightColour = await test.step('GIVEN the navigation in the light theme', async () => {
      await page.setViewportSize({ width: 1280, height: 800 })
      return dashboardColour(await mount(`${STORY}/ClosedLight`))
    })

    const dark = await test.step('WHEN it is rendered in the dark theme', () =>
      mount(`${STORY}/ClosedDark`))

    await test.step('THEN the link colour changes and the links stay accessible', async () => {
      expect(await dashboardColour(dark)).not.toBe(lightColour)
      await expectNavLinks(dark)
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
      await expectNavLinks(page.getByRole('presentation'))
      await expect(component.getByTestId('close-nav-count')).toHaveValue('1')
    })
  })
})
