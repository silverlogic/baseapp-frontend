'use client'

import React, { FC } from 'react'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider as MUIThemeProvider } from '@mui/material'

import { IThemeProvider } from './types'

const ThemeProvider: FC<IThemeProvider> = ({ theme, cacheKey, children }) => {
  const emotionCache = createCache({ key: cacheKey })

  return (
    // @ts-ignore TODO: (BA-1081) investigate 'CacheProvider' cannot be used as a JSX component error.
    <CacheProvider value={emotionCache}>
      {/* @ts-ignore TODO: (BA-1081) investigate 'MUIThemeProvider' cannot be used as a JSX component error. */}
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </CacheProvider>
  )
}

export default ThemeProvider
