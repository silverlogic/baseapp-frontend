import { bgBlur } from '@baseapp-frontend/design-system'

import { AppBar } from '@mui/material'
import { styled } from '@mui/material/styles'

import { HEADER_HEIGHT, NAV_WIDTH } from '../constants'
import { CustomAppBarProps } from './types'

export const CustomAppBar = styled(AppBar)<CustomAppBarProps>(({ theme, themeLayout }) => {
  const isNavHorizontal = themeLayout === 'horizontal'
  const isNavVertical = themeLayout === 'vertical'
  const isNavCentered = themeLayout === 'centered'
  const isNavMini = themeLayout === 'mini'

  return {
    height: HEADER_HEIGHT.MOBILE,
    zIndex: theme.zIndex.appBar + 1,
    ...bgBlur({
      color: theme.palette.background.default,
    }),
    transition: theme.transitions.create(['height'], {
      duration: theme.transitions.duration.shorter,
    }),
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      ...(isNavVertical && {
        width: `calc(100% - ${NAV_WIDTH.VERTICAL + 1}px)`,
        height: HEADER_HEIGHT.DESKTOP,
      }),
      ...((isNavHorizontal || isNavCentered) && {
        width: '100%',
        backgroundColor: theme.palette.background.default,
        height: HEADER_HEIGHT.DESKTOP_OFFSET,
        borderBottom: `dashed 1px ${theme.palette.divider}`,
      }),
      ...(isNavMini && {
        width: `calc(100% - ${NAV_WIDTH.MINI + 1}px)`,
      }),
    },
  }
})
