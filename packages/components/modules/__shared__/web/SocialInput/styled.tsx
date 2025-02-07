import { styled } from '@mui/material/styles'

export const Form = styled('form')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: 8,
  bottom: 0,
  width: '100%',
  marginBottom: theme.spacing(2),
  position: 'sticky',
  zIndex: 10,
}))
