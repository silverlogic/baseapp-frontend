import { AddIcon, CreditCardIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, Typography } from '@mui/material'

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
        {isSelected ? 'Select the payment method' : 'Add payment method'}
      </Typography>
    </Box>
    {!isSelected && <AddIcon sx={{ color: 'text.secondary' }} />}
  </Box>
)

export default AddPaymentMethodItem
