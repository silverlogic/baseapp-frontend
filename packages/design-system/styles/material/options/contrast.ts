import { ThemeContrast, ThemeMode } from '../../../types'
import { grey } from '../../palette'
import { createCustomShadows } from '../custom-shadows'

export function createContrast(contrast: ThemeContrast, mode: ThemeMode) {
  const theme = {
    ...(contrast === 'bold' &&
      mode === 'light' && {
        palette: {
          background: {
            default: grey[200],
          },
        },
      }),
  }

  const components = {
    ...(contrast === 'bold' && {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: createCustomShadows(mode).z1,
          },
        },
      },
    }),
  }

  return {
    ...theme,
    components,
  }
}
