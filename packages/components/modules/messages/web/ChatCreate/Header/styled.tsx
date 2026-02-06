import { ComponentType } from 'react'

import { Box, BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export const HeaderContainer: ComponentType<BoxProps> = styled(Box)(({ theme }) => ({
  borderBottom: `1px ${theme.palette.divider} solid`,
  width: '100%',
  padding: `${theme.spacing(2)}`,
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(2)} ${theme.spacing(1.5)} ${theme.spacing(2)}`,
  },
}))
