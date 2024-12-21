import { Box } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

import { AvatarContainerProps } from './types'

export const AvatarContainer = styled(Box)<AvatarContainerProps>(
  ({ theme, width, height, hasError }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: width + 4,
    height: height + 4,
    background: hasError
      ? alpha(theme.palette.error.main, 1)
      : alpha(theme.palette.grey[400], 0.32),
    borderRadius: '50%',
  }),
)
