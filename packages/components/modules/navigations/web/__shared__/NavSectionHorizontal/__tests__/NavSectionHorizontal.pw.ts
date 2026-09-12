import { expect, test } from '@playwright/test'

/**
 * `NavList` marks the matching item with `className="active"`, which is what the
 * active-item assertions look for: a bare `toHaveCSS('background-color')` with no
 * expected value passes for any element and proves nothing.
 */
const STORY = 'navigations/web/__shared__/NavSectionHorizontal/NavSectionHorizontal'

const NAV_ITEMS = [
  { title: 'Dashboard', path: '/dashboard' },
  { title: 'Profile', path: '/profile' },
  { title: 'Settings', path: '/settings' },
]

test.describe('Component: NavSectionHorizontal', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
  })

  test('GIVEN a horizontal section, THEN every navigation item is a spaced link carrying its href', async ({
    mount,
  }) => {
    const component = await mount(`${STORY}/Default`)

    await test.step('THEN each item is a visible link with its href', async () => {
      await expect(component.locator('[data-testid="nav-section-horizontal"]')).toBeAttached()

      for (const item of NAV_ITEMS) {
        const link = component.getByRole('link', { name: item.title, exact: true })
        await expect(link).toBeVisible()
        await expect(link).toHaveAttribute('href', item.path)
      }
    })

    await test.step('THEN the items are laid out with a gap and nothing else is a link', async () => {
      await expect(component.locator('[data-testid="nav-section-horizontal-items"]')).toHaveCSS(
        'gap',
        '6px',
      )
      await expect(component.getByRole('link')).toHaveCount(NAV_ITEMS.length)
    })
  })

  test('GIVEN the dashboard route, THEN only the dashboard item is marked active', async ({
    mount,
  }) => {
    const component = await mount(`${STORY}/ActiveDashboard`)

    await test.step('THEN the dashboard item is marked active', async () => {
      const dashboard = component.getByRole('link', { name: 'Dashboard', exact: true })

      await expect(dashboard).toHaveAttribute('href', '/dashboard')
      await expect(dashboard.locator('.active')).toBeAttached()
    })

    await test.step('THEN no other item is marked active', async () => {
      for (const title of ['Profile', 'Settings']) {
        await expect(
          component.getByRole('link', { name: title, exact: true }).locator('.active'),
        ).not.toBeAttached()
      }
    })
  })

  test('GIVEN a horizontal section, THEN every navigation item exposes an icon and a label', async ({
    mount,
  }) => {
    const component = await mount(`${STORY}/Default`)

    for (const item of NAV_ITEMS) {
      await test.step(`THEN ${item.title} exposes an icon and a label`, async () => {
        const link = component.getByRole('link', { name: item.title, exact: true })

        await expect(link.locator('span[aria-hidden="true"]')).toBeVisible()
        await expect(link.locator('.label')).toHaveText(item.title)
      })
    }
  })

  test('GIVEN a navigation item at rest, WHEN the pointer hovers it and leaves again, THEN its background changes and returns', async ({
    mount,
    page,
  }) => {
    const { button, resting } = await test.step('GIVEN a navigation item at rest', async () => {
      const component = await mount(`${STORY}/Default`)
      const hovered = component
        .getByRole('link', { name: 'Dashboard', exact: true })
        .locator('.MuiListItemButton-root')

      return {
        button: hovered,
        resting: await hovered.evaluate((element) => getComputedStyle(element).backgroundColor),
      }
    })

    await test.step('WHEN the pointer hovers it, THEN the background changes', async () => {
      await button.hover()
      await expect(button).not.toHaveCSS('background-color', resting)
    })

    await test.step('WHEN the pointer leaves, THEN the background returns', async () => {
      await page.mouse.move(0, 0)
      await expect(button).toHaveCSS('background-color', resting)
    })
  })
})
