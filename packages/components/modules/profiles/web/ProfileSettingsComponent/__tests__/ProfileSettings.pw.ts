import { type Locator, type Page, expect, test } from '@playwright/test'
import path from 'node:path'

import type { ProfileSettingsControls } from './__utils__/ProfileSettings.story'

/**
 * Playwright port of `ProfileSettings.cy.tsx` in this folder.
 *
 * The form renders inside `#root`, so most queries use the `mount()` locator;
 * the success toast is portaled, so it goes through `page`.
 *
 * Typing uses `pressSequentially()` rather than `fill()` throughout: the phone
 * field is masked and react-hook-form validates per keystroke, and `fill()`
 * dispatches a single input event.
 */
const STORY = 'profiles/web/ProfileSettingsComponent/ProfileSettings'

/** Upload fixture, moved out of `cypress/fixtures/` when Cypress was removed. */
const LOGO = path.join(__dirname, '../../../../../playwright/fixtures/tsl-logo.png')

const resolve = (page: Page, key: keyof ProfileSettingsControls) =>
  page.evaluate((k) => window.__profileSettingsControls[k](), key)

const fields = (component: Locator) => ({
  name: component.getByLabel('Name', { exact: true }),
  username: component.getByLabel(/username/i),
  phone: component.getByLabel(/phone number/i),
  bio: component.getByLabel(/bio/i),
  avatarFile: component
    .getByText(/change image/i)
    .locator('..')
    .locator('input[type="file"]'),
  bannerFile: component
    .getByText(/change banner/i)
    .locator('..')
    .locator('input[type="file"]'),
  changeAvatar: component.getByText(/change image/i),
  removeAvatar: component.getByRole('button', { name: /remove avatar button/i }),
  changeBanner: component.getByText(/change banner/i),
  removeBanner: component.getByLabel(/remove banner button/i),
  avatarImage: component.getByAltText('Avatar image', { exact: true }),
  bannerImage: component.getByAltText('Home Banner', { exact: true }),
  save: component.getByRole('button', { name: /save changes/i }),
})

const retype = async (field: Locator, value: string) => {
  await field.clear()
  await field.pressSequentially(value)
}

test.describe('ProfileSettings', () => {
  test('should render profile settings form elements with initial data', async ({ mount }) => {
    const component = await mount(`${STORY}/Default`)
    const f = fields(component)

    await expect(component.getByText('Profile', { exact: true })).toBeAttached()
    await expect(
      component.getByText('Manage your personal information you and other people see.', {
        exact: true,
      }),
    ).toBeAttached()

    await expect(f.name).toHaveValue('John Doe')
    await expect(f.username).toHaveValue('johndoes')
    await expect(f.phone).toHaveValue('+1 (555) 123-4567')
    await expect(f.bio).toHaveValue('John Doe is a software engineer at Google.')

    await expect(component.locator('img, [title="Avatar Fallback"]').first()).toBeAttached()
    await expect(f.changeAvatar).toBeAttached()
    await expect(f.bannerImage).toBeAttached()
    await expect(f.changeBanner).toBeAttached()
    await expect(f.save).toBeDisabled()
  })

  test('should show validation errors for invalid input', async ({ mount }) => {
    const component = await mount(`${STORY}/Default`)
    const f = fields(component)

    await test.step('Test name validation', async () => {
      await f.name.clear()
      await f.name.blur()
      await expect(component.getByText('Please enter a name.', { exact: true })).toBeAttached()
    })

    await test.step('Test username validation', async () => {
      await retype(f.username, 'short')
      await f.username.blur()
      await expect(
        component.getByText('Username must be at least 8 characters long.', { exact: true }),
      ).toBeAttached()

      await retype(f.username, 'invalid-username')
      await f.username.blur()
      await expect(
        component.getByText('Username can only contain letters and numbers', { exact: true }),
      ).toBeAttached()
    })

    await expect(f.save).toBeDisabled()
  })

  test('should update text fields successfully', async ({ mount, page }) => {
    const component = await mount(`${STORY}/Default`)
    const f = fields(component)

    await retype(f.name, 'Jane Smith')
    await retype(f.username, 'janesmith')
    await retype(f.phone, '+1123456789')
    await retype(f.bio, 'Jane Smith is a software engineer at Microsoft.')
    await expect(f.save).toBeEnabled()

    await test.step('Submit the form', async () => {
      await f.save.click()
      await resolve(page, 'resolveTextUpdate')
      await expect(page.getByText('Profile updated', { exact: true })).toBeAttached()
    })

    await expect(f.name).toHaveValue('Jane Smith')
    await expect(f.username).toHaveValue('janesmith')
    await expect(f.phone).toHaveValue('+1 (123) 456-789')
    await expect(f.bio).toHaveValue('Jane Smith is a software engineer at Microsoft.')
  })

  test('should update and remove avatar image successfully', async ({ mount, page }) => {
    const component = await mount(`${STORY}/Default`)
    const f = fields(component)
    const toast = page.getByText('Profile updated', { exact: true })

    await test.step('Update the avatar image', async () => {
      await f.avatarFile.setInputFiles(LOGO)
      await expect(f.changeAvatar).toBeAttached()
      await expect(f.removeAvatar).toBeAttached()
      await expect(f.save).toBeEnabled()
    })

    await test.step('Submit the form', async () => {
      await f.save.click()
      await resolve(page, 'resolveImageUpdate')
      await expect(toast).toBeAttached()
      await expect(f.avatarImage).toBeAttached()
    })

    await test.step('Remove the avatar image', async () => {
      await component
        .getByRole('button', { name: /remove/i })
        .first()
        .click()
      await expect(f.save).toBeEnabled()
    })

    await test.step('Submit the form again', async () => {
      await f.save.click()
      await resolve(page, 'resolveImageRemove')
      await expect(toast).toBeAttached()
    })
  })

  test('should update and remove banner image successfully', async ({ mount, page }) => {
    const component = await mount(`${STORY}/Default`)
    const f = fields(component)
    const toast = page.getByText('Profile updated', { exact: true })

    await test.step('Update the banner image', async () => {
      await f.bannerFile.setInputFiles(LOGO)
      await expect(f.changeBanner).toBeAttached()
      await expect(f.removeBanner).toBeAttached()
      await expect(f.save).toBeEnabled()
    })

    await test.step('Submit the form', async () => {
      await f.save.click()
      await resolve(page, 'resolveBannerUpdate')
      await expect(toast).toBeAttached()
      await expect(f.bannerImage).toBeAttached()
    })

    await test.step('Remove the banner image', async () => {
      await f.removeBanner.click()
      await expect(f.save).toBeEnabled()
    })

    await test.step('Submit the form again', async () => {
      await f.save.click()
      await resolve(page, 'resolveBannerRemove')
      await expect(toast).toBeAttached()
    })
  })
})
