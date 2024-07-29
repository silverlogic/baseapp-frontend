'use client'

import { FC, useMemo } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import merge from 'lodash/merge'

import NextAppDirEmotionCacheProvider from '../../styles/material/next-emotion-cache'
import { createContrast } from '../../styles/material/options/contrast'
import { componentsOverrides } from '../../styles/material/overrides'
import { createPresets } from '../../styles/presets'
import { ThemeProviderProps } from './types'

const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  settings,
  palette,
  breakpoints,
  primaryFont,
  secondaryFont,
  typography,
  shadows,
  customShadows,
  customOverrides,
  themeOptions = {},
}) => {
  const presets = createPresets(palette.primary, settings.themeColorPresets)

  const contrast = createContrast(settings.themeContrast, settings.themeMode)

  const memoizedThemeOptions = useMemo(
    () => ({
      breakpoints: {
        values: breakpoints,
      },
      palette: {
        ...palette,
        ...presets.palette,
        ...contrast.palette,
      },
      customShadows: {
        ...customShadows,
        ...presets.customShadows,
      },
      shadows,
      shape: { borderRadius: 8 },
      typography: {
        fontFamily: primaryFont.style.fontFamily,
        fontSecondaryFamily: secondaryFont.style.fontFamily,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightSemiBold: 600,
        fontWeightBold: 700,
        ...typography,
      },
      ...themeOptions,
    }),
    [
      settings.themeMode,
      presets.palette,
      presets.customShadows,
      contrast.palette,
      customShadows,
      primaryFont.style.fontFamily,
      secondaryFont.style.fontFamily,
      typography,
      palette,
      shadows,
      themeOptions,
    ],
  )

  // @ts-ignore TODO: revisit this later
  const theme = createTheme(memoizedThemeOptions)

  theme.components = merge(componentsOverrides(theme), contrast.components, customOverrides)

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  )
}

export default ThemeProvider
