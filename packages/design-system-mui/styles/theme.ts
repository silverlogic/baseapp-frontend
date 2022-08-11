import { createTheme } from '@mui/material/styles'

import { palette } from './palette'
import { typography } from './typography'
import { shadows } from './shadows'

declare module '@mui/material/styles' {
  interface Palette {
    surface: typeof palette.surface
    service: typeof palette.service
  }
  interface PaletteOptions {
    surface: typeof palette.surface
    service: typeof palette.service
  }
}

const theme = createTheme({
  palette,
  typography,
  shadows,
})

export default theme
