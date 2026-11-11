import { type Locator, type Page, expect, test } from '@playwright/test'

import { DEFAULT_CARD_HOLD_STAFF_ACTIONS_MESSAGES as MESSAGES } from '../constants'
import {
  CARD_HOLD_ID,
  FAILURE_REASON,
  GRAPHQL_ERROR_MESSAGE,
  TRANSPORT_ERROR_MESSAGE,
} from './__mocks__/requests'
import type { CardHoldStaffActionsControls, Default } from './__utils__/CardHoldStaffActions.story'

/**
 * The confirmation dialog and the toast are portaled outside `#root`, so they are queried
 * through `page`; the failure panel lives inside the `mount()` locator.
 */
const STORY = 'payments/web/CardHoldStaffActions/CardHoldStaffActions'

const NON_FAILED_STATUSES = [
  'pending',
  'authorized',
  'released',
  'captured',
  'scheduled',
  'saved',
] as const

const DECISIONS = [
  {
    decision: 'keep',
    button: MESSAGES.keepButton,
    title: MESSAGES.keepTitle,
    confirm: MESSAGES.keepConfirm,
    mutation: 'CardHoldKeepMutation',
    resolveKey: 'resolveKeep',
    errorKey: 'resolveKeepWithGraphqlError',
  },
  {
    decision: 'cancel',
    button: MESSAGES.cancelButton,
    title: MESSAGES.cancelTitle,
    confirm: MESSAGES.cancelConfirm,
    mutation: 'CardHoldCancelMutation',
    resolveKey: 'resolveCancel',
    errorKey: 'resolveCancelWithGraphqlError',
  },
] as const

const resolve = (page: Page, key: keyof CardHoldStaffActionsControls) =>
  page.evaluate((k) => (window.__cardHoldStaffActionsControls[k] as () => void)(), key)

const lastOperation = (page: Page) =>
  page.evaluate(() => window.__cardHoldStaffActionsControls.getLastOperation())

const pendingOperationCount = (page: Page) =>
  page.evaluate(() => window.__cardHoldStaffActionsControls.pendingOperationCount())

const button = (component: Locator, name: string) =>
  component.getByRole('button', { name, exact: true })

const dialog = (page: Page) => page.getByRole('dialog')

const decidedCount = (component: Locator) => component.getByTestId('decided-count')

const mountFailed = async (mount: (story: string) => Promise<Locator>) => {
  const component = await mount(`${STORY}/Default`)
  await expect(component.getByText(MESSAGES.failureTitle, { exact: true })).toBeVisible()
  return component
}

/** Opens the dialog for `decision`, confirms it, and waits for the mutation to be in flight. */
const confirmDecision = async (
  component: Locator,
  page: Page,
  { button: label, title, confirm }: (typeof DECISIONS)[number],
) => {
  await button(component, label).click()
  await expect(dialog(page).getByText(title, { exact: true })).toBeVisible()
  expect(await pendingOperationCount(page)).toBe(0)

  await button(dialog(page), confirm).click()
  await expect.poll(() => pendingOperationCount(page)).toBe(1)
}

