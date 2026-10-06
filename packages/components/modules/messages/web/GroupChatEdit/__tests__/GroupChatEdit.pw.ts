import { type Locator, type Page, expect, test } from '@playwright/test'
import path from 'node:path'

import {
  CURRENT_PROFILE_ID,
  GROUP_IMAGE_URL,
  GROUP_TITLE,
  PAYLOAD_ERROR_MESSAGE,
  TEST_ROOM_ID,
  TOP_LEVEL_ERROR_MESSAGE,
  TRANSPORT_ERROR_MESSAGE,
  UPDATE_ERROR_TOAST,
  adaProfileNode,
  alanProfileNode,
  edsgerProfileNode,
  gladysProfileNode,
  graceProfileNode,
  katherineProfileNode,
} from './__mocks__/requests'
import type { GroupChatEditControls, PendingOperation } from './__utils__/GroupChatEdit.story'

/**
 * Playwright component tests for `GroupChatEdit`.
 *
 * Three things about this component shape the spec:
 *
 * - The submit affordances are `IconButton`s whose `isLoading` swaps the icon
 *   for a spinner *without* disabling, so an in-flight assertion here has to
 *   distinguish "shows a spinner" from "refuses a second click".
 * - `EditGroupTitleAndImage` and every `ProfileCard` render a button named
 *   "Remove", so the image affordances are addressed through `imageSection`,
 *   the parent of the upload button.
 * - `AddMembersDialog`, `LeaveGroupDialog` and every toast are portaled, so
 *   they are queried from `page` rather than from the mounted component.
 *
 * Operations are asserted and answered by name. `useRoomListSubscription` gets
 * a fresh `connections: []` array on every render and therefore resubscribes on
 * every keystroke, which makes "the most recent operation" an unreliable handle
 * on the mutation that was just committed. The pre-registered `GroupDetailsQuery`
 * descriptor also stays in the pending list after it resolves, so counts are
 * always taken per operation name.
 */
const STORY = 'messages/web/GroupChatEdit/GroupChatEdit'

const UPDATE_MUTATION = 'UpdateChatRoomMutation'

const PARTICIPANTS_QUERY = 'ChatRoomParticipantsPaginationQuery'

const PROFILES_QUERY = 'AllProfilesListPaginationQuery'

const NEW_TITLE = 'Platform Team'

const TITLE_MAX_LENGTH = 20

const OVERLONG_TITLE = 'Twenty-one characters!'

const MAX_TITLE_MESSAGE = "Title can't be more than 20 characters"

const EMPTY_TITLE_MESSAGE = 'Please enter a title'

const WHITESPACE_TITLE = '   '

const LOGO_PATH = path.join(__dirname, '../../../../../playwright/fixtures/tsl-logo.png')

const PHONE_VIEWPORT = { width: 390, height: 844 }

const FIRST_PAGE_MEMBER_NAMES = [
  'Current Profile',
  adaProfileNode.name,
  graceProfileNode.name,
  alanProfileNode.name,
  katherineProfileNode.name,
]

const titleField = (component: Locator) => component.getByLabel('Group Name', { exact: true })

const submitButton = (component: Locator) =>
  component.getByRole('button', { name: 'Edit group', exact: true })

const cancelButton = (component: Locator) =>
  component.getByRole('button', { name: 'cancel editing group', exact: true })

const imageSection = (component: Locator) =>
  component.getByRole('button', { name: 'Avatar' }).locator('..')

const removeImageButton = (component: Locator) =>
  imageSection(component).getByRole('button', { name: 'Remove', exact: true })

const fileInput = (component: Locator) => imageSection(component).locator('input[type="file"]')

const searchField = (scope: Locator) => scope.getByPlaceholder('Search', { exact: true })

const clearSearchButton = (scope: Locator) => searchField(scope).locator('..').getByRole('button')

const addMemberButton = (component: Locator) => component.getByText('Add Member', { exact: true })

const rowFor = (scope: Locator, name: string) =>
  scope.getByText(name, { exact: true }).locator('..').locator('..')

const dialog = (page: Page) => page.getByRole('dialog')

const confirmButton = (page: Page) =>
  dialog(page).getByRole('button', { name: 'Confirm', exact: true })

const dialogCancelButton = (page: Page) =>
  dialog(page).getByRole('button', { name: 'Cancel', exact: true })

const selectionRemoveButtons = (page: Page) =>
  dialog(page).locator('button.MuiIconButton-sizeSmall')

const toast = (page: Page, message: string) => page.getByText(message, { exact: true })

const validSubmissionCount = (component: Locator) => component.getByTestId('valid-submission-count')

const cancellationCount = (component: Locator) => component.getByTestId('cancellation-count')

const removalCount = (component: Locator) => component.getByTestId('removal-count')

const loader = (component: Locator) =>
  component.getByLabel('loading more profiles', { exact: true })

/** `scrollIntoViewIfNeeded()` is a no-op for a visible element, so it never advances Virtuoso. */
const scrollTo = (locator: Locator) =>
  locator.evaluate((element: Element) => element.scrollIntoView())

const pendingOperations = (page: Page): Promise<PendingOperation[]> =>
  page.evaluate(() => window.__groupChatEditControls.pendingOperations())

const operationsNamed = async (page: Page, name: string) =>
  (await pendingOperations(page)).filter((operation) => operation.name === name)

