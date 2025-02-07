import { FC, createContext, useContext, useMemo } from 'react'

import merge from 'lodash/merge'
import { type MD2Theme, PaperProvider } from 'react-native-paper'

import useColorMode from '../../../hooks/native/useColorMode'
import { Theme, shadow, systemTokens, typography } from '../../../styles/native'
import { ThemeProviderProps } from './types'

const ThemeContext = createContext<Theme | null>(null)

export const useTheme = () => {
  const theme = useContext(ThemeContext)
  if (!theme) {
    throw new Error('Missing ThemeProvider.')
  }
  return theme
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, theme: themeOverrides, fonts }) => {
  const mode = useColorMode()

  const theme: Theme = useMemo(() => {
    const baseTheme = {
      typography,
      shadow,
      colors: {
        object: systemTokens.object[mode],
        surface: systemTokens.surface[mode],
        primary: systemTokens.primary[mode],
        secondary: systemTokens.secondary[mode],
        info: systemTokens.info[mode],
        success: systemTokens.success[mode],
        warning: systemTokens.warning[mode],
        error: systemTokens.error[mode],
      },
    }

    return merge(baseTheme, themeOverrides)
  }, [mode, themeOverrides])

  const paperTheme: MD2Theme = {
    dark: false,
    roundness: 4,
    version: 2,
    isV3: false,
    colors: {
      primary: theme.colors.primary.main,
      background: theme.colors.surface.background,
      surface: theme.colors.surface.background,
      accent: theme.colors.secondary.main,
      error: theme.colors.error.main,
      text: theme.colors.object.high,
      onSurface: theme.colors.object.high,
      disabled: theme.colors.object.disabled,
      placeholder: theme.colors.object.low,
      backdrop: theme.colors.surface.active, // TODO: check backdrop color
      notification: theme.colors.info.main,
      tooltip: theme.colors.surface.active, // TODO: check tooltip color
    },
    fonts,
    animation: {
      scale: 1.0,
    },
  }

  return (
    <ThemeContext.Provider value={theme}>
      <PaperProvider theme={paperTheme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
