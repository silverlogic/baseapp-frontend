import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SnackbarContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minWidth: '360px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.grey[400]}`,
  backgroundColor: theme.palette.common.white,
  boxShadow: theme.customShadows.z8,
  overflow: 'hidden',
  maxWidth: '60%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '80%',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}))
