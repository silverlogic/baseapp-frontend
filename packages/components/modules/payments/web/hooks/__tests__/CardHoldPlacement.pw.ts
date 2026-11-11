import { type Locator, type Page, expect, test } from '@playwright/test'

import {
  AUTHENTICATED_INTENT_ID,
  CLIENT_SECRET,
  PAYMENT_METHOD_ID,
} from './__mocks__/constants'
import type {
  CardHoldPlacementControls,
  CardHoldPlacementScenario,
} from './__utils__/CardHoldPlacement.story'

const STORY = 'payments/web/hooks/CardHoldPlacement'

const PLACED_COPY =
  'A hold has been placed on your card. You will be charged the final amount later, and any difference is released.'

const SCHEDULED_COPY = 'Your card has been saved. Your card will be held on Nov 14, 2026.'

const record = (page: Page) =>
  page.evaluate(() => window.__cardHoldPlacementControls.getRecord())

const answerSubmit = (
  page: Page,
  payload: Parameters<CardHoldPlacementControls['answerSubmit']>[0],
) =>
  page.evaluate((p) => window.__cardHoldPlacementControls.answerSubmit(p), payload)

const pendingSubmitCount = (page: Page) =>
  page.evaluate(() => window.__cardHoldPlacementControls.pendingSubmitCount())

const placeButton = (component: Locator) =>
  component.getByRole('button', { name: 'Place', exact: true })

const field = (component: Locator, testId: string) => component.getByTestId(testId)

type MountFixture = (story: string, props?: Record<string, unknown>) => Promise<Locator & { unmount(): Promise<void> }>

const mountScenario = async (mount: MountFixture, scenario: CardHoldPlacementScenario) => {
  const component = await mount(`${STORY}/Default`, { scenario })
  await expect(field(component, 'phase')).toHaveText('idle')
  await expect(field(component, 'outcome-status')).toHaveText('none')
  return component
}

const expectDone = async (component: Locator, status: string) => {
  await expect(field(component, 'outcome-status')).toHaveText(status)
  await expect(field(component, 'phase')).toHaveText('done')
  await expect(field(component, 'is-pending')).toHaveText('false')
}

const INTENT_TYPES = [
  { intentType: 'payment_intent', scenario: 'requiresActionPaymentIntent', idKey: 'paymentIntentId' },
  { intentType: 'setup_intent', scenario: 'requiresActionSetupIntent', idKey: 'setupIntentId' },
] as const

