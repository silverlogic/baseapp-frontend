import { ThemeProviderProps } from '../../../../providers/web/ThemeProvider/types'
import {
  breakpoints,
  createCustomShadows,
  createPalette,
  createShadows,
  typography,
} from '../../../../styles/web'

export const defaultTheme: ThemeProviderProps = {
  palette: createPalette('light'),
  breakpoints: breakpoints,
  primaryFont: undefined,
  secondaryFont: undefined,
  settings: {
    themeMode: 'light',
    themeContrast: 'default',
    themeLayout: 'vertical',
    themeColorPresets: 'default',
    themeStretch: false,
  },
  shadows: createShadows('light'),
  customShadows: createCustomShadows('light'),
  typography: typography,
}
