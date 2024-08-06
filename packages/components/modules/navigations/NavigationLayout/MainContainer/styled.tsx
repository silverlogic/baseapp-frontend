import { Box, BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'

import { HEADER, NAV } from '../../constants'
import { NavVerticalContainerProps } from './types'

export const CommonContainer = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
}))

export const NavHorizontalContainer = styled(CommonContainer)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 1,
  paddingBottom: 10,
  paddingTop: `${HEADER.H_MOBILE + 24}px`,
  [theme.breakpoints.up('lg')]: {
    paddingTop: `${HEADER.H_MOBILE * 2 + 40}px`,
    paddingBottom: 15,
  },
}))

export const NavCenteredContainer = styled(NavHorizontalContainer)(({ theme }) => ({
  paddingTop: `${HEADER.H_MOBILE + 32}px`,
  [theme.breakpoints.up('lg')]: {
    paddingTop: `${HEADER.H_MOBILE + 24}px`,
  },
}))

export const NavVerticalContainer = styled(CommonContainer)<NavVerticalContainerProps>(
  ({ theme, isNavMini = false }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: 1,
    padding: `calc(${HEADER.H_MOBILE}px + ${theme.spacing(1)}) 0px`,
    [theme.breakpoints.up('lg')]: {
      padding: `calc(${HEADER.H_DESKTOP}px + ${theme.spacing(1)}) ${theme.spacing(2)}`,
      width: isNavMini ? `calc(100% - ${NAV.W_MINI}px)` : `calc(100% - ${NAV.W_VERTICAL}px)`,
    },
  }),
)
