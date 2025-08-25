import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const AlertBoxStyled = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.error.lighter,
  border: `1px solid ${theme.palette.error.light}`,
  borderRadius: theme.spacing(1),
  gap: theme.spacing(0),
}))
