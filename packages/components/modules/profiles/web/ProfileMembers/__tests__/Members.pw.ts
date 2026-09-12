import { type Locator, type Page, expect, test } from '@playwright/test'

import { fullMembersListMockData } from './__mocks__/requests'
import type { MembersControls } from './__utils__/Members.story'

/**
 * The mocks are deterministic, so they are imported here directly to derive
 * expected values. MUI Select listboxes and the confirm dialog are portaled
 * outside `#root`, so those are queried through `page`.
 */
const STORY = 'profiles/web/ProfileMembers/Members'

const AVATARS = {
  react: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/react.svg',
  django: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/django.svg',
  javascript: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/javascript.svg',
}

/**
 * One row per role. **The order matters**: the ordering assertion walks this list
 * pairwise against each row's `y`, so a row moved here silently stops testing the
 * order it claims to.
 */
const ROLE_ROWS = [
  { name: 'Pending Profile', label: 'Pending', opacity: '0.6', avatar: AVATARS.django },
  { name: 'Inactive Profile', label: 'Inactive', opacity: '0.6', avatar: AVATARS.javascript },
  { name: 'Owner Profile', label: 'Owner', opacity: '1', avatar: AVATARS.react },
  { name: 'Manager Profile', label: 'Manager', opacity: '1', avatar: undefined },
]

const PROMOTION_COPY =
  'Are you sure you want to promote this member to an admin? They will have full administrative rights, including the ability to manage members and settings.'

const resolve = (page: Page, key: keyof MembersControls) =>
  page.evaluate((k) => window.__membersControls[k](), key)

/** `scrollIntoViewIfNeeded()` is a no-op for a visible element, so it never advances the list. */
const scrollTo = (locator: Locator) =>
  locator.evaluate((element: Element) => element.scrollIntoView())

const rowFor = (scope: Locator, name: string) =>
  scope.getByText(name, { exact: true }).locator('..').locator('..')

const topOf = async (locator: Locator) => {
  const box = await locator.boundingBox()
  return box?.y ?? 0
}

const dialogTitle = (page: Page) => page.getByText(/change user permissions/i)

const chooseAdminRole = async (component: Locator, page: Page) => {
  await component.getByText('Manager', { exact: true }).click()
  await page.getByRole('option', { name: /admin/i }).click()
}

test.describe('Component: ProfileMembers', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  test('GIVEN members in every role, THEN each row carries its label, dimming and avatar, in listed order', async ({
    mount,
  }) => {
    const component = await mount(`${STORY}/AllRoles`)

    for (const { name, label, opacity, avatar } of ROLE_ROWS) {
      await test.step(`THEN ${name} carries its label, dimming and avatar`, async () => {
        await expect(component.getByText(name, { exact: true })).toBeAttached()
        await expect(component.getByText(label, { exact: true })).toBeAttached()
        await expect(rowFor(component, name)).toHaveCSS('opacity', opacity)

        if (avatar) {
          await expect(component.locator(`img[src="${avatar}"]`)).toBeAttached()
        }
      })
    }

    await test.step('THEN the rows appear in listed order', async () => {
      const tops = []
      for (const { name } of ROLE_ROWS) {
        tops.push(await topOf(rowFor(component, name)))
      }

      for (let index = 1; index < tops.length; index += 1) {
        expect(tops[index]!).toBeGreaterThan(tops[index - 1]!)
      }
    })
  })

  test('GIVEN a member whose role can be changed, WHEN a new role is chosen, THEN it is applied only after confirmation', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a member whose role can be changed', async () => {
      const mounted = await mount(`${STORY}/RoleChange`)
      await expect(mounted.getByText('Manager Profile', { exact: true })).toBeAttached()

      return mounted
    })

    await test.step('WHEN the role dropdown is opened, THEN it offers the other roles', async () => {
      await component.getByText('Manager', { exact: true }).click()

      await expect(page.getByRole('option', { name: /manager/i })).toBeAttached()
      await expect(page.getByRole('option', { name: /admin/i })).toBeAttached()
    })

    await test.step('WHEN the admin role is chosen, THEN a confirmation is required', async () => {
      await page.getByRole('option', { name: /admin/i }).click()

      await expect(dialogTitle(page)).toBeAttached()
      await expect(page.getByRole('button', { name: 'Confirm', exact: true })).toBeAttached()
      await expect(page.getByRole('button', { name: 'Back', exact: true })).toBeAttached()
      await expect(page.getByText(PROMOTION_COPY, { exact: true })).toBeAttached()
    })

    await test.step('WHEN the confirmation is dismissed, THEN the dialog closes', async () => {
      await page.getByRole('button', { name: 'Back', exact: true }).click()

      await expect(dialogTitle(page)).not.toBeAttached()
    })

    await test.step('WHEN the change is confirmed, THEN the dialog closes once the mutation answers', async () => {
      await chooseAdminRole(component, page)
      await page.getByRole('button', { name: 'Confirm', exact: true }).click()
      await resolve(page, 'resolveUpdateMemberRole')

      await expect(dialogTitle(page)).not.toBeAttached()
    })
  })

  test('GIVEN more members than one page, WHEN the list is scrolled to the end, THEN the next page is fetched and appended', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN more members than one page', async () => {
      const mounted = await mount(`${STORY}/Paginated`)
      const memberCount = fullMembersListMockData.data.profile.members.edges.length + 1

      await expect(mounted.getByText(`${memberCount} members`, { exact: true })).toBeAttached()

      return mounted
    })

    const member = (index: number) =>
      component.getByText(`Manager Profile ${index}`, { exact: true })
    const loader = page.getByRole('progressbar')

    await test.step('WHEN the list is scrolled to the end, THEN the later members are not fetched yet', async () => {
      for (const index of [1, 2, 3, 4, 5, 6]) {
        await expect(member(index)).toBeAttached()
      }
      await scrollTo(member(6))

      for (const index of [7, 8, 9]) {
        await expect(member(index)).not.toBeAttached()
      }
    })

    await test.step('WHEN the loader is reached, THEN the next page is fetched', async () => {
      await expect(loader).toBeAttached()
      await scrollTo(loader)
      await resolve(page, 'resolveNextPage')

      await expect(loader).not.toBeAttached()
    })

    await test.step('THEN the next members render as they scroll into the window', async () => {
      for (const index of [7, 8, 9]) {
        await expect(member(index)).toBeAttached()
        await scrollTo(member(index))
      }
    })
  })

  test('GIVEN a searchable members list, WHEN a name is searched, THEN only that member remains, and WHEN the search is cleared, THEN all return', async ({
    mount,
  }) => {
    const component = await test.step('GIVEN a searchable members list', async () => {
      const mounted = await mount(`${STORY}/Searchable`)

      await expect(mounted.getByText('Manager Profile', { exact: true })).toBeAttached()
      await expect(mounted.getByText('Owner Profile', { exact: true })).toBeAttached()

      return mounted
    })

    const search = component.getByPlaceholder(/search/i)
    const manager = component.getByText('Manager Profile', { exact: true })
    const owner = component.getByText('Owner Profile', { exact: true })

    await test.step('WHEN a name is searched, THEN only that member remains', async () => {
      await expect(search).toBeAttached()
      await search.fill('Manager Profile')

      await expect(manager).toBeAttached()
      await expect(owner).not.toBeAttached()
    })

    await test.step('WHEN the search is cleared, THEN all members return', async () => {
      await search.clear()

      await expect(manager).toBeAttached()
      await expect(owner).toBeAttached()
    })
  })
})
