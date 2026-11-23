import type {
  CardHoldAuthenticator,
  CardHoldOutcome,
  CardHoldPaymentInput,
  CardHoldPlacementPayload,
} from '../../types'

export interface CardHoldRetryOptions {
  /** How many times an `in_progress` answer is resent before giving up. Default 5. */
  maxRetries?: number
  /** First backoff delay; doubles on every retry. Default 1000 ms. */
  baseDelayMs?: number
  /** Backoff cap. Default 15000 ms. */
  maxDelayMs?: number
}

/**
 * Commits the project's own create/checkout mutation with the card hold input merged into its
 * input, and resolves with the payload (the object carrying `CardHoldPayloadMixin`'s fields).
 * Reject, or resolve `null`, when the mutation failed.
 */
export type CardHoldSubmit<TPayload extends CardHoldPlacementPayload> = (
  input: CardHoldPaymentInput,
) => Promise<TPayload | null | undefined>

export interface UseCardHoldPlacementOptions<TPayload extends CardHoldPlacementPayload> {
  submit: CardHoldSubmit<TPayload>
  /** Runs 3D Secure for `requires_action`. Web: `createStripeJsCardHoldAuthenticator(stripe)`. */
  authenticate: CardHoldAuthenticator
  retry?: CardHoldRetryOptions
  /**
   * Called once per `place()` with its final outcome. Never called after the component
   * unmounted: navigating away is not a failure.
   */
  onOutcome?: (outcome: CardHoldOutcome<TPayload>) => void
  /** Start from a known attempt id (e.g. restored after a reload) instead of a new one. */
  initialAttemptId?: string
}

export type CardHoldPlacementPhase =
  | 'idle'
  /** The create mutation is in flight. */
  | 'submitting'
  /** Stripe's authentication (3D Secure) is open. */
  | 'authenticating'
  /** Waiting to resend after `in_progress`. */
  | 'waiting'
  | 'done'

export interface UseCardHoldPlacementReturn<TPayload extends CardHoldPlacementPayload> {
  /**
   * Places the hold with this card, authenticating and retrying as needed. While a placement
   * runs, calling it again returns that placement's promise instead of starting another.
   * Resolves `cancelled` when the component unmounted first.
   */
  place: (paymentMethodId: string) => Promise<CardHoldOutcome<TPayload>>
  phase: CardHoldPlacementPhase
  /** True while `place` runs. */
  isPending: boolean
  outcome: CardHoldOutcome<TPayload> | null
  /**
   * The attempt id sent with every pass. Renewed automatically after `declined`, `changed` and
   * `refused` (each means a new order), kept otherwise, so a retry never places twice. A
   * `changed` answer is first resent once under a new attempt id; this follows it.
   */
  attemptId: string
  /** Start a new checkout: new attempt id, cleared outcome. */
  reset: () => void
}

export interface PlaceCardHoldOptions<TPayload extends CardHoldPlacementPayload> {
  attemptId: string
  paymentMethodId: string
  submit: CardHoldSubmit<TPayload>
  authenticate: CardHoldAuthenticator
  retry?: CardHoldRetryOptions
  /**
   * Waits between retries; injectable for tests. Default: `setTimeout`, cleared and resolved
   * early when `signal` aborts.
   */
  sleep?: (ms: number, signal?: AbortSignal) => Promise<void>
  onPhaseChange?: (phase: CardHoldPlacementPhase) => void
  /**
   * Called when a `changed` answer is resent under a new attempt id, with that id. Keep it:
   * retrying that order must reuse it.
   */
  onAttemptIdChange?: (attemptId: string) => void
  /** Aborting stops the run: no further authentication, submit or wait. */
  signal?: AbortSignal
  /** Stops the run like `signal` (e.g. the component unmounted). */
  isCancelled?: () => boolean
}
