import { FC, useState } from 'react'

import { Dialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { useNotification } from '@baseapp-frontend/utils'

import { Box, Button, Divider, LinearProgress, Typography } from '@mui/material'
import { AddressElement, PaymentElement } from '@stripe/react-stripe-js'
import { useQueryClient } from '@tanstack/react-query'

import { PAYMENT_METHOD_API_KEY } from '../../services/keys'
import { AddCardModalProps } from './types'

const AddCardModal: FC<AddCardModalProps> = ({
  customerId,
  open,
  onClose,
  stripe,
  elements,
  handleSetupSuccess,
}) => {
  const queryClient = useQueryClient()
  const { sendToast } = useNotification()
  const [isAddingCardPaymentProcessing, setIsAddingCardPaymentProcessing] = useState(false)

  const handleConfirmSetup = async () => {
    if (!stripe || !elements) {
      return
    }

    const addressElement = elements.getElement(AddressElement)
    if (!addressElement) {
      sendToast('Address element is missing. Please try again.', { type: 'error' })
      return
    }

    const addressValue = await addressElement.getValue()
    if (!addressValue.complete) {
      sendToast('Error confirming card: Incomplete address', { type: 'error' })
      return
    }

    try {
      setIsAddingCardPaymentProcessing(true)

      const { setupIntent, error } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: 'if_required',
      })

      if (error) {
        sendToast(`Error confirming card: ${error.message || 'Unknown error'}`, {
          type: 'error',
        })
        setIsAddingCardPaymentProcessing(false)
      } else {
        await queryClient.invalidateQueries({
          queryKey: [PAYMENT_METHOD_API_KEY.get()],
        })
        // renew the session is required to get the new payment method
        if (handleSetupSuccess) {
          handleSetupSuccess(setupIntent?.payment_method as string)
        }
        sendToast('Card added successfully')
        onClose()
        setIsAddingCardPaymentProcessing(false)
      }
    } catch (error: any) {
      console.error('Error confirming card:', error)
      sendToast('Error confirming card:', { type: 'error' })
      setIsAddingCardPaymentProcessing(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      {open && (
        <Box padding={4} display="flex" flexDirection="column" gap={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Add payment method</Typography>
          </Box>
          <Typography variant="subtitle2">Card Information</Typography>
          <Divider variant="fullWidth" sx={{ backgroundColor: 'divider', color: 'divider' }} />
          {elements ? (
            <>
              <PaymentElement />
              <Typography variant="subtitle2">Billing Address</Typography>

              <Divider variant="fullWidth" sx={{ backgroundColor: 'divider', color: 'divider' }} />
              <AddressElement options={{ mode: 'billing' }} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                }}
              >
                <Button variant="outlined" color="inherit" onClick={onClose} sx={{ width: 'auto' }}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ width: 'auto' }}
                  onClick={handleConfirmSetup}
                  disabled={!customerId || isAddingCardPaymentProcessing}
                >
                  Confirm
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          )}
        </Box>
      )}
    </Dialog>
  )
}

export default AddCardModal
