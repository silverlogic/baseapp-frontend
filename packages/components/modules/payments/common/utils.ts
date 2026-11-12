import { DATE_FORMAT, formatDateFromApi } from '@baseapp-frontend/utils'

import {
  CARD_HOLD_DEFAULT_RETRY,
  CARD_HOLD_INTENT_TYPE,
  CARD_HOLD_MAX_AUTHENTICATIONS,
  CARD_HOLD_PLACEMENT_STATUS,
  CARD_HOLD_STATUS,
} from './constants'
import type { PlaceCardHoldOptions } from './hooks/useCardHoldPlacement/types'
import type {
  CardHoldIntentType,
  CardHoldNoticeMessageOptions,
  CardHoldNoticeMessages,
  CardHoldNoticeStatus,
  CardHoldOutcome,
  CardHoldOutcomePayload,
  CardHoldOutcomeStatus,
  CardHoldPaymentInput,
  CardHoldPlacementPayload,
  CardHoldPlacementStatus,
  CardHoldStatusLabelDescriptor,
  CardHoldStatusLabelView,
} from './types'

const PLACEMENT_STATUSES = new Set<string>(Object.values(CARD_HOLD_PLACEMENT_STATUS))

export const isCardHoldPlacementStatus = (value: unknown): value is CardHoldPlacementStatus =>
  typeof value === 'string' && PLACEMENT_STATUSES.has(value)

/**
 * Generates the attempt id the client keeps for one checkout (`attemptId` in
 * `CardHoldPaymentInputMixin`, a UUID). It only has to be unique per user and checkout: the
 * backend scopes the Stripe idempotency key by user.
 */
export const generateCardHoldAttemptId = (): string => {
  const cryptoApi = (globalThis as { crypto?: Crypto }).crypto
  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return cryptoApi.randomUUID()
  }
  // Hermes (React Native) has no crypto.randomUUID: an RFC 4122 v4 shape from Math.random.
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = Math.floor(Math.random() * 16)
    const value = char === 'x' ? random : (random % 4) + 8
    return value.toString(16)
  })
}

/**
 * The intent a `requires_action` payload's `clientSecret` belongs to. The backend always sends
 * `intentType`; the client secret's prefix (`seti_` / `pi_`) is only a fallback.
 */
export const getCardHoldIntentType = (
  payload: Pick<CardHoldPlacementPayload, 'intentType' | 'clientSecret'>,
): CardHoldIntentType => {
  if (payload.intentType === CARD_HOLD_INTENT_TYPE.setupIntent) return 'setup_intent'
  if (payload.intentType === CARD_HOLD_INTENT_TYPE.paymentIntent) return 'payment_intent'
  return payload.clientSecret?.startsWith('seti_') ? 'setup_intent' : 'payment_intent'
}

/** Exponential backoff for the n-th (0-based) `in_progress` retry, capped at `maxDelayMs`. */
export const getCardHoldRetryDelay = (
  retry: number,
  {
    baseDelayMs = CARD_HOLD_DEFAULT_RETRY.baseDelayMs,
    maxDelayMs = CARD_HOLD_DEFAULT_RETRY.maxDelayMs,
  }: { baseDelayMs?: number; maxDelayMs?: number } = {},
) => Math.min(baseDelayMs * 2 ** retry, maxDelayMs)

/** Formats a `Date` scalar (`YYYY-MM-DD`) for card hold copy, e.g. `Nov 14, 2026`. */
export const formatCardHoldDate = (date: string) =>
  formatDateFromApi(date, { toFormat: DATE_FORMAT[2] })

export const DEFAULT_CARD_HOLD_NOTICE_MESSAGES: CardHoldNoticeMessages = {
  placed: () =>
    'A hold has been placed on your card. You will be charged the final amount later, and any difference is released.',
  scheduled: ({ holdOn, chargeOn }) => {
    const when = holdOn
      ? `Your card will be held on ${holdOn}.`
      : 'Your card will be held closer to the date.'
    const charge = chargeOn ? ` You will be charged on ${chargeOn}.` : ''
    return `Your card has been saved. ${when}${charge}`
  },
  card_saved: ({ chargeOn }) =>
    chargeOn
      ? `Your card has been saved and will be charged on ${chargeOn}.`
      : 'Your card has been saved and will be charged on the date.',
  charge_now: () => 'Your card will be charged now.',
}

