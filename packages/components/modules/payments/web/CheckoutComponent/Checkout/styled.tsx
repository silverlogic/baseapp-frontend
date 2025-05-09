import { LoadingButton } from '@mui/lab'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/system'

export const ProductContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  color: theme.palette.text.primary,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: `1px ${theme.palette.divider} solid`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1),
  minHeight: 64,
}))

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.common.white,
  minHeight: 48,
}))
