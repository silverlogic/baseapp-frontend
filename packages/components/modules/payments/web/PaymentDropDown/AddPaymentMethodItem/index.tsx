import { AddIcon, CreditCardIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, Typography } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { PAYMENTS_MESSAGES } from '../../constants'

const AddPaymentMethodItem = ({ isSelected = false }: { isSelected?: boolean }) => (
  <Box
    display="flex"
    alignItems="center"
    width="100%"
    justifyContent="space-between"
    sx={{ py: isSelected ? 2 : 0, px: 0 }}
  >
    <Box display="flex" alignItems="center">
      <CreditCardIcon sx={{ mr: 1, color: 'text.secondary' }} />
      <Typography variant="body2">
        {isSelected ? (
          <FormattedMessage
            id="payments.paymentDropdown.selectPaymentMethod"
            defaultMessage="Select the payment method"
          />
        ) : (
          <FormattedMessage {...PAYMENTS_MESSAGES.addPaymentMethod} />
        )}
      </Typography>
    </Box>
    {!isSelected && <AddIcon sx={{ color: 'text.secondary' }} />}
  </Box>
)

export default AddPaymentMethodItem
