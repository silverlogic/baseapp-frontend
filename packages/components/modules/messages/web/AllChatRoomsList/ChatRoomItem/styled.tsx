import { Box, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'

import { StyledChatCardProps } from './types'

export const StyledChatCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showPointer' && prop !== 'isCardSelected',
})<StyledChatCardProps>(({ theme, showPointer = false, isCardSelected = false }) => ({
  display: 'grid',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  maxWidth: '390px',
  gridTemplateColumns: '48px auto min-content',
  gap: theme.spacing(2.5),
  padding: theme.spacing(1.5, 3.5),
  cursor: showPointer ? 'pointer' : 'default',
  backgroundColor: isCardSelected
    ? alpha(theme.palette.primary.main, 0.08)
    : theme.palette.background.default,
  borderRight: isCardSelected ? `2px solid ${theme.palette.primary.light}` : 'none',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '600px',
    padding: theme.spacing(1.5),
  },
}))

export const Dot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.text.disabled,
  borderRadius: '50%',
  display: 'inline-block',
  height: 6,
  margin: theme.spacing(0, 1),
  width: 6,
}))