/** The customer-facing sentence for a placement that went through. Never mentions a failure. */
export const getCardHoldNoticeMessage = (
  status: CardHoldNoticeStatus,
  {
    holdOn,
    chargeOn,
    formatDate = formatCardHoldDate,
    messages,
  }: CardHoldNoticeMessageOptions & { messages?: Partial<CardHoldNoticeMessages> } = {},
) => {
  const message = messages?.[status] ?? DEFAULT_CARD_HOLD_NOTICE_MESSAGES[status]
  return message({
    holdOn: holdOn ? formatDate(holdOn) : undefined,
    chargeOn: chargeOn ? formatDate(chargeOn) : undefined,
  })
}

const CUSTOMER_LABELS: Record<string, CardHoldStatusLabelDescriptor> = {
  [CARD_HOLD_STATUS.pending]: { label: 'Processing', color: 'default' },
  [CARD_HOLD_STATUS.authorized]: { label: 'Card held', color: 'info' },
  [CARD_HOLD_STATUS.released]: { label: 'Released', color: 'default' },
  [CARD_HOLD_STATUS.captured]: { label: 'Charged', color: 'success' },
  [CARD_HOLD_STATUS.scheduled]: { label: 'Hold scheduled', color: 'default' },
  [CARD_HOLD_STATUS.saved]: { label: 'Card saved', color: 'default' },
}

/**
 * Label and chip color for `CardHold.status`. The customer view never says "failed": the
 * backend already reads a failed hold as `scheduled` for customers, and this maps it the same
 * way should a staff-only value ever reach a customer view.
 */
export const getCardHoldStatusLabel = (
  status: string,
  {
    kept = false,
    view = 'customer',
  }: { kept?: boolean | null; view?: CardHoldStatusLabelView } = {},
): CardHoldStatusLabelDescriptor => {
  if (status === CARD_HOLD_STATUS.failed) {
    if (view === 'customer') return CUSTOMER_LABELS[CARD_HOLD_STATUS.scheduled]!
    return kept
      ? { label: 'Hold failed · kept', color: 'warning' }
      : { label: 'Hold failed', color: 'error' }
  }
  return CUSTOMER_LABELS[status] ?? { label: status, color: 'default' }
}

/** `setTimeout` as a promise; resolves early, with the timer cleared, when `signal` aborts. */
export const sleepUnlessAborted = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve) => {
    if (signal?.aborted) {
      resolve()
      return
    }
    let onAbort: (() => void) | undefined
    const timer = setTimeout(() => {
      if (onAbort) signal?.removeEventListener('abort', onAbort)
      resolve()
    }, ms)
    onAbort = () => {
      clearTimeout(timer)
      resolve()
    }
    signal?.addEventListener('abort', onAbort, { once: true })
  })

const toError = (message: string) => new Error(message)

/** Outcomes never carry `clientSecret`: it served the authentication and nothing else. */
const toOutcomePayload = <TPayload extends CardHoldPlacementPayload>(
  payload: TPayload,
): CardHoldOutcomePayload<TPayload> => {
  const rest: Partial<TPayload> = { ...payload }
  delete rest.clientSecret
  return rest as CardHoldOutcomePayload<TPayload>
}

const CANCELLED = { status: 'cancelled' } as const

/**
 * Runs one placement end to end against the project's create mutation (`submit`):
 *
 * 1. sends `paymentMethodId` + `attemptId`;
 * 2. on `requires_action`, runs `authenticate` (3D Secure) for the payload's intent and resends
 *    with `paymentIntentId` or `setupIntentId`, same `attemptId`;
 * 3. on `in_progress`, waits with exponential backoff and resends the same input;
 * 4. on `changed`, resends once under a new attempt id (reported through `onAttemptIdChange`)
 *    with the same `paymentMethodId`; a second `changed` is returned;
 * 5. resolves with the final outcome. It never throws.
 *
 * Once `signal` aborts (or `isCancelled` says so) it starts no further authentication, submit
 * or wait and resolves `cancelled`; an answer already received that ends the run is still
 * returned. `useCardHoldPlacement` wraps it with React state; call it directly outside React.
 */
