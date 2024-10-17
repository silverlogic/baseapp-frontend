'use client'

import { FC, useEffect, useMemo, useState } from 'react'

import { PROVIDER_INITIAL_STATE } from './constants'
import { WagtailPagesContext } from './context'
import { WagtailPagesContextState, WagtailPagesProviderProps } from './types'

export const WagtailPagesProvider: FC<WagtailPagesProviderProps> = ({
  children,
  defaultSettings,
}) => {
  const [state, setState] = useState<WagtailPagesContextState>({
    ...PROVIDER_INITIAL_STATE,
    ...defaultSettings,
  })

  useEffect(() => {
    setState((prev: WagtailPagesContextState) => ({ ...prev, ...defaultSettings }))
  }, [defaultSettings])

  const memoizedValue = useMemo(
    () => ({
      ...state,
      update: (
        name: keyof WagtailPagesContextState,
        updateValue: WagtailPagesContextState[keyof WagtailPagesContextState],
      ) => {
        setState((prev: WagtailPagesContextState) => ({ ...prev, [name]: updateValue }))
      },
    }),
    [state, setState],
  )

  return (
    <WagtailPagesContext.Provider value={memoizedValue}>{children}</WagtailPagesContext.Provider>
  )
}
