import { ThemeProviderProps } from '@baseapp-frontend/design-system/providers/web'
import {
  breakpoints,
  createCustomShadows,
  createPalette,
  createShadows,
  typography,
} from '@baseapp-frontend/design-system/styles/web'

const defaultTheme: ThemeProviderProps = {
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

export default defaultTheme
