import { type Locator, type Page, expect, test } from '@playwright/test'

import { unreadNotificationsMockData } from './__mocks__/requests'
import type { NotificationsControls } from './__utils__/NotificationsPopover.story'

/**
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

const CUSTOM_ITEM_COUNT = 10

const resolve = (page: Page, key: keyof NotificationsControls) =>
  page.evaluate((k) => window.__notificationsControls[k](), key)

/** `scrollIntoViewIfNeeded()` is a no-op for a visible element, so it never advances the list. */
const scrollTo = (locator: Locator) =>
  locator.evaluate((element: Element) => element.scrollIntoView())

const bellFor = (component: Locator) =>
  component.getByRole('button', { name: /see notifications/i })

const drawer = (page: Page) => page.getByRole('presentation')

const customItem = (page: Page, index: number) =>
  page.getByText(`Someone replied to your comment ${index}.`, { exact: true })

const openDrawer = async (component: Locator, page: Page) => {
  await expect(drawer(page)).not.toBeAttached()
  await bellFor(component).click()
  await expect(drawer(page)).toBeVisible()
}

const expectCustomItems = async (page: Page) => {
  for (let index = 1; index <= CUSTOM_ITEM_COUNT; index += 1) {
    await expect(customItem(page, index)).toBeAttached()
    if (index === 8) await scrollTo(customItem(page, index))
  }
}

test.describe('Component: NotificationsPopover', () => {
  test('GIVEN no notifications, WHEN the drawer is opened, THEN the empty state is shown and the backdrop closes it', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN no notifications', async () => {
      await page.setViewportSize({ width: 1024, height: 768 })

      const mounted = await mount(`${STORY}/EmptyState`)
      await expect(drawer(page)).not.toBeAttached()
      await expect(bellFor(mounted)).toBeAttached()

      return mounted
    })

    await test.step('WHEN the drawer is opened, THEN it anchors to the right', async () => {
      await bellFor(component).click()

      await expect(drawer(page)).toBeVisible()
      await expect(page.locator('.MuiDrawer-paper')).toHaveClass(/MuiDrawer-paperAnchorRight/)
    })

    await test.step('THEN it loads, and the empty state is shown', async () => {
      await expect(page.getByRole('progressbar')).toBeAttached()
      await resolve(page, 'resolveEmptyList')

      await expect(page.getByText('You don’t have notifications.', { exact: true })).toBeAttached()
      await expect(
        page.getByText('Your future notifications will be shown here.', { exact: true }),
      ).toBeAttached()
    })

    await test.step('WHEN the backdrop is clicked, THEN the drawer closes', async () => {
      await page.locator('.MuiBackdrop-root').click()

      await expect(drawer(page)).not.toBeAttached()
    })
  })

  test('GIVEN unread notifications on a phone viewport, WHEN the drawer is opened, THEN the list pages, marks one as read and updates the bell count', async ({
    mount,
    page,
  }) => {
    const component =
      await test.step('GIVEN unread notifications on a phone viewport', async () => {
        await page.setViewportSize({ width: 375, height: 812 })

        const mounted = await mount(`${STORY}/WithNotifications`)
        await expect(drawer(page)).not.toBeAttached()
        await expect(bellFor(mounted)).toContainText(String(UNREAD_COUNT))

        return mounted
      })

    const reply = (ordinal: string) =>
      page.getByText(`This is the ${ordinal} comment reply.`, { exact: true })

    await test.step('WHEN the drawer is opened, THEN it anchors to the bottom', async () => {
      await bellFor(component).click()

      await expect(drawer(page)).toBeVisible()
      await expect(page.locator('.MuiDrawer-paper')).toHaveClass(/MuiDrawer-paperAnchorBottom/)
    })

    await test.step('WHEN the list resolves, THEN every notification renders as it scrolls into the window', async () => {
      await expect(page.getByRole('progressbar')).toBeAttached()
      await resolve(page, 'resolveList')

      for (const ordinal of ORDINALS) {
        await expect(reply(ordinal)).toBeAttached()
        await scrollTo(reply(ordinal))
      }
    })

    await test.step('WHEN the bottom is reached, THEN the next page is fetched and appended', async () => {
      const loader = page.getByRole('progressbar')

      await expect(loader).toBeAttached()
      await scrollTo(loader)
      await resolve(page, 'resolveNextPage')

      await expect(reply('eleventh')).toBeAttached()
      await scrollTo(reply('eleventh'))
    })

    await test.step('WHEN a notification is opened, THEN it is marked as read and moved under the older divider', async () => {
      await expect(reply('twelfth')).toBeAttached()
      await reply('twelfth').click()
      await resolve(page, 'resolveMarkAsRead')

      await expect(page.getByText('Older', { exact: true })).toBeAttached()
      await expect(reply('twelfth')).toBeAttached()
    })

    await test.step('WHEN the drawer is closed, THEN the bell count has dropped by one', async () => {
      await page.getByRole('button', { name: /close notifications/i }).click()

      await expect(bellFor(component)).toContainText(String(UNREAD_COUNT - 1))
    })
  })

  test('GIVEN a custom list component, WHEN the drawer is opened, THEN the custom list is rendered', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a custom list component', async () => {
      const mounted = await mount(`${STORY}/CustomList`)
      await resolve(page, 'resolvePopoverQuery')
      await expect(bellFor(mounted)).toContainText(String(UNREAD_COUNT))

      return mounted
    })

    await test.step('WHEN the drawer is opened', () => openDrawer(component, page))

    await test.step('THEN the custom list is rendered', async () => {
      await resolve(page, 'resolveList')

      await expect(page.getByText('Custom notifications list', { exact: true })).toBeAttached()
    })
  })

  test('GIVEN a custom item component, WHEN the drawer is opened, THEN every notification renders with it', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a custom item component', async () => {
      const mounted = await mount(`${STORY}/CustomItem`)
      await expect(bellFor(mounted)).toContainText(String(UNREAD_COUNT))

      return mounted
    })

    await test.step('WHEN the drawer is opened', () => openDrawer(component, page))

    await test.step('THEN every notification renders with it', async () => {
      await resolve(page, 'resolveList')

      await expectCustomItems(page)
    })
  })

  test('GIVEN custom list and item components, WHEN the drawer is opened, THEN both are rendered', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN custom list and item components', async () => {
      const mounted = await mount(`${STORY}/CustomListAndItem`)
      await expect(bellFor(mounted)).toContainText(String(UNREAD_COUNT))

      return mounted
    })

    await test.step('WHEN the drawer is opened', () => openDrawer(component, page))

    await test.step('THEN both are rendered', async () => {
      await resolve(page, 'resolveList')

      await expect(page.getByText('Custom notifications list', { exact: true })).toBeAttached()
      await expectCustomItems(page)
    })
  })
})
