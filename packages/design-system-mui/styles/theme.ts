import { createTheme } from '@mui/material/styles'

import { palette } from './palette'
import { shadows } from './shadows'
import { typography } from './typography'

const theme = createTheme({
  palette,
  typography,
  shadows,
})

export default theme
