import { useCallback, useEffect, useRef, useState } from 'react'

import type { CardHoldOutcome, CardHoldPlacementPayload } from '../../types'
import { generateCardHoldAttemptId, placeCardHold, shouldRenewCardHoldAttempt } from '../../utils'
import type {
  CardHoldPlacementPhase,
  UseCardHoldPlacementOptions,
  UseCardHoldPlacementReturn,
} from './types'

/**
 * Places a card hold through the project's own create mutation: authenticates (3D Secure) on
 * `requires_action`, resends `in_progress` with backoff under the same attempt id, resends a
 * `changed` answer once under a new one, and exposes the final outcome. Platform-neutral: the Stripe call is the injected `authenticate`.
 */
const useCardHoldPlacement = <
  TPayload extends CardHoldPlacementPayload = CardHoldPlacementPayload,
>({
  submit,
  authenticate,
  retry,
  onOutcome,
  initialAttemptId,
}: UseCardHoldPlacementOptions<TPayload>): UseCardHoldPlacementReturn<TPayload> => {
  const [attemptId, setAttemptId] = useState(() => initialAttemptId ?? generateCardHoldAttemptId())
  const [phase, setPhase] = useState<CardHoldPlacementPhase>('idle')
  const [outcome, setOutcome] = useState<CardHoldOutcome<TPayload> | null>(null)

  // Read through refs so a `place()` already running keeps the latest callbacks and attempt.
  const attemptIdRef = useRef(attemptId)
  const optionsRef = useRef({ submit, authenticate, retry, onOutcome })
  optionsRef.current = { submit, authenticate, retry, onOutcome }
  const isMountedRef = useRef(true)
  // The running placement's controller: unmounting aborts it (no further authentication,
  // submit or backoff), and it marks a run as in flight so a second `place()` joins it.
  const abortControllerRef = useRef<AbortController | null>(null)
  const inFlightRef = useRef<Promise<CardHoldOutcome<TPayload>> | null>(null)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      abortControllerRef.current?.abort()
    }
  }, [])

  const setCurrentAttemptId = useCallback((next: string) => {
    attemptIdRef.current = next
    if (isMountedRef.current) setAttemptId(next)
  }, [])

  const renewAttemptId = useCallback(
    () => setCurrentAttemptId(generateCardHoldAttemptId()),
    [setCurrentAttemptId],
  )

  const run = useCallback(
    async (paymentMethodId: string) => {
      const controller = new AbortController()
      abortControllerRef.current = controller
      setOutcome(null)
      const result = await placeCardHold<TPayload>({
        attemptId: attemptIdRef.current,
        paymentMethodId,
        submit: (input) => optionsRef.current.submit(input),
        authenticate: (params) => optionsRef.current.authenticate(params),
        retry: optionsRef.current.retry,
        onPhaseChange: (next) => {
          if (isMountedRef.current) setPhase(next)
        },
        onAttemptIdChange: setCurrentAttemptId,
        signal: controller.signal,
      })
      if (abortControllerRef.current === controller) abortControllerRef.current = null
      // After unmount nobody is left to tell: navigating away is not a failure.
      if (!isMountedRef.current || result.status === 'cancelled') return result
      if (shouldRenewCardHoldAttempt(result)) renewAttemptId()
      setPhase('done')
      setOutcome(result)
      optionsRef.current.onOutcome?.(result)
      return result
    },
    [renewAttemptId, setCurrentAttemptId],
  )

  const place = useCallback(
    (paymentMethodId: string) => {
      // Set synchronously, so a double click joins the running placement instead of
      // submitting the same attempt twice.
      if (inFlightRef.current) return inFlightRef.current
      const pending = run(paymentMethodId).finally(() => {
        inFlightRef.current = null
      })
      inFlightRef.current = pending
      return pending
    },
    [run],
  )

  const reset = useCallback(() => {
    renewAttemptId()
    setPhase('idle')
    setOutcome(null)
  }, [renewAttemptId])

  return {
    place,
    phase,
    isPending: phase === 'submitting' || phase === 'authenticating' || phase === 'waiting',
    outcome,
    attemptId,
    reset,
  }
}

export default useCardHoldPlacement
