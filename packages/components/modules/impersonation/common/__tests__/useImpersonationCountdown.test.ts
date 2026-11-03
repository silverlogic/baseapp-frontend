import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'

import useImpersonationCountdown from '../hooks/useImpersonationCountdown'

describe('useImpersonationCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-22T10:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('counts down and calls onExpire once at zero', () => {
    const onExpire = vi.fn()
    const { result } = renderHook(() =>
      useImpersonationCountdown('2026-10-22T10:00:03Z', { onExpire }),
    )

    expect(result.current.remainingMs).toBe(3000)
    expect(result.current.isExpired).toBe(false)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.remainingMs).toBe(2000)

    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(result.current.remainingMs).toBe(0)
    expect(result.current.isExpired).toBe(true)
    expect(onExpire).toHaveBeenCalledTimes(1)
  })

  test('expires at once for a date in the past', () => {
    const onExpire = vi.fn()
    const { result } = renderHook(() =>
      useImpersonationCountdown('2026-10-22T09:00:00Z', { onExpire }),
    )

    expect(result.current.isExpired).toBe(true)
    expect(onExpire).toHaveBeenCalledTimes(1)
  })

  test('stays idle without an expiry', () => {
    const onExpire = vi.fn()
    const { result } = renderHook(() => useImpersonationCountdown(null, { onExpire }))

    expect(result.current.remainingMs).toBeNull()
    expect(result.current.isExpired).toBe(false)
    expect(onExpire).not.toHaveBeenCalled()
  })
})
