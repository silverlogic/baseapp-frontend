/** Shared by the story (browser) and the spec (Node): plain values only. */
export const PAYMENT_METHOD_ID = 'pm_card_visa'

export const HOLD_ON = '2026-11-14'

export const AUTHENTICATED_INTENT_ID = {
  payment_intent: 'pi_test_authenticated',
  setup_intent: 'seti_test_authenticated',
} as const

export const CLIENT_SECRET = {
  payment_intent: 'pi_test_secret_abc',
  setup_intent: 'seti_test_secret_abc',
} as const
