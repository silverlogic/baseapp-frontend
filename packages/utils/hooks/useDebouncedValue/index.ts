'use client'

import { useEffect, useState } from 'react'

/**
 * Returns a debounced copy of `value` that only updates after `debounceTime`
 * of stillness. Use it to debounce a *value* (e.g. a controlled input) when
 * gating downstream effects, query keys, or expensive renders.
 *
 * For debouncing a *function call*, use `useDebounce` instead.
 *
 * @example
 * const [query, setQuery] = useState('')
 * const debouncedQuery = useDebouncedValue(query, { debounceTime: 300 })
 * useQuery({ queryKey: ['search', debouncedQuery], ... })
 */
const useDebouncedValue = <T>(value: T, { debounceTime = 400 } = {}): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, debounceTime)

    return () => {
      clearTimeout(handler)
    }
  }, [value, debounceTime])

  return debouncedValue
}

export default useDebouncedValue
