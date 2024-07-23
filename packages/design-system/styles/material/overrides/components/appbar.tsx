import { Theme } from '@mui/material/styles'

export function appBar(_theme: Theme) {
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  }
}
