import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { ActionOverlayTooltipContainerProps } from './types'

export const ActionOverlayTooltipContainer = styled(Box)<ActionOverlayTooltipContainerProps>(
  ({ theme, offsetTop = 0, offsetRight = 0 }) => ({
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    display: 'flex',
    gap: theme.spacing(1),
    padding: theme.spacing(0.75, 1),
    position: 'absolute',
    role: 'menu',
    'aria-label': 'Action options',
    right: 12 - offsetRight,
    top: -12 - offsetTop,
    zIndex: theme.zIndex.drawer, // zIndex.modal is 1300, so using zIndex.drawer (1200) instead of zIndex.tooltip (1500)
    transition: theme.transitions.create(['opacity', 'visibility'], {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }),
  }),
)

export const IconButtonContentContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'grid',
  gridTemplateColumns: 'minmax(max-content, 24px) 1fr',
  gap: theme.spacing(1),
  alignSelf: 'center',
}))
