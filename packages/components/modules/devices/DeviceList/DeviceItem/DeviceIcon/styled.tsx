import { Box, styled } from '@mui/material'

export const DeviceIconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'flex-start',
  },
}))
