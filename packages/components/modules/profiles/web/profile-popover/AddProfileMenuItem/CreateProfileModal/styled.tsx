import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Form = styled('form')(({ theme }) => ({
  height: '100%',
  justifyContent: 'space-between',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}))

export const TitleRow = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
}))
