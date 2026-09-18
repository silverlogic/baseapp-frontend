import { type Locator, type Page, expect, test } from '@playwright/test'

import {
  MESSAGE,
  PAYLOAD_ERROR_MESSAGE,
  SEND_MESSAGE_ERROR_TOAST,
  TEST_ROOM_ID,
  TRANSPORT_ERROR_MESSAGE,
  currentProfileMock,
} from './__mocks__/requests'
import type { SendMessageControls } from './__utils__/SendMessage.story'

const STORY = 'messages/web/SendMessage/SendMessage'

const SUBMIT_BUTTON = { name: 'submit actions', exact: true } as const

const SECOND_MESSAGE = 'A second message typed while the first is in flight'

const MAX_BODY_LENGTH = 1000

const bodyOfLength = (length: number) => 'a'.repeat(length)

const CONNECTION_KEY = 'chatRoom_allMessages'

const lastOperation = (page: Page): Promise<ReturnType<SendMessageControls['getLastOperation']>> =>
  page.evaluate(() => window.__sendMessageControls.getLastOperation())

const pendingOperationCount = (page: Page): Promise<number> =>
  page.evaluate(() => window.__sendMessageControls.pendingOperationCount())

const resolve = (page: Page, key: keyof SendMessageControls) =>
  page.evaluate((k) => (window.__sendMessageControls[k] as () => void)(), key)

const errorToast = (page: Page) => page.getByText(SEND_MESSAGE_ERROR_TOAST, { exact: true })

const submitAndAwaitFlight = async (component: Locator, page: Page) => {
  await field(component).pressSequentially(MESSAGE)
  await submitButton(component).click()
  await expect.poll(() => pendingOperationCount(page)).toBe(1)
}

const field = (component: Locator) => component.getByRole('textbox')

const submitButton = (component: Locator) => component.getByRole('button', SUBMIT_BUTTON)

const mountEmpty = async (mount: (story: string) => Promise<Locator>, name = 'Default') => {
  const component = await mount(`${STORY}/${name}`)
  await expect(field(component)).toHaveValue('')
  await expect(submitButton(component)).toBeDisabled()
  return component
}

