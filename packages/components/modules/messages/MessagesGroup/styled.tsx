import { Typography, styled } from '@mui/material'

export const DateGroupTypography = styled(Typography)(({ theme }) => ({
  alignSelf: 'center',
  backgroundColor: theme.palette.grey[300],
  borderRadius: theme.spacing(1 / 2),
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
  padding: theme.spacing(0.5, 1),
  textAlign: 'center',
  width: 'fit-content',
}))
