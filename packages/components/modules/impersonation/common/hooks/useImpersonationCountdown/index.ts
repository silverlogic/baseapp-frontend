import { useEffect, useRef, useState } from 'react'

import { IMPERSONATION_COUNTDOWN_INTERVAL_MS } from '../../constants'
import { getRemainingTime } from '../../utils'
import type { UseImpersonationCountdownOptions, UseImpersonationCountdownReturn } from './types'

/** Counts down to a session's `expiresAt`, an ISO date. */
const useImpersonationCountdown = (
  expiresAt: string | null | undefined,
  { onExpire }: UseImpersonationCountdownOptions = {},
): UseImpersonationCountdownReturn => {
  const [remainingMs, setRemainingMs] = useState<number | null>(null)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    let hasExpired = false
    const tick = () => {
      const remaining = getRemainingTime(expiresAt)
      setRemainingMs(remaining)
      if (remaining === 0 && !hasExpired) {
        hasExpired = true
        onExpireRef.current?.()
      }
      return remaining
    }

    const remaining = tick()
    if (remaining === null || remaining === 0) return undefined

    const interval = setInterval(() => {
      if (tick() === 0) clearInterval(interval)
    }, IMPERSONATION_COUNTDOWN_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [expiresAt])

  return { remainingMs, isExpired: remainingMs === 0 }
}

export default useImpersonationCountdown
