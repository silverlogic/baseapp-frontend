import { FC } from 'react'

import { Box, Typography } from '@mui/material'

import { IStripePaymentMethod } from '../../types'

const PaymentMethodDisplay: FC<{
  pm: IStripePaymentMethod
  getCardIcon: (brand?: string) => JSX.Element
}> = ({ pm, getCardIcon }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ mr: 2 }}>{getCardIcon(pm?.card?.brand)}</Box>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="body2" fontWeight={500}>
        {pm?.card?.brand
          ? pm.card.brand.charAt(0).toUpperCase() + pm.card.brand.slice(1).toLowerCase()
          : 'Card'}{' '}
        ••• ••• •••{pm?.card?.last4}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Expires: {pm?.card?.expMonth}/{pm?.card?.expYear}
      </Typography>
    </Box>
  </Box>
)

export default PaymentMethodDisplay
