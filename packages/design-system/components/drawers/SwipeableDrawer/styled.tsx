import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { SWIPE_AREA_WIDTH } from './constants'

export const SwipeableContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  height: SWIPE_AREA_WIDTH,
  top: -SWIPE_AREA_WIDTH + 2,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  visibility: 'visible',
  right: 0,
  left: 0,
}))

export const Puller = styled(Box)(({ theme }) => ({
  width: 64,
  height: 6,
  backgroundColor: theme.palette.text.disabled,
  borderRadius: 3,
  left: 'calc(50% - 32px)',
}))

export const ContentContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1.5, 2),
  width: '100%',
  height: '100%',
}))