export const placeCardHold = async <TPayload extends CardHoldPlacementPayload>({
  attemptId: initialAttemptId,
  paymentMethodId,
  submit,
  authenticate,
  retry = {},
  sleep = sleepUnlessAborted,
  onPhaseChange,
  onAttemptIdChange,
  signal,
  isCancelled: isCancelledOption,
}: PlaceCardHoldOptions<TPayload>): Promise<CardHoldOutcome<TPayload>> => {
  const maxRetries = retry.maxRetries ?? CARD_HOLD_DEFAULT_RETRY.maxRetries
  const isCancelled = () => Boolean(signal?.aborted || isCancelledOption?.())
  let attemptId = initialAttemptId
  let input: CardHoldPaymentInput = { attemptId, paymentMethodId }
  let retries = 0
  let authentications = 0
  let resentChanged = false

  // Each pass either returns or changes `input`/`retries`; every counter is bounded.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (isCancelled()) return CANCELLED
    onPhaseChange?.('submitting')
    let payload: TPayload | null | undefined
    try {
      // Each pass depends on the previous answer: sequential by design.
      // eslint-disable-next-line no-await-in-loop
      payload = await submit(input)
    } catch (error) {
      return { status: 'error', error }
    }
    if (!payload) {
      return {
        status: 'error',
        error: toError('The mutation returned no card hold payload.'),
        payload: null,
      }
    }

    const status = payload.holdStatus
    if (status === CARD_HOLD_PLACEMENT_STATUS.requiresAction) {
      if (!payload.clientSecret || authentications >= CARD_HOLD_MAX_AUTHENTICATIONS) {
        return {
          status: 'error',
          error: toError('Card authentication could not be completed.'),
          payload: toOutcomePayload(payload),
        }
      }
      if (isCancelled()) return CANCELLED
      authentications += 1
      onPhaseChange?.('authenticating')
      const intentType = getCardHoldIntentType(payload)
      let intentId: string | undefined
      try {
        // eslint-disable-next-line no-await-in-loop
        const result = await authenticate({ clientSecret: payload.clientSecret, intentType })
        if (isCancelled()) return CANCELLED
        if (result.error && !result.intentId) {
          return { status: 'authentication_failed', message: result.error.message }
        }
        intentId = result.intentId
      } catch (error) {
        if (isCancelled()) return CANCELLED
        return {
          status: 'authentication_failed',
          message: error instanceof Error ? error.message : undefined,
        }
      }
      // Sent even when authentication failed on a finished intent: the backend settles the
      // attempt (and releases what it holds) instead of waiting for its sweep.
      input =
        intentType === CARD_HOLD_INTENT_TYPE.setupIntent
          ? { attemptId, setupIntentId: intentId }
          : { attemptId, paymentIntentId: intentId }
      retries = 0
    } else if (status === CARD_HOLD_PLACEMENT_STATUS.inProgress) {
      if (retries >= maxRetries)
        return { status: 'in_progress', payload: toOutcomePayload(payload) }
      if (isCancelled()) return CANCELLED
      onPhaseChange?.('waiting')
      // eslint-disable-next-line no-await-in-loop
      await sleep(getCardHoldRetryDelay(retries, retry), signal)
      retries += 1
    } else if (status === CARD_HOLD_PLACEMENT_STATUS.changed && !resentChanged) {
      // The backend saw this attempt id with other parameters: same card, new attempt id.
      resentChanged = true
      attemptId = generateCardHoldAttemptId()
      onAttemptIdChange?.(attemptId)
      input = { attemptId, paymentMethodId }
      retries = 0
    } else if (status === CARD_HOLD_PLACEMENT_STATUS.scheduled) {
      return {
        status: 'scheduled',
        holdOn: payload.holdOn ?? null,
        payload: toOutcomePayload(payload),
      }
    } else if (isCardHoldPlacementStatus(status)) {
      return { status, payload: toOutcomePayload(payload) } as CardHoldOutcome<TPayload>
    } else {
      return {
        status: 'error',
        error: toError(`Unknown card hold status: ${String(status)}`),
        payload: toOutcomePayload(payload),
      }
    }
  }
}

/** Outcomes after which the attempt id must change: each means the next try is a new order. */
export const shouldRenewCardHoldAttempt = (outcome: { status: CardHoldOutcomeStatus }) =>
  outcome.status === 'declined' || outcome.status === 'changed' || outcome.status === 'refused'
