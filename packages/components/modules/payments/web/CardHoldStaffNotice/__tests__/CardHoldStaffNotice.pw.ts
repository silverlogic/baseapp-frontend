import { type Locator, type Page, expect, test } from '@playwright/test'

import { DEFAULT_CARD_HOLD_STAFF_NOTICE_MESSAGES as MESSAGES } from '../constants'
import {
  CARD_HOLD_ID,
  FAILURE_REASON,
  GRAPHQL_ERROR_MESSAGE,
  RETRIES_LEFT,
  RETRY_FAILURE_REASON,
  TRANSPORT_ERROR_MESSAGE,
} from './__mocks__/requests'
import type {
  CardHoldStaffNoticeControls,
  Default,
  PartiallyPaid,
} from './__utils__/CardHoldStaffNotice.story'

/**
 * The confirmation dialog and the toast are portaled outside `#root`, so they are queried
 * through `page`; the failure panel lives inside the `mount()` locator.
 */
const STORY = 'payments/web/CardHoldStaffNotice/CardHoldStaffNotice'

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
    story: 'Default',
    hold: 'failed',
    button: MESSAGES.keepButton,
    title: MESSAGES.keepTitle,
    confirm: MESSAGES.keepConfirm,
    mutation: 'CardHoldKeepMutation',
    resolveKey: 'resolveKeep',
    errorKey: 'resolveKeepWithGraphqlError',
  },
  {
    decision: 'cancel',
    story: 'Default',
    hold: 'failed',
    button: MESSAGES.cancelButton,
    title: MESSAGES.cancelTitle,
    confirm: MESSAGES.cancelConfirm,
    mutation: 'CardHoldCancelMutation',
    resolveKey: 'resolveCancel',
    errorKey: 'resolveCancelWithGraphqlError',
  },
  {
    decision: 'retry',
    story: 'Default',
    hold: 'failed',
    button: MESSAGES.retryButton,
    title: MESSAGES.retryTitle,
    confirm: MESSAGES.retryConfirm,
    mutation: 'CardHoldRetryMutation',
    resolveKey: 'resolveRetry',
    errorKey: 'resolveRetryWithGraphqlError',
  },
  {
    decision: 'markPaid',
    story: 'PartiallyPaid',
    hold: 'partially paid',
    button: MESSAGES.markPaidButton,
    title: MESSAGES.markPaidTitle,
    confirm: MESSAGES.markPaidConfirm,
    mutation: 'CardHoldMarkPaidMutation',
    resolveKey: 'resolveMarkPaid',
    errorKey: 'resolveMarkPaidWithGraphqlError',
  },
] as const

const RETRY = DECISIONS[2]

const resolve = (page: Page, key: keyof CardHoldStaffNoticeControls) =>
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

const mountPartiallyPaid = async (mount: (story: string) => Promise<Locator>) => {
  const component = await mount(`${STORY}/PartiallyPaid`)
  await expect(component.getByText(MESSAGES.partiallyPaidTitle, { exact: true })).toBeVisible()
  return component
}

/** Mounts the hold a decision applies to: failed, or partially paid for Mark paid. */
const mountFor = (
  mount: (story: string) => Promise<Locator>,
  { story }: (typeof DECISIONS)[number],
) => (story === 'PartiallyPaid' ? mountPartiallyPaid(mount) : mountFailed(mount))

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