test.describe('Component: CardHoldStaffActions', () => {
  for (const status of NON_FAILED_STATUSES) {
    test(`GIVEN a ${status} hold, THEN nothing is rendered`, async ({ mount }) => {
      const component = await mount<typeof Default>(`${STORY}/Default`, { status })

      await expect(component.getByTestId('decided-count')).toBeAttached()
      await expect(component.getByRole('button')).toHaveCount(0)
      await expect(component).not.toContainText(/fail/i)
    })
  }

  test('GIVEN a failed hold, THEN the failure reason and both actions are shown', async ({
    mount,
  }, testInfo) => {
    const component = await mountFailed(mount)

    await expect(component.getByText(FAILURE_REASON, { exact: true })).toBeVisible()
    await expect(button(component, MESSAGES.keepButton)).toBeEnabled()
    await expect(button(component, MESSAGES.cancelButton)).toBeEnabled()

    await component
      .locator('> div')
      .screenshot({ path: testInfo.outputPath('card-hold-staff-actions-failed.png') })
  })

  test('GIVEN a failed hold with no failure reason, THEN the fallback is shown', async ({
    mount,
  }) => {
    const component = await mount<typeof Default>(`${STORY}/Default`, { failureReason: null })

    await expect(component.getByText(MESSAGES.unknownReason, { exact: true })).toBeVisible()
  })

  for (const scenario of DECISIONS) {
    test(`GIVEN a failed hold, WHEN ${scenario.decision} is confirmed and accepted, THEN ${scenario.mutation} is sent and onDecided fires`, async ({
      mount,
      page,
    }, testInfo) => {
      const component = await test.step('GIVEN a failed hold', () => mountFailed(mount))

      await test.step(`WHEN ${scenario.button} is clicked, THEN a confirmation opens and nothing is sent yet`, async () => {
        await button(component, scenario.button).click()

        await expect(dialog(page).getByText(scenario.title, { exact: true })).toBeVisible()
        expect(await pendingOperationCount(page)).toBe(0)
        await expect(decidedCount(component)).toHaveValue('0')

        await expect(page.locator('.MuiDialog-container')).toHaveCSS('opacity', '1')
        await dialog(page).screenshot({
          path: testInfo.outputPath(`card-hold-staff-actions-${scenario.decision}-dialog.png`),
        })
      })

      await test.step('WHEN the dialog is dismissed, THEN nothing is sent', async () => {
        await button(dialog(page), MESSAGES.dismiss).click()

        await expect(dialog(page)).not.toBeAttached()
        expect(await pendingOperationCount(page)).toBe(0)
      })

      await test.step(`WHEN it is confirmed, THEN ${scenario.mutation} is sent with the hold id`, async () => {
        await confirmDecision(component, page, scenario)

        expect(await lastOperation(page)).toEqual({
          name: scenario.mutation,
          variables: { input: { id: CARD_HOLD_ID } },
        })
        await expect(decidedCount(component)).toHaveValue('0')
      })

      await test.step('WHEN the backend accepts it, THEN onDecided fires once and the dialog closes', async () => {
        await resolve(page, scenario.resolveKey)

        await expect(decidedCount(component)).toHaveValue('1')
        await expect(component.getByTestId('last-decision')).toHaveValue(scenario.decision)
        await expect(dialog(page)).not.toBeAttached()
      })
    })

    test(`GIVEN a failed hold, WHEN ${scenario.decision} is answered with a GraphQL error, THEN onDecided does not fire and a toast is shown`, async ({
      mount,
      page,
    }) => {
      const component = await test.step('GIVEN a failed hold', () => mountFailed(mount))

      await test.step(`WHEN ${scenario.decision} is confirmed`, () =>
        confirmDecision(component, page, scenario))

      await test.step('WHEN the backend answers with a GraphQL error', () =>
        resolve(page, scenario.errorKey))

      await test.step('THEN a toast is shown and onDecided does not fire', async () => {
        await expect(page.getByText(GRAPHQL_ERROR_MESSAGE, { exact: true })).toBeVisible()
        await expect(dialog(page)).not.toBeAttached()
        await expect(decidedCount(component)).toHaveValue('0')
        await expect(button(component, scenario.button)).toBeEnabled()
      })
    })
  }

  test('GIVEN a failed hold, WHEN keep fails at the transport layer, THEN onDecided does not fire and a toast is shown', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a failed hold', () => mountFailed(mount))

    await test.step('WHEN keep is confirmed', () => confirmDecision(component, page, DECISIONS[0]))

    await test.step('WHEN the request fails', () => resolve(page, 'rejectWithTransportError'))

    await test.step('THEN a toast is shown and onDecided does not fire', async () => {
      await expect(page.getByText(TRANSPORT_ERROR_MESSAGE, { exact: true })).toBeVisible()
      await expect(dialog(page)).not.toBeAttached()
      await expect(decidedCount(component)).toHaveValue('0')
    })
  })

  test('GIVEN a failed hold, WHEN keep is accepted, THEN the kept notice replaces the buttons', async ({
    mount,
    page,
  }, testInfo) => {
    const component = await test.step('GIVEN a failed hold', () => mountFailed(mount))

    await test.step('WHEN keep is confirmed and accepted', async () => {
      await confirmDecision(component, page, DECISIONS[0])
      await resolve(page, 'resolveKeep')
      await expect(decidedCount(component)).toHaveValue('1')
    })

    await test.step('THEN the kept notice is shown and the buttons are gone', async () => {
      await expect(component.getByText(MESSAGES.keptNotice, { exact: true })).toBeVisible()
      await expect(component.getByText(FAILURE_REASON, { exact: true })).toBeVisible()
      await expect(component.getByRole('button')).toHaveCount(0)

      await component
        .locator('> div')
        .screenshot({ path: testInfo.outputPath('card-hold-staff-actions-kept-after-keep.png') })
    })
  })

  test('GIVEN a failed hold that was already kept, THEN the kept notice is shown and no buttons', async ({
    mount,
  }, testInfo) => {
    const component = await mount<typeof Default>(`${STORY}/Default`, { kept: true })

    await expect(component.getByText(MESSAGES.keptNotice, { exact: true })).toBeVisible()
    await expect(component.getByText(FAILURE_REASON, { exact: true })).toBeVisible()
    await expect(component.getByRole('button')).toHaveCount(0)

    await component
      .locator('> div')
      .screenshot({ path: testInfo.outputPath('card-hold-staff-actions-kept.png') })
  })
})
