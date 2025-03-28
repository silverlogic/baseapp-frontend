'use client'

import { createContext, useContext } from 'react'

import { TabsContextValue } from './types'

export const TabsContext = createContext<TabsContextValue>({
  currentValue: '',
  onChange: () => {},
})

export const useTabsContext = () => useContext(TabsContext)
