import { type Locator, type Page, expect, test } from '@playwright/test'

import { unreadNotificationsMockData } from './__mocks__/requests'
import type { NotificationsControls } from './__utils__/NotificationsPopover.story'

/**
 * Playwright port of `NotificationsPopover.cy.tsx` in this folder.
 *
 * Everything the drawer renders is portaled outside `#root`, so it is queried
 * through `page`; only the bell button lives inside the `mount()` locator.
 */
const STORY = 'notifications/web/NotificationsPopover/NotificationsPopover'

const UNREAD_COUNT = unreadNotificationsMockData.data.me.notificationsUnreadCount

const ORDINALS = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
]

const resolve = (page: Page, key: keyof NotificationsControls) =>
  page.evaluate((k) => window.__notificationsControls[k](), key)

/** Cypress's cy.scrollIntoView() always scrolls; scrollIntoViewIfNeeded() may not. */
const scrollTo = (locator: Locator) => locator.evaluate((el: Element) => el.scrollIntoView())

const bellFor = (component: Locator) =>
  component.getByRole('button', { name: /see notifications/i })

const drawer = (page: Page) => page.getByRole('presentation')

test.describe('Notifications', () => {
  test('should render show notification drawer with empty state', async ({ mount, page }) => {
    await page.setViewportSize({ width: 1024, height: 768 })

    const component = await mount(`${STORY}/EmptyState`)

    await test.step('See the notification bell and icon', async () => {
      await expect(drawer(page)).not.toBeAttached()
      await expect(bellFor(component)).toBeAttached()
      await bellFor(component).click()
    })

    await test.step('Open notifications drawer from right', async () => {
      await expect(drawer(page)).toBeVisible()
      await expect(page.locator('.MuiDrawer-paper')).toHaveClass(/MuiDrawer-paperAnchorRight/)
    })

    await test.step('See the loading state', async () => {
      await expect(page.getByRole('progressbar')).toBeAttached()
      await resolve(page, 'resolveEmptyList')
    })

    await test.step('See the empty state', async () => {
      await expect(page.getByText('You don’t have notifications.', { exact: true })).toBeAttached()
      await expect(
        page.getByText('Your future notifications will be shown here.', { exact: true }),
      ).toBeAttached()
    })

    await test.step('Close notifications drawer on backdrop click', async () => {
      await page.locator('.MuiBackdrop-root').click()
      await expect(drawer(page)).not.toBeAttached()
    })
  })

  test('should render notifications and be able to interact with it', async ({ mount, page }) => {
    // cy.viewport('iphone-x')
    await page.setViewportSize({ width: 375, height: 812 })

    const component = await mount(`${STORY}/WithNotifications`)
    const reply = (ordinal: string) =>
      page.getByText(`This is the ${ordinal} comment reply.`, { exact: true })

    await test.step('See the notification bell and icon', async () => {
      await expect(drawer(page)).not.toBeAttached()
      await expect(bellFor(component)).toContainText(String(UNREAD_COUNT))
      await bellFor(component).click()
    })

    await test.step('Open notifications drawer from bottom', async () => {
      await expect(drawer(page)).toBeVisible()
      await expect(page.locator('.MuiDrawer-paper')).toHaveClass(/MuiDrawer-paperAnchorBottom/)
    })

    await test.step('See the loading state', async () => {
      await expect(page.getByRole('progressbar')).toBeAttached()
      await resolve(page, 'resolveList')
    })

    await test.step('See the notifications list', async () => {
      // Assert then scroll, one row at a time — scrolling is what renders the next.
      for (const ordinal of ORDINALS) {
        await expect(reply(ordinal)).toBeAttached()
        await scrollTo(reply(ordinal))
      }
    })

    await test.step('Load more notifications', async () => {
      const loader = page.getByRole('progressbar')
      await expect(loader).toBeAttached()
      await scrollTo(loader)
      await resolve(page, 'resolveNextPage')

      await expect(reply('eleventh')).toBeAttached()
      await scrollTo(reply('eleventh'))
    })

    await test.step('Mark notification as read', async () => {
      await expect(reply('twelfth')).toBeAttached()
      await reply('twelfth').click()
      await resolve(page, 'resolveMarkAsRead')
    })

    await test.step('See read notifications and older divider', async () => {
      await expect(page.getByText('Older', { exact: true })).toBeAttached()
      await expect(reply('twelfth')).toBeAttached()
    })

    await test.step('Close notifications drawer', async () => {
      await page.getByRole('button', { name: /close notifications/i }).click()
    })

    await test.step('See the notification bell count updated', async () => {
      await expect(bellFor(component)).toContainText(String(UNREAD_COUNT - 1))
    })
  })

  test('should render custom components for list', async ({ mount, page }) => {
    const component = await mount(`${STORY}/CustomList`)

    // The Cypress spec resolved the popover query again immediately after mount.
    await resolve(page, 'resolvePopoverQuery')

    await expect(drawer(page)).not.toBeAttached()
    await expect(bellFor(component)).toContainText(String(UNREAD_COUNT))
    await bellFor(component).click()

    await expect(drawer(page)).toBeVisible()
    await resolve(page, 'resolveList')

    await expect(page.getByText('Custom notifications list', { exact: true })).toBeAttached()
  })

  test('should render custom components for item', async ({ mount, page }) => {
    const component = await mount(`${STORY}/CustomItem`)

    await expect(drawer(page)).not.toBeAttached()
    await expect(bellFor(component)).toContainText(String(UNREAD_COUNT))
    await bellFor(component).click()

    await expect(drawer(page)).toBeVisible()
    await resolve(page, 'resolveList')

    await test.step('See the custom notification items', async () => {
      for (let index = 1; index <= 10; index += 1) {
        const item = page.getByText(`Someone replied to your comment ${index}.`, { exact: true })
        await expect(item).toBeAttached()
        if (index === 8) await scrollTo(item)
      }
    })
  })

  test('should render custom components for list and item', async ({ mount, page }) => {
    const component = await mount(`${STORY}/CustomListAndItem`)

    await expect(drawer(page)).not.toBeAttached()
    await expect(bellFor(component)).toContainText(String(UNREAD_COUNT))
    await bellFor(component).click()

    await expect(drawer(page)).toBeVisible()
    await resolve(page, 'resolveList')

    await expect(page.getByText('Custom notifications list', { exact: true })).toBeAttached()

    await test.step('See the custom notification items', async () => {
      for (let index = 1; index <= 10; index += 1) {
        const item = page.getByText(`Someone replied to your comment ${index}.`, { exact: true })
        await expect(item).toBeAttached()
        if (index === 8) await scrollTo(item)
      }
    })
  })
})
