import { CARD_HOLD_INTENT_TYPE, CARD_HOLD_PLACEMENT_STATUS, CARD_HOLD_STATUS } from './constants'

type ValueOf<T> = T[keyof T]

/** The payload's `holdStatus`: how placing a card hold ended. */
export type CardHoldPlacementStatus = ValueOf<typeof CARD_HOLD_PLACEMENT_STATUS>

/** `CardHold.status`. Customers never receive `failed`: the backend reads it as `scheduled`. */
export type CardHoldStatus = ValueOf<typeof CARD_HOLD_STATUS>

/** The payload's `intentType`: which Stripe intent `clientSecret` belongs to. */
export type CardHoldIntentType = ValueOf<typeof CARD_HOLD_INTENT_TYPE>

/**
 * The fields `CardHoldPayloadMixin` adds to a project's own create/checkout mutation payload.
 * Select them in that mutation and pass the payload through as-is.
 */
export interface CardHoldPlacementPayload {
  holdStatus?: string | null
  requiresAction?: boolean | null
  clientSecret?: string | null
  intentType?: string | null
  /** `Date` scalar (`YYYY-MM-DD`): the day a `scheduled` hold will be placed. */
  holdOn?: string | null
}

/**
 * The input fields `CardHoldPaymentInputMixin` adds to the project's create mutation, as this
 * module fills them. First pass: `paymentMethodId` + `attemptId`. Second pass, after the
 * customer authenticated: `attemptId` + `paymentIntentId` or `setupIntentId`.
 */
export interface CardHoldPaymentInput {
  attemptId: string
  paymentMethodId?: string
  paymentIntentId?: string
  setupIntentId?: string
}

export type CardHoldAuthenticationResult =
  | { intentId: string; error?: undefined }
  | {
      error: { message?: string; code?: string }
      /**
       * Set when Stripe reports the intent finished (e.g. authentication failed and the intent
       * went back to `requires_payment_method`). The second pass is still sent so the backend
       * settles the attempt, usually as `declined`.
       */
      intentId?: string
    }

/**
 * Runs Stripe's next action (3D Secure) for a `requires_action` payload. Platform-specific:
 * web uses Stripe.js (`createStripeJsCardHoldAuthenticator` in `payments/web`); a native app
 * passes its own, built on its Stripe SDK.
 */
export type CardHoldAuthenticator = (params: {
  clientSecret: string
  intentType: CardHoldIntentType
}) => Promise<CardHoldAuthenticationResult>

/**
 * The payload as an outcome carries it: `clientSecret` is dropped, since it is only needed for
 * the authentication this module already ran and must not reach logs or error reporting.
 */
export type CardHoldOutcomePayload<TPayload extends CardHoldPlacementPayload> = Omit<
  TPayload,
  'clientSecret'
>

/**
 * The final state of one placement, after authentication and `in_progress` retries. No
 * outcome's `payload` carries `clientSecret`.
 */
export type CardHoldOutcome<TPayload extends CardHoldPlacementPayload = CardHoldPlacementPayload> =
  | { status: 'placed'; payload: CardHoldOutcomePayload<TPayload> }
  | { status: 'scheduled'; holdOn: string | null; payload: CardHoldOutcomePayload<TPayload> }
  | { status: 'card_saved'; payload: CardHoldOutcomePayload<TPayload> }
  | { status: 'charge_now'; payload: CardHoldOutcomePayload<TPayload> }
  | { status: 'declined'; payload: CardHoldOutcomePayload<TPayload> }
  | { status: 'changed'; payload: CardHoldOutcomePayload<TPayload> }
  | { status: 'amount_changed'; payload: CardHoldOutcomePayload<TPayload> }
  | { status: 'refused'; payload: CardHoldOutcomePayload<TPayload> }
  /** Still `in_progress` after every retry: the same attempt can be retried later. */
  | { status: 'in_progress'; payload: CardHoldOutcomePayload<TPayload> }
  /** Stripe could not run the authentication; the same attempt can be retried. */
  | { status: 'authentication_failed'; message?: string }
  /** The mutation itself failed, returned no payload, or returned an unknown `holdStatus`. */
  | { status: 'error'; error: unknown; payload?: CardHoldOutcomePayload<TPayload> | null }
  /**
   * The run was stopped (the hook's component unmounted, or `placeCardHold`'s `signal` aborted)
   * before it reached an answer. `onOutcome` is never called with it.
   */
  | { status: 'cancelled' }

export type CardHoldOutcomeStatus = CardHoldOutcome['status']

/** Statuses a customer-facing notice explains. */
export type CardHoldNoticeStatus = 'placed' | 'scheduled' | 'card_saved' | 'charge_now'

export interface CardHoldNoticeMessageOptions {
  /** For `scheduled`: the day the hold will be placed (`YYYY-MM-DD`). */
  holdOn?: string | null
  /** For `card_saved` (and optionally `scheduled`): the day the card will be charged. */
  chargeOn?: string | null
  /** Formats a `YYYY-MM-DD` date for display. Defaults to `formatCardHoldDate`. */
  formatDate?: (date: string) => string
}

export type CardHoldNoticeMessages = Record<
  CardHoldNoticeStatus,
  (options: { holdOn?: string; chargeOn?: string }) => string
>

export type CardHoldStatusLabelView = 'customer' | 'staff'

export type CardHoldStatusLabelColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

export interface CardHoldStatusLabelDescriptor {
  label: string
  color: CardHoldStatusLabelColor
}
