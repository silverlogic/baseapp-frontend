'use client'

import { useMemo, useState } from 'react'

import { PROVIDER_INITIAL_STATE } from './constants'
import { PageLayoutContext } from './context'
import { PageLayoutContextStates, PageLayoutProviderProps } from './types'

/**
 * Designed to change the behavior of all blocks inside of this provider. Usually page types will
 * set the page layout settings using this provider.
 */
export function PageLayoutProvider({
  children,
  customLayoutSettings = {},
}: PageLayoutProviderProps) {
  const [state, setState] = useState<PageLayoutContextStates>({
    ...PROVIDER_INITIAL_STATE,
    ...customLayoutSettings,
  })

  const memoizedValue = useMemo(
    () => ({
      ...state,
      update: (
        name: keyof PageLayoutContextStates,
        updateValue: PageLayoutContextStates[keyof PageLayoutContextStates],
      ) => {
        setState((prev: PageLayoutContextStates) => ({ ...prev, [name]: updateValue }))
      },
    }),
    [state],
  )

  return <PageLayoutContext.Provider value={memoizedValue}>{children}</PageLayoutContext.Provider>
}
