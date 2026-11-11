import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CardHoldStaffActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}))

export const CardHoldStaffActionsButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}))
