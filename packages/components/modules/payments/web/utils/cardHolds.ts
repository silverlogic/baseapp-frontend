import type { Stripe } from '@stripe/stripe-js'

import type { CardHoldAuthenticator } from '../../common'

// An intent in one of these is finished: the second pass lets the backend settle the attempt.
const FINISHED_INTENT_STATUSES = new Set(['requires_payment_method', 'canceled'])

/**
 * The web `CardHoldAuthenticator`: runs Stripe.js `handleNextAction` (3D Secure) for the
 * intent behind a `requires_action` payload. The backend confirms both intents server-side
 * (`confirm=True`, `use_stripe_sdk=True`, automatic confirmation), which is the case
 * `handleNextAction` covers for a PaymentIntent and a SetupIntent alike.
 */
export const createStripeJsCardHoldAuthenticator =
  (stripe: Pick<Stripe, 'handleNextAction'> | null | undefined): CardHoldAuthenticator =>
  async ({ clientSecret }) => {
    if (!stripe) {
      return { error: { message: 'Stripe has not loaded yet. Please try again.' } }
    }
    const result = await stripe.handleNextAction({ clientSecret })
    if (result.error) {
      const intent = result.error.payment_intent ?? result.error.setup_intent
      return {
        error: { message: result.error.message, code: result.error.code },
        intentId: intent && FINISHED_INTENT_STATUSES.has(intent.status) ? intent.id : undefined,
      }
    }
    const intentId = result.paymentIntent?.id ?? result.setupIntent?.id
    if (!intentId) {
      return { error: { message: 'Stripe returned no intent.' } }
    }
    return { intentId }
  }
