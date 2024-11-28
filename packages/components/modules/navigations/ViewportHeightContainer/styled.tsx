import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { NAV_PADDING_DOWN_TO_LG, NAV_PADDING_UP_TO_LG } from '../constants'

export const HorizontalContainer = styled(Box)(({ theme }) => ({
  height: `calc(100vh - ${NAV_PADDING_DOWN_TO_LG.horizontal.top + NAV_PADDING_DOWN_TO_LG.horizontal.bottom}px)`,
  [theme.breakpoints.up('lg')]: {
    height: `calc(100vh - ${NAV_PADDING_UP_TO_LG.horizontal.top + NAV_PADDING_UP_TO_LG.horizontal.bottom}px)`,
  },
  [theme.breakpoints.down('sm')]: {
    height: `calc(100vh - ${NAV_PADDING_DOWN_TO_LG.horizontal.top}px)`,
  },
}))

export const CenteredContainer = styled(Box)(({ theme }) => ({
  height: `calc(100vh - ${NAV_PADDING_DOWN_TO_LG.centered.top + NAV_PADDING_DOWN_TO_LG.centered.bottom}px)`,
  [theme.breakpoints.up('lg')]: {
    height: `calc(100vh - ${NAV_PADDING_UP_TO_LG.centered.top + NAV_PADDING_UP_TO_LG.centered.bottom}px)`,
  },
  [theme.breakpoints.down('sm')]: {
    height: `calc(100vh - ${NAV_PADDING_DOWN_TO_LG.centered.top}px)`,
  },
}))

export const VerticalContainer = styled(Box)(({ theme }) => ({
  height: `calc(100vh - ${NAV_PADDING_DOWN_TO_LG.vertical.top + NAV_PADDING_DOWN_TO_LG.vertical.bottom}px)`,
  [theme.breakpoints.up('lg')]: {
    height: `calc(100vh - ${NAV_PADDING_UP_TO_LG.vertical.top + NAV_PADDING_UP_TO_LG.vertical.bottom}px)`,
  },
  [theme.breakpoints.down('sm')]: {
    height: `calc(100vh - ${NAV_PADDING_DOWN_TO_LG.vertical.top}px)`,
  },
}))
