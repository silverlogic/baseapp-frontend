import { FC, useEffect, useMemo, useState } from 'react'

import { withDesignSystemTestProviders } from '@baseapp-frontend/design-system/tests/web'

import { Button } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js'

import {
  type CardHoldAuthenticator,
  type CardHoldNoticeStatus,
  type CardHoldOutcome,
  type CardHoldPaymentInput,
  type CardHoldPlacementPayload,
  type CardHoldRetryOptions,
  type UseCardHoldPlacementReturn,
  useCardHoldPlacement,
} from '../../../../common'
import CardHoldNotice from '../../../CardHoldNotice'
import useStripeCardHoldPlacement from '../../useStripeCardHoldPlacement'
import {
  AUTHENTICATED_INTENT_ID,
  CLIENT_SECRET,
  HOLD_ON,
  PAYMENT_METHOD_ID,
} from '../__mocks__/constants'

/**
 * Stories for the Playwright component-testing gallery: a harness around
 * `useCardHoldPlacement` with a fake `submit` and a fake `authenticate` (Stripe.js is never
 * loaded).
 *
 * `scenario` (a `mount()` prop) picks the script of answers `submit` gives, one per call. In
 * `manual` mode `submit` stays pending until the spec answers it through
 * `window.__cardHoldPlacementControls.answerSubmit()`, which is how double clicks and an
 * unmount mid-flight are driven. Every call and result is recorded on the same bridge rather
 * than in a hidden form, because the unmount scenario must still read it once the harness
 * is gone.
 */
const placed: CardHoldPlacementPayload = { holdStatus: 'placed', requiresAction: false }

const requiresAction = (intentType: 'payment_intent' | 'setup_intent') => ({
  holdStatus: 'requires_action',
  requiresAction: true,
  clientSecret: CLIENT_SECRET[intentType],
  intentType,
})

export const SCENARIOS = {
  placed: [placed],
  requiresActionPaymentIntent: [requiresAction('payment_intent'), placed],
  requiresActionSetupIntent: [requiresAction('setup_intent'), placed],
  inProgressTwice: [{ holdStatus: 'in_progress' }, { holdStatus: 'in_progress' }, placed],
  scheduled: [{ holdStatus: 'scheduled', holdOn: HOLD_ON }],
  declined: [{ holdStatus: 'declined' }, placed],
  manual: [],
} satisfies Record<string, CardHoldPlacementPayload[]>

export type CardHoldPlacementScenario = keyof typeof SCENARIOS

/** Short enough that two `in_progress` answers settle in well under a second. */
const FAST_RETRY: CardHoldRetryOptions = { baseDelayMs: 50, maxDelayMs: 100 }

export interface CardHoldPlacementRecord {
  submitCalls: CardHoldPaymentInput[]
  authenticateCalls: Array<{ clientSecret: string; intentType: string }>
  /** Every phase the harness rendered, in order, without consecutive repeats. */
  phases: string[]
  /** Statuses `onOutcome` was called with. */
  onOutcomeCalls: string[]
  /** Statuses each `place()` promise resolved with. */
  placeResults: string[]
}

export interface CardHoldPlacementControls {
  getRecord: () => CardHoldPlacementRecord
  /** `manual` only: resolves the oldest pending `submit` with this payload. */
  answerSubmit: (payload: CardHoldPlacementPayload) => void
  pendingSubmitCount: () => number
}

declare global {
  interface Window {
    __cardHoldPlacementControls: CardHoldPlacementControls
  }
}

const NOTICE_STATUSES = new Set<string>(['placed', 'scheduled', 'card_saved', 'charge_now'])

