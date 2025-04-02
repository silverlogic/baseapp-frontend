'use client'

import { FC, useMemo, useState } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import { Divider, Grid, Typography } from '@mui/material'
import { Box, Theme, useMediaQuery } from '@mui/system'
import { AddressElement, useElements, useStripe } from '@stripe/react-stripe-js'

import useStripeHook from '../../hooks/useStripeHook'
import ConfirmationSubscriptionModal from '../ConfirmationSubscriptionModal'
import PaymentDropdown from '../paymentDropDown'
import { CheckoutProps } from '../types'
import { ProductContainer, StyledLoadingButton } from './styled'

const Checkout: FC<CheckoutProps> = ({
  checkoutCustomerId,
  paymentMethods,
  product,
  setupClientSecret,
}) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string>('')
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const { sendToast } = useNotification()
  const [confirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false)

  const elements = useElements()
  const stripe = useStripe()

  const { UseCreationSubscription } = useStripeHook()
  const {
    mutate: createSubscription,
    isPending: isCreatingSubscription,
    isError: subscriptionError,
  } = UseCreationSubscription()

  const selectedMethod = useMemo(
    () => paymentMethods.find((pm) => pm.id === selectedPaymentMethodId),
    [selectedPaymentMethodId, paymentMethods],
  )

  const handlePlaceOrder = async () => {
    if (!elements) {
      console.error('Stripe elements not initialized')
      return
    }

    const addressElement = elements.getElement(AddressElement)

    if (!addressElement) {
      console.error('AddressElement not found')
      return
    }

    const { value } = await addressElement.getValue()

    const { address, name } = value
    try {
      createSubscription(
        {
          customerId: checkoutCustomerId || '',
          priceId: product.defaultPrice.id,
          allowIncomplete: true,
          paymentMethodId: selectedPaymentMethodId,
          billingDetails: {
            name,
            address: {
              ...address,
              line2: address.line2 ?? undefined,
            },
          },
        },
        {
          onSuccess: async (data) => {
            const { clientSecret } = data

            if (stripe && clientSecret) {
              const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: selectedPaymentMethodId,
              })

              const { paymentIntent } = result
              setOrderNumber(paymentIntent?.id ?? null)

              if (result.error) {
                console.error('Payment confirmation failed:', result.error.message)
                const { message } = result.error
                sendToast(`Failed to create subscription: ${message}`, { type: 'error' })
              } else {
                setSelectedPaymentMethodId('')
                setConfirmationModalOpen(true)
              }
            }
          },
          onError: (error: any) => {
            const message = error?.message
            console.error('Subscription creation failed:', message)
            sendToast(`Failed to create subscription: ${message}`, { type: 'error' })
          },
        },
      )
    } catch (error: any) {
      const message = error?.response?.data?.error || error?.message || 'Please try again.'
      sendToast(`Failed to create subscription: ${message}`, { type: 'error' })
    }
  }

  const addressOptions = {
    mode: 'billing' as const,
    ...{
      defaultValues: {
        name: selectedMethod?.billingDetails?.name || '',
        address: {
          line1: selectedMethod?.billingDetails?.address?.line1 || '',
          line2: selectedMethod?.billingDetails?.address?.line2 || '',
          city: selectedMethod?.billingDetails?.address?.city || '',
          state: selectedMethod?.billingDetails?.address?.state || '',
          postal_code: selectedMethod?.billingDetails?.address?.postalCode || '',
          country: selectedMethod?.billingDetails?.address?.country || 'US',
        },
      },
    },
  }

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Box>
        <Typography variant="h3">Checkout V14</Typography>
      </Box>
      <Grid
        container
        spacing={3}
        direction={isMobile ? 'column' : 'row-reverse'}
        justifyContent="center"
      >
        <Grid item xs={12} sm={6}>
          <Box sx={{ maxWidth: 400 }}>
            <ProductContainer>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {product?.images.length > 0 && (
                  <Box
                    component="img"
                    src={product?.images[0]}
                    alt={product?.name}
                    sx={{ width: 48, height: 48, borderRadius: 1 }}
                  />
                )}
                <Typography variant="body2" fontWeight={700}>
                  {product?.name}
                </Typography>
              </Box>
              <Box>
                {Number.isFinite(product?.defaultPrice?.unitAmount) && (
                  <Typography variant="body2" fontWeight={700}>
                    {(product.defaultPrice.unitAmount / 100).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  + taxes /month
                </Typography>
              </Box>
            </ProductContainer>
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.primary">
                By completing your purchase, you consent to BaseApp storing your payment method for
                future charges. You can change your payment method at any time in your account
                settings.
              </Typography>
            </Box>
            <Box mt={3}>
              <StyledLoadingButton
                variant="contained"
                color="primary"
                loading={isCreatingSubscription || subscriptionError}
                onClick={handlePlaceOrder}
                disabled={isCreatingSubscription || subscriptionError}
              >
                Place Order
              </StyledLoadingButton>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ maxWidth: 400 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="subtitle2">Payment</Typography>
              <Divider variant="fullWidth" sx={{ backgroundColor: 'divider' }} />
              {elements && stripe && (
                <PaymentDropdown
                  paymentMethods={paymentMethods}
                  selectedPaymentMethodId={selectedPaymentMethodId}
                  setSelectedPaymentMethodId={setSelectedPaymentMethodId}
                  setupClientSecret={setupClientSecret}
                  elements={elements}
                  stripe={stripe}
                  isAddCardModalOpen={isAddCardModalOpen}
                  setIsAddCardModalOpen={setIsAddCardModalOpen}
                />
              )}
              <Typography variant="subtitle2">Billing Address</Typography>

              <Divider variant="fullWidth" sx={{ backgroundColor: 'divider', color: 'divider' }} />
              {!isAddCardModalOpen ? (
                <Box
                  // make sure the AddressElement update the address when changing the payment method
                  key={`address-${selectedPaymentMethodId}-modal-${isAddCardModalOpen ? 'open' : 'closed'}`}
                >
                  <AddressElement options={addressOptions} />
                </Box>
              ) : null}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ConfirmationSubscriptionModal
        open={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        orderNumber={orderNumber}
      />
    </Box>
  )
}
export default Checkout
