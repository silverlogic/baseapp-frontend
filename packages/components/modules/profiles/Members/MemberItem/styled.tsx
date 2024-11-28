import { Box, Select as MUISelect, alpha, styled } from '@mui/material'

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

export const Select = styled(MUISelect)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[500], 0.08),
  borderRadius: 8,
  padding: 0,
  '.MuiSelect-select': {
    ...theme.typography.button,
    background: 'transparent',
    padding: theme.spacing(0.75, 1.5),
  },

  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[500], 0.24),
  },
  '&.Mui-disabled': {
    opacity: 0.5,
  },
  '& .MuiSelect-icon': {
    color: theme.palette.text.primary,
  },
}))
