import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SubscriptionManagementContainer = styled(Box)({
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  flex: '1 0 0',
  boxShadow:
    '0px 0px 2px 0px rgba(145, 158, 171, 0.20), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: '16px',
  maxWidth: '576px',
})

export const CancelSubscriptionModalContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}))

export const SubscriptionPlanContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  gap: '12px',
})

export const PaymentMethodContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  gap: '16px',
  flex: 1,
})

export const CancelButton = styled(Button)({
  height: '36px',
  width: '164px',
  borderRadius: '8px',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const ChangePlanButton = styled(Button)({
  height: '36px',
  width: '109px',
  borderRadius: '8px',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const FlexContainer = styled(Box)<{ flexDirection?: string; gap?: string }>`
  display: flex;
  flex-direction: ${({ flexDirection = 'row' }) => flexDirection};
  gap: ${({ gap = '8px' }) => gap};
`
