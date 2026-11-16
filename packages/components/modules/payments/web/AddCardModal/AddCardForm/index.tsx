'use client'

import { FC, useEffect, useRef, useState } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import { Box, Button, Divider, LinearProgress, Typography } from '@mui/material'
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useQueryClient } from '@tanstack/react-query'

import { STRIPE_API_KEY } from '../../services/stripe'
import { AddCardFormProps } from './types'

// Rendered inside the <Elements> that AddCardModal mounts for one SetupIntent, so
// useElements() here is that SetupIntent's instance.
const AddCardForm: FC<AddCardFormProps> = ({ entityId, onClose, handleSetupSuccess }) => {
  const stripe = useStripe()
  const elements = useElements()
  const queryClient = useQueryClient()
  const { sendToast } = useNotification()
  const [isAddingCardPaymentProcessing, setIsAddingCardPaymentProcessing] = useState(false)
  // Set synchronously on the first click: the state above only lands on the next render, so
  // a second click while getValue() is pending would otherwise reach confirmSetup() twice.
  const isSubmittingRef = useRef(false)
  // The modal can be closed while confirmation is pending; a late success must not then
  // close or reselect in a newer add-card session the parent has since opened.
  const isMountedRef = useRef(true)
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const handleConfirmSetup = async () => {
    if (!stripe || !elements || isSubmittingRef.current) return
    isSubmittingRef.current = true
    setIsAddingCardPaymentProcessing(true)
    try {
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
        return
      }
      await queryClient.invalidateQueries({
        queryKey: [STRIPE_API_KEY.listPaymentMethods()],
      })
      sendToast('Card added successfully')
      // Closed meanwhile: the card is saved and the list refreshed, but the session that
      // asked for it is gone, so it neither selects the card nor closes anything.
      if (!isMountedRef.current) return
      // renew the session is required to get the new payment method
      if (handleSetupSuccess) {
        handleSetupSuccess(setupIntent?.payment_method as string)
      }
      onClose()
    } catch (error: any) {
      console.error('Error confirming card:', error)
      sendToast('Error confirming card:', { type: 'error' })
    } finally {
      isSubmittingRef.current = false
      if (isMountedRef.current) setIsAddingCardPaymentProcessing(false)
    }
  }

  if (!stripe || !elements) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    )
  }

  return (
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
        <Button
          variant="outlined"
          color="inherit"
          onClick={onClose}
          sx={{ width: 'auto' }}
          disabled={isAddingCardPaymentProcessing}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="inherit"
          sx={{ width: 'auto' }}
          onClick={handleConfirmSetup}
          disabled={!entityId || isAddingCardPaymentProcessing}
        >
          Confirm
        </Button>
      </Box>
    </>
  )
}

export default AddCardForm