test.describe('Component: CardHoldStaffNotice', () => {
  for (const status of NON_FAILED_STATUSES) {
    test(`GIVEN a ${status} hold, THEN nothing is rendered`, async ({ mount }) => {
      const component = await mount<typeof Default>(`${STORY}/Default`, { status })

      await expect(component.getByTestId('decided-count')).toBeAttached()
      await expect(component.getByRole('button')).toHaveCount(0)
      await expect(component).not.toContainText(/fail/i)
    })
  }

  test('GIVEN a failed hold with retries left, THEN the failure reason, the three actions and the retries left are shown', async ({
    mount,
  }, testInfo) => {
    const component = await mountFailed(mount)

    await expect(component.getByText(FAILURE_REASON, { exact: true })).toBeVisible()
    await expect(button(component, MESSAGES.keepButton)).toBeEnabled()
    await expect(button(component, MESSAGES.cancelButton)).toBeEnabled()
    await expect(button(component, MESSAGES.retryButton)).toBeEnabled()
    await expect(
      component.getByText(MESSAGES.retriesLeft(RETRIES_LEFT), { exact: true }),
    ).toBeVisible()

    await component
      .locator('> div')
      .screenshot({ path: testInfo.outputPath('card-hold-staff-notice-failed.png') })
  })

  test('GIVEN a failed hold with no failure reason, THEN the fallback is shown', async ({
    mount,
  }) => {
    const component = await mount<typeof Default>(`${STORY}/Default`, { failureReason: null })

    await expect(component.getByText(MESSAGES.unknownReason, { exact: true })).toBeVisible()
  })

  for (const scenario of DECISIONS) {
    test(`GIVEN a ${scenario.hold} hold, WHEN ${scenario.decision} is confirmed and accepted, THEN ${scenario.mutation} is sent and onDecided fires`, async ({
      mount,
      page,
    }, testInfo) => {
      const component = await test.step(`GIVEN a ${scenario.hold} hold`, () =>
        mountFor(mount, scenario))

      await test.step(`WHEN ${scenario.button} is clicked, THEN a confirmation opens and nothing is sent yet`, async () => {
        await button(component, scenario.button).click()

        await expect(dialog(page).getByText(scenario.title, { exact: true })).toBeVisible()
        expect(await pendingOperationCount(page)).toBe(0)
        await expect(decidedCount(component)).toHaveValue('0')

        await expect(page.locator('.MuiDialog-container')).toHaveCSS('opacity', '1')
        await dialog(page).screenshot({
          path: testInfo.outputPath(`card-hold-staff-notice-${scenario.decision}-dialog.png`),
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

    test(`GIVEN a ${scenario.hold} hold, WHEN ${scenario.decision} is answered with a GraphQL error, THEN onDecided does not fire and a toast is shown`, async ({
      mount,
      page,
    }) => {
      const component = await test.step(`GIVEN a ${scenario.hold} hold`, () =>
        mountFor(mount, scenario))

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
        .screenshot({ path: testInfo.outputPath('card-hold-staff-notice-kept-after-keep.png') })
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
      .screenshot({ path: testInfo.outputPath('card-hold-staff-notice-kept.png') })
  })
  test('GIVEN a failed hold with no retries left, THEN there is no retry and the text says only Keep or Cancel remain', async ({
    mount,
  }, testInfo) => {
    const component = await mount<typeof Default>(`${STORY}/Default`, { retriesLeft: 0 })

    await expect(component.getByText(MESSAGES.noRetriesLeft, { exact: true })).toBeVisible()
    await expect(button(component, MESSAGES.retryButton)).toHaveCount(0)
    await expect(button(component, MESSAGES.keepButton)).toBeEnabled()
    await expect(button(component, MESSAGES.cancelButton)).toBeEnabled()

    await component
      .locator('> div')
      .screenshot({ path: testInfo.outputPath('card-hold-staff-notice-no-retries-left.png') })
  })

  test('GIVEN a kept failed hold with retries left, THEN there is no retry', async ({ mount }) => {
    const component = await mount<typeof Default>(`${STORY}/Default`, { kept: true })

    await expect(component.getByText(MESSAGES.keptNotice, { exact: true })).toBeVisible()
    await expect(component.getByRole('button')).toHaveCount(0)
    await expect(component).not.toContainText(/retr(y|ies) left/)
  })

  test('GIVEN a failed hold, WHEN a retry is placed, THEN the actions disappear', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a failed hold', () => mountFailed(mount))

    await test.step('WHEN the retry comes back authorized', async () => {
      await confirmDecision(component, page, RETRY)
      await resolve(page, 'resolveRetry')
      await expect(decidedCount(component)).toHaveValue('1')
    })

    await test.step('THEN the hold is no longer shown as failed', async () => {
      await expect(component.getByText(MESSAGES.failureTitle, { exact: true })).not.toBeAttached()
      await expect(component.getByRole('button')).toHaveCount(0)
    })
  })

  test('GIVEN a failed hold, WHEN the retry comes back scheduled, THEN onDecided fires and the actions disappear', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a failed hold', () => mountFailed(mount))

    await test.step('WHEN the retry comes back scheduled for later', async () => {
      await confirmDecision(component, page, RETRY)
      await resolve(page, 'resolveRetryScheduled')
      await expect(decidedCount(component)).toHaveValue('1')
      await expect(component.getByTestId('last-decision')).toHaveValue('retry')
      await expect(dialog(page)).not.toBeAttached()
    })

    await test.step('THEN the hold is no longer shown as failed', async () => {
      await expect(component.getByText(MESSAGES.failureTitle, { exact: true })).not.toBeAttached()
      await expect(component.getByRole('button')).toHaveCount(0)
    })
  })

  test('GIVEN a failed hold, WHEN the retry is declined again, THEN it stays failed with one retry fewer', async ({
    mount,
    page,
  }, testInfo) => {
    const component = await test.step('GIVEN a failed hold', () => mountFailed(mount))

    await test.step('WHEN the retry comes back failed', async () => {
      await confirmDecision(component, page, RETRY)
      await resolve(page, 'resolveRetryFailedAgain')
      await expect(decidedCount(component)).toHaveValue('1')
      await expect(component.getByTestId('last-decision')).toHaveValue('retry')
      await expect(dialog(page)).not.toBeAttached()
    })

    await test.step('THEN the new failure and the decremented count are shown', async () => {
      await expect(component.getByText(MESSAGES.failureTitle, { exact: true })).toBeVisible()
      await expect(component.getByText(RETRY_FAILURE_REASON, { exact: true })).toBeVisible()
      await expect(
        component.getByText(MESSAGES.retriesLeft(RETRIES_LEFT - 1), { exact: true }),
      ).toBeVisible()
      await expect(button(component, MESSAGES.retryButton)).toBeEnabled()

      await component
        .locator('> div')
        .screenshot({ path: testInfo.outputPath('card-hold-staff-notice-retry-failed-again.png') })
    })
  })

  test('GIVEN a partially paid hold, THEN only Mark paid is offered, and it goes once paid', async ({
    mount,
    page,
  }, testInfo) => {
    const component = await test.step('GIVEN a partially paid hold', () =>
      mountPartiallyPaid(mount))

    await test.step('THEN the notice and Mark paid are shown', async () => {
      await expect(component.getByText(MESSAGES.partiallyPaidNotice, { exact: true })).toBeVisible()
      await expect(component.getByRole('button')).toHaveCount(1)
      await expect(button(component, MESSAGES.markPaidButton)).toBeEnabled()
      await expect(component).not.toContainText(/fail/i)

      await component
        .locator('> div')
        .screenshot({ path: testInfo.outputPath('card-hold-staff-notice-partially-paid.png') })
    })

    await test.step('WHEN Mark paid is confirmed and accepted, THEN the panel goes', async () => {
      await confirmDecision(component, page, DECISIONS[3])
      await resolve(page, 'resolveMarkPaid')
      await expect(decidedCount(component)).toHaveValue('1')
      await expect(component.getByRole('button')).toHaveCount(0)
    })
  })

  for (const { name, story, props } of [
    { name: 'failed', story: 'Default', props: {} },
    { name: 'kept failed', story: 'Default', props: { kept: true } },
    { name: 'partially paid', story: 'PartiallyPaid', props: {} },
  ] as const) {
    test(`GIVEN a ${name} hold and a viewer who cannot decide, THEN nothing is rendered`, async ({
      mount,
    }) => {
      const component = await mount<typeof Default>(`${STORY}/${story}`, {
        ...props,
        canDecide: false,
      })

      await expect(component.getByTestId('decided-count')).toBeAttached()
      await expect(component.getByRole('button')).toHaveCount(0)
      await expect(component).not.toContainText(/fail|partially paid|kept/i)
      await expect(component).not.toContainText(FAILURE_REASON)
    })
  }

  test('GIVEN a kept failed hold that was then charged, THEN nothing is rendered', async ({
    mount,
  }) => {
    const component = await mount<typeof Default>(`${STORY}/Default`, {
      kept: true,
      paymentStatus: 'paid',
      canDecide: true,
    })

    await expect(component.getByTestId('decided-count')).toBeAttached()
    await expect(component.getByRole('button')).toHaveCount(0)
    await expect(component).not.toContainText(/fail|kept/i)
    await expect(component).not.toContainText(FAILURE_REASON)
  })

  test('GIVEN a paid hold, THEN nothing is rendered', async ({ mount }) => {
    const component = await mount<typeof PartiallyPaid>(`${STORY}/PartiallyPaid`, {
      paymentStatus: 'paid',
    })

    await expect(component.getByTestId('decided-count')).toBeAttached()
    await expect(component.getByRole('button')).toHaveCount(0)
  })
})
