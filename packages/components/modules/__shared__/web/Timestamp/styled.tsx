import { styled } from '@mui/material/styles'

export const Dot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.text.disabled,
  borderRadius: '9999px',
  display: 'inline-block',
  height: theme.spacing(0.5),
  margin: theme.spacing(0, 1),
  width: theme.spacing(0.5),
}))
