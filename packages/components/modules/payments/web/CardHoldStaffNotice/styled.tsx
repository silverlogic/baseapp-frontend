import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CardHoldStaffNoticeBody = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
}))

export const CardHoldStaffNoticeButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  // The theme makes every button full width, which would stack the actions one per line.
  '& .MuiButton-root': { width: 'auto' },
}))
