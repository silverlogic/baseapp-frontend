import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

import { ActionButtonProps } from './types'

export const ActionButton = styled(Button)<ActionButtonProps>(({ theme, isBlocked = false }) => ({
  backgroundColor: isBlocked ? theme.palette.grey[800] : theme.palette.error.main,
  '&:hover': {
    backgroundColor: isBlocked ? theme.palette.grey[900] : theme.palette.error.dark,
  },
}))
