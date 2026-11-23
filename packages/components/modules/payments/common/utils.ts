import {
  CARD_HOLD_DEFAULT_RETRY,
  CARD_HOLD_INTENT_TYPE,
  CARD_HOLD_MAX_AUTHENTICATIONS,
  CARD_HOLD_PLACEMENT_STATUS,
} from './constants'
import type { PlaceCardHoldOptions } from './hooks/useCardHoldPlacement/types'
import type {
  CardHoldIntentType,
  CardHoldOutcome,
  CardHoldOutcomePayload,
  CardHoldOutcomeStatus,
  CardHoldPaymentInput,
  CardHoldPlacementPayload,
  CardHoldPlacementStatus,
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

/** What a placement run carries from one pass to the next. */
interface PlacementState {
  attemptId: string
  input: CardHoldPaymentInput
  retries: number
  authentications: number
  resentChanged: boolean
}

/** A run's fixed context: its options and derived settings. */
interface PlacementRun<TPayload extends CardHoldPlacementPayload> {
  options: PlaceCardHoldOptions<TPayload>
  maxRetries: number
  isCancelled: () => boolean
}

/** A pass either ends the run with an outcome, or resends with the next state. */
type PassResult<TPayload extends CardHoldPlacementPayload> =
  | { outcome: CardHoldOutcome<TPayload> }
  | { state: PlacementState }

const end = <TPayload extends CardHoldPlacementPayload>(
  outcome: CardHoldOutcome<TPayload>,
): PassResult<TPayload> => ({ outcome })

/** Sends `state.input`; an answer with no payload, or a throw, ends the run as an error. */
const submitPass = async <TPayload extends CardHoldPlacementPayload>(
  run: PlacementRun<TPayload>,
  state: PlacementState,
): Promise<{ payload: TPayload } | { outcome: CardHoldOutcome<TPayload> }> => {
  let payload: TPayload | null | undefined
  try {
    payload = await run.options.submit(state.input)
  } catch (error) {
    return { outcome: { status: 'error', error } }
  }
  if (!payload) {
    return {
      outcome: {
        status: 'error',
        error: toError('The mutation returned no card hold payload.'),
        payload: null,
      },
    }
  }
  return { payload }
}

/** `requires_action`: authenticate (3D Secure), then resend with the intent's id. */
const authenticatePass = async <TPayload extends CardHoldPlacementPayload>(
  run: PlacementRun<TPayload>,
  state: PlacementState,
  payload: TPayload,
): Promise<PassResult<TPayload>> => {
  if (!payload.clientSecret || state.authentications >= CARD_HOLD_MAX_AUTHENTICATIONS) {
    return end({
      status: 'error',
      error: toError('Card authentication could not be completed.'),
      payload: toOutcomePayload(payload),
    })
  }
  if (run.isCancelled()) return end(CANCELLED)
  run.options.onPhaseChange?.('authenticating')
  const intentType = getCardHoldIntentType(payload)
  let intentId: string | undefined
  try {
    const result = await run.options.authenticate({
      clientSecret: payload.clientSecret,
      intentType,
    })
    if (run.isCancelled()) return end(CANCELLED)
    if (result.error && !result.intentId) {
      return end({ status: 'authentication_failed', message: result.error.message })
    }
    intentId = result.intentId
  } catch (error) {
    if (run.isCancelled()) return end(CANCELLED)
    return end({
      status: 'authentication_failed',
      message: error instanceof Error ? error.message : undefined,
    })
  }
  // Sent even when authentication failed on a finished intent: the backend settles the
  // attempt (and releases what it holds) instead of waiting for its sweep.
  const input =
    intentType === CARD_HOLD_INTENT_TYPE.setupIntent
      ? { attemptId: state.attemptId, setupIntentId: intentId }
      : { attemptId: state.attemptId, paymentIntentId: intentId }
  return {
    state: { ...state, input, retries: 0, authentications: state.authentications + 1 },
  }
}

/** `in_progress`: wait with exponential backoff and resend, until the retries run out. */
const waitPass = async <TPayload extends CardHoldPlacementPayload>(
  run: PlacementRun<TPayload>,
  state: PlacementState,
  payload: TPayload,
): Promise<PassResult<TPayload>> => {
  if (state.retries >= run.maxRetries) {
    return end({ status: 'in_progress', payload: toOutcomePayload(payload) })
  }
  if (run.isCancelled()) return end(CANCELLED)
  run.options.onPhaseChange?.('waiting')
  const sleep = run.options.sleep ?? sleepUnlessAborted
  await sleep(getCardHoldRetryDelay(state.retries, run.options.retry ?? {}), run.options.signal)
  return { state: { ...state, retries: state.retries + 1 } }
}

/** The first `changed`: the backend saw this attempt id with other parameters, so the same
 * card is resent under a new attempt id. */
const renewAttemptPass = <TPayload extends CardHoldPlacementPayload>(
  run: PlacementRun<TPayload>,
  state: PlacementState,
): PassResult<TPayload> => {
  const attemptId = generateCardHoldAttemptId()
  run.options.onAttemptIdChange?.(attemptId)
  return {
    state: {
      ...state,
      attemptId,
      input: { attemptId, paymentMethodId: run.options.paymentMethodId },
      retries: 0,
      resentChanged: true,
    },
  }
}

/** Any other status ends the run: `scheduled` with its date, a known status as is. */
const finalOutcome = <TPayload extends CardHoldPlacementPayload>(
  payload: TPayload,
): CardHoldOutcome<TPayload> => {
  const status = payload.holdStatus
  if (status === CARD_HOLD_PLACEMENT_STATUS.scheduled) {
    return {
      status: 'scheduled',
      holdOn: payload.holdOn ?? null,
      payload: toOutcomePayload(payload),
    }
  }
  if (isCardHoldPlacementStatus(status)) {
    return { status, payload: toOutcomePayload(payload) } as CardHoldOutcome<TPayload>
  }
  return {
    status: 'error',
    error: toError(`Unknown card hold status: ${String(status)}`),
    payload: toOutcomePayload(payload),
  }
}

const handlePayload = async <TPayload extends CardHoldPlacementPayload>(
  run: PlacementRun<TPayload>,
  state: PlacementState,
  payload: TPayload,
): Promise<PassResult<TPayload>> => {
  switch (payload.holdStatus) {
    case CARD_HOLD_PLACEMENT_STATUS.requiresAction:
      return authenticatePass(run, state, payload)
    case CARD_HOLD_PLACEMENT_STATUS.inProgress:
      return waitPass(run, state, payload)
    case CARD_HOLD_PLACEMENT_STATUS.changed:
      return state.resentChanged ? end(finalOutcome(payload)) : renewAttemptPass(run, state)
    default:
      return end(finalOutcome(payload))
  }
}

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
export const placeCardHold = async <TPayload extends CardHoldPlacementPayload>(
  options: PlaceCardHoldOptions<TPayload>,
): Promise<CardHoldOutcome<TPayload>> => {
  const { attemptId, paymentMethodId, retry, signal, isCancelled } = options
  const run: PlacementRun<TPayload> = {
    options,
    maxRetries: retry?.maxRetries ?? CARD_HOLD_DEFAULT_RETRY.maxRetries,
    isCancelled: () => Boolean(signal?.aborted || isCancelled?.()),
  }
  let state: PlacementState = {
    attemptId,
    input: { attemptId, paymentMethodId },
    retries: 0,
    authentications: 0,
    resentChanged: false,
  }

  // Each pass either ends the run or moves `state` on; every counter in it is bounded.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (run.isCancelled()) return CANCELLED
    options.onPhaseChange?.('submitting')
    // Each pass depends on the previous answer: sequential by design.
    // eslint-disable-next-line no-await-in-loop
    const answer = await submitPass(run, state)
    if ('outcome' in answer) return answer.outcome
    // eslint-disable-next-line no-await-in-loop
    const result = await handlePayload(run, state, answer.payload)
    if ('outcome' in result) return result.outcome
    state = result.state
  }
}

/** Outcomes after which the attempt id must change: each means the next try is a new order. */
export const shouldRenewCardHoldAttempt = (outcome: { status: CardHoldOutcomeStatus }) =>
  outcome.status === 'declined' || outcome.status === 'changed' || outcome.status === 'refused'
