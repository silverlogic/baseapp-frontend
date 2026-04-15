import { styled } from '@mui/material/styles'

export const Form = styled('form')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: 8,
  bottom: 0,
  width: '100%',
  paddingBottom: theme.spacing(2),
  position: 'sticky',
  zIndex: 10,
}))
