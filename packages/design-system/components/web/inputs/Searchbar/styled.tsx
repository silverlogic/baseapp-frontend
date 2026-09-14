import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SpinnerContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  marginRight: theme.spacing(0.5),
}))
