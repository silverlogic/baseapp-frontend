import { PropsWithChildren } from 'react'

import { Theme } from '@mui/material'

export interface ThemeProviderProps extends PropsWithChildren {
  theme: Theme
  cacheKey: string
}