test.describe('Component: SendMessage', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies()
  })

  test('GIVEN an empty message field, THEN the submit button is disabled', async ({ mount }) => {
    const component = await test.step('GIVEN an empty message field', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await expect(field(mounted)).toHaveValue('')
      return mounted
    })

    await test.step('THEN the submit button is disabled', async () => {
      await expect(submitButton(component)).toBeDisabled()
    })
  })

  test('GIVEN an empty message field, WHEN only spaces are typed, THEN the submit button stays disabled', async ({
    mount,
  }) => {
    const component = await test.step('GIVEN an empty message field', () => mountEmpty(mount))

    await test.step('WHEN only spaces are typed', async () => {
      await field(component).pressSequentially('   ')
      await expect(field(component)).toHaveValue('   ')
    })

    await test.step('THEN the submit button stays disabled', async () => {
      await expect(submitButton(component)).toBeDisabled()
    })
  })

  test('GIVEN an empty message field, WHEN only markdown-escaped whitespace is typed, THEN the submit button stays disabled', async ({
    mount,
  }) => {
    const component = await test.step('GIVEN an empty message field', () => mountEmpty(mount))

    await test.step('WHEN only markdown-escaped whitespace is typed', async () => {
      await field(component).pressSequentially('&#x20;')
      await expect(field(component)).toHaveValue('&#x20;')
    })

    await test.step('THEN the submit button stays disabled', async () => {
      await expect(submitButton(component)).toBeDisabled()
    })
  })

  test('GIVEN an empty message field, WHEN a message with visible content is typed, THEN the submit button becomes enabled', async ({
    mount,
  }) => {
    const component = await test.step('GIVEN an empty message field', () => mountEmpty(mount))

    await test.step('WHEN a message with visible content is typed', async () => {
      await field(component).pressSequentially(MESSAGE)
      await expect(field(component)).toHaveValue(MESSAGE)
    })

    await test.step('THEN the submit button becomes enabled', async () => {
      await expect(submitButton(component)).toBeEnabled()
    })
  })

  test('GIVEN the body length limit, WHEN a message of exactly the limit is typed, THEN the submit button becomes enabled', async ({
    mount,
  }) => {
    const component = await test.step('GIVEN an empty message field', () => mountEmpty(mount))

    await test.step('WHEN a message of exactly the limit is typed', async () => {
      await field(component).pressSequentially(bodyOfLength(MAX_BODY_LENGTH))
      expect(await field(component).inputValue()).toHaveLength(MAX_BODY_LENGTH)
    })

    await test.step('THEN the submit button becomes enabled', async () => {
      await expect(submitButton(component)).toBeEnabled()
    })
  })

  test('GIVEN the body length limit, WHEN a message one character over the limit is typed, THEN the submit button stays disabled', async ({
    mount,
  }) => {
    const component = await test.step('GIVEN an empty message field', () => mountEmpty(mount))

    await test.step('WHEN a message one character over the limit is typed', async () => {
      await field(component).pressSequentially(bodyOfLength(MAX_BODY_LENGTH + 1))
      expect(await field(component).inputValue()).toHaveLength(MAX_BODY_LENGTH + 1)
    })

    await test.step('THEN the submit button stays disabled', async () => {
      await expect(submitButton(component)).toBeDisabled()
    })
  })

  test('GIVEN a message with visible content, WHEN it is submitted, THEN the mutation carries the content, the current profile and the room', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a message with visible content', async () => {
      const mounted = await mountEmpty(mount)
      await field(mounted).pressSequentially(MESSAGE)
      await expect(submitButton(mounted)).toBeEnabled()
      expect(await lastOperation(page)).toBeNull()
      return mounted
    })

    await test.step('WHEN it is submitted', () => submitButton(component).click())

    await test.step('THEN the mutation carries the content, the current profile and the room', async () => {
      await expect
        .poll(() => lastOperation(page))
        .toMatchObject({
          name: 'SendMessageMutation',
          variables: {
            input: {
              content: MESSAGE,
              profileId: currentProfileMock.id,
              roomId: TEST_ROOM_ID,
            },
          },
        })
    })

    await test.step('AND the mutation targets the room message connection', async () => {
      const operation = await lastOperation(page)
      const connections = operation?.variables.connections as string[]

      expect(connections).toHaveLength(1)
      expect(connections[0]).toContain(TEST_ROOM_ID)
      expect(connections[0]).toContain(CONNECTION_KEY)
    })
  })

  test('GIVEN a submitted message, WHEN the server has not answered yet, THEN the field is already empty', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a message with visible content', async () => {
      const mounted = await mountEmpty(mount)
      await field(mounted).pressSequentially(MESSAGE)
      await expect(field(mounted)).toHaveValue(MESSAGE)
      return mounted
    })

    await test.step('WHEN it is submitted and the server has not answered yet', async () => {
      await submitButton(component).click()
      await expect.poll(() => pendingOperationCount(page)).toBe(1)
    })

    await test.step('THEN the field is already empty', async () => {
      await expect(field(component)).toHaveValue('')
      expect(await pendingOperationCount(page)).toBe(1)
    })

    await test.step('AND the in-flight mutation still carries the typed message', async () => {
      const operation = await lastOperation(page)
      expect(operation?.variables.input.content).toBe(MESSAGE)
    })
  })

  test('GIVEN a message with visible content, WHEN Control+Enter is pressed, THEN the message is submitted', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a message with visible content', async () => {
      const mounted = await mountEmpty(mount)
      await field(mounted).pressSequentially(MESSAGE)
      expect(await pendingOperationCount(page)).toBe(0)
      return mounted
    })

    await test.step('WHEN Control+Enter is pressed', () => field(component).press('Control+Enter'))

    await test.step('THEN the message is submitted', async () => {
      await expect.poll(() => pendingOperationCount(page)).toBe(1)

      const operation = await lastOperation(page)
      expect(operation?.variables.input.content).toBe(MESSAGE)
    })
  })

  test('GIVEN a message with visible content, WHEN Enter is pressed without Control, THEN nothing is submitted', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a message with visible content', async () => {
      const mounted = await mountEmpty(mount)
      await field(mounted).pressSequentially(MESSAGE)
      expect(await pendingOperationCount(page)).toBe(0)
      return mounted
    })

    await test.step('WHEN Enter is pressed without Control', async () => {
      await field(component).press('Enter')
      await expect(field(component)).toHaveValue(`${MESSAGE}\n`)
    })

    await test.step('THEN nothing is submitted', async () => {
      expect(await pendingOperationCount(page)).toBe(0)
      expect(await lastOperation(page)).toBeNull()
    })
  })

  test('GIVEN a send still in flight, WHEN a second message is typed and Control+Enter is pressed, THEN no second mutation starts', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a send still in flight', async () => {
      const mounted = await mountEmpty(mount)
      await field(mounted).pressSequentially(MESSAGE)
      await field(mounted).press('Control+Enter')
      await expect.poll(() => pendingOperationCount(page)).toBe(1)
      await expect(field(mounted)).toHaveValue('')
      return mounted
    })

    await test.step('WHEN a second message is typed', async () => {
      await field(component).pressSequentially(SECOND_MESSAGE)
      await expect(field(component)).toHaveValue(SECOND_MESSAGE)
    })

    await test.step('THEN the submit button stays disabled while the first send is in flight', async () => {
      await expect(submitButton(component)).toBeDisabled()
    })

    await test.step('AND pressing Control+Enter does not start a second mutation', async () => {
      await field(component).press('Control+Enter')
      await field(component).pressSequentially('!')
      await expect(field(component)).toHaveValue(`${SECOND_MESSAGE}!`)

      expect(await pendingOperationCount(page)).toBe(1)
      const operation = await lastOperation(page)
      expect(operation?.variables.input.content).toBe(MESSAGE)
    })
  })

  test('GIVEN no current profile, WHEN a valid message is submitted, THEN nothing is sent and nothing throws', async ({
    mount,
    page,
  }) => {
    const pageErrors: string[] = []
    page.on('pageerror', (error) => pageErrors.push(error.message))

    const component = await test.step('GIVEN no current profile and a valid message', async () => {
      const mounted = await mountEmpty(mount, 'WithoutProfile')
      await field(mounted).pressSequentially(MESSAGE)
      await expect(submitButton(mounted)).toBeEnabled()
      return mounted
    })

    await test.step('WHEN it is submitted', async () => {
      await submitButton(component).click()
      await field(component).pressSequentially('!')
      await expect(field(component)).toHaveValue(`${MESSAGE}!`)
    })

    await test.step('THEN no mutation is sent', async () => {
      expect(await pendingOperationCount(page)).toBe(0)
      expect(await lastOperation(page)).toBeNull()
    })

    await test.step('AND nothing throws', () => {
      expect(pageErrors).toEqual([])
    })
  })

  test('GIVEN a submitted message, WHEN the server answers successfully with an empty errors array, THEN no error toast is shown', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a submitted message', async () => {
      const mounted = await mountEmpty(mount)
      await submitAndAwaitFlight(mounted, page)
      await expect(errorToast(page)).not.toBeAttached()
      return mounted
    })

    await test.step('WHEN the server answers successfully with an empty errors array', async () => {
      await resolve(page, 'resolveWithEmptyErrors')
      await expect.poll(() => pendingOperationCount(page)).toBe(0)
    })

    await test.step('THEN no error toast is shown', async () => {
      await expect(errorToast(page)).not.toBeAttached()
    })

    await test.step('AND the field stays empty and ready for the next message', async () => {
      await expect(field(component)).toHaveValue('')
    })
  })

  test('GIVEN a submitted message, WHEN the request fails at the transport layer, THEN the generic error toast is shown instead of the raw error', async ({
    mount,
    page,
  }) => {
    await test.step('GIVEN a submitted message', async () => {
      const mounted = await mountEmpty(mount)
      await submitAndAwaitFlight(mounted, page)
      await expect(errorToast(page)).not.toBeAttached()
    })

    await test.step('WHEN the request fails at the transport layer', async () => {
      await resolve(page, 'rejectWithTransportError')
      await expect.poll(() => pendingOperationCount(page)).toBe(0)
    })

    await test.step('THEN the generic error toast is shown', async () => {
      await expect(errorToast(page)).toBeAttached()
    })

    await test.step('AND the raw transport error is not shown to the user', async () => {
      await expect(page.getByText(TRANSPORT_ERROR_MESSAGE, { exact: true })).not.toBeAttached()
    })
  })

  test('GIVEN a submitted message, WHEN the server rejects it with an error naming the body field, THEN the message is shown on the field', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a submitted message', async () => {
      const mounted = await mountEmpty(mount)
      await submitAndAwaitFlight(mounted, page)
      await expect(field(mounted)).toHaveAttribute('aria-invalid', 'false')
      return mounted
    })

    await test.step('WHEN the server rejects it with an error naming the body field', async () => {
      await resolve(page, 'resolveWithBodyFieldError')
      await expect.poll(() => pendingOperationCount(page)).toBe(0)
    })

    await test.step('THEN the message is shown on the field', async () => {
      await expect(component.getByText(PAYLOAD_ERROR_MESSAGE, { exact: true })).toBeVisible()
      await expect(field(component)).toHaveAttribute('aria-invalid', 'true')
    })

    await test.step('AND the error toast is shown', async () => {
      await expect(errorToast(page)).toBeAttached()
    })
  })

  test('GIVEN a submitted message, WHEN the server rejects it with an error naming the GraphQL input field, THEN only the toast reports it', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a submitted message', async () => {
      const mounted = await mountEmpty(mount)
      await submitAndAwaitFlight(mounted, page)
      return mounted
    })

    await test.step('WHEN the server rejects it with an error naming the GraphQL input field', async () => {
      await resolve(page, 'resolveWithInputFieldError')
      await expect.poll(() => pendingOperationCount(page)).toBe(0)
    })

    await test.step('THEN the error toast is shown', async () => {
      await expect(errorToast(page)).toBeAttached()
    })

    await test.step('AND the message never reaches the field', async () => {
      await expect(component.getByText(PAYLOAD_ERROR_MESSAGE, { exact: true })).not.toBeAttached()
      await expect(field(component)).toHaveAttribute('aria-invalid', 'false')
    })
  })

  test('GIVEN a submitted message, WHEN the server answers successfully, THEN nothing is reported and the composer is ready again', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a submitted message', async () => {
      const mounted = await mountEmpty(mount)
      await submitAndAwaitFlight(mounted, page)
      return mounted
    })

    await test.step('WHEN the server answers successfully', async () => {
      await resolve(page, 'resolveWithoutErrors')
      await expect.poll(() => pendingOperationCount(page)).toBe(0)
    })

    await test.step('THEN nothing is reported to the user', async () => {
      await expect(errorToast(page)).not.toBeAttached()
      await expect(field(component)).toHaveAttribute('aria-invalid', 'false')
    })

    await test.step('AND the composer is empty and ready again', async () => {
      await expect(field(component)).toHaveValue('')
      await expect(submitButton(component)).toBeDisabled()

      await field(component).pressSequentially(SECOND_MESSAGE)
      await expect(submitButton(component)).toBeEnabled()
    })
  })
})
