import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const MainContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'grid',
  width: '100%',
  maxWidth: '64px',
  gridTemplateRows: 'auto auto',
  gridTemplateColumns: 'min-content',
  gap: theme.spacing(0.5),
  // padding: theme.spacing(1),
  margin: theme.spacing(1),
}))
