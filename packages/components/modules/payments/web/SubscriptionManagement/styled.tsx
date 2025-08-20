import { Box } from '@mui/material'
import { Theme, styled } from '@mui/material/styles'

export const CancelSubscriptionModalContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}))

export const SubscriptionPlanContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  gap: theme.spacing(3),
}))

export const PaymentMethodContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  gap: theme.spacing(4),
  paddingY: theme.spacing(4),
  flex: 1,
}))

export const RowFlexContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
}))

export const ColumnFlexContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}))
