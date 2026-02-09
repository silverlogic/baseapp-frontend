import { ComponentType } from 'react'

import { Box, BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export const MainContainer = styled(Box)(() => ({
  display: 'grid',
  justifySelf: 'center',
  height: '100%',
  width: '100%',
  gridTemplateRows: 'min-content min-content auto',
}))

export const SearchbarContainer: ComponentType<BoxProps> = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(2.5)} 0`,
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(2)} ${theme.spacing(1.5)} 0`,
  },
}))

export const GroupChatContainer: ComponentType<BoxProps> = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '48px auto',
  gap: theme.spacing(1.5),
  padding: `${theme.spacing(1.5)} ${theme.spacing(2.5)}`,
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(1.5)} ${theme.spacing(1.5)}`,
  },
}))
