import { type Locator, type Page, expect, test } from '@playwright/test'

import { fullMembersListMockData } from './__mocks__/requests'
import type { MembersControls } from './__utils__/Members.story'

/**
 * Playwright port of `Members.cy.tsx` in this folder.
 *
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

const resolve = (page: Page, key: keyof MembersControls) =>
  page.evaluate((k) => window.__membersControls[k](), key)

/** Cypress's cy.scrollIntoView() always scrolls; scrollIntoViewIfNeeded() may not. */
const scrollTo = (locator: Locator) => locator.evaluate((el: Element) => el.scrollIntoView())

/** The Cypress spec reached the row wrapper via `.parent().parent()`. */
const rowFor = (scope: Locator, name: string) =>
  scope.getByText(name, { exact: true }).locator('..').locator('..')

const topOf = async (locator: Locator) => {
  const box = await locator.boundingBox()
  return box?.y ?? 0
}

test.describe('Members', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  test('renders MembersListItem correctly', async ({ mount }) => {
    const component = await mount(`${STORY}/AllRoles`)

    const cases = [
      { name: 'Pending Profile', label: 'Pending', opacity: '0.6', avatar: AVATARS.django },
      { name: 'Inactive Profile', label: 'Inactive', opacity: '0.6', avatar: AVATARS.javascript },
      { name: 'Owner Profile', label: 'Owner', opacity: '1', avatar: AVATARS.react },
      { name: 'Manager Profile', label: 'Manager', opacity: '1' },
    ]

    for (const { name, label, opacity, avatar } of cases) {
      await test.step(name, async () => {
        await expect(component.getByText(name, { exact: true })).toBeAttached()
        await expect(component.getByText(label, { exact: true })).toBeAttached()
        await expect(rowFor(component, name)).toHaveCSS('opacity', opacity)

        if (avatar) {
          await expect(component.locator(`img[src="${avatar}"]`)).toBeAttached()
        }
      })
    }

    await test.step('checks members order', async () => {
      // The Cypress original wrote `expect(a).to.be.lessThan(b && c && d)`, where
      // `b && c && d` collapses to `d` — so it only ever compared the first and
      // last rows. Asserting strict ascending order is the evident intent.
      const tops = []
      for (const { name } of cases) {
        tops.push(await topOf(rowFor(component, name)))
      }

      for (let index = 1; index < tops.length; index += 1) {
        expect(tops[index]!).toBeGreaterThan(tops[index - 1]!)
      }
    })
  })

  test('can change role of MembersListItem and it shows confirm dialog', async ({
    mount,
    page,
  }) => {
    const component = await mount(`${STORY}/RoleChange`)

    const dialogTitle = page.getByText(/change user permissions/i)

    await test.step("it opens the role's dropdown", async () => {
      await expect(component.getByText('Manager Profile', { exact: true })).toBeAttached()
      await component.getByText('Manager', { exact: true }).click()
    })

    await test.step('it shows the role options and clicks on admin option', async () => {
      await expect(page.getByRole('option', { name: /manager/i })).toBeAttached()
      await page.getByRole('option', { name: /admin/i }).click()
    })

    await test.step('it shows the confirm dialog', async () => {
      await expect(dialogTitle).toBeAttached()
      await expect(page.getByRole('button', { name: 'Confirm', exact: true })).toBeAttached()
      await expect(page.getByRole('button', { name: 'Back', exact: true })).toBeAttached()
      await expect(
        page.getByText(
          'Are you sure you want to promote this member to an admin? They will have full administrative rights, including the ability to manage members and settings.',
          { exact: true },
        ),
      ).toBeAttached()
    })

    await test.step('can cancel and close the dialog', async () => {
      await page.getByRole('button', { name: 'Back', exact: true }).click()
      await expect(dialogTitle).not.toBeAttached()
    })

    await test.step('can confirm and close the dialog', async () => {
      await component.getByText('Manager', { exact: true }).click()
      await page.getByRole('option', { name: /admin/i }).click()
      await page.getByRole('button', { name: 'Confirm', exact: true }).click()
      await resolve(page, 'resolveUpdateMemberRole')
      await expect(dialogTitle).not.toBeAttached()
    })
  })

  test('renders MembersList correctly', async ({ mount, page }) => {
    const component = await mount(`${STORY}/Paginated`)

    const memberCount = fullMembersListMockData.data.profile.members.edges.length + 1
    const member = (index: number) =>
      component.getByText(`Manager Profile ${index}`, { exact: true })
    const loader = page.getByRole('progressbar')

    await test.step('should render the correct number of members and the search bar', async () => {
      await expect(component.getByText(`${memberCount} members`, { exact: true })).toBeAttached()
    })

    await test.step('can scroll to the bottom and load more members', async () => {
      for (const index of [1, 2, 3, 4, 5]) {
        await expect(member(index)).toBeAttached()
      }
      await expect(member(6)).toBeAttached()
      await scrollTo(member(6))

      for (const index of [7, 8, 9]) {
        await expect(member(index)).not.toBeAttached()
      }
    })

    await test.step('see the loading state', async () => {
      await expect(loader).toBeAttached()
      await scrollTo(loader)
      await resolve(page, 'resolveNextPage')
    })

    await test.step('loader should disappear', async () => {
      await expect(loader).not.toBeAttached()
    })

    await test.step('see the next members', async () => {
      for (const index of [7, 8, 9]) {
        await expect(member(index)).toBeAttached()
        await scrollTo(member(index))
      }
    })
  })

  test('can filter members by name', async ({ mount }) => {
    const component = await mount(`${STORY}/Searchable`)

    const search = component.getByPlaceholder(/search/i)
    const manager = component.getByText('Manager Profile', { exact: true })
    const owner = component.getByText('Owner Profile', { exact: true })

    await test.step('show all members', async () => {
      await expect(manager).toBeAttached()
      await expect(owner).toBeAttached()
    })

    await test.step('make sure search bar exists and can filter members by name', async () => {
      await expect(search).toBeAttached()
      await search.fill('Manager Profile')

      await expect(manager).toBeAttached()
      await expect(owner).not.toBeAttached()
    })

    await test.step('can clear the search', async () => {
      await search.clear()

      await expect(manager).toBeAttached()
      await expect(owner).toBeAttached()
    })
  })
})
