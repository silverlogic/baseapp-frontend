import { renderHook } from '@baseapp-frontend/test'

import useDebounce from '../index'

describe('useDebounce', () => {
  jest.useFakeTimers()

  afterEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  it('should return a debounced function', () => {
    const mockFunction = jest.fn()

    const { result } = renderHook(() => useDebounce(mockFunction, { debounceTime: 200 }))

    result.current.debouncedFunction()

    expect(mockFunction).not.toHaveBeenCalled()

    jest.advanceTimersByTime(200)

    expect(mockFunction).toHaveBeenCalled()
  })

  it('should cancel the debounced function on unmount', () => {
    const mockFunction = jest.fn()

    const { unmount, result } = renderHook(() => useDebounce(mockFunction, { debounceTime: 400 }))

    result.current.debouncedFunction()

    jest.advanceTimersByTime(200)

    unmount()

    jest.advanceTimersByTime(200)

    expect(mockFunction).not.toHaveBeenCalled()
  })
})
