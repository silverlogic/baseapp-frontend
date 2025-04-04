import { PropsWithChildren } from 'react'

import { ThemeProviderProps } from '../../../../../providers/web'

export interface ThemeTestProviderProps extends PropsWithChildren {
  customTheme?: ThemeProviderProps
  disabled?: boolean
}
