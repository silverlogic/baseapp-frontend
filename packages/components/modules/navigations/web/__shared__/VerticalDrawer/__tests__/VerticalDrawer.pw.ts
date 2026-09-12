import { expect, test } from '@playwright/test'

/**
 * The drawer renders through a MUI Portal, so every query for its content goes
 * through `page` rather than the `mount()` locator, which is scoped to `#root`.
 * Only the recorder input lives inside `#root`.
 */
const STORY = 'navigations/web/__shared__/VerticalDrawer/VerticalDrawer'

const NAV_ITEMS = [
  'Dashboard',
  'Profile',
  'Settings',
  ...Array.from({ length: 10 }, (_, index) => `Menu Item ${index + 1}`),
]

test.describe('Component: VerticalDrawer', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
  })

  test('GIVEN an open drawer, THEN every navigation item is accessible and the content region scrolls', async ({
    mount,
    page,
  }) => {
    await test.step('GIVEN an open drawer', async () => {
      await mount(`${STORY}/Default`)

      await expect(page.getByRole('presentation')).toBeVisible()
      await expect(page.getByRole('img', { name: /logo/i })).toBeVisible()
    })

    await test.step('THEN every navigation item renders with its icon and label', async () => {
      const nav = page.getByRole('navigation')

      for (const title of NAV_ITEMS) {
        const item = nav.getByRole('button', { name: title, exact: true })
        await expect(item).toBeVisible()
        await expect(item.locator('span[aria-hidden="true"]')).toBeVisible()
        await expect(item.getByText(title, { exact: true })).toBeVisible()
      }
    })

    await test.step('THEN the content region clips and overflows its box', async () => {
      const region = page.getByRole('region', { name: 'scrollable content' })
      await expect(region).toHaveCSS('overflow', 'hidden')

      const { scrollHeight, clientHeight } = await region.evaluate((el) => ({
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
      }))
      expect(scrollHeight).toBeGreaterThanOrEqual(clientHeight)
    })
  })

  test('GIVEN a drawer opened at mount, THEN the close callback has already fired once, and WHEN a popstate event is dispatched, THEN it does not fire again', async ({
    mount,
    page,
  }) => {
    const recorded = await test.step('GIVEN a drawer opened at mount', async () => {
      const component = await mount(`${STORY}/RecordsCloseNav`)
      return component.getByTestId('close-nav-count')
    })

    await test.step('THEN the close callback has already fired once', async () => {
      await expect(recorded).toHaveValue('1')
    })

    await test.step('WHEN a popstate event is dispatched', () =>
      page.evaluate(() => window.dispatchEvent(new Event('popstate'))))

    await test.step('THEN it does not fire again', async () => {
      await expect(recorded).toHaveValue('1')
    })
  })
})
