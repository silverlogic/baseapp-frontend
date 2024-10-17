'use client'

import { createContext, useContext } from 'react'

import { WagtailPagesContextProps } from './types'

export const WagtailPagesContext = createContext({} as WagtailPagesContextProps)

export const useWagtailPagesContext = () => {
  const context = useContext(WagtailPagesContext)

  if (!context) return {} as WagtailPagesContextProps

  return context
}
