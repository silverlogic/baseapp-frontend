import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

import { ActionButtonProps } from './types'

export const ActionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isBlocked',
})<ActionButtonProps>(({ theme, isBlocked = false }) => ({
  backgroundColor: isBlocked ? theme.palette.grey[800] : theme.palette.error.main,
  '&:hover': {
    backgroundColor: isBlocked ? theme.palette.grey[900] : theme.palette.error.dark,
  },
}))

// the tailwind `responsive-h6` overrides match theme.typography.h6's built-in
// responsive sizes exactly, so the token alone is sufficient
export const DialogTitleContainer = styled('div')(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: 'min-content 1fr',
}))
