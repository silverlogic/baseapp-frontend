import { createStripeJsCardHoldAuthenticator } from '../utils/cardHolds'

const stripeWith = (result: unknown) => ({ handleNextAction: vi.fn(async () => result) }) as any

describe('createStripeJsCardHoldAuthenticator', () => {
  it('returns the PaymentIntent id after handleNextAction', async () => {
    const stripe = stripeWith({ paymentIntent: { id: 'pi_1', status: 'requires_capture' } })
    const authenticate = createStripeJsCardHoldAuthenticator(stripe)

    await expect(
      authenticate({ clientSecret: 'pi_1_secret', intentType: 'payment_intent' }),
    ).resolves.toEqual({ intentId: 'pi_1' })
    expect(stripe.handleNextAction).toHaveBeenCalledWith({ clientSecret: 'pi_1_secret' })
  })

  it('returns the SetupIntent id after handleNextAction', async () => {
    const stripe = stripeWith({ setupIntent: { id: 'seti_1', status: 'succeeded' } })
    await expect(
      createStripeJsCardHoldAuthenticator(stripe)({
        clientSecret: 'seti_1_secret',
        intentType: 'setup_intent',
      }),
    ).resolves.toEqual({ intentId: 'seti_1' })
  })

  it('passes a finished intent back with the error, for the second pass', async () => {
    const stripe = stripeWith({
      error: {
        message: 'Authentication failed',
        code: 'payment_intent_authentication_failure',
        payment_intent: { id: 'pi_2', status: 'requires_payment_method' },
      },
    })
    await expect(
      createStripeJsCardHoldAuthenticator(stripe)({
        clientSecret: 'pi_2_secret',
        intentType: 'payment_intent',
      }),
    ).resolves.toEqual({
      error: { message: 'Authentication failed', code: 'payment_intent_authentication_failure' },
      intentId: 'pi_2',
    })
  })

  it('keeps an unfinished intent out of the error', async () => {
    const stripe = stripeWith({
      error: { message: 'Network', setup_intent: { id: 'seti_2', status: 'requires_action' } },
    })
    const result = await createStripeJsCardHoldAuthenticator(stripe)({
      clientSecret: 'seti_2_secret',
      intentType: 'setup_intent',
    })
    expect(result.intentId).toBeUndefined()
    expect(result.error?.message).toBe('Network')
  })

  it('errors when Stripe has not loaded', async () => {
    const result = await createStripeJsCardHoldAuthenticator(null)({
      clientSecret: 'pi_secret',
      intentType: 'payment_intent',
    })
    expect(result.error).toBeDefined()
  })
})
