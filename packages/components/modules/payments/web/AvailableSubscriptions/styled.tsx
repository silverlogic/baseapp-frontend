import { Card } from '@mui/material'
import { styled } from '@mui/material/styles'

import { SubscriptionCardWrapperProps } from './types'

export const SubscriptionCardWrapper = styled(Card)<SubscriptionCardWrapperProps>(
  ({ smDown, theme }) => ({
    width: '100%',
    minWidth: '300px',
    maxWidth: smDown ? '100%' : '300px',
    height: 'max-content',
    flex: '1 1 300px',
    border: '1px solid',
    borderColor: theme.palette.divider,
    borderRadius: theme.spacing(2),
    boxShadow: 'none',
  }),
)
