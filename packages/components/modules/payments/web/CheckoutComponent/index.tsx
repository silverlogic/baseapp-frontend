'use client'

import { FC, useEffect, useMemo, useState } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { useNotification } from '@baseapp-frontend/utils'

import { Divider, Grid, Typography } from '@mui/material'
import { Box, Theme, useMediaQuery } from '@mui/system'
import { AddressElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import PaymentDropdown from '../PaymentDropDown'
import useStripeHook from '../hooks/useStripeHook'
import { CUSTOMER_API_KEY, PAYMENT_METHOD_API_KEY } from '../services/keys'
import { formatPrice } from '../utils'
import { getStripePromise } from '../utils/stripe'
import DefaultConfirmationSubscriptionModal from './ConfirmationSubscriptionModal'
import { ProductContainer, StyledLoadingButton } from './styled'
import { CheckoutComponentProps, CheckoutComponentWithElementProps } from './types'

const CheckoutComponent: FC<CheckoutComponentProps> = ({
  entityId,
  productId,
  ConfirmationSubscriptionModal = DefaultConfirmationSubscriptionModal,
  ConfirmationSubscriptionModalProps,
  onSuccess,
}) => {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [isRetry, setIsRetry] = useState<boolean>(false)
  const [confirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false)
  const [addressElementHasErrors, setAddressElementHasErrors] = useState<boolean>(false)
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string>('')

  const { sendToast } = useNotification()
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
  const elements = useElements()
  const stripe = useStripe()
  const queryClient = useQueryClient()
  const router = useRouter()
  const {
    useListPaymentMethods,
    useGetProduct,
    useGetCustomer,
    useCreateSubscription,
    useUpdateSubscription,
    useConfirmCardPayment,
  } = useStripeHook()
  const {
    data: paymentMethods,
    isLoading: isLoadingMethods,
    isError: isErrorMethods,
  } = useListPaymentMethods(entityId)
  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
  } = useGetProduct(productId || '')
  const { mutate: createSubscription, isPending: isCreatingSubscription } = useCreateSubscription()
  const { mutateAsync: confirmCardPayment, isPending: isConfirmCardPaymentProcessing } =
    useConfirmCardPayment(stripe)
  const { data: customer } = useGetCustomer(entityId)
  const { mutateAsync: updateSubscription, isPending: isUpdatingSubscription } =
    useUpdateSubscription(customer?.subscriptions?.[0]?.id ?? '', {
      onSuccess: () => {
        setIsRetry(false)
        sendToast('Subscription updated successfully.', { type: 'success' })
        setConfirmationModalOpen(true)
        onSuccess?.()
      },
      onError: (error: any) => {
        console.error('Failed to update subscription', error)
        sendToast('Failed to update subscription', { type: 'error' })
        setIsRetry(true)
      },
    })

  const selectedMethod = useMemo(
    () => paymentMethods?.find((pm) => pm.id === selectedPaymentMethodId),
    [selectedPaymentMethodId, paymentMethods],
  )

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
    !isAddCardModalOpen && !isLoadingMethods && (paymentMethods?.length ?? 0) > 0
  const isNotReady =
    isLoadingMethods || isErrorMethods || isLoadingProduct || isErrorProduct || !product

  const extractErrorMessage = (error: any): string =>
    error?.response?.data?.nonFieldErrors?.[0] ||
    error?.response?.data?.error ||
    (Array.isArray(error?.response?.data) && error?.response?.data[0]) ||
    error?.message ||
    'An unexpected error occurred. Please try again.'

  const handlePlaceOrder = async () => {
    if (!elements) return
    const addressElement = elements.getElement(AddressElement)
    if (!addressElement) return
    const { value } = await addressElement.getValue()
    const { address, name } = value
    try {
      if (
        customer?.subscriptions?.length &&
        customer.subscriptions.length > 0 &&
        customer.subscriptions[0]?.status &&
        !['canceled', 'incomplete_expired'].includes(customer.subscriptions[0]?.status)
      ) {
        updateSubscription({
          priceId: product?.defaultPrice?.id ?? '',
          paymentMethodId: selectedPaymentMethodId,
          billingDetails: {
            name,
            address: {
              ...address,
              line2: address.line2 ?? null,
            },
          },
        })
        return
      }
      createSubscription(
        {
          entityId,
          priceId: product?.defaultPrice?.id ?? '',
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
              if (paymentMethods?.length && paymentMethods.length > 0) {
                setSelectedPaymentMethodId(paymentMethods[0]?.id ?? '')
              }
              queryClient.invalidateQueries({
                queryKey: [PAYMENT_METHOD_API_KEY.get(), CUSTOMER_API_KEY.get(entityId)],
              })
            }
            setConfirmationModalOpen(true)
            setIsRetry(false)
            onSuccess?.()
          },
          onError: (error: any) => {
            console.error('Failed to create subscription', error)
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

  const handleSetupSuccess = (paymentMethodId: string) => {
    if (paymentMethodId) {
      setSelectedPaymentMethodId(paymentMethodId)
    }
  }

  const handleAddressChange = (event: any) => {
    if (event.error || !event.complete) {
      setAddressElementHasErrors(true)
    } else {
      setAddressElementHasErrors(false)
    }
  }

  useEffect(() => {
    if (!paymentMethods || paymentMethods.length === 0) return
    const defaultPaymentMethod = paymentMethods?.find((pm) => pm.isDefault)
    setSelectedPaymentMethodId(defaultPaymentMethod?.id ?? 'empty')
  }, [paymentMethods])

  if (isNotReady) return <LoadingState />

  return (
    <Box width="100%" padding={2}>
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
                  <Box display="flex" justifyContent="flex-end" gap={1}>
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
                loading={
                  isCreatingSubscription || isUpdatingSubscription || isConfirmCardPaymentProcessing
                }
                onClick={isRetry ? handleRetry : handlePlaceOrder}
                disabled={
                  addressElementHasErrors ||
                  isCreatingSubscription ||
                  isUpdatingSubscription ||
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
          <Box minWidth={{ md: 400 }}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="subtitle2">Payment</Typography>
              <Divider variant="fullWidth" sx={{ backgroundColor: 'divider' }} />
              {elements && stripe && (
                <PaymentDropdown
                  entityId={entityId}
                  paymentMethods={paymentMethods ?? []}
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
                    <AddressElement options={addressOptions} onChange={handleAddressChange} />
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
        planDetails={() => router.push('/user/settings?tab=subscription')}
      />
    </Box>
  )
}

const CheckoutComponentWithElements: FC<CheckoutComponentWithElementProps> = ({
  entityId,
  productId,
  stripePublishableKey,
  ConfirmationSubscriptionModal,
  ConfirmationSubscriptionModalProps,
  onSuccess,
}) => (
  <Elements stripe={getStripePromise(stripePublishableKey)}>
    <CheckoutComponent
      entityId={entityId}
      productId={productId}
      ConfirmationSubscriptionModal={ConfirmationSubscriptionModal}
      ConfirmationSubscriptionModalProps={ConfirmationSubscriptionModalProps}
      onSuccess={onSuccess}
    />
  </Elements>
)

export default CheckoutComponentWithElements
