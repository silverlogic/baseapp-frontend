'use client'

import { FC, useMemo, useState } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import { Divider, Grid, Typography } from '@mui/material'
import { Box, Theme, useMediaQuery } from '@mui/system'
import { AddressElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useQueryClient } from '@tanstack/react-query'

import useStripeHook from '../../hooks/useStripeHook'
import { PAYMENT_METHOD_API_KEY } from '../../services/keys'
import { formatPrice } from '../../utils'
import DefaultConfirmationSubscriptionModal from '../ConfirmationSubscriptionModal'
import PaymentDropdown from '../PaymentDropDown'
import { CheckoutProps } from '../types'
import { ProductContainer, StyledLoadingButton } from './styled'

const Checkout: FC<CheckoutProps> = ({
  lastAddedPaymentMethodIdDuringSession,
  ConfirmationSubscriptionModal = DefaultConfirmationSubscriptionModal,
  ConfirmationSubscriptionModalProps = {},
  checkoutCustomerId,
  paymentMethods,
  product,
  isLoadingMethods,
  handleSetupSuccess,
}) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
  const getInitialPaymentMethodId = () => {
    if (paymentMethods.length > 0 && lastAddedPaymentMethodIdDuringSession !== null)
      return lastAddedPaymentMethodIdDuringSession

    if (paymentMethods.length > 0 && lastAddedPaymentMethodIdDuringSession == null) {
      const defaultPaymentMethod = paymentMethods.find((pm) => pm.isDefault)
      return defaultPaymentMethod ? defaultPaymentMethod.id : paymentMethods[0]?.id || ''
    }
    return ''
  }

  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string>(
    getInitialPaymentMethodId(),
  )
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const { sendToast } = useNotification()
  const [isRetry, setIsRetry] = useState<boolean>(false)
  const [confirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false)

  const elements = useElements()
  const stripe = useStripe()
  const queryClient = useQueryClient()

  const { useCreationSubscription } = useStripeHook()
  const { mutate: createSubscription, isPending: isCreatingSubscription } =
    useCreationSubscription()
  const { mutateAsync: confirmCardPayment, isPending: isConfirmCardPaymentProcessing } =
    useStripeHook().useConfirmCardPayment(stripe)

  const selectedMethod = useMemo(
    () => paymentMethods.find((pm) => pm.id === selectedPaymentMethodId),
    [selectedPaymentMethodId, paymentMethods],
  )

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
              line2: address.line2 ?? null,
            },
          },
        },
        {
          onSuccess: async (data) => {
            const { clientSecret } = data
            if (stripe && clientSecret) {
              let paymentIntent = null
              try {
                paymentIntent = await confirmCardPayment({
                  clientSecret,
                  paymentMethodId: selectedPaymentMethodId,
                })
              } catch (error) {
                const message = extractErrorMessage(error)
                sendToast(`Payment confirmation failed: ${message}`, { type: 'error' })
                setIsRetry(true)
                return
              }
              setOrderNumber(paymentIntent?.id ?? null)
              if (paymentMethods?.length > 0) {
                setSelectedPaymentMethodId(paymentMethods[0]?.id || '')
              }
              queryClient.invalidateQueries({ queryKey: [PAYMENT_METHOD_API_KEY.get()] })
              setConfirmationModalOpen(true)
              setIsRetry(false)
            }
          },
          onError: (error: any) => {
            const message = extractErrorMessage(error)
            sendToast(message, { type: 'error' })
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4,
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          Checkout
        </Typography>
      </Box>

      <Grid
        container
        spacing={{ xs: 3, md: 8 }}
        direction={isMobile ? 'column' : 'row-reverse'}
        justifyContent="center"
      >
        <Grid item xs={12} sm={6}>
          <Box display="flex" flexDirection="column" gap={2}>
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
                      {formatPrice(
                        product?.defaultPrice?.unitAmount,
                        product?.defaultPrice?.locale,
                        product?.defaultPrice?.currency,
                      )}
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
          <Box
            sx={{
              minWidth: { md: 400 },
            }}
          >
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
                  <Box display="flex" flexDirection="column" gap="none">
                    <Typography variant="subtitle2">Address</Typography>
                    <Typography variant="caption" color="text.primary">
                      Used to calculate taxes.
                    </Typography>
                  </Box>
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
        {...ConfirmationSubscriptionModalProps}
        open={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        orderNumber={orderNumber}
      />
    </Box>
  )
}
export default Checkout
