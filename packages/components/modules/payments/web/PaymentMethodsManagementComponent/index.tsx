import { FC, useEffect, useState } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { useNotification } from '@baseapp-frontend/utils'

import { Add } from '@mui/icons-material'
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js'

import { getStripePromise } from '../../stripe'
import AddCardModal from '../CheckoutComponent/AddCardModal'
import useStripeHook from '../hooks/useStripeHook'
import PaymentMethodsItem from './components/PaymentMethodsItem'
import {
  PaymentMethodsManagementComponentProps,
  PaymentMethodsManagementComponentWithElementsProps,
} from './types'

const PaymentMethodsManagementComponent: FC<PaymentMethodsManagementComponentProps> = ({
  customerId,
}) => {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string | null>(null)

  const { sendToast } = useNotification()
  const { useListPaymentMethods, useDeletePaymentMethod, useUpdatePaymentMethod, useSetupIntent } =
    useStripeHook()
  const elements = useElements()
  const stripe = useStripe()

  const {
    data: paymentMethods,
    isLoading: isLoadingMethods,
    isError: isErrorMethods,
  } = useListPaymentMethods(customerId ?? '')
  const { mutate: deletePaymentMethod, isPending: isDeletingPaymentMethod } =
    useDeletePaymentMethod({
      onSuccess: () => {
        sendToast('Payment method removed successfully', { type: 'success' })
      },
      onError: (error: any) => {
        const message = error?.response?.data?.error ?? error?.message ?? 'Please try again.'
        sendToast(`Failed to delete payment method: ${message}`, { type: 'error' })
      },
    })
  const { mutate: updatePaymentMethod } = useUpdatePaymentMethod({
    onSuccess: () => {
      sendToast('Default payment method set successfully', { type: 'success' })
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error ?? error?.message ?? 'Please try again.'
      sendToast(`Failed to set default payment method: ${message}`, { type: 'error' })
    },
  })
  const {
    mutate: createSetupIntent,
    data: setupIntent,
    isPending: isCreatingSetupIntent,
    isError: isErrorCreatingSetupIntent,
  } = useSetupIntent(customerId ?? '')

  const handleCloseModal = () => {
    setIsAddCardModalOpen(false)
  }

  const handleUpdatePaymentMethod = async () => {
    if (!elements) {
      console.error('Stripe elements not initialized')
      return
    }
    updatePaymentMethod({
      paymentMethodId: selectedPaymentMethodId ?? '',
      defaultPaymentMethodId: selectedPaymentMethodId ?? '',
      customerId: customerId ?? '',
    })
  }

  const handleDeletePaymentMethod = async () => {
    if (!elements) {
      console.error('Stripe elements not initialized')
      return
    }
    deletePaymentMethod({
      paymentMethodId: selectedPaymentMethodId ?? '',
      customerId: customerId ?? '',
      isDefault:
        paymentMethods?.find((pm) => pm.id === selectedPaymentMethodId)?.isDefault ?? false,
    })
    setSelectedPaymentMethodId(null)
    setIsConfirmationDialogOpen(false)
  }

  useEffect(() => {
    if (isCreatingSetupIntent || isErrorCreatingSetupIntent) return
    if (setupIntent) {
      // @ts-ignore
      elements?.update({ clientSecret: setupIntent.clientSecret })
      setIsAddCardModalOpen(true)
    }
  }, [setupIntent, isCreatingSetupIntent, isErrorCreatingSetupIntent])

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography component="h4" variant="h4">
          Payment Methods
        </Typography>
        <Typography component="p" variant="body2" color="text.secondary">
          Add and manage your payment methods powered by Stripe.
        </Typography>
      </Box>
      {isLoadingMethods && <LoadingState />}
      {!isLoadingMethods && !isErrorMethods && (
        <Box display="flex" flexDirection="column" gap={2}>
          {paymentMethods?.map((paymentMethod, index) => (
            <PaymentMethodsItem
              key={paymentMethod.id}
              paymentMethod={paymentMethod}
              setIsMenuOpen={setIsMenuOpen}
              setSelectedPaymentMethodId={setSelectedPaymentMethodId}
              setAnchorEl={setAnchorEl}
              isLast={index === paymentMethods.length - 1}
            />
          ))}
        </Box>
      )}
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="soft"
          color="inherit"
          onClick={() => {
            createSetupIntent(customerId ?? '')
          }}
          startIcon={<Add />}
          sx={{ width: 'auto' }}
          disabled={isCreatingSetupIntent}
        >
          Add payment method
        </Button>
      </Box>
      <Menu
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sx={{ justifyContent: 'flex-end' }}
        anchorEl={anchorEl}
      >
        <MenuItem
          onClick={() => {
            handleUpdatePaymentMethod()
            setIsMenuOpen(false)
            setAnchorEl(null)
          }}
        >
          <Typography variant="body2">Set as default</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsConfirmationDialogOpen(true)
            setIsMenuOpen(false)
            setAnchorEl(null)
          }}
        >
          <Typography variant="body2" color="error">
            Remove
          </Typography>
        </MenuItem>
      </Menu>
      {elements && stripe && setupIntent && (
        <AddCardModal
          customerId={customerId}
          stripe={stripe}
          elements={elements}
          open={isAddCardModalOpen}
          onClose={handleCloseModal}
          handleSetupSuccess={() => {
            setIsAddCardModalOpen(false)
          }}
        />
      )}
      {isConfirmationDialogOpen && (
        <ConfirmDialog
          open={isConfirmationDialogOpen}
          onClose={() => setIsConfirmationDialogOpen(false)}
          aria-labelledby="delete-payment-method-confirmation-dialog"
          title="Remove Payment Method"
          content={
            <Typography variant="body1" id="modal-modal-description">
              Are you sure you want to remove this payment method? If this is your only payment
              method, your payments will be interrupted until a new method is added.
            </Typography>
          }
          action={
            <Button
              variant="contained"
              color="error"
              disabled={isDeletingPaymentMethod}
              onClick={() => {
                handleDeletePaymentMethod()
              }}
            >
              {isDeletingPaymentMethod ? 'Removing...' : 'Remove'}
            </Button>
          }
        />
      )}
    </Box>
  )
}

const PaymentMethodsManagementComponentWithElements = ({
  customerId,
  stripePublishableKey,
}: PaymentMethodsManagementComponentWithElementsProps) => (
  <Elements stripe={getStripePromise(stripePublishableKey)}>
    <PaymentMethodsManagementComponent customerId={customerId} />
  </Elements>
)

export default PaymentMethodsManagementComponentWithElements
