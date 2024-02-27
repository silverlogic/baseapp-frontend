'use client'

import { useEffect, useState, useRef } from 'react'

import debounce from 'lodash/debounce'

const useDebounce = <T extends any[], U>(
  functionToDebounce: (...params: T) => U,
  { debounceTime = 400 } = {},
) => {
  const debouncedFuncRef = useRef(debounce(functionToDebounce, debounceTime, { trailing: true }))

  useEffect(
    () => () => {
      debouncedFuncRef.current.cancel()
    },
    [],
  )

  return { debouncedFunction: debouncedFuncRef.current }
}

const useDebouncedValue = <T>(value: T, debounceTime: number) => {
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


export {useDebounce as default, useDebouncedValue}
