import {
  generateCardHoldAttemptId,
  getCardHoldIntentType,
  getCardHoldRetryDelay,
  placeCardHold,
  shouldRenewCardHoldAttempt,
  sleepUnlessAborted,
} from '../utils'

describe('getCardHoldIntentType', () => {
  it('reads intentType', () => {
    expect(getCardHoldIntentType({ intentType: 'setup_intent', clientSecret: 'pi_1' })).toBe(
      'setup_intent',
    )
    expect(getCardHoldIntentType({ intentType: 'payment_intent', clientSecret: 'seti_1' })).toBe(
      'payment_intent',
    )
  })

  it('falls back to the client secret prefix', () => {
    expect(getCardHoldIntentType({ clientSecret: 'seti_123_secret_abc' })).toBe('setup_intent')
    expect(getCardHoldIntentType({ clientSecret: 'pi_123_secret_abc' })).toBe('payment_intent')
  })
})

describe('getCardHoldRetryDelay', () => {
  it('doubles from the base delay up to the cap', () => {
    const options = { baseDelayMs: 100, maxDelayMs: 500 }
    expect([0, 1, 2, 3, 4].map((retry) => getCardHoldRetryDelay(retry, options))).toEqual([
      100, 200, 400, 500, 500,
    ])
  })
})

describe('generateCardHoldAttemptId', () => {
  const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

  it('returns a v4 UUID', () => {
    expect(generateCardHoldAttemptId()).toMatch(UUID)
  })

  it('falls back when crypto.randomUUID is missing', () => {
    const spy = vi.spyOn(globalThis, 'crypto', 'get').mockReturnValue({} as Crypto)
    expect(generateCardHoldAttemptId()).toMatch(UUID)
    spy.mockRestore()
  })
})

describe('shouldRenewCardHoldAttempt', () => {
  it('renews only after outcomes that end the attempt without an order', () => {
    expect(shouldRenewCardHoldAttempt({ status: 'declined' })).toBe(true)
    expect(shouldRenewCardHoldAttempt({ status: 'changed' })).toBe(true)
    expect(shouldRenewCardHoldAttempt({ status: 'refused' })).toBe(true)
    expect(shouldRenewCardHoldAttempt({ status: 'placed' })).toBe(false)
    expect(shouldRenewCardHoldAttempt({ status: 'in_progress' })).toBe(false)
    expect(shouldRenewCardHoldAttempt({ status: 'authentication_failed' })).toBe(false)
  })
})

describe('placeCardHold cancellation', () => {
  it('does not resend after an abort during authentication', async () => {
    const controller = new AbortController()
    const submit = vi.fn(async () => ({
      holdStatus: 'requires_action',
      clientSecret: 'pi_1_secret',
      intentType: 'payment_intent',
    }))
    const authenticate = vi.fn(async () => {
      controller.abort()
      return { intentId: 'pi_1' }
    })
    const outcome = await placeCardHold({
      attemptId: 'a',
      paymentMethodId: 'pm_1',
      submit,
      authenticate,
      signal: controller.signal,
    })
    expect(outcome).toEqual({ status: 'cancelled' })
    expect(submit).toHaveBeenCalledTimes(1)
  })
})

describe('sleepUnlessAborted', () => {
  it('clears its timer and resolves when the signal aborts', async () => {
    vi.useFakeTimers()
    try {
      const controller = new AbortController()
      const done = vi.fn()
      sleepUnlessAborted(5000, controller.signal).then(done)
      expect(vi.getTimerCount()).toBe(1)
      controller.abort()
      expect(vi.getTimerCount()).toBe(0)
      await vi.advanceTimersByTimeAsync(0)
      expect(done).toHaveBeenCalled()
    } finally {
      vi.useRealTimers()
    }
  })
})
