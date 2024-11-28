import { Box, BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'

import { NAV_PADDING_DOWN_TO_LG, NAV_PADDING_UP_TO_LG, NAV_WIDTH } from '../../constants'
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
  paddingBottom: NAV_PADDING_DOWN_TO_LG.horizontal.bottom,
  paddingTop: NAV_PADDING_DOWN_TO_LG.horizontal.top,
  [theme.breakpoints.up('lg')]: {
    paddingTop: NAV_PADDING_DOWN_TO_LG.horizontal.top,
    paddingBottom: NAV_PADDING_UP_TO_LG.horizontal.bottom,
  },
  [theme.breakpoints.down('sm')]: {
    paddingBottom: 0,
  },
}))

export const NavCenteredContainer = styled(NavHorizontalContainer)(({ theme }) => ({
  paddingTop: NAV_PADDING_DOWN_TO_LG.centered.top,
  paddingBottom: NAV_PADDING_DOWN_TO_LG.centered.bottom,
  [theme.breakpoints.up('lg')]: {
    paddingTop: NAV_PADDING_UP_TO_LG.centered.top,
    paddingBottom: NAV_PADDING_UP_TO_LG.centered.bottom,
  },
  [theme.breakpoints.down('sm')]: {
    paddingBottom: 0,
  },
}))

export const NavVerticalContainer = styled(CommonContainer)<NavVerticalContainerProps>(
  ({ theme, isNavMini = false }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: 1,
    paddingTop: NAV_PADDING_DOWN_TO_LG.vertical.top,
    paddingBottom: NAV_PADDING_DOWN_TO_LG.vertical.bottom,
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.up('lg')]: {
      paddingTop: NAV_PADDING_UP_TO_LG.vertical.top,
      paddingBottom: NAV_PADDING_UP_TO_LG.vertical.bottom,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      width: isNavMini
        ? `calc(100% - ${NAV_WIDTH.MINI}px)`
        : `calc(100% - ${NAV_WIDTH.VERTICAL}px)`,
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0,
    },
  }),
)
