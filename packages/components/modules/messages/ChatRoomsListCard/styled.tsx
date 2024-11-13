import { styled } from '@mui/material/styles'
import { Box, alpha } from '@mui/system'

import { StyledChatCardProps } from './types'

export const StyledChatCard = styled(Box)<StyledChatCardProps>(
  ({ theme, showPointer = false, isCardSelected = false }) => ({
    display: 'grid',
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
  }),
)
