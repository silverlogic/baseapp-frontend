import { Box, ButtonBase } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SearchFieldWrapper = styled(Box)(() => ({
  position: 'relative',
}))

export const OptionsDropdown = styled(Box)(({ theme }) => ({
  width: '100%',
  maxHeight: 280,
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  boxShadow: theme.shadows[8],
  padding: theme.spacing(0.5),
}))

export const OptionRow = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  width: '100%',
  justifyContent: 'space-between',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.shape.borderRadius,
  ...(isActive && {
    backgroundColor: theme.palette.action.hover,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

export const OptionInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  minWidth: 0,
}))

export const ChipsList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}))

export const MemberChip = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(0.75, 1.5),
  borderRadius: 999,
  backgroundColor: theme.palette.grey[200],
}))
