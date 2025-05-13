'use client'

import { FC, useEffect, useMemo, useState } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import { Divider, Grid, Typography } from '@mui/material'
import { Box, Theme, useMediaQuery } from '@mui/system'
import { AddressElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useQueryClient } from '@tanstack/react-query'

import useStripeHook from '../../hooks/useStripeHook'
import ConfirmationSubscriptionModal from '../ConfirmationSubscriptionModal'
import PaymentDropdown from '../paymentDropDown'
import { CheckoutProps } from '../types'
import { ProductContainer, StyledLoadingButton } from './styled'
import { PAYMENT_METHOD_API_KEY } from '../../hooks/keys'

const Checkout: FC<CheckoutProps> = ({
  checkoutCustomerId,
  paymentMethods,
  product,
  isLoadingMethods,
  handleSetupSuccess,
}) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string>('')
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false)
  const [isConfirmCardPaymentProcessing, setIsConfirmCardPaymentProcessing] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const { sendToast } = useNotification()
  const [isRetry, setIsRetry] = useState<boolean>(false)
  const [confirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false)
  const [hasMounted, setHasMounted] = useState<boolean>(false)

  const elements = useElements()
  const stripe = useStripe()
  const queryClient = useQueryClient()

  const { useCreationSubscription } = useStripeHook()
  const { mutate: createSubscription, isPending: isCreatingSubscription } =
    useCreationSubscription()

  const selectedMethod = useMemo(
    () => paymentMethods.find((pm) => pm.id === selectedPaymentMethodId),
    [selectedPaymentMethodId, paymentMethods],
  )

  useEffect(() => {
    if (!hasMounted && paymentMethods.length > 0) {
      const defaultPaymentMethod = paymentMethods?.find((pm) => pm.isDefault)
      setSelectedPaymentMethodId(
        defaultPaymentMethod ? defaultPaymentMethod.id : paymentMethods[0]?.id || '',
      )
      setHasMounted(true)
    } else {
      setSelectedPaymentMethodId(paymentMethods[0]?.id || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethods])

  const extractErrorMessage = (error: any): string =>
    error?.response?.data?.nonFieldErrors?.[0] ||
    error?.response?.data?.error ||
    error?.message ||
    'An unexpected error occurred. Please try again.'

  const handlePlaceOrder = async () => {
    if (!elements) {
      return
    }

    const addressElement = elements.getElement(AddressElement)

    if (!addressElement) {
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
              setIsConfirmCardPaymentProcessing(true)
              const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: selectedPaymentMethodId,
              })
              setIsConfirmCardPaymentProcessing(false)
              const { paymentIntent } = result
              setOrderNumber(paymentIntent?.id ?? null)
              if (result.error) {
                const message = extractErrorMessage(result.error)
                sendToast(message, { type: 'error' })
                setIsRetry(true)
              } else {
                if (paymentMethods?.length > 0) {
                  setSelectedPaymentMethodId(paymentMethods[0]?.id || '')
                }
                queryClient.invalidateQueries({ queryKey: [PAYMENT_METHOD_API_KEY.get()] })
                setConfirmationModalOpen(true)
                setIsRetry(false)
              }
            }
          },
          onError: (error: any) => {
            const message = extractErrorMessage(error)
            sendToast(message, { type: 'error' })
            setIsConfirmCardPaymentProcessing(false)
            setIsRetry(true)
          },
        },
      )
    } catch (error: any) {
      const message = error?.response?.data?.error || error?.message || 'Please try again.'
      sendToast(`Failed to create subscription: ${message}`, { type: 'error' })
      setIsRetry(true)
    }
  }

  const handleRetry = () => {
    setIsRetry(false)
    sendToast('Retrying subscription creation...', { type: 'info' })
    handlePlaceOrder()
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

  const shouldRenderAddressElement =
    !isAddCardModalOpen && !isLoadingMethods && paymentMethods.length > 0

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Grid
        container
        spacing={3}
        direction={isMobile ? 'column' : 'row-reverse'}
        justifyContent="center"
      >
        <Grid item xs={12} sm={6}>
          <Box sx={{ maxWidth: 400 }} display="flex" flexDirection="column" gap={2}>
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
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Typography variant="body2" fontWeight={700}>
                      {(product?.defaultPrice?.unitAmount || 0 / 100).toLocaleString(product?.defaultPrice?.locale ||'en-US', {
                      style: 'currency',
                      currency: product?.defaultPrice?.currency || 'USD',
                      })}
                    </Typography>
                  </Box>
                )}
                <Typography variant="body2" color="text.secondary">
                  + taxes /month
                </Typography>
              </Box>
            </ProductContainer>
            <Box>
              <Typography variant="caption" color="text.primary">
                By completing your purchase, you consent to BaseApp storing your payment method for
                future charges. You can change your payment method at any time in your account
                settings.
              </Typography>
            </Box>
            <Box>
              <StyledLoadingButton
                variant="contained"
                color="primary"
                loading={isCreatingSubscription || isConfirmCardPaymentProcessing}
                onClick={isRetry ? handleRetry : handlePlaceOrder}
                disabled={
                  isCreatingSubscription ||
                  confirmationModalOpen ||
                  isConfirmCardPaymentProcessing ||
                  paymentMethods?.length === 0
                }
              >
                {isRetry ? 'Retry' : 'Place Order'}
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
                  customerId={checkoutCustomerId}
                  paymentMethods={paymentMethods}
                  selectedPaymentMethodId={selectedPaymentMethodId}
                  setSelectedPaymentMethodId={setSelectedPaymentMethodId}
                  elements={elements}
                  stripe={stripe}
                  isAddCardModalOpen={isAddCardModalOpen}
                  setIsAddCardModalOpen={setIsAddCardModalOpen}
                  handleSetupSuccess={handleSetupSuccess}
                />
              )}
              {shouldRenderAddressElement ? (
                <>
                  <Typography variant="subtitle2">Billing Address</Typography>

                  <Divider
                    variant="fullWidth"
                    sx={{ backgroundColor: 'divider', color: 'divider' }}
                  />
                  <Box
                    // make sure the AddressElement update the address when changing the payment method
                    key={`address-${selectedPaymentMethodId}-modal-${isAddCardModalOpen ? 'open' : 'closed'}`}
                  >
                    <AddressElement options={addressOptions} />
                  </Box>
                </>
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
