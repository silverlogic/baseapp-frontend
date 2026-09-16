import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CountRow = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(1.5),
  justifyContent: 'space-between',
  marginBottom: theme.spacing(4),
}))
