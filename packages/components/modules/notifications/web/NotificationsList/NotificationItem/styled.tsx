import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const NotificationRoot = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: 'min-content 1fr',
  padding: theme.spacing(2.5),
}))

export const NotificationContent = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
}))
