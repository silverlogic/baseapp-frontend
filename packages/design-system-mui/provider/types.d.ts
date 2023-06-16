import { PropsWithChildren } from 'react'

import { Theme } from '@mui/material'

export interface IThemeProvider extends PropsWithChildren {
  theme: Theme
  cacheKey: string
}
