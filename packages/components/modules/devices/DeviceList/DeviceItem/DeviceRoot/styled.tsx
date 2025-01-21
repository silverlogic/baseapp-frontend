import { Box, styled } from '@mui/material'

export const DeviceRootContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  padding: theme.spacing(2.5, 2, 2.5, 2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}))
