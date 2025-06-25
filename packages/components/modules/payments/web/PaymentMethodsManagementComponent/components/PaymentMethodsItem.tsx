import { FC } from 'react'

import { MoreVert } from '@mui/icons-material'
import { Box, Chip, Divider, IconButton, Typography } from '@mui/material'

import { getCardIcon } from '../../utils'
import { PaymentMethodsItemProps } from '../types'

const PaymentMethodsItem: FC<PaymentMethodsItemProps> = ({
  paymentMethod,
  setIsMenuOpen,
  setSelectedPaymentMethodId,
  setAnchorEl,
  isLast,
}) => {
  const isExpired =
    paymentMethod?.card?.expMonth &&
    paymentMethod?.card?.expYear &&
    new Date(paymentMethod?.card?.expYear, paymentMethod?.card?.expMonth) < new Date()
  return (
    <>
      <Box key={paymentMethod.id} display="flex" alignItems="center" width="100%" gap={2}>
        {getCardIcon(paymentMethod?.card?.brand)}
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Box display="flex" gap={2} mb={1}>
            {paymentMethod?.isDefault && <Chip color="default" label="Default" variant="soft" />}
            {isExpired && <Chip color="error" label="Expired" variant="soft" />}
          </Box>
          <Typography variant="body2" fontWeight={500}>
            {paymentMethod?.card?.brand?.toUpperCase() ?? 'CARD'} •••• •••• ••••{' '}
            {paymentMethod?.card?.last4}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {`${isExpired ? 'Expired' : 'Expires'}: ${paymentMethod?.card?.expMonth}/${paymentMethod?.card?.expYear}`}
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
