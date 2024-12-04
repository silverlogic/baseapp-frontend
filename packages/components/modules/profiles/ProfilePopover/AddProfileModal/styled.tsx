import { styled } from '@mui/material/styles'

export const Form = styled('form')(({ theme }) => ({
  height: '100%',
  justifyContent: 'space-between',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}))
