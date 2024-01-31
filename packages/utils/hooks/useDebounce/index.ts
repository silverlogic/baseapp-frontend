'use client'

import { useEffect, useRef } from 'react'

import debounce from 'lodash/debounce'

const useDebounce = <T extends (params: any) => any>(
  functionToDebounce: T,
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

export default useDebounce
