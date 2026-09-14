import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

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
  // Cap the height so a large selection scrolls instead of pushing the dialog long.
  maxHeight: 240,
  overflowY: 'auto',
}))

export const MemberChip = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(0.75, 1.5),
  borderRadius: 999,
  backgroundColor: theme.palette.grey[200],
}))
