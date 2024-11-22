'use client'

import { createContext, useContext } from 'react'

import { PageLayoutContextProps } from './types'

export const PageLayoutContext = createContext({} as PageLayoutContextProps)

export const usePageLayoutContext = () => {
  const context = useContext(PageLayoutContext)

  if (!context) throw new Error('usePageLayoutContext must be use inside PageLayoutProvider')

  return context
}
