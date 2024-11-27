import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { ActionOverlayContainerProps } from './types'

export const ActionOverlayContainer = styled(Box)<ActionOverlayContainerProps>(
  ({ theme, offsetTop = 0, offsetRight = 0 }) => ({
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    display: 'flex',
    gap: theme.spacing(1),
    padding: theme.spacing(0.75, 1),
    position: 'absolute',
    right: 12 - offsetRight,
    top: -12 - offsetTop,
    zIndex: 1,
  }),
)

export const IconButtonContentContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'grid',
  gridTemplateColumns: 'minmax(max-content, 24px) 1fr',
  gap: theme.spacing(1),
  alignSelf: 'center',
}))