const countOf = async (page: Page, name: string) => (await operationsNamed(page, name)).length

const lastOf = async (page: Page, name: string) =>
  (await operationsNamed(page, name)).at(-1) ?? null

const resolve = (page: Page, key: keyof GroupChatEditControls) =>
  page.evaluate((controlKey) => {
    ;(window.__groupChatEditControls[controlKey] as () => void)()
  }, key)

const retype = async (field: Locator, value: string) => {
  await field.click()
  await field.press('ControlOrMeta+a')
  await field.press('Backspace')
  await field.pressSequentially(value)
}

const awaitOperation = async (page: Page, name: string, count = 1) => {
  await expect.poll(() => countOf(page, name)).toBe(count)
}

const submitTitleChange = async (component: Locator, page: Page, title = NEW_TITLE) => {
  await retype(titleField(component), title)
  await expect(submitButton(component)).toBeEnabled()
  await submitButton(component).click()
  await awaitOperation(page, UPDATE_MUTATION)
}

const openAddMembersDialog = async (component: Locator, page: Page) => {
  await addMemberButton(component).click()
  await expect(dialog(page).getByText('Add Members', { exact: true })).toBeVisible()
}

const selectProfile = async (page: Page, name: string) => {
  await rowFor(dialog(page), name).getByRole('checkbox').check()
}

