import { FC } from 'react'

import { Box, Typography } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { PAYMENTS_MESSAGES } from '../../constants'
import { PaymentMethodDisplayProps } from './types'

const PaymentMethodDisplay: FC<PaymentMethodDisplayProps> = ({
  pm,
  getCardIcon,
  isSelected = false,
}) => (
  <Box display="flex" alignItems="center" sx={{ py: isSelected ? 1 : 0 }}>
    <Box mr={2}>{getCardIcon(pm?.card?.brand)}</Box>
    <Box display="flex" flexDirection="column">
      <Typography variant="body2" fontWeight={500}>
        {pm?.card?.brand ? (
          pm.card.brand.charAt(0).toUpperCase() + pm.card.brand.slice(1).toLowerCase()
        ) : (
          <FormattedMessage id="payments.card.fallbackName" defaultMessage="Card" />
        )}{' '}
        ••• ••• ••• {pm?.card?.last4}
      </Typography>
      {isSelected && (
        <Typography variant="caption" color="text.secondary">
          <FormattedMessage
            {...PAYMENTS_MESSAGES.cardExpires}
            values={{ month: pm?.card?.expMonth, year: pm?.card?.expYear }}
          />
        </Typography>
      )}
    </Box>
  </Box>
)

export default PaymentMethodDisplay
