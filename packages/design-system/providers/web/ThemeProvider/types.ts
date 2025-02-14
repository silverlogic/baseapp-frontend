import { PropsWithChildren } from 'react'

import { ThemeOptions } from '@mui/material'
import type { NextFont } from 'next/dist/compiled/@next/font'

import { Breakpoint, Palette, UISettings } from '../../../styles/web/types'

export interface ThemeProviderProps extends PropsWithChildren {
  settings: UISettings
  shadows: string[]
  palette: Palette & Record<string, any>
  breakpoints: Breakpoint & Record<string, number>
  typography: Record<string, any>
  primaryFont: NextFont | undefined
  secondaryFont: NextFont | undefined
  customShadows: Record<string, string>
  customOverrides?: Record<string, any>
  /**
   * Custom theme options.
   * Make sure that these options are also reflected in the Tailwind config to ensure both themes are in sync.
   */
  themeOptions?: ThemeOptions
}
