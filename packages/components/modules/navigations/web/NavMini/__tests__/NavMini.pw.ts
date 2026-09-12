import { expect, test } from '@playwright/test'

/**
 * Layout-heavy by design: these are the assertions jsdom cannot make, and the
 * reason component tests here need a real browser at all.
 */
const STORY = 'navigations/web/NavMini/NavMini'

const NAV_ITEMS = [
  { title: 'Dashboard', path: '/dashboard' },
  { title: 'Profile', path: '/profile' },
  { title: 'Settings', path: '/settings' },
]

/** `NAV_WIDTH.MINI` — the rail must not exceed it. */
const MINI_RAIL_WIDTH = 88

/** `NavToggleButton` is pinned to `NAV_WIDTH.MINI - 12`. */
const TOGGLE_OFFSET = '76px'

/** Below the `lg` breakpoint `NavMini` renders `VerticalDrawer`, the only branch that wires `onCloseNav`. */
const DRAWER_VIEWPORT = { width: 600, height: 800 }

test.describe('Component: NavMini', () => {
  test('GIVEN the mini rail, THEN it renders compact with an accessible logo and labelled links', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN the mini rail', async () => {
      await page.setViewportSize({ width: 1280, height: 800 })
      return mount(`${STORY}/Default`)
    })

    const nav = component.getByRole('navigation')

    await test.step('THEN the rail renders compact with a divider', async () => {
      await expect(nav).toBeVisible()

      const width = await nav.evaluate((element) => parseInt(getComputedStyle(element).width, 10))
      expect(width).toBeLessThanOrEqual(MINI_RAIL_WIDTH)

      await expect(nav).toHaveCSS('border-right-style', 'solid')
    })

    await test.step('THEN the logo is visible', async () => {
      await expect(component.getByRole('img', { name: /logo/i })).toBeVisible()
    })

    for (const item of NAV_ITEMS) {
      await test.step(`THEN ${item.title} exposes its href, icon and label`, async () => {
        const link = nav.getByRole('link', { name: item.title, exact: true })

        await expect(link).toBeVisible()
        await expect(link).toHaveAttribute('href', item.path)
        await expect(link.locator('span[aria-hidden="true"]')).toBeVisible()
        await expect(link.getByText(item.title, { exact: true })).toBeVisible()
      })
    }
  })

  test('GIVEN the mini rail, THEN the logo sits inside it and the toggle is pinned to its edge', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN the mini rail', async () => {
      await page.setViewportSize({ width: 1280, height: 800 })
      return mount(`${STORY}/Default`)
    })

    await test.step('THEN the logo sits within the rail', async () => {
      const logoWrapper = component.getByRole('img', { name: /logo/i }).locator('..')
      const marginRight = await logoWrapper.evaluate((element) =>
        parseFloat(getComputedStyle(element).marginRight),
      )

      expect(marginRight).toBeLessThanOrEqual(23.6)
    })

    await test.step('THEN the toggle button is pinned to the rail edge', async () => {
      const toggle = component.locator('button.MuiIconButton-root')

      await expect(toggle).toBeVisible()
      await expect(toggle).toHaveCSS('position', 'fixed')
      await expect(toggle).toHaveCSS('left', TOGGLE_OFFSET)
    })
  })

  test('GIVEN a drawer already counting one close call from mount, WHEN Escape dismisses it, THEN the callback fires again', async ({
    mount,
    page,
  }) => {
    const recorded =
      await test.step('GIVEN a drawer already counting one close call from mount', async () => {
        await page.setViewportSize(DRAWER_VIEWPORT)
        const component = await mount(`${STORY}/RecordsCloseNav`)

        await expect(component.getByTestId('close-nav-count')).toHaveValue('1')
        await expect(page.getByRole('presentation').first()).toBeVisible()

        return component.getByTestId('close-nav-count')
      })

    await test.step('WHEN Escape dismisses it', () => page.keyboard.press('Escape'))

    await test.step('THEN the callback fires again', async () => {
      await expect(recorded).toHaveValue('2')
    })
  })
})