const useFakes = (scenario: CardHoldPlacementScenario) =>
  useMemo(() => {
    const record: CardHoldPlacementRecord = {
      submitCalls: [],
      authenticateCalls: [],
      phases: [],
      onOutcomeCalls: [],
      placeResults: [],
    }
    const script = [...SCENARIOS[scenario]]
    const pending: Array<(payload: CardHoldPlacementPayload) => void> = []

    const submit = (input: CardHoldPaymentInput) => {
      record.submitCalls.push(input)
      if (scenario === 'manual') {
        return new Promise<CardHoldPlacementPayload>((resolve) => {
          pending.push(resolve)
        })
      }
      const next = script.shift()
      return Promise.resolve(next ?? null)
    }

    const authenticate: CardHoldAuthenticator = async ({ clientSecret, intentType }) => {
      record.authenticateCalls.push({ clientSecret, intentType })
      return { intentId: AUTHENTICATED_INTENT_ID[intentType] }
    }

    window.__cardHoldPlacementControls = {
      getRecord: () => JSON.parse(JSON.stringify(record)),
      answerSubmit: (payload) => pending.shift()?.(payload),
      pendingSubmitCount: () => pending.length,
    }

    return { record, submit, authenticate }
  }, [scenario])

interface HarnessViewProps {
  placement: UseCardHoldPlacementReturn<CardHoldPlacementPayload>
  record: CardHoldPlacementRecord
}

const outcomeMessage = (outcome: CardHoldOutcome | null) =>
  outcome?.status === 'authentication_failed' ? (outcome.message ?? '') : ''

const HarnessView: FC<HarnessViewProps> = ({ placement, record }) => {
  const { place, phase, isPending, outcome, attemptId } = placement

  useEffect(() => {
    if (record.phases[record.phases.length - 1] !== phase) record.phases.push(phase)
  }, [phase, record])

  return (
    <div style={{ padding: 16, maxWidth: 560, display: 'grid', gap: 12 }}>
      <Button
        variant="contained"
        onClick={() => {
          place(PAYMENT_METHOD_ID).then((result) => {
            record.placeResults.push(result.status)
          })
        }}
      >
        Place
      </Button>
      <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 12px', margin: 0 }}>
        <dt>phase</dt>
        <dd data-testid="phase">{phase}</dd>
        <dt>isPending</dt>
        <dd data-testid="is-pending">{String(isPending)}</dd>
        <dt>outcome.status</dt>
        <dd data-testid="outcome-status">{outcome?.status ?? 'none'}</dd>
        <dt>attemptId</dt>
        <dd data-testid="attempt-id">{attemptId}</dd>
        <dt>message</dt>
        <dd data-testid="outcome-message">{outcomeMessage(outcome)}</dd>
      </dl>
      {outcome && NOTICE_STATUSES.has(outcome.status) && (
        <CardHoldNotice
          status={outcome.status as CardHoldNoticeStatus}
          holdOn={outcome.status === 'scheduled' ? outcome.holdOn : undefined}
        />
      )}
    </div>
  )
}

const Harness: FC<{ scenario: CardHoldPlacementScenario }> = ({ scenario }) => {
  const { record, submit, authenticate } = useFakes(scenario)
  const placement = useCardHoldPlacement({
    submit,
    authenticate,
    retry: FAST_RETRY,
    onOutcome: (outcome) => {
      record.onOutcomeCalls.push(outcome.status)
    },
  })

  return <HarnessView placement={placement} record={record} />
}

const StripeHarness: FC = () => {
  const { record, submit } = useFakes('requiresActionPaymentIntent')
  const placement = useStripeCardHoldPlacement({
    submit,
    retry: FAST_RETRY,
    onOutcome: (outcome) => {
      record.onOutcomeCalls.push(outcome.status)
    },
  })

  return <HarnessView placement={placement} record={record} />
}

const HarnessWithProviders = withDesignSystemTestProviders(Harness)
const StripeHarnessWithProviders = withDesignSystemTestProviders(StripeHarness)

/** `useCardHoldPlacement` with the fake `submit` and `authenticate` of `scenario`. */
export const Default = ({ scenario = 'placed' }: { scenario?: CardHoldPlacementScenario }) => (
  <HarnessWithProviders {...({ scenario } as any)} />
)

/**
 * `useStripeCardHoldPlacement` inside `<Elements stripe={null}>`: Stripe.js never loads, so
 * the `requires_action` answer cannot be authenticated.
 */
export const StripeNotLoaded = () => (
  <Elements stripe={null}>
    <StripeHarnessWithProviders {...({} as any)} />
  </Elements>
)
