import { Box, styled } from '@mui/material'

import { IMemberPersonalInformation } from './types'

export const MemberItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 0),
}))

export const MemberPersonalInformation = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<IMemberPersonalInformation>(({ isActive, theme }) => ({
  opacity: isActive ? 1 : 0.6,
  display: 'flex',
  gap: theme.spacing(1.5),
  alignItems: 'center',
  justifyContent: 'space-between',
}))
