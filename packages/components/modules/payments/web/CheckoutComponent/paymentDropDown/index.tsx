import { FC } from 'react'

import {
  AddIcon,
  CreditCardIcon,
  MastercardCreditCardIcon,
  VisaCreditCardIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'

import AddCardModal from '../AddCardModal'
import { StyledButton } from './styled'
import { PaymentDropdownProps } from './types'

const PaymentDropdown: FC<PaymentDropdownProps> = ({
  paymentMethods,
  selectedPaymentMethodId,
  setSelectedPaymentMethodId,
  stripe,
  elements,
  setIsAddCardModalOpen,
  isAddCardModalOpen,
  customerId,
  handleSetupSuccess,
}) => {
  const isEmpty = !paymentMethods || paymentMethods.length === 0
  const getCardIcon = (brand?: string) => {

    const CARD_BRANDS = {
  VISA: 'visa',
  MASTERCARD: 'mastercard',
};
    const cardBrand = brand?.toLowerCase() || ''

    switch (cardBrand) {
      case CARD_BRANDS.VISA:
        return <VisaCreditCardIcon sx={{ mr: 1, fontSize: 28 }} />
      case CARD_BRANDS.MASTERCARD:
        return <MastercardCreditCardIcon sx={{ mr: 1, fontSize: 28 }} />
      default:
        return <CreditCardIcon sx={{ mr: 1, color: 'primary.main' }} />
    }
  }

  const handleOpenModal = () => {
    setIsAddCardModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAddCardModalOpen(false)
  }

  return (
    <>
      {isEmpty ? (
        <StyledButton fullWidth variant="outlined" color="primary" onClick={handleOpenModal}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CreditCardIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2" color="text.primary">
                Add payment method
              </Typography>
            </Box>
            <AddIcon color="action" />
          </Box>
        </StyledButton>
      ) : (
        <FormControl fullWidth>
          <InputLabel id="payment-method-select-label">Select a Payment Method</InputLabel>
          <Select
            labelId="payment-method-select-label"
            value={selectedPaymentMethodId}
            label="Select a Payment Method"
            onChange={(e) => {
              if (e.target.value === 'add-new') {
                handleOpenModal()
              } else {
                setSelectedPaymentMethodId(e.target.value as string)
              }
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  '& .MuiMenuItem-root': {
                    py: 0.5,
                  },
                },
              },
            }}
            sx={{
              '& .MuiSelect-select': {
                py: 1,
              },
            }}
          >
            {paymentMethods.map((pm) => (
              <MenuItem
                key={pm.id}
                value={pm.id}
                dense
                sx={{
                  py: 0.5,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Box sx={{ mr: 2 }}>{getCardIcon(pm?.card?.brand)}</Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2" fontWeight={500}>
                      {pm?.card?.brand?.toUpperCase() || 'CARD'} ••• ••• •••{pm?.card?.last4}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Expires: {pm?.card?.expMonth}/{pm?.card?.expYear}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
            ))}
            <MenuItem value="add-new">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CreditCardIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2">Add payment method</Typography>
                </Box>
                <AddIcon color="action" />
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      )}

      <AddCardModal
        customerId={customerId}
        stripe={stripe}
        elements={elements}
        open={isAddCardModalOpen}
        onClose={handleCloseModal}
        handleSetupSuccess={handleSetupSuccess}
      />
    </>
  )
}

export default PaymentDropdown
