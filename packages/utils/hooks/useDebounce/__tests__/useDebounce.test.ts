import { renderHook } from '@baseapp-frontend/test'

import useDebounce from '../index'

describe('useDebounce', () => {
  vi.useFakeTimers()

  afterEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
  })

  it('should return a debounced function', () => {
    const mockFunction = vi.fn()

    const { result } = renderHook(() => useDebounce(mockFunction, { debounceTime: 200 }))

    result.current.debouncedFunction()

    expect(mockFunction).not.toHaveBeenCalled()

    vi.advanceTimersByTime(200)

    expect(mockFunction).toHaveBeenCalled()
  })

  it('should cancel the debounced function on unmount', () => {
    const mockFunction = vi.fn()

    const { unmount, result } = renderHook(() => useDebounce(mockFunction, { debounceTime: 400 }))

    result.current.debouncedFunction()

    vi.advanceTimersByTime(200)

    unmount()

    vi.advanceTimersByTime(200)

    expect(mockFunction).not.toHaveBeenCalled()
  })
})
