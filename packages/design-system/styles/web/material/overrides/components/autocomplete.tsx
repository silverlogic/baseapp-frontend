import { autocompleteClasses } from '@mui/material/Autocomplete'
import { svgIconClasses } from '@mui/material/SvgIcon'
import { Theme, alpha } from '@mui/material/styles'

import { menuItem, paper } from '../../css'

export function autocomplete(theme: Theme): Record<string, any> {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          [`& span.${autocompleteClasses.tag}`]: {
            ...theme.typography.subtitle2,
            height: 24,
            minWidth: 24,
            lineHeight: '24px',
            textAlign: 'center',
            padding: theme.spacing(0, 0.75),
            color: theme.palette.text.secondary,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
        },
        paper: {
          ...paper({ theme, dropdown: true }),
        },
        listbox: {
          padding: 0,
          [`& .${autocompleteClasses.option}`]: {
            ...menuItem(theme),
          },
        },
        endAdornment: {
          [`& .${svgIconClasses.root}`]: {
            width: 18,
            height: 18,
          },
        },
      },
    },
  }
}
