import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const NotificationBox = styled(Box)(({ theme }) => ({
  border: '1px solid',
  borderRadius: theme.shape.borderRadius * 2,
  color: theme.palette.grey[500],
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5, 1),
}))
