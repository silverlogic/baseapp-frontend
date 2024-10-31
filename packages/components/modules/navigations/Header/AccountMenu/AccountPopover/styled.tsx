import { Box, menuItemClasses } from '@mui/material'
import { styled } from '@mui/system'

export const PopoverStyles = {
  width: 256,
  p: 0,
  overflow: 'hidden',
  [`& .${menuItemClasses.root}`]: {
    '& svg': {
      mr: 0,
      flexShrink: 0,
    },
  },
}

export const PopoverContentBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
}))
