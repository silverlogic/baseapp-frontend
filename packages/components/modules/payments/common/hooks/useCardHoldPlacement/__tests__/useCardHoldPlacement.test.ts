import { act, renderHook } from '@baseapp-frontend/test'

import type {
  CardHoldAuthenticator,
  CardHoldPaymentInput,
  CardHoldPlacementPayload,
} from '../../../types'
import useCardHoldPlacement from '../index'

type Payload = CardHoldPlacementPayload & { orderId?: string }

const FAST_RETRY = { baseDelayMs: 1, maxDelayMs: 2, maxRetries: 3 }

const setup = (
  answers: Array<Payload | null | Error>,
  authenticate: CardHoldAuthenticator = vi.fn(),
  retry = FAST_RETRY,
) => {
  const calls: CardHoldPaymentInput[] = []
  const submit = vi.fn(async (input: CardHoldPaymentInput) => {
    calls.push(input)
    const answer = answers.shift()
    if (answer instanceof Error) throw answer
    return answer ?? null
  })
  const onOutcome = vi.fn()
  const hook = renderHook(() =>
    useCardHoldPlacement<Payload>({ submit, authenticate, retry, onOutcome }),
  )
  return { hook, submit, calls, onOutcome }
}

const place = async (hook: ReturnType<typeof setup>['hook'], paymentMethodId = 'pm_1') => {
  let outcome: Awaited<ReturnType<typeof hook.result.current.place>> | undefined
  await act(async () => {
    outcome = await hook.result.current.place(paymentMethodId)
  })
  return outcome!
}

