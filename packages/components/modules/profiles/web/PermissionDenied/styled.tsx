import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '50vh',
  padding: theme.spacing(0, 3),
}))
