import { Box, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'

import { AlertContainerProps, ProgressBarContainerProps } from './types'

export const ProgressContainer = styled(Box)<AlertContainerProps>(({ theme, severity }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  height: '4px',
  backgroundColor:
    severity === 'info'
      ? alpha(theme.palette.grey[500], 0.24)
      : alpha(theme.palette[severity].main, 0.24),
}))

export const ProgressBarContainer = styled(Box)<ProgressBarContainerProps>(
  ({ theme, animationTime, severity }) => ({
    borderRadius: '50px',
    animation: `increase-width ${animationTime}ms linear forwards`,
    '@keyframes increase-width': {
      from: {
        width: 0,
      },
      to: {
        width: '100%',
      },
    },
    height: '100%',
    backgroundColor:
      severity === 'info' ? theme.palette.text.primary : theme.palette[severity].main,
  }),
)
