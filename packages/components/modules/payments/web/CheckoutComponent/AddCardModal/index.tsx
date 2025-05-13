import { FC, useState } from 'react'

import { CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useNotification } from '@baseapp-frontend/utils'

import {
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Modal,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { AddressElement, PaymentElement } from '@stripe/react-stripe-js'
import { useQueryClient } from '@tanstack/react-query'

import { AddCardModalContainer } from './styled'
import { AddCardModalProps } from './types'
import { PAYMENT_METHOD_API_KEY } from '../../hooks/keys'

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
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery<Theme>((theme) => theme.breakpoints.between('sm', 'md'))
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
      console.error('Address validation error: Incomplete address')
      sendToast('Error confirming card: Incomplete address', { type: 'error' })
      return
    }

    try {
      setIsAddingCardPaymentProcessing(true)

      const result = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: 'if_required',
      })

      if (result.error) {
        console.error('Error confirming card:', result.error.message)
        sendToast(`Error confirming card: ${result.error.message || 'Unknown error'}`, {
          type: 'error',
        })
        setIsAddingCardPaymentProcessing(false)
      } else {
        await queryClient.invalidateQueries({
          queryKey: [PAYMENT_METHOD_API_KEY.get()]
        })
        if (handleSetupSuccess) {
          handleSetupSuccess()
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
  const getModalWidth = () => {
    if (isMobile) return '90%'
    if (isTablet) return '70%'
    return 600
  }
  return (
    <Modal open={open} onClose={onClose}>
      <AddCardModalContainer
        sx={{
          width: getModalWidth(),
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
      </AddCardModalContainer>
    </Modal>
  )
}

export default AddCardModal
