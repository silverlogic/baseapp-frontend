import { expect, test } from '@playwright/test'

/**
 * Playwright port of `modules/navigations/web/NavMini/__tests__/NavMini.cy.tsx`.
 *
 * Layout-heavy by design: these are the assertions jsdom cannot make, and the
 * reason component tests here need a real browser at all.
 *
 * `test.step` is the built-in equivalent of this repo's `cy.step` (from
 * cypress-plugin-steps). Unlike `cy.step` it wraps the work rather than marking
 * it, so steps nest and show up as a tree in the HTML report and trace viewer.
 */
const STORY = 'navigations/web/NavMini/NavMini'

const NAV_ITEMS = [
  { title: 'Dashboard', path: '/dashboard' },
  { title: 'Profile', path: '/profile' },
  { title: 'Settings', path: '/settings' },
]

test.describe('NavMini', () => {
  test('displays a compact navigation with accessible icons and labels', async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 })

    const component = await mount(`${STORY}/Default`)
    const nav = component.getByRole('navigation')

    await test.step('Nav rail renders compact with a divider', async () => {
      await expect(nav).toBeVisible()

      // NAV_WIDTH.MINI is 88 — the mini rail must not exceed it.
      const width = await nav.evaluate((el) => parseInt(getComputedStyle(el).width, 10))
      expect(width).toBeLessThanOrEqual(88)

      await expect(nav).toHaveCSS('border-right-style', 'solid')
    })

    await test.step('Logo is visible', async () => {
      await expect(component.getByRole('img', { name: /logo/i })).toBeVisible()
    })

    await test.step('Nav links expose href, icon and label', async () => {
      for (const item of NAV_ITEMS) {
        await test.step(item.title, async () => {
          const link = nav.getByRole('link', { name: item.title })
          await expect(link).toBeVisible()
          await expect(link).toHaveAttribute('href', item.path)
          await expect(link.locator('span[aria-hidden="true"]')).toBeVisible()
          await expect(link.getByText(item.title)).toBeVisible()
        })
      }
    })
  })

  test('positions the logo and toggle button accessibly', async ({ mount, page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })

    const component = await mount(`${STORY}/Default`)

    await test.step('Logo sits within the mini rail', async () => {
      const logoWrapper = component.getByRole('img', { name: /logo/i }).locator('..')
      const marginRight = await logoWrapper.evaluate((el) =>
        parseFloat(getComputedStyle(el).marginRight),
      )
      expect(marginRight).toBeLessThanOrEqual(23.6)
    })

    await test.step('Toggle button is pinned to the rail edge', async () => {
      // NavToggleButton is offset to NAV_WIDTH.MINI - 12 = 76px.
      const toggle = component.locator('button.MuiIconButton-root')
      await expect(toggle).toBeVisible()
      await expect(toggle).toHaveCSS('position', 'fixed')
      await expect(toggle).toHaveCSS('left', '76px')
    })
  })

  test('records onCloseNav when the drawer is dismissed', async ({ mount, page }) => {
    // Below the lg breakpoint NavMini renders VerticalDrawer, which is the only
    // branch that wires onCloseNav (via MUI Drawer's onClose).
    await page.setViewportSize({ width: 600, height: 800 })

    const component = await mount(`${STORY}/RecordsCloseNav`)
    const recorded = component.getByTestId('close-nav-count')

    await test.step('Drawer opens, recording the mount-time close call', async () => {
      // VerticalDrawer's `useEffect(..., [pathname])` calls onCloseNav once on
      // mount while openNav is true, so the recorded count starts at 1 rather
      // than 0. Surfaced by this port — worth confirming it is intended.
      await expect(recorded).toHaveValue('1')
      await expect(page.getByRole('presentation').first()).toBeVisible()
    })

    await test.step('Escape dismisses the drawer and records the call', async () => {
      await page.keyboard.press('Escape')
      await expect(recorded).toHaveValue('2')
    })
  })
})
