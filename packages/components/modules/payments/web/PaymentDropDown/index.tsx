import { FC, useEffect } from 'react'

import { CheckMarkIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'

import AddCardModal from '../AddCardModal'
import useStripeHook from '../hooks/useStripeHook'
import { getCardIcon } from '../utils'
import AddPaymentMethodItem from './AddPaymentMethodItem'
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
  const { useSetupIntent } = useStripeHook()
  const {
    mutate: createSetupIntent,
    data: setupIntent,
    isPending: isCreatingSetupIntent,
    isError: isErrorCreatingSetupIntent,
  } = useSetupIntent(entityId)

  const isEmpty = !paymentMethods || paymentMethods.length === 0

  const handleOpenModal = () => {
    createSetupIntent()
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

  useEffect(() => {
    if (isCreatingSetupIntent || isErrorCreatingSetupIntent) return
    if (setupIntent) {
      // @ts-ignore
      elements?.update({ clientSecret: setupIntent.clientSecret })
      setIsAddCardModalOpen(true)
    }
  }, [setupIntent, isCreatingSetupIntent, isErrorCreatingSetupIntent])

  if (isEmpty)
    return (
      <>
        <StyledButton fullWidth variant="outlined" color="primary" onClick={handleOpenModal}>
          <AddPaymentMethodItem />
        </StyledButton>
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

  return (
    <>
      <FormControl fullWidth>
        <Select
          labelId="payment-method-select-label"
          value={selectedPaymentMethodId}
          onChange={(e) => {
            handleSelectPaymentMethod(e)
          }}
          renderValue={(selectedId) => {
            const pm = paymentMethods.find((pam) => pam.id === selectedId)
            if (!pm) return <AddPaymentMethodItem isSelected />
            return <PaymentMethodDisplay pm={pm} getCardIcon={getCardIcon} isSelected />
          }}
          sx={{
            '& .MuiSelect-select': { py: 0, px: 1 },
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
            <AddPaymentMethodItem />
          </MenuItem>
        </Select>
      </FormControl>
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
