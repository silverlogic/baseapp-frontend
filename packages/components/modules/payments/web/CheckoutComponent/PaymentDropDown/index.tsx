import { FC } from 'react'

import {
  AddIcon,
  CheckMarkIcon,
  CreditCardIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'

import { getCardIcon } from '../../utils'
import AddCardModal from '../AddCardModal'
import PaymentMethodDisplay from './PaymentMethodDisplay'
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
  entityId,
  handleSetupSuccess,
}) => {
  const isEmpty = !paymentMethods || paymentMethods.length === 0

  const handleOpenModal = () => {
    setIsAddCardModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAddCardModalOpen(false)
  }

  const handleSelectPaymentMethod = (e: SelectChangeEvent<string>) => {
    const selectedId = e.target.value as string
    if (selectedId === 'add-new') {
      handleOpenModal()
    } else {
      setSelectedPaymentMethodId(selectedId)
    }
  }

  return (
    <>
      {isEmpty ? (
        <StyledButton fullWidth variant="outlined" color="primary" onClick={handleOpenModal}>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            <Box display="flex" alignItems="center">
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
          <Select
            labelId="payment-method-select-label"
            value={selectedPaymentMethodId}
            onChange={(e) => {
              handleSelectPaymentMethod(e)
            }}
            renderValue={(selectedId) => {
              const pm = paymentMethods.find((pam) => pam.id === selectedId)
              if (!pm) return ''
              return <PaymentMethodDisplay pm={pm} getCardIcon={getCardIcon} />
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
              <MenuItem key={pm.id} value={pm.id} dense sx={{ py: 0.5 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                  <PaymentMethodDisplay pm={pm} getCardIcon={getCardIcon} />
                  {pm.id === selectedPaymentMethodId && <CheckMarkIcon color="action" />}
                </Box>
              </MenuItem>
            ))}
            <MenuItem value="add-new">
              <Box display="flex" alignItems="center" width="100%" justifyContent="space-between">
                <Box display="flex" alignItems="center">
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
        entityId={entityId}
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
