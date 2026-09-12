import { type Locator, type Page, expect, test } from '@playwright/test'
import path from 'node:path'

import type { ProfileSettingsControls } from './__utils__/ProfileSettings.story'

/**
 * The form renders inside `#root`, so most queries use the `mount()` locator;
 * the success toast is portaled, so it goes through `page`.
 *
 * Typing uses `pressSequentially()` rather than `fill()` throughout: the phone
 * field is masked and react-hook-form validates per keystroke, and `fill()`
 * dispatches a single input event.
 */
const STORY = 'profiles/web/ProfileSettingsComponent/ProfileSettings'

const LOGO = path.join(__dirname, '../../../../../playwright/fixtures/tsl-logo.png')

const UPDATED_TOAST = 'Profile updated'

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

const toast = (page: Page) => page.getByText(UPDATED_TOAST, { exact: true })

test.describe('Component: ProfileSettingsComponent', () => {
  test('GIVEN a profile, THEN the form is pre-filled and saving is disabled', async ({ mount }) => {
    const component = await mount(`${STORY}/Default`)
    const form = fields(component)

    await test.step('THEN the section is titled and described', async () => {
      await expect(component.getByText('Profile', { exact: true })).toBeAttached()
      await expect(
        component.getByText('Manage your personal information you and other people see.', {
          exact: true,
        }),
      ).toBeAttached()
    })

    await test.step('THEN every field holds its stored value', async () => {
      await expect(form.name).toHaveValue('John Doe')
      await expect(form.username).toHaveValue('johndoes')
      await expect(form.phone).toHaveValue('+1 (555) 123-4567')
      await expect(form.bio).toHaveValue('John Doe is a software engineer at Google.')
    })

    await test.step('THEN both images offer a replacement, and saving is disabled', async () => {
      await expect(component.locator('img, [title="Avatar Fallback"]').first()).toBeAttached()
      await expect(form.changeAvatar).toBeAttached()
      await expect(form.bannerImage).toBeAttached()
      await expect(form.changeBanner).toBeAttached()
      await expect(form.save).toBeDisabled()
    })
  })

  test('GIVEN a pre-filled form, WHEN the name is emptied, THEN it is reported and saving stays disabled', async ({
    mount,
  }) => {
    const { component, form } = await test.step('GIVEN a pre-filled form', async () => {
      const mounted = await mount(`${STORY}/Default`)
      return { component: mounted, form: fields(mounted) }
    })

    await test.step('WHEN the name is emptied', async () => {
      await form.name.clear()
      await form.name.blur()
    })

    await test.step('THEN it is reported and saving stays disabled', async () => {
      await expect(component.getByText('Please enter a name.', { exact: true })).toBeAttached()
      await expect(form.save).toBeDisabled()
    })
  })

  test('GIVEN a pre-filled form, WHEN a username shorter than the minimum is typed, THEN the length rule is reported', async ({
    mount,
  }) => {
    const { component, form } = await test.step('GIVEN a pre-filled form', async () => {
      const mounted = await mount(`${STORY}/Default`)
      return { component: mounted, form: fields(mounted) }
    })

    await test.step('WHEN a username shorter than the minimum is typed', async () => {
      await retype(form.username, 'short')
      await form.username.blur()
    })

    await test.step('THEN the length rule is reported and saving stays disabled', async () => {
      await expect(
        component.getByText('Username must be at least 8 characters long.', { exact: true }),
      ).toBeAttached()
      await expect(form.save).toBeDisabled()
    })
  })

  test('GIVEN a pre-filled form, WHEN a username with a forbidden character is typed, THEN the character rule is reported', async ({
    mount,
  }) => {
    const { component, form } = await test.step('GIVEN a pre-filled form', async () => {
      const mounted = await mount(`${STORY}/Default`)
      return { component: mounted, form: fields(mounted) }
    })

    await test.step('WHEN a username with a forbidden character is typed', async () => {
      await retype(form.username, 'invalid-username')
      await form.username.blur()
    })

    await test.step('THEN the character rule is reported and saving stays disabled', async () => {
      await expect(
        component.getByText('Username can only contain letters and numbers', { exact: true }),
      ).toBeAttached()
      await expect(form.save).toBeDisabled()
    })
  })

  test('GIVEN a pre-filled form, WHEN every text field is changed and saved, THEN the update is toasted and the values persist', async ({
    mount,
    page,
  }) => {
    const form = await test.step('GIVEN a pre-filled form', async () =>
      fields(await mount(`${STORY}/Default`)))

    await test.step('WHEN every text field is changed', async () => {
      await retype(form.name, 'Jane Smith')
      await retype(form.username, 'janesmith')
      await retype(form.phone, '+1123456789')
      await retype(form.bio, 'Jane Smith is a software engineer at Microsoft.')

      await expect(form.save).toBeEnabled()
    })

    await test.step('WHEN it is saved, THEN the update is toasted', async () => {
      await form.save.click()
      await resolve(page, 'resolveTextUpdate')

      await expect(toast(page)).toBeAttached()
    })

    await test.step('THEN the values persist', async () => {
      await expect(form.name).toHaveValue('Jane Smith')
      await expect(form.username).toHaveValue('janesmith')
      await expect(form.phone).toHaveValue('+1 (123) 456-789')
      await expect(form.bio).toHaveValue('Jane Smith is a software engineer at Microsoft.')
    })
  })

  test('GIVEN a pre-filled form, WHEN an avatar is uploaded and saved, THEN it is shown, and WHEN it is removed and saved, THEN that is toasted too', async ({
    mount,
    page,
  }) => {
    const { component, form } = await test.step('GIVEN a pre-filled form', async () => {
      const mounted = await mount(`${STORY}/Default`)
      return { component: mounted, form: fields(mounted) }
    })

    await test.step('WHEN an avatar is uploaded, THEN it can be replaced or removed', async () => {
      await form.avatarFile.setInputFiles(LOGO)

      await expect(form.changeAvatar).toBeAttached()
      await expect(form.removeAvatar).toBeAttached()
      await expect(form.save).toBeEnabled()
    })

    await test.step('WHEN it is saved, THEN the update is toasted and the avatar is shown', async () => {
      await form.save.click()
      await resolve(page, 'resolveImageUpdate')

      await expect(toast(page)).toBeAttached()
      await expect(form.avatarImage).toBeAttached()
    })

    await test.step('WHEN it is removed, THEN saving becomes possible again', async () => {
      await component
        .getByRole('button', { name: /remove/i })
        .first()
        .click()

      await expect(form.save).toBeEnabled()
    })

    await test.step('WHEN that is saved, THEN the removal is toasted', async () => {
      await form.save.click()
      await resolve(page, 'resolveImageRemove')

      await expect(toast(page)).toBeAttached()
    })
  })

  test('GIVEN a pre-filled form, WHEN a banner is uploaded and saved, THEN it is shown, and WHEN it is removed and saved, THEN that is toasted too', async ({
    mount,
    page,
  }) => {
    const form = await test.step('GIVEN a pre-filled form', async () =>
      fields(await mount(`${STORY}/Default`)))

    await test.step('WHEN a banner is uploaded, THEN it can be replaced or removed', async () => {
      await form.bannerFile.setInputFiles(LOGO)

      await expect(form.changeBanner).toBeAttached()
      await expect(form.removeBanner).toBeAttached()
      await expect(form.save).toBeEnabled()
    })

    await test.step('WHEN it is saved, THEN the update is toasted and the banner is shown', async () => {
      await form.save.click()
      await resolve(page, 'resolveBannerUpdate')

      await expect(toast(page)).toBeAttached()
      await expect(form.bannerImage).toBeAttached()
    })

    await test.step('WHEN it is removed, THEN saving becomes possible again', async () => {
      await form.removeBanner.click()

      await expect(form.save).toBeEnabled()
    })

    await test.step('WHEN that is saved, THEN the removal is toasted', async () => {
      await form.save.click()
      await resolve(page, 'resolveBannerRemove')

      await expect(toast(page)).toBeAttached()
    })
  })
})