describe('useCardHoldPlacement', () => {
  it.each([
    ['placed', { status: 'placed' }],
    ['card_saved', { status: 'card_saved' }],
    ['charge_now', { status: 'charge_now' }],
    ['amount_changed', { status: 'amount_changed' }],
  ])('resolves %s on the first pass', async (holdStatus, expected) => {
    const payload = { holdStatus, orderId: 'order-1' }
    const { hook, calls, onOutcome } = setup([payload])
    const outcome = await place(hook)

    expect(outcome).toEqual({ ...expected, payload })
    expect(calls).toEqual([{ attemptId: hook.result.current.attemptId, paymentMethodId: 'pm_1' }])
    expect(hook.result.current.outcome).toEqual(outcome)
    expect(hook.result.current.phase).toBe('done')
    expect(hook.result.current.isPending).toBe(false)
    expect(onOutcome).toHaveBeenCalledWith(outcome)
  })

  it('resolves scheduled with the day the hold is placed', async () => {
    const { hook } = setup([{ holdStatus: 'scheduled', holdOn: '2026-11-14' }])
    const outcome = await place(hook)
    expect(outcome).toMatchObject({ status: 'scheduled', holdOn: '2026-11-14' })
  })

  it('authenticates a payment_intent and resends its id with the same attempt', async () => {
    const authenticate = vi.fn(async () => ({ intentId: 'pi_123' }))
    const { hook, calls } = setup(
      [
        {
          holdStatus: 'requires_action',
          requiresAction: true,
          clientSecret: 'pi_123_secret_x',
          intentType: 'payment_intent',
        },
        { holdStatus: 'placed' },
      ],
      authenticate,
    )
    const { attemptId } = hook.result.current
    const outcome = await place(hook)

    expect(authenticate).toHaveBeenCalledWith({
      clientSecret: 'pi_123_secret_x',
      intentType: 'payment_intent',
    })
    expect(calls).toEqual([
      { attemptId, paymentMethodId: 'pm_1' },
      { attemptId, paymentIntentId: 'pi_123' },
    ])
    expect(outcome.status).toBe('placed')
  })

  it('authenticates a setup_intent and resends setupIntentId', async () => {
    const authenticate = vi.fn(async () => ({ intentId: 'seti_9' }))
    const { hook, calls } = setup(
      [
        {
          holdStatus: 'requires_action',
          requiresAction: true,
          clientSecret: 'seti_9_secret_x',
          intentType: 'setup_intent',
        },
        { holdStatus: 'scheduled', holdOn: '2026-12-01' },
      ],
      authenticate,
    )
    const { attemptId } = hook.result.current
    const outcome = await place(hook)

    expect(authenticate).toHaveBeenCalledWith({
      clientSecret: 'seti_9_secret_x',
      intentType: 'setup_intent',
    })
    expect(calls[1]).toEqual({ attemptId, setupIntentId: 'seti_9' })
    expect(outcome).toMatchObject({ status: 'scheduled', holdOn: '2026-12-01' })
  })

  it('resends in_progress with the same input until it settles', async () => {
    const { hook, calls } = setup([
      { holdStatus: 'in_progress' },
      { holdStatus: 'in_progress' },
      { holdStatus: 'placed' },
    ])
    const outcome = await place(hook)

    expect(outcome.status).toBe('placed')
    expect(calls).toHaveLength(3)
    expect(new Set(calls.map((call) => JSON.stringify(call))).size).toBe(1)
  })

  it('retries the second pass, not the first, after authentication', async () => {
    const authenticate = vi.fn(async () => ({ intentId: 'pi_1' }))
    const { hook, calls } = setup(
      [
        {
          holdStatus: 'requires_action',
          clientSecret: 'pi_1_secret',
          intentType: 'payment_intent',
        },
        { holdStatus: 'in_progress' },
        { holdStatus: 'placed' },
      ],
      authenticate,
    )
    await place(hook)
    expect(calls[1]).toEqual(calls[2])
    expect(calls[2]).toHaveProperty('paymentIntentId', 'pi_1')
  })

  it('gives up as in_progress after maxRetries, keeping the attempt id', async () => {
    const { hook, calls } = setup(Array.from({ length: 10 }, () => ({ holdStatus: 'in_progress' })))
    const { attemptId } = hook.result.current
    const outcome = await place(hook)

    expect(outcome.status).toBe('in_progress')
    expect(calls).toHaveLength(FAST_RETRY.maxRetries + 1)
    expect(hook.result.current.attemptId).toBe(attemptId)
  })

  it('waits with exponential backoff between retries', async () => {
    vi.useFakeTimers()
    try {
      const { hook, calls } = setup(
        [{ holdStatus: 'in_progress' }, { holdStatus: 'in_progress' }, { holdStatus: 'placed' }],
        vi.fn(),
        { baseDelayMs: 1000, maxDelayMs: 10000, maxRetries: 5 },
      )
      let pending: Promise<unknown> | undefined
      act(() => {
        pending = hook.result.current.place('pm_1')
      })
      await act(async () => {
        await vi.advanceTimersByTimeAsync(0)
      })
      expect(calls).toHaveLength(1)
      expect(hook.result.current.phase).toBe('waiting')
      expect(hook.result.current.isPending).toBe(true)

      await act(async () => {
        await vi.advanceTimersByTimeAsync(999)
      })
      expect(calls).toHaveLength(1)
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1)
      })
      expect(calls).toHaveLength(2)

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1999)
      })
      expect(calls).toHaveLength(2)
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1)
        await pending
      })
      expect(calls).toHaveLength(3)
      expect(hook.result.current.outcome?.status).toBe('placed')
    } finally {
      vi.useRealTimers()
    }
  })

  it.each([
    ['declined', [{ holdStatus: 'declined' }]],
    ['changed', [{ holdStatus: 'changed' }, { holdStatus: 'changed' }]],
    ['refused', [{ holdStatus: 'refused' }]],
  ])('renews the attempt id after %s', async (holdStatus, answers) => {
    const { hook, calls } = setup([...answers, { holdStatus: 'placed' }])
    const first = hook.result.current.attemptId
    const outcome = await place(hook)

    expect(outcome.status).toBe(holdStatus)
    expect(hook.result.current.attemptId).not.toBe(first)

    await place(hook, 'pm_2')
    expect(calls.at(-1)).toEqual({
      attemptId: hook.result.current.attemptId,
      paymentMethodId: 'pm_2',
    })
    expect(new Set(calls.map((call) => call.attemptId)).size).toBe(calls.length)
  })

  it('resends a changed answer once under a new attempt id with the same card', async () => {
    const { hook, calls, onOutcome } = setup([{ holdStatus: 'changed' }, { holdStatus: 'placed' }])
    const first = hook.result.current.attemptId
    const outcome = await place(hook)

    expect(outcome.status).toBe('placed')
    expect(calls).toHaveLength(2)
    expect(calls[0]).toEqual({ attemptId: first, paymentMethodId: 'pm_1' })
    expect(calls[1]!.attemptId).not.toBe(first)
    expect(calls[1]).toEqual({ attemptId: calls[1]!.attemptId, paymentMethodId: 'pm_1' })
    // The placed order belongs to the new attempt id: a later retry must reuse it.
    expect(hook.result.current.attemptId).toBe(calls[1]!.attemptId)
    expect(onOutcome).toHaveBeenCalledTimes(1)
  })

  it('returns changed when the resend is changed again', async () => {
    const { hook, calls } = setup([{ holdStatus: 'changed' }, { holdStatus: 'changed' }])
    const outcome = await place(hook)

    expect(outcome.status).toBe('changed')
    expect(calls).toHaveLength(2)
  })

  it('keeps the attempt id after a placement', async () => {
    const { hook } = setup([{ holdStatus: 'placed' }])
    const first = hook.result.current.attemptId
    await place(hook)
    expect(hook.result.current.attemptId).toBe(first)
  })

  it('reports authentication_failed when Stripe could not authenticate', async () => {
    const authenticate = vi.fn(async () => ({ error: { message: 'Authentication cancelled' } }))
    const { hook, calls } = setup(
      [
        {
          holdStatus: 'requires_action',
          clientSecret: 'pi_1_secret',
          intentType: 'payment_intent',
        },
      ],
      authenticate,
    )
    const { attemptId } = hook.result.current
    const outcome = await place(hook)

    expect(outcome).toEqual({
      status: 'authentication_failed',
      message: 'Authentication cancelled',
    })
    expect(calls).toHaveLength(1)
    expect(hook.result.current.attemptId).toBe(attemptId)
  })

  it('sends the second pass for a finished intent so the backend settles it', async () => {
    const authenticate = vi.fn(async () => ({
      error: { message: 'Card declined' },
      intentId: 'pi_1',
    }))
    const { hook, calls } = setup(
      [
        {
          holdStatus: 'requires_action',
          clientSecret: 'pi_1_secret',
          intentType: 'payment_intent',
        },
        { holdStatus: 'declined' },
      ],
      authenticate,
    )
    const outcome = await place(hook)
    expect(calls[1]).toHaveProperty('paymentIntentId', 'pi_1')
    expect(outcome.status).toBe('declined')
  })

  it('reports an error when the mutation fails or returns no payload', async () => {
    const failure = new Error('Network down')
    const { hook } = setup([failure, null])
    expect(await place(hook)).toEqual({ status: 'error', error: failure })
    expect((await place(hook)).status).toBe('error')
  })

  it('reports an error for an unknown status', async () => {
    const { hook } = setup([{ holdStatus: 'something_new' }])
    expect((await place(hook)).status).toBe('error')
  })

  it('stops after repeated authentication requests', async () => {
    const authenticate = vi.fn(async () => ({ intentId: 'pi_1' }))
    const requiresAction = {
      holdStatus: 'requires_action',
      clientSecret: 'pi_1_secret',
      intentType: 'payment_intent',
    }
    const { hook } = setup(
      Array.from({ length: 10 }, () => ({ ...requiresAction })),
      authenticate,
    )
    expect((await place(hook)).status).toBe('error')
    expect(authenticate).toHaveBeenCalledTimes(3)
  })

  it('reset starts a new checkout', async () => {
    const { hook } = setup([{ holdStatus: 'placed' }])
    const first = hook.result.current.attemptId
    await place(hook)
    act(() => hook.result.current.reset())
    expect(hook.result.current.attemptId).not.toBe(first)
    expect(hook.result.current.outcome).toBeNull()
    expect(hook.result.current.phase).toBe('idle')
  })

  it('never puts clientSecret in an outcome payload', async () => {
    const authenticate = vi.fn(async () => ({ intentId: 'pi_1' }))
    const requiresAction = {
      holdStatus: 'requires_action',
      clientSecret: 'pi_1_secret_x',
      intentType: 'payment_intent',
      orderId: 'order-1',
    }
    const { hook } = setup(
      Array.from({ length: 5 }, () => ({ ...requiresAction })),
      authenticate,
    )
    const outcome = await place(hook)

    expect(outcome.status).toBe('error')
    expect(outcome).toHaveProperty('payload.orderId', 'order-1')
    expect(JSON.stringify(outcome)).not.toContain('secret')

    const placed = setup([{ holdStatus: 'placed', clientSecret: 'pi_2_secret_y' }])
    const placedOutcome = await place(placed.hook)
    expect(placedOutcome).toEqual({ status: 'placed', payload: { holdStatus: 'placed' } })
  })

  it('joins a placement already running instead of submitting again', async () => {
    let answer: (payload: Payload) => void = () => {}
    const submit = vi.fn(
      () =>
        new Promise<Payload>((resolve) => {
          answer = resolve
        }),
    )
    const onOutcome = vi.fn()
    const { result } = renderHook(() =>
      useCardHoldPlacement<Payload>({ submit, authenticate: vi.fn(), onOutcome }),
    )

    let first: Promise<unknown> | undefined
    let second: Promise<unknown> | undefined
    act(() => {
      first = result.current.place('pm_1')
      second = result.current.place('pm_1')
    })
    expect(second).toBe(first)

    await act(async () => {
      answer({ holdStatus: 'placed' })
      await first
    })
    expect(submit).toHaveBeenCalledTimes(1)
    expect(onOutcome).toHaveBeenCalledTimes(1)

    // Once settled, a new placement runs again.
    await act(async () => {
      const next = result.current.place('pm_1')
      answer({ holdStatus: 'placed' })
      await next
    })
    expect(submit).toHaveBeenCalledTimes(2)
  })

  it('does not authenticate after unmounting while the submit was in flight', async () => {
    let answer: (payload: Payload) => void = () => {}
    const submit = vi.fn(
      () =>
        new Promise<Payload>((resolve) => {
          answer = resolve
        }),
    )
    const authenticate = vi.fn(async () => ({ intentId: 'pi_1' }))
    const onOutcome = vi.fn()
    const { result, unmount } = renderHook(() =>
      useCardHoldPlacement<Payload>({ submit, authenticate, onOutcome }),
    )

    let pending: Promise<unknown> | undefined
    act(() => {
      pending = result.current.place('pm_1')
    })
    unmount()
    answer({
      holdStatus: 'requires_action',
      clientSecret: 'pi_1_secret',
      intentType: 'payment_intent',
    })

    expect(await pending).toEqual({ status: 'cancelled' })
    expect(authenticate).not.toHaveBeenCalled()
    expect(submit).toHaveBeenCalledTimes(1)
    expect(onOutcome).not.toHaveBeenCalled()
  })

  it('stops the backoff on unmount: no further submit and no outcome', async () => {
    vi.useFakeTimers()
    try {
      const { hook, calls, onOutcome } = setup(
        [{ holdStatus: 'in_progress' }, { holdStatus: 'placed' }],
        vi.fn(),
        { baseDelayMs: 1000, maxDelayMs: 10000, maxRetries: 5 },
      )
      let pending: Promise<unknown> | undefined
      act(() => {
        pending = hook.result.current.place('pm_1')
      })
      await act(async () => {
        await vi.advanceTimersByTimeAsync(0)
      })
      expect(hook.result.current.phase).toBe('waiting')
      expect(vi.getTimerCount()).toBe(1)

      hook.unmount()
      // The abort clears the backoff timer and settles the run without waiting for it.
      expect(vi.getTimerCount()).toBe(0)
      expect(await pending).toEqual({ status: 'cancelled' })

      await vi.advanceTimersByTimeAsync(10000)
      expect(calls).toHaveLength(1)
      expect(onOutcome).not.toHaveBeenCalled()
    } finally {
      vi.useRealTimers()
    }
  })

  it('uses initialAttemptId when given', () => {
    const { result } = renderHook(() =>
      useCardHoldPlacement({
        submit: vi.fn(),
        authenticate: vi.fn(),
        initialAttemptId: '11111111-1111-4111-8111-111111111111',
      }),
    )
    expect(result.current.attemptId).toBe('11111111-1111-4111-8111-111111111111')
  })
})
