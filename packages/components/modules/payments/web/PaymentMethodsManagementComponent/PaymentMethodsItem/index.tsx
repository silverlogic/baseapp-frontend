import { FC } from 'react'

import { MoreVert } from '@mui/icons-material'
import { Box, Chip, Divider, IconButton, Typography } from '@mui/material'
import { useIntl } from 'react-intl'

import { PAYMENTS_MESSAGES } from '../../constants'
import { getCardIcon } from '../../utils'
import { PaymentMethodsItemProps } from '../types'

const PaymentMethodsItem: FC<PaymentMethodsItemProps> = ({
  paymentMethod,
  setIsMenuOpen,
  setSelectedPaymentMethodId,
  setAnchorEl,
  isLast,
}) => {
  const intl = useIntl()
  const cardExpiryDate =
    paymentMethod?.card?.expMonth && paymentMethod?.card?.expYear
      ? new Date(paymentMethod.card.expYear, paymentMethod.card.expMonth)
      : null

  const isExpired = cardExpiryDate && cardExpiryDate < new Date()
  return (
    <>
      <Box key={paymentMethod.id} display="flex" alignItems="center" width="100%" gap={2}>
        {getCardIcon(paymentMethod?.card?.brand)}
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Box display="flex" gap={2} mb={1}>
            {paymentMethod?.isDefault && (
              <Chip
                color="default"
                label={intl.formatMessage({
                  id: 'payments.paymentMethods.default',
                  defaultMessage: 'Default',
                })}
                variant="soft"
              />
            )}
            {isExpired && (
              <Chip
                color="error"
                label={intl.formatMessage(PAYMENTS_MESSAGES.expired)}
                variant="soft"
              />
            )}
          </Box>
          <Typography variant="body2" fontWeight={500}>
            {paymentMethod?.card?.brand?.toUpperCase() ??
              intl.formatMessage({
                id: 'payments.paymentMethods.cardFallback',
                defaultMessage: 'CARD',
              })}{' '}
            •••• •••• •••• {paymentMethod?.card?.last4}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {intl.formatMessage(
              isExpired ? PAYMENTS_MESSAGES.cardExpired : PAYMENTS_MESSAGES.cardExpires,
              { month: paymentMethod?.card?.expMonth, year: paymentMethod?.card?.expYear },
            )}
          </Typography>
        </Box>
        <IconButton
          onClick={() => {
            setIsMenuOpen(true)
            setSelectedPaymentMethodId(paymentMethod.id)
            setAnchorEl(document.activeElement as HTMLElement)
          }}
          sx={{ flexGrow: 0 }}
        >
          <MoreVert />
        </IconButton>
      </Box>
      {!isLast && <Divider />}
    </>
  )
}

export default PaymentMethodsItem
