import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}))
export const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1000px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}))

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
