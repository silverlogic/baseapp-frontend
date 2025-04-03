import { FC } from 'react'

import { CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useNotification } from '@baseapp-frontend/utils'

import { Box, Button, Divider, IconButton, Modal, Typography } from '@mui/material'
import { AddressElement, PaymentElement } from '@stripe/react-stripe-js'
import { Stripe, StripeElements } from '@stripe/stripe-js'
import { useQueryClient } from '@tanstack/react-query'

interface AddCardModalProps {
  setupClientSecret: string | null
  open: boolean
  onClose: () => void
  stripe: Stripe
  elements: StripeElements
}

const AddCardModal: FC<AddCardModalProps> = ({
  setupClientSecret,
  open,
  onClose,
  stripe,
  elements,
}) => {
  const queryClient = useQueryClient()
  const { sendToast } = useNotification()

  const handleConfirmSetup = async () => {
    if (!stripe || !elements) {
      return
    }
    try {
      const result = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: 'if_required',
      })

      if (result.error) {
        console.error('Error confirming card:', result.error.message)
        sendToast('Error confirming card.', { type: 'error' })
      } else {
        sendToast('Card added successfully')
        onClose()
        queryClient.invalidateQueries({ queryKey: ['useGetPaymentMethod'] })
      }
    } catch (error: any) {
      console.error('Error confirming card:', error)
      sendToast('Error confirming card:', { type: 'error' })
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          maxHeight: '80vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          gap: 2,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Add payment method</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        </Box>

        <Typography variant="subtitle2">Card Information</Typography>

        <Divider variant="fullWidth" sx={{ backgroundColor: 'divider', color: 'divider' }} />
        {setupClientSecret ? (
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
                disabled={!setupClientSecret}
              >
                Confirm
              </Button>
            </Box>
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Modal>
  )
}

export default AddCardModal
