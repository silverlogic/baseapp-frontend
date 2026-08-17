import { type Locator, type Page, expect, test } from '@playwright/test'

import type {
  AccountPopoverControls,
  AccountPopoverFixtures,
} from './__utils__/AccountPopover.story'

/**
 * Playwright port of `AccountPopover.cy.tsx` in this folder.
 *
 * The popover is portaled outside `#root`, so its content is queried through
 * `page`. Fixtures are read back from the browser because `__mocks__/` uses
 * unseeded faker and would otherwise generate different values in Node.
 *
 * The Cypress spec's three module-level hook stubs are replaced by real
 * injection points — see the story for how and why.
 */
const STORY = 'navigations/web/Header/AccountMenu/AccountPopover/AccountPopover'

const resolve = (page: Page, key: keyof AccountPopoverControls) =>
  page.evaluate((k) => window.__accountPopoverControls[k](), key)

const fixtures = (page: Page) =>
  page.evaluate(() => window.__accountPopoverFixtures) as Promise<AccountPopoverFixtures>

/**
 * `useJWTUser` decodes the seeded cookie into `placeholderData` and *also* fetches
 * the user via react-query. Never answer that request, so the query stays pending
 * and the placeholder keeps rendering — which is what the Cypress stub did in
 * effect, since it always returned the mock user.
 *
 * The two obvious alternatives both break: `fulfill()` replaces the placeholder
 * with the response body, and `abort()` settles the query to `error`, after which
 * react-query drops `placeholderData`. The latter was a real flake — the name
 * assertion caught the pending window and the email assertion, running moments
 * later, did not.
 */
const holdUserApi = async (page: Page) => {
  await page.route('**/users/**', () => {})
}

/**
 * Cypress's `cy.scrollIntoView()` always scrolls and aligns to top; Playwright's
 * `scrollIntoViewIfNeeded()` is a no-op when already visible, which never
 * advances the profiles list to render its next batch. Use the DOM API.
 */
const scrollTo = (locator: Locator) => locator.evaluate((el: Element) => el.scrollIntoView())

/** Opens the profiles list and settles both operations it fires. */
const openProfilesList = async (page: Page, label: RegExp) => {
  await page.getByRole('menuitem', { name: label }).click()
  await resolve(page, 'resolveAddProfile')
  await resolve(page, 'resolveProfilesList')
}

test.describe('AccountPopover', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await holdUserApi(page)
  })

  test('should render the account popover without profile and be able to interact with it', async ({
    mount,
    page,
  }) => {
    const component = await mount(`${STORY}/WithoutProfile`)
    const { user } = await fixtures(page)

    await component.getByRole('button').click()

    await expect(
      page.getByText(`${user.firstName} ${user.lastName}`, { exact: true }),
    ).toBeAttached()
    await expect(page.getByText(user.email, { exact: true })).toBeAttached()

    await test.step('Logging out runs the logout side effects', async () => {
      await page.getByRole('menuitem', { name: /logout/i }).click()

      // The Cypress original spied on the `logout` function. Here the story
      // subscribes to LOGOUT_EVENT, which `logout()` broadcasts after clearing
      // tokens — so this asserts the effect, not just the call.
      await expect(component.getByTestId('logout-count')).toHaveValue('1')
    })
  })

  test('should render the account popover with profile and be able to interact with it', async ({
    mount,
    page,
  }) => {
    const component = await mount(`${STORY}/WithProfile`)
    const { profile, profileList } = await fixtures(page)

    await component.getByRole('button').click()

    await expect(page.getByText(profile.name, { exact: true })).toBeAttached()
    await expect(page.getByText(profile.urlPath, { exact: true })).toBeAttached()

    await test.step('should be able to switch profile', async () => {
      await openProfilesList(page, /switch profile/i)

      // Assert then scroll, one row at a time — the list only keeps a handful
      // mounted, so scrolling to each row is what renders the next.
      for (const edge of profileList.data.me.profiles.edges) {
        // Non-null assertions mirror the Cypress original's `profile.node?.name!`
        // — the fixture types allow null, the fixture data never is.
        await expect(page.getByText(edge.node.name!, { exact: true }).first()).toBeAttached()

        const path = page.getByText(edge.node.urlPath!.path!, { exact: true }).first()
        await expect(path).toBeAttached()
        await scrollTo(path)
      }
    })

    await test.step('should show at most 5 profiles at a time', async () => {
      await expect(page.getByLabel('List of available profiles')).toBeAttached()

      const visible = page.getByLabel(/^switch to/i).filter({ visible: true })
      expect(await visible.count()).toBeLessThanOrEqual(5)
    })

    await test.step('should be able to cancel the profile switch', async () => {
      await page.getByRole('menuitem', { name: /cancel/i }).click()
      await expect(page.getByLabel('List of available profiles')).not.toBeAttached()
    })

    await test.step('should be able to reopen the profiles list', async () => {
      await page.getByRole('menuitem', { name: /switch profile/i }).click()
      await resolve(page, 'resolveProfilesList')
      await expect(page.getByLabel('List of available profiles')).toBeAttached()
    })
  })

  test('should show all sub-components custom props', async ({ mount, page }) => {
    await mount(`${STORY}/WithCustomProps`)
    const component = page.locator('#root')

    await component.getByRole('button').click()

    await test.step('should show custom menu item', async () => {
      await expect(page.getByRole('menuitem', { name: /custom menu item/i })).toBeAttached()
    })

    await test.step('should show custom switch profile label', async () => {
      await expect(page.getByRole('menuitem', { name: /change profile/i })).toBeAttached()
    })

    await test.step('should show profile list customizations', async () => {
      await openProfilesList(page, /change profile/i)

      await expect(page.getByRole('menuitem', { name: /close/i })).toBeAttached()

      const avatars = page.getByAltText('Profile avatar', { exact: true })
      await expect(avatars).toHaveCount(5)

      const firstAvatarWrapper = avatars.first().locator('..')
      await expect(firstAvatarWrapper).toHaveAttribute('width', '24')
      await expect(firstAvatarWrapper).toHaveAttribute('height', '24')
    })

    await test.step('should show custom add profile label', async () => {
      await expect(page.getByRole('menuitem', { name: /add organization/i })).toBeAttached()
    })

    await test.step('should show custom logout button label', async () => {
      await expect(page.getByRole('menuitem', { name: /sign out/i })).toBeAttached()
    })
  })
})
