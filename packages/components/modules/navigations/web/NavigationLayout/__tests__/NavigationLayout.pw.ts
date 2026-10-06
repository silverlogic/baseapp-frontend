import { type Locator, expect, test } from '@playwright/test'

/**
 * MUI's Drawer renders through a Portal, so its content sits outside `#root` and
 * is queried from `page`. A role query there also excludes the `aria-hidden`
 * layout behind the open drawer, which keeps the match unique.
 */
const STORY = 'navigations/web/NavigationLayout/NavigationLayout'

const NAV_ITEMS = [
  { title: 'Dashboard', path: '/dashboard' },
  { title: 'Profile', path: '/profile' },
]

const expectNavRendered = async (component: Locator) => {
  await expect(component.getByRole('banner')).toBeVisible()

  for (const item of NAV_ITEMS) {
    const link = component.getByRole('link', { name: item.title, exact: true })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', item.path)
  }
}

test.describe('Component: NavigationLayout', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
  })

  test('GIVEN either theme, THEN the navigation items render', async ({ mount }) => {
    await test.step('THEN they render with the explicit test theme', async () => {
      await expectNavRendered(await mount(`${STORY}/Default`))
    })

    await test.step('THEN they render with the default theme of the harness', async () => {
      await expectNavRendered(await mount(`${STORY}/DefaultTheme`))
    })
  })

  test('GIVEN a mobile viewport, WHEN the toggle is used, THEN the drawer opens, and back on desktop the layout becomes the mini rail', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a rendered layout', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await expect(mounted.getByRole('link', { name: 'Dashboard', exact: true })).toBeAttached()
      return mounted
    })

    await test.step('WHEN the toggle is used on a mobile viewport, THEN the drawer opens', async () => {
      await page.setViewportSize({ width: 375, height: 667 })

      const toggle = component.locator('button').first()
      await expect(toggle).toBeVisible()
      await toggle.click()

      await expect(page.getByRole('link', { name: 'Dashboard', exact: true })).toBeVisible()

      await page.mouse.click(0, 0)
    })

    await test.step('WHEN the toggle is used back on desktop, THEN the layout becomes the mini rail', async () => {
      await page.setViewportSize({ width: 1280, height: 800 })

      await component.locator('button:visible').last().click()
      await expect(component.locator('[data-testid="nav-mini"]')).toBeAttached()
    })
  })

  test('GIVEN an account menu, THEN the logo and the menu are rendered', async ({ mount }) => {
    const component = await mount(`${STORY}/WithAccountMenu`)

    await expect(component.locator('[data-testid="logo-icon"]')).toBeAttached()
    await expect(component.locator('[data-testid="account-menu"]')).toBeVisible()
  })

  test('GIVEN a custom account menu, THEN it replaces the default one', async ({ mount }) => {
    const component = await mount(`${STORY}/WithCustomAccountMenu`)

    const menu = component.locator('[data-testid="custom-account-menu"]')

    await expect(menu).toBeAttached()
    await expect(menu).toContainText('Custom Account Menu')
  })

  test('GIVEN an additional component passed through AccountMenuProps, THEN it is rendered', async ({
    mount,
  }) => {
    const component = await mount(`${STORY}/WithAdditionalComponent`)

    const additional = component.locator('[data-testid="additional-component"]')

    await expect(additional).toBeAttached()
    await expect(additional).toContainText('Additional Component')
  })
})
