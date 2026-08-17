import { type Locator, expect, test } from '@playwright/test'

/**
 * Playwright port of `NavigationLayout.cy.tsx` in this folder.
 *
 * The Cypress spec's first test mounted three times: with an explicit theme,
 * without one, then with the explicit theme again — the third mount was
 * identical to the first, so it is not reproduced here. Each `mount()`
 * navigates fresh, so mounting several stories in one test stays cheap.
 */
const STORY = 'navigations/web/NavigationLayout/NavigationLayout'

const NAV_ITEMS = [
  { title: 'Dashboard', path: '/dashboard' },
  { title: 'Profile', path: '/profile' },
]

const expectNavRendered = async (component: Locator) => {
  await expect(component.getByRole('banner')).toBeVisible()

  for (const item of NAV_ITEMS) {
    const link = component.getByRole('link', { name: item.title })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', item.path)
  }
}

test.describe('NavigationLayout', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
  })

  test('renders navigation items in different layout modes', async ({ mount }) => {
    await test.step('With the explicit test theme', async () => {
      await expectNavRendered(await mount(`${STORY}/Default`))
    })

    await test.step("With the harness's default theme", async () => {
      await expectNavRendered(await mount(`${STORY}/DefaultTheme`))
    })
  })

  test('interacts with navigation toggle button and sees navigation open/close', async ({
    mount,
    page,
  }) => {
    const component = await mount(`${STORY}/Default`)

    await expect(component.getByRole('link', { name: 'Dashboard' })).toBeAttached()

    await test.step('On a mobile viewport the toggle opens the drawer', async () => {
      await page.setViewportSize({ width: 375, height: 667 })

      const toggle = component.locator('button').first()
      await expect(toggle).toBeVisible()
      await toggle.click()

      // DOCS: query from `page`, not `component`. MUI's Drawer renders through a
      // Portal, so its content sits outside `#root` — which is what the mount
      // fixture's locator is scoped to. Cypress's `cy.contains()` searched the
      // whole document and so never hit this. The role query also excludes the
      // aria-hidden layout behind the drawer, keeping the match unique.
      await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible()

      // Cypress used `cy.get('body').click(0, 0)` to dismiss via the backdrop.
      await page.mouse.click(0, 0)
    })

    await test.step('Back on desktop the layout toggles to the mini rail', async () => {
      await page.setViewportSize({ width: 1280, height: 800 })

      await component.locator('button:visible').last().click()
      await expect(component.locator('[data-testid="nav-mini"]')).toBeAttached()
    })
  })

  test('displays logo and account menu correctly', async ({ mount }) => {
    const component = await mount(`${STORY}/WithAccountMenu`)

    await expect(component.locator('[data-testid="logo-icon"]')).toBeAttached()
    await expect(component.locator('[data-testid="account-menu"]')).toBeVisible()
  })

  test('uses custom AccountMenu component', async ({ mount }) => {
    const component = await mount(`${STORY}/WithCustomAccountMenu`)

    const menu = component.locator('[data-testid="custom-account-menu"]')
    await expect(menu).toBeAttached()
    await expect(menu).toContainText('Custom Account Menu')
  })

  test('displays additional component in AccountMenuProps', async ({ mount }) => {
    const component = await mount(`${STORY}/WithAdditionalComponent`)

    const additional = component.locator('[data-testid="additional-component"]')
    await expect(additional).toBeAttached()
    await expect(additional).toContainText('Additional Component')
  })
})
