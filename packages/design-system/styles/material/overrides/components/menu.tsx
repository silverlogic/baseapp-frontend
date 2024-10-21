import { Theme } from '@mui/material/styles'

import { menuItem } from '../../css'

export function menu(theme: Theme): Record<string, any> {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...menuItem(theme),
        },
      },
    },
  }
}
