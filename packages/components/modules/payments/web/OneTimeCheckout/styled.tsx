import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SummaryContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  border: `1px ${theme.palette.divider} solid`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
}))

export const TotalRow = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
}))

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.common.white,
  minHeight: 48,
}))