test.describe('Component: CardHoldPlacement', () => {
  test('GIVEN a card that is held at once, WHEN Place is clicked, THEN the outcome is placed and the notice is shown', async ({
    mount,
    page,
  }, testInfo) => {
    const component = await test.step('GIVEN a card that is held at once', () =>
      mountScenario(mount, 'placed'))
    const attemptId = await field(component, 'attempt-id').textContent()

    await test.step('WHEN Place is clicked', () => placeButton(component).click())

    await test.step('THEN the outcome is placed, the notice is shown and submit ran once', async () => {
      await expectDone(component, 'placed')
      await expect(component.getByRole('status')).toHaveText(PLACED_COPY)

      const { submitCalls, authenticateCalls, onOutcomeCalls, placeResults } = await record(page)
      expect(submitCalls).toEqual([{ attemptId, paymentMethodId: PAYMENT_METHOD_ID }])
      expect(authenticateCalls).toEqual([])
      expect(onOutcomeCalls).toEqual(['placed'])
      expect(placeResults).toEqual(['placed'])
      await expect(field(component, 'attempt-id')).toHaveText(attemptId!)

      await component
        .locator('> div')
        .screenshot({ path: testInfo.outputPath('card-hold-placement-placed.png') })
    })
  })

  for (const { intentType, scenario, idKey } of INTENT_TYPES) {
    test(`GIVEN a card that needs 3D Secure on a ${intentType}, WHEN Place is clicked, THEN it authenticates that intent and resends under the same attempt`, async ({
      mount,
      page,
    }) => {
      const component = await test.step(`GIVEN a card that needs 3D Secure on a ${intentType}`, () =>
        mountScenario(mount, scenario))
      const attemptId = await field(component, 'attempt-id').textContent()

      await test.step('WHEN Place is clicked', () => placeButton(component).click())

      await test.step('THEN the outcome is placed', () => expectDone(component, 'placed'))

      await test.step(`THEN authenticate got the ${intentType} and the second pass carries its id`, async () => {
        const { submitCalls, authenticateCalls, phases } = await record(page)
        expect(authenticateCalls).toEqual([{ clientSecret: CLIENT_SECRET[intentType], intentType }])
        expect(submitCalls).toEqual([
          { attemptId, paymentMethodId: PAYMENT_METHOD_ID },
          { attemptId, [idKey]: AUTHENTICATED_INTENT_ID[intentType] },
        ])
        expect(phases).toContain('authenticating')
      })
    })
  }

  test('GIVEN a placement answered in_progress twice, WHEN Place is clicked, THEN it waits, resends the same input and ends placed', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a placement answered in_progress twice', () =>
      mountScenario(mount, 'inProgressTwice'))
    const attemptId = await field(component, 'attempt-id').textContent()

    await test.step('WHEN Place is clicked', () => placeButton(component).click())

    await test.step('THEN the outcome is placed after three identical submits', async () => {
      await expectDone(component, 'placed')

      const { submitCalls, phases, onOutcomeCalls } = await record(page)
      const firstPass = { attemptId, paymentMethodId: PAYMENT_METHOD_ID }
      expect(submitCalls).toEqual([firstPass, firstPass, firstPass])
      expect(phases).toContain('waiting')
      expect(onOutcomeCalls).toEqual(['placed'])
    })
  })

  test('GIVEN a hold scheduled for later, WHEN Place is clicked, THEN the outcome is scheduled and the notice shows the date', async ({
    mount,
    page,
  }, testInfo) => {
    const component = await test.step('GIVEN a hold scheduled for later', () =>
      mountScenario(mount, 'scheduled'))

    await test.step('WHEN Place is clicked', () => placeButton(component).click())

    await test.step('THEN the outcome is scheduled and the notice shows the date', async () => {
      await expectDone(component, 'scheduled')
      await expect(component.getByRole('status')).toHaveText(SCHEDULED_COPY)
      await expect(component.getByRole('status')).not.toContainText(/fail/i)
      expect((await record(page)).submitCalls).toHaveLength(1)

      await component
        .locator('> div')
        .screenshot({ path: testInfo.outputPath('card-hold-placement-scheduled.png') })
    })
  })

  test('GIVEN a declined card, WHEN Place is clicked twice, THEN the second place goes out under a new attempt id', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a declined card', () =>
      mountScenario(mount, 'declined'))
    const firstAttemptId = await field(component, 'attempt-id').textContent()

    await test.step('WHEN Place is clicked, THEN the outcome is declined, no notice is shown and the attempt id is renewed', async () => {
      await placeButton(component).click()
      await expectDone(component, 'declined')
      await expect(component.getByRole('status')).not.toBeAttached()
      await expect(field(component, 'attempt-id')).not.toHaveText(firstAttemptId!)
    })

    const renewedAttemptId = await field(component, 'attempt-id').textContent()

    await test.step('WHEN Place is clicked again, THEN it submits under the renewed attempt id and ends placed', async () => {
      await placeButton(component).click()
      await expectDone(component, 'placed')

      const { submitCalls, onOutcomeCalls } = await record(page)
      expect(submitCalls).toEqual([
        { attemptId: firstAttemptId, paymentMethodId: PAYMENT_METHOD_ID },
        { attemptId: renewedAttemptId, paymentMethodId: PAYMENT_METHOD_ID },
      ])
      expect(renewedAttemptId).not.toBe(firstAttemptId)
      expect(onOutcomeCalls).toEqual(['declined', 'placed'])
    })
  })

  test('GIVEN a pending submit, WHEN Place is double-clicked, THEN submit is called once and both clicks share the outcome', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a submit that waits for an answer', () =>
      mountScenario(mount, 'manual'))

    await test.step('WHEN Place is double-clicked', async () => {
      await placeButton(component).dblclick()
      await expect(field(component, 'phase')).toHaveText('submitting')
      await expect(field(component, 'is-pending')).toHaveText('true')
    })

    await test.step('THEN only one submit is in flight', async () => {
      expect(await pendingSubmitCount(page)).toBe(1)
      expect((await record(page)).submitCalls).toHaveLength(1)
    })

    await test.step('WHEN the submit is answered placed, THEN both place() calls resolve placed and onOutcome fires once', async () => {
      await answerSubmit(page, { holdStatus: 'placed' })
      await expectDone(component, 'placed')

      await expect.poll(async () => (await record(page)).placeResults).toEqual(['placed', 'placed'])
      const { submitCalls, onOutcomeCalls } = await record(page)
      expect(submitCalls).toHaveLength(1)
      expect(onOutcomeCalls).toEqual(['placed'])
    })
  })

  test('GIVEN a pending submit, WHEN the harness unmounts and the submit then asks for 3D Secure, THEN authenticate is never called', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a submit that waits for an answer', () =>
      mountScenario(mount, 'manual'))

    await test.step('WHEN Place is clicked', async () => {
      await placeButton(component).click()
      await expect(field(component, 'phase')).toHaveText('submitting')
      expect(await pendingSubmitCount(page)).toBe(1)
    })

    await test.step('WHEN the harness unmounts', async () => {
      await component.unmount()
      await expect(placeButton(component)).not.toBeAttached()
    })

    await test.step('WHEN the pending submit answers requires_action', () =>
      answerSubmit(page, {
        holdStatus: 'requires_action',
        requiresAction: true,
        clientSecret: CLIENT_SECRET.payment_intent,
        intentType: 'payment_intent',
      }))

    await test.step('THEN place() resolves cancelled, authenticate is never called and onOutcome never fires', async () => {
      await expect.poll(async () => (await record(page)).placeResults).toEqual(['cancelled'])
      const { authenticateCalls, onOutcomeCalls, submitCalls } = await record(page)
      expect(authenticateCalls).toEqual([])
      expect(onOutcomeCalls).toEqual([])
      expect(submitCalls).toHaveLength(1)
    })
  })

  test('GIVEN Stripe.js has not loaded, WHEN the card needs 3D Secure, THEN useStripeCardHoldPlacement ends authentication_failed without a second pass', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN Stripe.js has not loaded', async () => {
      const mounted = await mount(`${STORY}/StripeNotLoaded`)
      await expect(field(mounted, 'phase')).toHaveText('idle')
      return mounted
    })

    await test.step('WHEN Place is clicked', () => placeButton(component).click())

    await test.step('THEN the outcome is authentication_failed and nothing else is submitted', async () => {
      await expectDone(component, 'authentication_failed')
      await expect(field(component, 'outcome-message')).toHaveText(
        'Stripe has not loaded yet. Please try again.',
      )
      await expect(component.getByRole('status')).not.toBeAttached()
      expect((await record(page)).submitCalls).toHaveLength(1)
    })
  })
})
