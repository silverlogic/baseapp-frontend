import {
  generateCardHoldAttemptId,
  getCardHoldIntentType,
  getCardHoldNoticeMessage,
  getCardHoldRetryDelay,
  getCardHoldStatusLabel,
  placeCardHold,
  shouldRenewCardHoldAttempt,
  sleepUnlessAborted,
} from '../utils'

describe('getCardHoldNoticeMessage', () => {
  it('says the card is held now when placed', () => {
    expect(getCardHoldNoticeMessage('placed')).toMatch(/hold has been placed on your card/i)
  })

  it('names the day a scheduled hold is placed', () => {
    expect(getCardHoldNoticeMessage('scheduled', { holdOn: '2026-11-14' })).toBe(
      'Your card has been saved. Your card will be held on Nov 14, 2026.',
    )
  })

  it('adds the charge day to a scheduled hold when given', () => {
    expect(
      getCardHoldNoticeMessage('scheduled', { holdOn: '2026-11-14', chargeOn: '2026-11-18' }),
    ).toBe(
      'Your card has been saved. Your card will be held on Nov 14, 2026. You will be charged on Nov 18, 2026.',
    )
  })

  it('says a saved card is charged on the date', () => {
    expect(getCardHoldNoticeMessage('card_saved', { chargeOn: '2026-12-01' })).toBe(
      'Your card has been saved and will be charged on Dec 1, 2026.',
    )
    expect(getCardHoldNoticeMessage('card_saved')).toBe(
      'Your card has been saved and will be charged on the date.',
    )
  })

  it('says the card is charged now', () => {
    expect(getCardHoldNoticeMessage('charge_now')).toBe('Your card will be charged now.')
  })

  it('takes custom copy and date formatting', () => {
    expect(
      getCardHoldNoticeMessage('scheduled', {
        holdOn: '2026-11-14',
        formatDate: (date) => `[${date}]`,
        messages: { scheduled: ({ holdOn }) => `Retenido el ${holdOn}` },
      }),
    ).toBe('Retenido el [2026-11-14]')
  })

  it('never mentions a failure', () => {
    const statuses = ['placed', 'scheduled', 'card_saved', 'charge_now'] as const
    statuses.forEach((status) => {
      expect(getCardHoldNoticeMessage(status, { holdOn: '2026-11-14' })).not.toMatch(/fail/i)
    })
  })
})

describe('getCardHoldStatusLabel', () => {
  it.each([
    ['pending', 'Processing'],
    ['authorized', 'Card held'],
    ['released', 'Released'],
    ['captured', 'Charged'],
    ['scheduled', 'Hold scheduled'],
    ['saved', 'Card saved'],
  ])('labels %s as %s', (status, label) => {
    expect(getCardHoldStatusLabel(status).label).toBe(label)
  })

  it('shows a failed hold as scheduled to customers', () => {
    expect(getCardHoldStatusLabel('failed')).toEqual({ label: 'Hold scheduled', color: 'default' })
    expect(getCardHoldStatusLabel('failed', { kept: true }).label).not.toMatch(/fail/i)
  })

  it('shows a failed hold to staff, and whether it was kept', () => {
    expect(getCardHoldStatusLabel('failed', { view: 'staff' })).toEqual({
      label: 'Hold failed',
      color: 'error',
    })
    expect(getCardHoldStatusLabel('failed', { view: 'staff', kept: true })).toEqual({
      label: 'Hold failed · kept',
      color: 'warning',
    })
  })

  it('falls back to the raw status', () => {
    expect(getCardHoldStatusLabel('something_new')).toEqual({
      label: 'something_new',
      color: 'default',
    })
  })
})

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
