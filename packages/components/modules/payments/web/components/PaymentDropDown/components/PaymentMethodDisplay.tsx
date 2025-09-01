import { FC, ReactElement } from 'react'

import { Box, Typography } from '@mui/material'

import { PaymentMethod } from '../../../types'

const PaymentMethodDisplay: FC<{
  pm: PaymentMethod
  getCardIcon: (brand?: string) => ReactElement
  isSelected?: boolean
}> = ({ pm, getCardIcon, isSelected = false }) => (
  <Box display="flex" alignItems="center" sx={{ py: isSelected ? 1 : 0 }}>
    <Box mr={2}>{getCardIcon(pm?.card?.brand)}</Box>
    <Box display="flex" flexDirection="column">
      <Typography variant="body2" fontWeight={500}>
        {pm?.card?.brand
          ? pm.card.brand.charAt(0).toUpperCase() + pm.card.brand.slice(1).toLowerCase()
          : 'Card'}{' '}
        ••• ••• ••• {pm?.card?.last4}
      </Typography>
      {isSelected && (
        <Typography variant="caption" color="text.secondary">
          Expires: {pm?.card?.expMonth}/{pm?.card?.expYear}
        </Typography>
      )}
    </Box>
  </Box>
)

export default PaymentMethodDisplay
