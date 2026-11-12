'use client'

import { FC, useState } from 'react'

import { Dialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { useNotification } from '@baseapp-frontend/utils'

import { Box, Button, Divider, LinearProgress, Typography } from '@mui/material'
import { AddressElement, PaymentElement } from '@stripe/react-stripe-js'
import { useQueryClient } from '@tanstack/react-query'
import { FormattedMessage, useIntl } from 'react-intl'

import { PAYMENTS_MESSAGES } from '../constants'
import { STRIPE_API_KEY } from '../services/stripe'
import { AddCardModalProps } from './types'

const AddCardModal: FC<AddCardModalProps> = ({
  entityId,
  open,
  onClose,
  stripe,
  elements,
  handleSetupSuccess,
}) => {
  const queryClient = useQueryClient()
  const { sendToast } = useNotification()
  const intl = useIntl()
  const [isAddingCardPaymentProcessing, setIsAddingCardPaymentProcessing] = useState(false)

  const handleConfirmSetup = async () => {
    if (!stripe || !elements) return
    const addressElement = elements.getElement(AddressElement)
    if (!addressElement) {
      sendToast(
        intl.formatMessage({
          id: 'payments.addCard.addressMissing',
          defaultMessage: 'Address element is missing. Please try again.',
        }),
        { type: 'error' },
      )
      return
    }
    const addressValue = await addressElement.getValue()
    if (!addressValue.complete) {
      sendToast(
        intl.formatMessage({
          id: 'payments.addCard.incompleteAddress',
          defaultMessage: 'Error confirming card: Incomplete address',
        }),
        { type: 'error' },
      )
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
        sendToast(
          intl.formatMessage(
            {
              id: 'payments.addCard.confirmError',
              defaultMessage: 'Error confirming card: {message}',
            },
            {
              message:
                error.message ||
                intl.formatMessage({
                  id: 'payments.addCard.unknownError',
                  defaultMessage: 'Unknown error',
                }),
            },
          ),
          { type: 'error' },
        )
        setIsAddingCardPaymentProcessing(false)
      } else {
        await queryClient.invalidateQueries({
          queryKey: [STRIPE_API_KEY.listPaymentMethods()],
        })
        // renew the session is required to get the new payment method
        if (handleSetupSuccess) {
          handleSetupSuccess(setupIntent?.payment_method as string)
        }
        sendToast(
          intl.formatMessage({
            id: 'payments.addCard.success',
            defaultMessage: 'Card added successfully',
          }),
        )
        onClose()
        setIsAddingCardPaymentProcessing(false)
      }
    } catch (error: any) {
      console.error('Error confirming card:', error)
      sendToast(
        intl.formatMessage({
          id: 'payments.addCard.genericError',
          defaultMessage: 'Error confirming card:',
        }),
        { type: 'error' },
      )
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
            <Typography variant="h6">
              <FormattedMessage {...PAYMENTS_MESSAGES.addPaymentMethod} />
            </Typography>
          </Box>
          <Typography variant="subtitle2">
            <FormattedMessage
              id="payments.addCard.cardInformation"
              defaultMessage="Card Information"
            />
          </Typography>
          <Divider variant="fullWidth" sx={{ backgroundColor: 'divider', color: 'divider' }} />
          {elements ? (
            <>
              <PaymentElement />
              <Typography variant="subtitle2">
                <FormattedMessage
                  id="payments.addCard.billingAddress"
                  defaultMessage="Billing Address"
                />
              </Typography>
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
                  <FormattedMessage id="common.cancel" defaultMessage="Cancel" />
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ width: 'auto' }}
                  onClick={handleConfirmSetup}
                  disabled={!entityId || isAddingCardPaymentProcessing}
                >
                  <FormattedMessage id="common.confirm" defaultMessage="Confirm" />
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
