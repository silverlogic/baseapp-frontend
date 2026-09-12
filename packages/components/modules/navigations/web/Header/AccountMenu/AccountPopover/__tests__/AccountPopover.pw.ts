import { type Locator, type Page, expect, test } from '@playwright/test'

import type {
  AccountPopoverControls,
  AccountPopoverFixtures,
} from './__utils__/AccountPopover.story'

/**
 * The popover is portaled outside `#root`, so its content is queried through
 * `page`. Fixtures are read back from the browser because `__mocks__/` uses
 * unseeded faker and would otherwise generate different values in Node.
 */
const STORY = 'navigations/web/Header/AccountMenu/AccountPopover/AccountPopover'

const resolve = (page: Page, key: keyof AccountPopoverControls) =>
  page.evaluate((k) => window.__accountPopoverControls[k](), key)

const fixtures = (page: Page) =>
  page.evaluate(() => window.__accountPopoverFixtures) as Promise<AccountPopoverFixtures>

/**
 * `useJWTUser` decodes the seeded cookie into `placeholderData` and *also* fetches
 * the user. Never answering that request keeps the query pending and the
 * placeholder rendered; `fulfill()` would replace it and `abort()` would make
 * react-query drop it — see `references/relay.md`.
 */
const holdUserApi = (page: Page) => page.route('**/users/**', () => {})

/** `scrollIntoViewIfNeeded()` is a no-op for a visible element, so it never advances the list. */
const scrollTo = (locator: Locator) =>
  locator.evaluate((element: Element) => element.scrollIntoView())

/** Opens the profiles list and settles both operations it fires. */
const openProfilesList = async (page: Page, label: RegExp) => {
  await page.getByRole('menuitem', { name: label }).click()
  await resolve(page, 'resolveAddProfile')
  await resolve(page, 'resolveProfilesList')
}

const profilesList = (page: Page) => page.getByLabel('List of available profiles')

test.describe('Component: AccountPopover', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await holdUserApi(page)
    await page.context().clearCookies()
  })

  test('GIVEN a user without a profile, WHEN the popover is opened, THEN it shows the user identity and logging out runs the logout side effects', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a user without a profile', () =>
      mount(`${STORY}/WithoutProfile`))

    await test.step('WHEN the popover is opened', () => component.getByRole('button').click())

    await test.step('THEN it shows the user identity', async () => {
      const { user } = await fixtures(page)

      await expect(
        page.getByText(`${user.firstName} ${user.lastName}`, { exact: true }),
      ).toBeAttached()
      await expect(page.getByText(user.email, { exact: true })).toBeAttached()
    })

    await test.step('WHEN logout is chosen, THEN the logout side effects run', async () => {
      await page.getByRole('menuitem', { name: /logout/i }).click()

      await expect(component.getByTestId('logout-count')).toHaveValue('1')
    })
  })

  test('GIVEN a user with a profile, WHEN the popover is opened, THEN the profiles list pages, caps at five, cancels and reopens', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a user with a profile', () =>
      mount(`${STORY}/WithProfile`))

    await test.step('WHEN the popover is opened, THEN it shows the current profile', async () => {
      const { profile } = await fixtures(page)

      await component.getByRole('button').click()

      await expect(page.getByText(profile.name, { exact: true })).toBeAttached()
      await expect(page.getByText(profile.urlPath, { exact: true })).toBeAttached()
    })

    await test.step('WHEN the profiles list is opened, THEN every profile renders as it scrolls into the window', async () => {
      const { profileList } = await fixtures(page)

      await openProfilesList(page, /switch profile/i)

      for (const edge of profileList.data.me.profiles.edges) {
        await expect(page.getByText(edge.node.name!, { exact: true }).first()).toBeAttached()

        const path = page.getByText(edge.node.urlPath!.path!, { exact: true }).first()
        await expect(path).toBeAttached()
        await scrollTo(path)
      }
    })

    await test.step('THEN at most five profiles are shown at a time', async () => {
      await expect(profilesList(page)).toBeAttached()

      const visible = page.getByLabel(/^switch to/i).filter({ visible: true })
      expect(await visible.count()).toBeLessThanOrEqual(5)
    })

    await test.step('WHEN the switch is cancelled, THEN the list closes', async () => {
      await page.getByRole('menuitem', { name: /cancel/i }).click()

      await expect(profilesList(page)).not.toBeAttached()
    })

    await test.step('WHEN the list is opened again, THEN it reopens', async () => {
      await page.getByRole('menuitem', { name: /switch profile/i }).click()
      await resolve(page, 'resolveProfilesList')

      await expect(profilesList(page)).toBeAttached()
    })
  })

  test('GIVEN the profiles list, WHEN the current profile is re-selected, THEN nothing is switched, and WHEN another profile is selected, THEN the switch is persisted to the cookie', async ({
    mount,
    page,
  }) => {
    await test.step('GIVEN the profiles list', async () => {
      const mounted = await mount(`${STORY}/WithProfile`)

      await mounted.getByRole('button').click()
      await openProfilesList(page, /switch profile/i)
    })

    await test.step('WHEN the current profile is re-selected, THEN nothing is switched', async () => {
      const { profile } = await fixtures(page)

      await page.getByLabel(`Switch to ${profile.name}`).click()

      await expect(
        page.getByText(`Switched to ${profile.name}`, { exact: true }),
      ).not.toBeAttached()
      await expect(profilesList(page)).toBeAttached()
    })

    await test.step('WHEN another profile is selected, THEN the switch is persisted to the cookie', async () => {
      const { profileList } = await fixtures(page)
      const secondProfile = profileList.data.me.profiles.edges[1]!.node

      await page.getByLabel(`Switch to ${secondProfile.name}`).click()

      await expect
        .poll(async () => {
          const cookies = await page.context().cookies()
          const current = cookies.find((cookie) => cookie.name === 'CurrentProfile')
          return current ? decodeURIComponent(current.value) : ''
        })
        .toContain(secondProfile.name!)
    })
  })

  test('GIVEN custom labels and sub-components, WHEN the popover is opened, THEN every customization is rendered', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN custom labels and sub-components', () =>
      mount(`${STORY}/WithCustomProps`))

    await test.step('WHEN the popover is opened', () => component.getByRole('button').click())

    await test.step('THEN the custom menu item and switch-profile label are shown', async () => {
      await expect(page.getByRole('menuitem', { name: /custom menu item/i })).toBeAttached()
      await expect(page.getByRole('menuitem', { name: /change profile/i })).toBeAttached()
    })

    await test.step('THEN the profiles list customizations are shown', async () => {
      await openProfilesList(page, /change profile/i)

      await expect(page.getByRole('menuitem', { name: /close/i })).toBeAttached()

      const avatars = page.getByAltText('Profile avatar', { exact: true })
      await expect(avatars).toHaveCount(5)

      const firstAvatarWrapper = avatars.first().locator('..')
      await expect(firstAvatarWrapper).toHaveAttribute('width', '24')
      await expect(firstAvatarWrapper).toHaveAttribute('height', '24')
    })

    await test.step('THEN the custom add-profile and logout labels are shown', async () => {
      await expect(page.getByRole('menuitem', { name: /add organization/i })).toBeAttached()
      await expect(page.getByRole('menuitem', { name: /sign out/i })).toBeAttached()
    })
  })
})