test.describe('Component: GroupChatEdit', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies()
    await page.setViewportSize({ width: 1280, height: 800 })
  })

  test('GIVEN a group with a title and an avatar, THEN both are pre-filled into the form', async ({
    mount,
  }) => {
    const component = await mount(`${STORY}/Default`)

    await test.step('THEN the title field holds the group title', async () => {
      await expect(titleField(component)).toHaveValue(GROUP_TITLE)
    })

    await test.step('THEN the avatar shows the group image', async () => {
      await expect(imageSection(component).locator(`img[src="${GROUP_IMAGE_URL}"]`)).toBeVisible()
    })

    await test.step('THEN the upload button offers to change it', async () => {
      await expect(
        imageSection(component).getByRole('button', { name: 'Change Avatar', exact: true }),
      ).toBeVisible()
      await expect(removeImageButton(component)).toBeVisible()
    })
  })

  test('GIVEN a group with no avatar, THEN the upload button offers to add one and nothing can be removed', async ({
    mount,
  }) => {
    const component = await mount(`${STORY}/WithoutImage`)

    await expect(
      imageSection(component).getByRole('button', { name: 'Upload Avatar', exact: true }),
    ).toBeVisible()
    await expect(removeImageButton(component)).not.toBeAttached()
    await expect(imageSection(component).locator('img')).toHaveCount(0)
  })

  test('GIVEN an unedited group, THEN the submit button is disabled', async ({ mount }) => {
    const component = await mount(`${STORY}/Default`)

    await expect(titleField(component)).toHaveValue(GROUP_TITLE)
    await expect(submitButton(component)).toBeDisabled()
  })

  test('GIVEN an unedited group, WHEN the title is changed, THEN the submit button becomes enabled', async ({
    mount,
  }) => {
    const component = await test.step('GIVEN an unedited group', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await expect(submitButton(mounted)).toBeDisabled()
      return mounted
    })

    await test.step('WHEN the title is changed', () => retype(titleField(component), NEW_TITLE))

    await test.step('THEN the submit button becomes enabled', async () => {
      await expect(titleField(component)).toHaveValue(NEW_TITLE)
      await expect(submitButton(component)).toBeEnabled()
    })
  })

  test('GIVEN a changed title, WHEN the original title is typed back, THEN the submit button is disabled again', async ({
    mount,
  }) => {
    const component = await test.step('GIVEN a changed title', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await retype(titleField(mounted), NEW_TITLE)
      await expect(submitButton(mounted)).toBeEnabled()
      return mounted
    })

    await test.step('WHEN the original title is typed back', () =>
      retype(titleField(component), GROUP_TITLE))

    await test.step('THEN the submit button is disabled again', async () => {
      await expect(titleField(component)).toHaveValue(GROUP_TITLE)
      await expect(submitButton(component)).toBeDisabled()
    })
  })

  test('GIVEN an unedited group, WHEN the title is emptied, THEN it is rejected and submit stays disabled', async ({
    mount,
  }) => {
    const component = await test.step('GIVEN an unedited group', () => mount(`${STORY}/Default`))

    await test.step('WHEN the title is emptied', () => retype(titleField(component), ''))

    await test.step('THEN it is rejected and submit stays disabled', async () => {
      await expect(component.getByText(EMPTY_TITLE_MESSAGE, { exact: true })).toBeVisible()
      await expect(submitButton(component)).toBeDisabled()
    })
  })

  test('GIVEN the title length limit, WHEN a title of exactly the limit is typed, THEN it is accepted', async ({
    mount,
  }) => {
    const component = await test.step('GIVEN the title length limit', () =>
      mount(`${STORY}/Default`))

    await test.step('WHEN a title of exactly the limit is typed', () =>
      retype(titleField(component), 'a'.repeat(TITLE_MAX_LENGTH)))

    await test.step('THEN it is accepted', async () => {
      await expect(titleField(component)).toHaveValue('a'.repeat(TITLE_MAX_LENGTH))
      await expect(component.getByText(MAX_TITLE_MESSAGE, { exact: true })).not.toBeAttached()
      await expect(submitButton(component)).toBeEnabled()
    })
  })

  test('GIVEN the title length limit, WHEN a longer title is typed, THEN the field truncates it instead of reporting an error', async ({
    mount,
  }) => {
    const component = await test.step('GIVEN the title length limit', () =>
      mount(`${STORY}/Default`))

    await test.step('WHEN a longer title is typed', () =>
      retype(titleField(component), OVERLONG_TITLE))

    await test.step('THEN the field truncates it instead of reporting an error', async () => {
      await expect(titleField(component)).toHaveValue(OVERLONG_TITLE.slice(0, TITLE_MAX_LENGTH))
      await expect(component.getByText(MAX_TITLE_MESSAGE, { exact: true })).not.toBeAttached()
      await expect(submitButton(component)).toBeEnabled()
    })
  })

  test('GIVEN an unedited group, WHEN the title is replaced with only spaces, THEN it is accepted and submitted verbatim', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN an unedited group', () => mount(`${STORY}/Default`))

    await test.step('WHEN the title is replaced with only spaces', async () => {
      await retype(titleField(component), WHITESPACE_TITLE)
      await expect(component.getByText(EMPTY_TITLE_MESSAGE, { exact: true })).not.toBeAttached()
      await expect(submitButton(component)).toBeEnabled()
    })

    await test.step('THEN it is submitted verbatim', async () => {
      await submitButton(component).click()
      await awaitOperation(page, UPDATE_MUTATION)

      const operation = await lastOf(page, UPDATE_MUTATION)

      expect(operation?.variables.input.title).toBe(WHITESPACE_TITLE)
    })
  })

  test('GIVEN a changed title, WHEN it is submitted, THEN only the dirty title is sent', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a changed title', () => mount(`${STORY}/Default`))

    await test.step('WHEN it is submitted', () => submitTitleChange(component, page))

    await test.step('THEN only the dirty title is sent', async () => {
      const operation = await lastOf(page, UPDATE_MUTATION)

      expect(operation?.variables.input).toEqual({
        roomId: TEST_ROOM_ID,
        profileId: CURRENT_PROFILE_ID,
        title: NEW_TITLE,
      })
    })
  })

  test('GIVEN a group with no avatar, WHEN one is uploaded and submitted, THEN the image is sent outside the variables', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a group with no avatar', async () => {
      const mounted = await mount(`${STORY}/WithoutImage`)
      await expect(submitButton(mounted)).toBeDisabled()
      return mounted
    })

    await test.step('WHEN one is uploaded', async () => {
      await fileInput(component).setInputFiles(LOGO_PATH)

      await expect(
        imageSection(component).getByRole('button', { name: 'Change Avatar', exact: true }),
      ).toBeVisible()
      await expect(removeImageButton(component)).toBeVisible()
      await expect(imageSection(component).locator('img')).toHaveCount(1)
      await expect(submitButton(component)).toBeEnabled()
    })

    await test.step('THEN the image is sent outside the variables', async () => {
      await submitButton(component).click()
      await awaitOperation(page, UPDATE_MUTATION)

      const operation = await lastOf(page, UPDATE_MUTATION)

      expect(operation?.variables.input).toEqual({
        roomId: TEST_ROOM_ID,
        profileId: CURRENT_PROFILE_ID,
      })
    })
  })

  test('GIVEN a group with an avatar, WHEN it is removed and submitted, THEN a deletion is requested', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a group with an avatar', () =>
      mount(`${STORY}/Default`))

    await test.step('WHEN it is removed', async () => {
      await removeImageButton(component).click()

      await expect(
        imageSection(component).getByRole('button', { name: 'Upload Avatar', exact: true }),
      ).toBeVisible()
      await expect(removeImageButton(component)).not.toBeAttached()
      await expect(imageSection(component).locator('img')).toHaveCount(0)
      await expect(submitButton(component)).toBeEnabled()
    })

    await test.step('THEN a deletion is requested', async () => {
      await submitButton(component).click()
      await awaitOperation(page, UPDATE_MUTATION)

      const operation = await lastOf(page, UPDATE_MUTATION)

      expect(operation?.variables.input).toEqual({
        roomId: TEST_ROOM_ID,
        profileId: CURRENT_PROFILE_ID,
        deleteImage: true,
      })
    })
  })

  test('GIVEN a group with no roomId, WHEN a changed title is submitted, THEN nothing is committed', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a group with no roomId', () =>
      mount(`${STORY}/WithoutRoomId`))

    await test.step('WHEN a changed title is submitted', async () => {
      await retype(titleField(component), NEW_TITLE)
      await expect(submitButton(component)).toBeEnabled()
      await submitButton(component).click()
    })

    await test.step('THEN nothing is committed', async () => {
      await expect(titleField(component)).toHaveValue(NEW_TITLE)
      await expect(submitButton(component)).toBeEnabled()
      expect(await countOf(page, UPDATE_MUTATION)).toBe(0)
      await expect(validSubmissionCount(component)).toHaveValue('0')
    })
  })

  test('GIVEN a submitted change, WHEN the mutation reports no errors, THEN the valid-submission callback fires once', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a submitted change', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await expect(validSubmissionCount(mounted)).toHaveValue('0')
      await submitTitleChange(mounted, page)
      return mounted
    })

    await test.step('WHEN the mutation reports no errors', () =>
      resolve(page, 'resolveUpdateWithoutErrors'))

    await test.step('THEN the valid-submission callback fires once', async () => {
      await expect(validSubmissionCount(component)).toHaveValue('1')
      await expect(cancellationCount(component)).toHaveValue('0')
    })
  })

  test('GIVEN a submitted change, WHEN the mutation reports an error on the title, THEN it is toasted and reported on the field', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a submitted change', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await submitTitleChange(mounted, page)
      return mounted
    })

    await test.step('WHEN the mutation reports an error on the title', () =>
      resolve(page, 'resolveUpdateWithTitleError'))

    await test.step('THEN it is toasted and reported on the field', async () => {
      await expect(toast(page, UPDATE_ERROR_TOAST)).toBeVisible()
      await expect(component.getByText(PAYLOAD_ERROR_MESSAGE, { exact: true })).toBeVisible()
      await expect(validSubmissionCount(component)).toHaveValue('0')
    })
  })

  test('GIVEN a submitted change, WHEN the mutation reports an empty error array, THEN it is treated as a failure', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a submitted change', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await submitTitleChange(mounted, page)
      return mounted
    })

    await test.step('WHEN the mutation reports an empty error array', () =>
      resolve(page, 'resolveUpdateWithEmptyErrors'))

    await test.step('THEN it is treated as a failure', async () => {
      await expect(toast(page, UPDATE_ERROR_TOAST)).toBeVisible()
      await expect(validSubmissionCount(component)).toHaveValue('0')
    })
  })

  test('GIVEN a submitted change, WHEN the mutation reports an error on a field the form does not have, THEN only the toast is shown', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a submitted change', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await submitTitleChange(mounted, page)
      return mounted
    })

    await test.step('WHEN the mutation reports an error on a field the form does not have', () =>
      resolve(page, 'resolveUpdateWithUnknownFieldError'))

    await test.step('THEN only the toast is shown', async () => {
      await expect(toast(page, UPDATE_ERROR_TOAST)).toBeVisible()
      await expect(component.getByText(PAYLOAD_ERROR_MESSAGE, { exact: true })).not.toBeAttached()
      await expect(validSubmissionCount(component)).toHaveValue('0')
    })
  })

  test('GIVEN a submitted change, WHEN the request fails at the transport layer, THEN the failure is toasted and nothing succeeds', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a submitted change', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await submitTitleChange(mounted, page)
      return mounted
    })

    await test.step('WHEN the request fails at the transport layer', () =>
      resolve(page, 'rejectUpdateWithTransportError'))

    await test.step('THEN the failure is toasted and nothing succeeds', async () => {
      await expect(toast(page, TRANSPORT_ERROR_MESSAGE)).toBeVisible()
      await expect(validSubmissionCount(component)).toHaveValue('0')
    })
  })

  test('GIVEN a submitted change, WHEN the response carries a GraphQL error but no payload errors, THEN the error is toasted and the submission still counts as valid', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a submitted change', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await submitTitleChange(mounted, page)
      return mounted
    })

    await test.step('WHEN the response carries a GraphQL error but no payload errors', () =>
      resolve(page, 'resolveUpdateWithTopLevelErrors'))

    await test.step('THEN the error is toasted and the submission still counts as valid', async () => {
      await expect(toast(page, TOP_LEVEL_ERROR_MESSAGE)).toBeVisible()
      await expect(validSubmissionCount(component)).toHaveValue('1')
    })
  })

  test('GIVEN a submission in flight, THEN the submit button shows a spinner but still accepts a second click', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a submission in flight', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await submitTitleChange(mounted, page)
      return mounted
    })

    await test.step('THEN the submit button shows a spinner', async () => {
      await expect(submitButton(component).getByRole('progressbar')).toBeVisible()
      await expect(submitButton(component)).toBeEnabled()
    })

    await test.step('THEN a second click commits a second mutation', async () => {
      await submitButton(component).click()
      await awaitOperation(page, UPDATE_MUTATION, 2)
    })
  })

  test('GIVEN a submission in flight, THEN the title and image controls are disabled', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a submission in flight', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await submitTitleChange(mounted, page)
      return mounted
    })

    await expect(titleField(component)).toBeDisabled()
    await expect(
      imageSection(component).getByRole('button', { name: 'Change Avatar', exact: true }),
    ).toBeDisabled()
    await expect(removeImageButton(component)).toBeDisabled()
  })

  test('GIVEN an editable group, WHEN the close button is clicked, THEN the cancellation callback fires and nothing is committed', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN an editable group', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await expect(cancellationCount(mounted)).toHaveValue('0')
      return mounted
    })

    await test.step('WHEN the close button is clicked', () => cancelButton(component).click())

    await test.step('THEN the cancellation callback fires and nothing is committed', async () => {
      await expect(cancellationCount(component)).toHaveValue('1')
      expect(await countOf(page, UPDATE_MUTATION)).toBe(0)
    })
  })

  test('GIVEN no current profile, THEN the component renders nothing', async ({ mount }) => {
    const component = await mount(`${STORY}/WithoutProfile`)

    await expect(cancellationCount(component)).toHaveValue('0')
    await expect(titleField(component)).not.toBeAttached()
    await expect(submitButton(component)).not.toBeAttached()
    await expect(cancelButton(component)).not.toBeAttached()
  })

  test('GIVEN an empty title, THEN the error is announced on the field it belongs to', async ({
    mount,
  }) => {
    const component = await test.step('GIVEN an empty title', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await retype(titleField(mounted), '')
      await expect(mounted.getByText(EMPTY_TITLE_MESSAGE, { exact: true })).toBeVisible()
      return mounted
    })

    await test.step('THEN the error is announced on the field it belongs to', async () => {
      const describedBy = await titleField(component).getAttribute('aria-describedby')

      expect(describedBy).toBeTruthy()
      await expect(component.locator(`[id="${describedBy}"]`)).toHaveText(EMPTY_TITLE_MESSAGE)
    })
  })

  test('GIVEN a dirty form, WHEN focus leaves the close button, THEN it reaches the submit button', async ({
    mount,
  }) => {
    const component = await test.step('GIVEN a dirty form', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await retype(titleField(mounted), NEW_TITLE)
      await expect(submitButton(mounted)).toBeEnabled()
      return mounted
    })

    await test.step('WHEN focus leaves the close button', async () => {
      await cancelButton(component).focus()
      await expect(cancelButton(component)).toBeFocused()
      await component.page().keyboard.press('Tab')
    })

    await test.step('THEN it reaches the submit button', async () => {
      await expect(submitButton(component)).toBeFocused()
    })
  })

  test('GIVEN a group with members, THEN each member is listed with a handle inside a labelled list', async ({
    mount,
  }) => {
    const component = await mount(`${STORY}/Default`)

    await expect(component.locator('menu[aria-label="Selected group members"]')).toBeAttached()
    await expect(component.getByText('Members', { exact: true })).toBeVisible()

    for (const profile of [adaProfileNode, graceProfileNode]) {
      await test.step(profile.name, async () => {
        await expect(component.getByText(profile.name, { exact: true })).toBeAttached()
        await expect(
          component.getByText(`@${profile.urlPath.path}`, { exact: true }),
        ).toBeAttached()
        await expect(
          rowFor(component, profile.name).getByRole('button', { name: 'Remove', exact: true }),
        ).toBeAttached()
      })
    }
  })

  test('GIVEN a group with no members, THEN the empty state replaces the list and the add-member affordance', async ({
    mount,
  }) => {
    const component = await mount(`${STORY}/WithoutMembers`)

    await expect(component.getByText('Search for profiles', { exact: true })).toBeVisible()
    await expect(addMemberButton(component)).not.toBeAttached()
  })

  test('GIVEN a group with more members than one page, WHEN the list is scrolled to the end, THEN the next page is fetched and appended', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a group with more members than one page', async () => {
      const mounted = await mount(`${STORY}/PaginatedMembers`)

      await expect(mounted.getByText(adaProfileNode.name, { exact: true })).toBeAttached()
      expect(await countOf(page, PARTICIPANTS_QUERY)).toBe(0)

      return mounted
    })

    await test.step('WHEN the list is scrolled to the end', async () => {
      for (const name of FIRST_PAGE_MEMBER_NAMES) {
        await expect(component.getByText(name, { exact: true })).toBeAttached()
        await scrollTo(rowFor(component, name))
      }

      await awaitOperation(page, PARTICIPANTS_QUERY)
      await expect(loader(component)).toBeAttached()
    })

    await test.step('THEN the next page is fetched and appended', async () => {
      await resolve(page, 'resolveParticipantsPage')

      await expect(loader(component)).not.toBeAttached()
      await scrollTo(rowFor(component, katherineProfileNode.name))
      await expect(component.getByText(edsgerProfileNode.name, { exact: true })).toBeAttached()
    })
  })

  test('GIVEN the members search, WHEN a name is typed, THEN the participants are refetched with the search term dropped', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN the members search', () => mount(`${STORY}/Default`))

    await test.step('WHEN a name is typed', async () => {
      await searchField(component).pressSequentially(adaProfileNode.name)
      await awaitOperation(page, PARTICIPANTS_QUERY)
    })

    await test.step('THEN the participants are refetched with the search term dropped', async () => {
      const operation = await lastOf(page, PARTICIPANTS_QUERY)

      expect(operation?.declaredVariables).toEqual(
        expect.arrayContaining(['count', 'cursor', 'id']),
      )
      expect(operation?.declaredVariables).not.toContain('q')
      expect(operation?.variables).not.toHaveProperty('q')
      expect(operation?.variables.id).toBe(TEST_ROOM_ID)
    })
  })

  test('GIVEN a searched members list, WHEN the search is cleared, THEN the field empties once the refetch it cannot distinguish settles', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a searched members list', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await searchField(mounted).pressSequentially(adaProfileNode.name)
      await awaitOperation(page, PARTICIPANTS_QUERY)
      await expect(searchField(mounted)).toHaveValue(adaProfileNode.name)
      return mounted
    })

    await test.step('WHEN the search is cleared', () => clearSearchButton(component).click())

    await test.step('THEN no further request is issued, because the variables are identical', async () => {
      await expect(searchField(component)).toHaveValue(adaProfileNode.name)
      expect(await countOf(page, PARTICIPANTS_QUERY)).toBe(1)
    })

    await test.step('THEN the field empties once that refetch settles', async () => {
      await resolve(page, 'resolveParticipantsRefetch')

      await expect(searchField(component)).toHaveValue('')
      await expect(component.getByText(adaProfileNode.name, { exact: true })).toBeAttached()
    })
  })

  test('GIVEN a group with members, WHEN another member is removed, THEN the dialog names them and the removal is committed', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a group with members', () => mount(`${STORY}/Default`))

    await test.step('WHEN another member is removed', async () => {
      await rowFor(component, adaProfileNode.name)
        .getByRole('button', { name: 'Remove', exact: true })
        .click()

      await expect(
        dialog(page).getByText(`Remove ${adaProfileNode.name}?`, { exact: true }),
      ).toBeVisible()

      await dialog(page).getByRole('button', { name: 'Remove', exact: true }).click()
      await awaitOperation(page, UPDATE_MUTATION)
    })

    await test.step('THEN the removal is committed', async () => {
      const operation = await lastOf(page, UPDATE_MUTATION)

      expect(operation?.variables.input).toEqual({
        roomId: TEST_ROOM_ID,
        profileId: CURRENT_PROFILE_ID,
        removeParticipants: [adaProfileNode.id],
      })
      expect(operation?.variables.connections).toEqual([
        expect.stringContaining('ChatRoom_participants'),
      ])
    })

    await test.step('THEN the member disappears once the removal is confirmed', async () => {
      await resolve(page, 'resolveMemberRemoval')

      await expect(toast(page, 'Member was successfully removed')).toBeVisible()
      await expect(dialog(page)).not.toBeVisible()
      await expect(component.getByText(adaProfileNode.name, { exact: true })).not.toBeAttached()
      await expect(component.getByText(graceProfileNode.name, { exact: true })).toBeAttached()
    })
  })

  test('GIVEN a removal dialog, WHEN it is cancelled, THEN it closes and nothing is committed', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a removal dialog', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await rowFor(mounted, adaProfileNode.name)
        .getByRole('button', { name: 'Remove', exact: true })
        .click()
      await expect(dialog(page)).toBeVisible()
      return mounted
    })

    await test.step('WHEN it is cancelled', () => dialogCancelButton(page).click())

    await test.step('THEN it closes and nothing is committed', async () => {
      await expect(dialog(page)).not.toBeVisible()
      await expect(component.getByText(adaProfileNode.name, { exact: true })).toBeAttached()
      expect(await countOf(page, UPDATE_MUTATION)).toBe(0)
    })
  })

  test('GIVEN a confirmed removal, WHEN the mutation reports a payload error, THEN it is toasted and the member stays in the list', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a confirmed removal', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await rowFor(mounted, adaProfileNode.name)
        .getByRole('button', { name: 'Remove', exact: true })
        .click()
      await dialog(page).getByRole('button', { name: 'Remove', exact: true }).click()
      await awaitOperation(page, UPDATE_MUTATION)
      return mounted
    })

    await test.step('WHEN the mutation reports a payload error', () =>
      resolve(page, 'resolveMemberRemovalWithPayloadError'))

    await test.step('THEN it is toasted and the member stays in the list', async () => {
      await expect(toast(page, PAYLOAD_ERROR_MESSAGE)).toBeVisible()
      await expect(component.getByText(adaProfileNode.name, { exact: true })).toBeAttached()
    })
  })

  test('GIVEN the signed-in profile is the sole admin, WHEN they remove themselves, THEN the dialog warns about leaving without an admin', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN the signed-in profile is the sole admin', () =>
      mount(`${STORY}/Default`))

    await test.step('WHEN they remove themselves', () =>
      rowFor(component, 'Current Profile')
        .getByRole('button', { name: 'Remove', exact: true })
        .click())

    await test.step('THEN the dialog warns about leaving without an admin', async () => {
      await expect(
        dialog(page).getByText('Leave without choosing an admin?', { exact: true }),
      ).toBeVisible()
      await expect(
        dialog(page).getByRole('button', { name: 'Leave group', exact: true }),
      ).toBeVisible()
    })
  })

  test('GIVEN the signed-in profile is a plain member, WHEN they remove themselves, THEN the dialog asks about leaving the group chat', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN the signed-in profile is a plain member', () =>
      mount(`${STORY}/CurrentProfileIsMember`))

    await test.step('WHEN they remove themselves', () =>
      rowFor(component, 'Current Profile')
        .getByRole('button', { name: 'Remove', exact: true })
        .click())

    await test.step('THEN the dialog asks about leaving the group chat', async () => {
      await expect(dialog(page).getByText('Leave group chat?', { exact: true })).toBeVisible()
      await expect(
        dialog(page).getByRole('button', { name: 'Leave group', exact: true }),
      ).toBeVisible()
    })
  })

  test('GIVEN a group with members, WHEN the add-member affordance is used, THEN the dialog lists every profile except the signed-in one', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a group with members', () => mount(`${STORY}/Default`))

    await test.step('WHEN the add-member affordance is used', () =>
      openAddMembersDialog(component, page))

    await test.step('THEN the dialog lists every profile except the signed-in one', async () => {
      for (const profile of [adaProfileNode, alanProfileNode, katherineProfileNode]) {
        await expect(dialog(page).getByText(profile.name, { exact: true })).toBeAttached()
      }
      await expect(dialog(page).getByText('Current Profile', { exact: true })).not.toBeAttached()
    })
  })

  test('GIVEN the add-members dialog, THEN a profile already in the group cannot be selected', async ({
    mount,
    page,
  }) => {
    const component = await mount(`${STORY}/Default`)
    await openAddMembersDialog(component, page)

    const existingMember = rowFor(dialog(page), adaProfileNode.name)

    await expect(
      existingMember.getByText('Already added to the group', { exact: true }),
    ).toBeVisible()
    await expect(existingMember.getByRole('checkbox')).toHaveCount(0)
    await expect(rowFor(dialog(page), alanProfileNode.name).getByRole('checkbox')).toBeVisible()
  })

  test('GIVEN the add-members dialog, WHEN a profile is selected, THEN it joins the selection and confirmation becomes possible', async ({
    mount,
    page,
  }) => {
    await test.step('GIVEN the add-members dialog', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await openAddMembersDialog(mounted, page)
      await expect(confirmButton(page)).toBeDisabled()
    })

    await test.step('WHEN a profile is selected', () => selectProfile(page, alanProfileNode.name))

    await test.step('THEN it joins the selection and confirmation becomes possible', async () => {
      await expect(dialog(page).getByText(alanProfileNode.name, { exact: true })).toHaveCount(2)
      await expect(selectionRemoveButtons(page)).toHaveCount(1)
      await expect(confirmButton(page)).toBeEnabled()
    })

    await test.step('WHEN the same profile is deselected, THEN confirmation is refused again', async () => {
      await rowFor(dialog(page), alanProfileNode.name).getByRole('checkbox').uncheck()

      await expect(dialog(page).getByText(alanProfileNode.name, { exact: true })).toHaveCount(1)
      await expect(confirmButton(page)).toBeDisabled()
    })
  })

  test('GIVEN a selected profile, WHEN it is dismissed from the selection, THEN its row is deselected', async ({
    mount,
    page,
  }) => {
    await test.step('GIVEN a selected profile', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await openAddMembersDialog(mounted, page)
      await selectProfile(page, alanProfileNode.name)
      await expect(selectionRemoveButtons(page)).toHaveCount(1)
    })

    await test.step('WHEN it is dismissed from the selection', () =>
      selectionRemoveButtons(page).click())

    await test.step('THEN its row is deselected', async () => {
      await expect(selectionRemoveButtons(page)).toHaveCount(0)
      await expect(
        rowFor(dialog(page), alanProfileNode.name).getByRole('checkbox'),
      ).not.toBeChecked()
      await expect(confirmButton(page)).toBeDisabled()
    })
  })

  test('GIVEN a selected profile, WHEN the selection is confirmed, THEN the addition is committed and the dialog closes', async ({
    mount,
    page,
  }) => {
    await test.step('GIVEN a selected profile', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await openAddMembersDialog(mounted, page)
      await selectProfile(page, alanProfileNode.name)
    })

    await test.step('WHEN the selection is confirmed', async () => {
      await confirmButton(page).click()
      await awaitOperation(page, UPDATE_MUTATION)
    })

    await test.step('THEN the addition is committed', async () => {
      const operation = await lastOf(page, UPDATE_MUTATION)

      expect(operation?.variables.input).toEqual({
        roomId: TEST_ROOM_ID,
        profileId: CURRENT_PROFILE_ID,
        addParticipants: [alanProfileNode.id],
      })
    })

    await test.step('THEN the dialog closes', async () => {
      await resolve(page, 'resolveAddParticipants')

      await expect(dialog(page)).not.toBeVisible()
    })
  })

  test('GIVEN a confirmed selection in flight, THEN the confirm button refuses a second click', async ({
    mount,
    page,
  }) => {
    await test.step('GIVEN a confirmed selection in flight', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await openAddMembersDialog(mounted, page)
      await selectProfile(page, alanProfileNode.name)
      await confirmButton(page).click()
      await awaitOperation(page, UPDATE_MUTATION)
    })

    await expect(confirmButton(page)).toBeDisabled()
    await expect(dialog(page).getByText(alanProfileNode.name, { exact: true })).toHaveCount(2)
  })

  test('GIVEN a confirmed selection, WHEN the mutation reports a payload error, THEN it is toasted and the dialog stays open', async ({
    mount,
    page,
  }) => {
    await test.step('GIVEN a confirmed selection', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await openAddMembersDialog(mounted, page)
      await selectProfile(page, alanProfileNode.name)
      await confirmButton(page).click()
      await awaitOperation(page, UPDATE_MUTATION)
    })

    await test.step('WHEN the mutation reports a payload error', () =>
      resolve(page, 'resolveAddParticipantsWithPayloadError'))

    await test.step('THEN it is toasted and the dialog stays open', async () => {
      await expect(toast(page, UPDATE_ERROR_TOAST)).toBeVisible()
      await expect(dialog(page).getByText('Add Members', { exact: true })).toBeVisible()
    })
  })

  test('GIVEN a selected profile, WHEN the dialog is cancelled and reopened, THEN the selection is empty again', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a selected profile', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await openAddMembersDialog(mounted, page)
      await selectProfile(page, alanProfileNode.name)
      await expect(selectionRemoveButtons(page)).toHaveCount(1)
      return mounted
    })

    await test.step('WHEN the dialog is cancelled', async () => {
      await dialogCancelButton(page).click()
      await expect(dialog(page)).not.toBeVisible()
    })

    await test.step('THEN reopening it shows an empty selection', async () => {
      await openAddMembersDialog(component, page)

      await expect(selectionRemoveButtons(page)).toHaveCount(0)
      await expect(
        rowFor(dialog(page), alanProfileNode.name).getByRole('checkbox'),
      ).not.toBeChecked()
      await expect(confirmButton(page)).toBeDisabled()
    })
  })

  test('GIVEN the add-members dialog, WHEN a name is searched, THEN the profiles are refetched with a search term the query declares', async ({
    mount,
    page,
  }) => {
    await test.step('GIVEN the add-members dialog', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await openAddMembersDialog(mounted, page)
    })

    await test.step('WHEN a name is searched', async () => {
      await searchField(dialog(page)).pressSequentially(gladysProfileNode.name)
      await awaitOperation(page, PROFILES_QUERY)
    })

    await test.step('THEN the profiles are refetched with a search term the query declares', async () => {
      const operation = await lastOf(page, PROFILES_QUERY)

      expect(operation?.variables.q).toBe(gladysProfileNode.name)
      expect(operation?.declaredVariables).toContain('q')
    })

    await test.step('THEN the match replaces the list', async () => {
      await resolve(page, 'resolveProfilesWithMatch')

      await expect(dialog(page).getByText(gladysProfileNode.name, { exact: true })).toBeAttached()
      await expect(dialog(page).getByText(alanProfileNode.name, { exact: true })).not.toBeAttached()
    })
  })

  test('GIVEN a searched add-members dialog, WHEN nothing matches, THEN the not-found state is shown', async ({
    mount,
    page,
  }) => {
    await test.step('GIVEN a searched add-members dialog', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await openAddMembersDialog(mounted, page)
      await searchField(dialog(page)).pressSequentially('Nobody')
      await awaitOperation(page, PROFILES_QUERY)
    })

    await test.step('WHEN nothing matches', () => resolve(page, 'resolveProfilesWithNoMatch'))

    await test.step('THEN the not-found state is shown', async () => {
      await expect(dialog(page).getByText('No results found', { exact: true })).toBeVisible()
      await expect(dialog(page).getByText(alanProfileNode.name, { exact: true })).not.toBeAttached()
    })
  })

  test('GIVEN a phone viewport, WHEN the add-member affordance is used, THEN a full screen replaces the edit view instead of a dialog', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a phone viewport', async () => {
      await page.setViewportSize(PHONE_VIEWPORT)
      return mount(`${STORY}/Default`)
    })

    await test.step('WHEN the add-member affordance is used', () =>
      addMemberButton(component).click())

    await test.step('THEN a full screen replaces the edit view instead of a dialog', async () => {
      await expect(
        component.getByRole('button', { name: 'cancel adding member', exact: true }),
      ).toBeVisible()
      await expect(component.getByRole('button', { name: 'Add Member', exact: true })).toBeVisible()
      await expect(cancelButton(component)).not.toBeAttached()
      await expect(titleField(component)).not.toBeAttached()
      await expect(dialog(page)).not.toBeVisible()
    })

    await test.step('WHEN the back button is used, THEN the edit view returns', async () => {
      await component.getByRole('button', { name: 'cancel adding member', exact: true }).click()

      await expect(cancelButton(component)).toBeVisible()
      await expect(titleField(component)).toHaveValue(GROUP_TITLE)
    })
  })

  test('GIVEN the mobile add-member screen, WHEN a selected profile is confirmed, THEN the addition is committed and the edit view returns', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN the mobile add-member screen', async () => {
      await page.setViewportSize(PHONE_VIEWPORT)
      const mounted = await mount(`${STORY}/Default`)
      await addMemberButton(mounted).click()
      await expect(
        mounted.getByRole('button', { name: 'cancel adding member', exact: true }),
      ).toBeVisible()
      return mounted
    })

    await test.step('WHEN a selected profile is confirmed', async () => {
      await rowFor(component, alanProfileNode.name).getByRole('checkbox').check()
      await component.getByRole('button', { name: 'Add Member', exact: true }).click()
      await awaitOperation(page, UPDATE_MUTATION)
    })

    await test.step('THEN the addition is committed', async () => {
      const operation = await lastOf(page, UPDATE_MUTATION)

      expect(operation?.variables.input).toEqual({
        roomId: TEST_ROOM_ID,
        profileId: CURRENT_PROFILE_ID,
        addParticipants: [alanProfileNode.id],
      })
    })

    await test.step('THEN the edit view returns', async () => {
      await resolve(page, 'resolveAddParticipants')

      await expect(cancelButton(component)).toBeVisible()
      await expect(titleField(component)).toHaveValue(GROUP_TITLE)
    })
  })

  test('GIVEN an open editor, WHEN a room update reports the signed-in profile was removed, THEN the removal callback fires', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN an open editor', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await expect(removalCount(mounted)).toHaveValue('0')
      return mounted
    })

    await test.step('WHEN a room update reports somebody else was removed', async () => {
      await resolve(page, 'pushRemovalOfAnotherProfile')

      await expect(removalCount(component)).toHaveValue('0')
    })

    await test.step('WHEN a room update reports the signed-in profile was removed', () =>
      resolve(page, 'pushRemovalOfCurrentProfile'))

    await test.step('THEN the removal callback fires', async () => {
      await expect(removalCount(component)).toHaveValue('1')
    })
  })
})
