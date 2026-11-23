// Values mirror `baseapp_payments` on the backend: `holds.PlacementStatus` (the payload's
// `holdStatus`), `models.AbstractCardHold.Status` (`CardHold.status`) and the payload's
// `intentType`. The schema types all three as `String`, so they are typed here instead.

export const CARD_HOLD_PLACEMENT_STATUS = {
  placed: 'placed',
  scheduled: 'scheduled',
  cardSaved: 'card_saved',
  chargeNow: 'charge_now',
  requiresAction: 'requires_action',
  declined: 'declined',
  inProgress: 'in_progress',
  changed: 'changed',
  amountChanged: 'amount_changed',
  refused: 'refused',
} as const

export const CARD_HOLD_STATUS = {
  pending: 'pending',
  authorized: 'authorized',
  released: 'released',
  captured: 'captured',
  scheduled: 'scheduled',
  failed: 'failed',
  saved: 'saved',
} as const

export const CARD_HOLD_INTENT_TYPE = {
  paymentIntent: 'payment_intent',
  setupIntent: 'setup_intent',
} as const

/**
 * Backoff for `in_progress` answers. The backend answers `in_progress` while the same attempt
 * is still being placed, or Stripe gave no usable answer; the same attempt id is resent.
 */
export const CARD_HOLD_DEFAULT_RETRY = {
  maxRetries: 5,
  baseDelayMs: 1000,
  maxDelayMs: 15000,
} as const

/** A second pass that keeps asking for authentication is not looped on forever. */
export const CARD_HOLD_MAX_AUTHENTICATIONS = 3
