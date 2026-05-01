import { act, renderHook } from '@baseapp-frontend/test'

import useDebouncedValue from '../index'

describe('useDebouncedValue', () => {
  jest.useFakeTimers()

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('returns the initial value synchronously on first render', () => {
    const { result } = renderHook(() => useDebouncedValue('hello', { debounceTime: 200 }))
    expect(result.current).toBe('hello')
  })

  it('only updates the returned value after the debounce window has elapsed', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, { debounceTime: 200 }),
      { initialProps: { value: 'a' } },
    )

    rerender({ value: 'b' })
    expect(result.current).toBe('a')

    act(() => {
      jest.advanceTimersByTime(199)
    })
    expect(result.current).toBe('a')

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current).toBe('b')
  })

  it('resets the timer when the value changes again before the window elapses', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, { debounceTime: 200 }),
      { initialProps: { value: 'a' } },
    )

    rerender({ value: 'b' })
    act(() => {
      jest.advanceTimersByTime(150)
    })
    rerender({ value: 'c' })

    // Original 200ms window from 'b' would have fired by now; the rerender to
    // 'c' should reset it, so we still see 'a'.
    act(() => {
      jest.advanceTimersByTime(50)
    })
    expect(result.current).toBe('a')

    act(() => {
      jest.advanceTimersByTime(150)
    })
    expect(result.current).toBe('c')
  })

  it('cancels a pending update on unmount', () => {
    const { result, rerender, unmount } = renderHook(
      ({ value }) => useDebouncedValue(value, { debounceTime: 400 }),
      { initialProps: { value: 'a' } },
    )

    rerender({ value: 'b' })
    act(() => {
      jest.advanceTimersByTime(200)
    })
    unmount()
    act(() => {
      jest.advanceTimersByTime(200)
    })

    // The hook is unmounted; we just assert no error was thrown and the
    // last-observed value is the pre-debounce one.
    expect(result.current).toBe('a')
  })

  it('uses the default 400ms when no options are provided', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value), {
      initialProps: { value: 1 },
    })

    rerender({ value: 2 })
    act(() => {
      jest.advanceTimersByTime(399)
    })
    expect(result.current).toBe(1)

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current).toBe(2)
  })

  it('respects an updated debounceTime', () => {
    const { result, rerender } = renderHook(
      ({ value, time }) => useDebouncedValue(value, { debounceTime: time }),
      { initialProps: { value: 'a', time: 500 } },
    )

    rerender({ value: 'b', time: 100 })

    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(result.current).toBe('b')
  })

  it('debounces non-string values (objects)', () => {
    const initial = { id: 1 }
    const next = { id: 2 }

    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, { debounceTime: 100 }),
      { initialProps: { value: initial } },
    )

    rerender({ value: next })
    expect(result.current).toBe(initial)

    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(result.current).toBe(next)
  })
})
