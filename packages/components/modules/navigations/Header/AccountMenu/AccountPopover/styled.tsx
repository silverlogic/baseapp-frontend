import { menuItemClasses } from '@mui/material'

export const PopoverStyles = {
  width: 200,
  p: 0,
  overflow: 'hidden',
  [`& .${menuItemClasses.root}`]: {
    '& svg': {
      mr: 0,
      flexShrink: 0,
    },
  },
}