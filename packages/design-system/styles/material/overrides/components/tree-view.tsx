import { Theme } from '@mui/material/styles'

export function treeView(theme: Theme): Record<string, any> {
  return {
    MuiTreeItem: {
      styleOverrides: {
        label: {
          ...theme.typography.body2,
        },
        iconContainer: {
          width: 'auto',
        },
      },
    },
  }
}
