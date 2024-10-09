import { ThemeProviderProps } from '../../providers/ThemeProvider/types'
import { breakpoints } from '../../styles/breakpoint'
import { primaryFont, secondaryFont } from '../../styles/font'
import { createCustomShadows } from '../../styles/material/custom-shadows'
import { createPalette } from '../../styles/palette'
import { createShadows } from '../../styles/shadow'
import { typography } from '../../styles/typography'

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
