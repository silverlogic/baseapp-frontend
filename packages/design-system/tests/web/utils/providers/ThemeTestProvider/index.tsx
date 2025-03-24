'use client'

import { FC } from 'react'

import { ThemeProvider } from '../../../../../providers/web'
import { defaultTheme } from '../../__mocks__/theme'
import { ThemeTestProviderProps } from './types'

const ThemeTestProvider: FC<ThemeTestProviderProps> = ({
  children,
  customTheme = defaultTheme,
  disabled = false,
}) => {
  if (disabled) {
    return children
  }

  return <ThemeProvider {...customTheme}>{children}</ThemeProvider>
}

export default ThemeTestProvider
