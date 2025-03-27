import { ComponentType } from 'react'

import { Box, BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export const MainContainer = styled(Box)(() => ({
  display: 'grid',
  gridTemplateRows: 'min-content min-content auto',
  height: '100%',
  width: '100%',
}))

export const Header: ComponentType<BoxProps> = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: `${theme.spacing(2.5)} ${theme.spacing(2.5)} ${theme.spacing(2)}`,
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(2)} ${theme.spacing(1.5)} ${theme.spacing(2)}`,
  },
}))
