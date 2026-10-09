import { ComponentType } from 'react'

import { Box, BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ActionsContainer: ComponentType<BoxProps> = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, max-content)',
  gap: theme.spacing(1),
}))
