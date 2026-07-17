import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(1.5),
  margin: theme.spacing(1.5, 1.5, 0),
  padding: theme.spacing(0.75, 1),
}))
