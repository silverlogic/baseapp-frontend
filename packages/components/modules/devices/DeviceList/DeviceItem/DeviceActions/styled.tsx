import { Box, styled } from '@mui/material'

export const DeviceActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'flex-start',
  },
}))
