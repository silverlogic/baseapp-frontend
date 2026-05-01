import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { MENTION_ROW_HEIGHT } from '../constants'

export const SkeletonRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: MENTION_ROW_HEIGHT,
  gap: theme.spacing(1.5),
  paddingInline: theme.spacing(2),
}))
