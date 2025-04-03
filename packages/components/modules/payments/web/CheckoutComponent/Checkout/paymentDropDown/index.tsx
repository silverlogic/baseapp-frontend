import { FC, useEffect } from 'react'

import {
  AddIcon,
  CreditCardIcon,
  MastercardCreditCardIcon,
  VisaCreditCardIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Stripe, StripeElements } from '@stripe/stripe-js'

import { IStripePaymentMethod } from '../../../types'
import AddCardModal from '../../AddCardModal'

interface PaymentDropdownProps {
  paymentMethods: IStripePaymentMethod[]
  selectedPaymentMethodId: string
  setSelectedPaymentMethodId: (id: string) => void
  setupClientSecret: string
  stripe: Stripe
  elements: StripeElements
  setIsAddCardModalOpen: (isOpen: boolean) => void
  isAddCardModalOpen: boolean
}

const PaymentDropdown: FC<PaymentDropdownProps> = ({
  paymentMethods,
  selectedPaymentMethodId,
  setSelectedPaymentMethodId,
  setupClientSecret,
  stripe,
  elements,
  setIsAddCardModalOpen,
  isAddCardModalOpen,
}) => {
  const isEmpty = !paymentMethods || paymentMethods.length === 0
  const getCardIcon = (brand?: string) => {
    const cardBrand = brand?.toLowerCase() || ''

    switch (cardBrand) {
      case 'visa':
        return <VisaCreditCardIcon sx={{ mr: 1, fontSize: 28 }} />
      case 'mastercard':
        return <MastercardCreditCardIcon sx={{ mr: 1, fontSize: 28 }} />
      default:
        return <CreditCardIcon sx={{ mr: 1, color: 'primary.main' }} />
    }
  }

  useEffect(() => {
    if (paymentMethods?.length > 0) {
      setSelectedPaymentMethodId(paymentMethods[0]?.id || '')
    }
  }, [paymentMethods, setSelectedPaymentMethodId])

  const handleOpenModal = () => {
    setIsAddCardModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAddCardModalOpen(false)
  }

  return (
    <>
      {isEmpty ? (
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={handleOpenModal}
          sx={{
            justifyContent: 'flex-start',
            padding: '8px 14px',
            textTransform: 'none',
            height: '56px',
            borderRadius: 1,
            borderColor: 'rgba(0, 0, 0, 0.23)',
            '&:hover': {
              borderColor: 'rgba(0, 0, 0, 0.87)',
            },
          }}
        >
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
        </Button>
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
                      {pm?.card?.brand.toUpperCase()} ••• ••• •••{pm?.card?.last4}
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
        setupClientSecret={setupClientSecret}
        stripe={stripe}
        elements={elements}
        open={isAddCardModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default PaymentDropdown
