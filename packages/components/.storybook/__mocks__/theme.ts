import {
  breakpoints,
  createCustomShadows,
  createPalette,
  createShadows,
  primaryFont,
  secondaryFont,
  typography,
} from '@baseapp-frontend/design-system'
import { ThemeProviderProps } from '@baseapp-frontend/design-system'

const defaultTheme: ThemeProviderProps = {
  palette: createPalette('light'),
  breakpoints: breakpoints,
  primaryFont: primaryFont,
  secondaryFont: secondaryFont,
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
