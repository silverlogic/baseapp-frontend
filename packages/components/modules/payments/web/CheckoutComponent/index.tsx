'use client'

import { FC, useEffect, useMemo, useState } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { useNotification } from '@baseapp-frontend/utils'

import { Divider, Grid, Typography } from '@mui/material'
import { Box, Theme, useMediaQuery } from '@mui/system'
import { AddressElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { FormattedMessage, useIntl } from 'react-intl'

import PaymentDropdown from '../PaymentDropDown'
import { PAYMENTS_MESSAGES } from '../constants'
import useStripeHook from '../hooks/useStripeHook'
import { STRIPE_API_KEY } from '../services/stripe'
import { formatPrice } from '../utils'
import { getStripePromise } from '../utils/stripe'
import DefaultConfirmationSubscriptionModal from './ConfirmationSubscriptionModal'
import { CHECKOUT_MESSAGES, PRODUCT_THUMBNAIL_SIZE } from './constants'
import { ProductContainer, StyledLoadingButton } from './styled'
import { CheckoutComponentProps, CheckoutComponentWithElementProps } from './types'
import { buildAddressOptions, extractErrorMessage } from './utils'

const CheckoutComponent: FC<CheckoutComponentProps> = ({
  entityId,
  productId,
  ConfirmationSubscriptionModal = DefaultConfirmationSubscriptionModal,
  ConfirmationSubscriptionModalProps,
  onSuccess,
  planDetailsUrl = '/user/settings?tab=subscription',
}) => {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [isRetry, setIsRetry] = useState<boolean>(false)
  const [pendingClientSecret, setPendingClientSecret] = useState<string | null>(null)
  const [confirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false)
  const [addressElementHasErrors, setAddressElementHasErrors] = useState<boolean>(false)
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string>('')

  const { sendToast } = useNotification()
  const intl = useIntl()
  const getErrorMessage = (error: unknown) =>
    extractErrorMessage(error, intl.formatMessage(CHECKOUT_MESSAGES.unexpectedError))
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
  const elements = useElements()
  const stripe = useStripe()
  const queryClient = useQueryClient()
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
        sendToast(intl.formatMessage(PAYMENTS_MESSAGES.subscriptionUpdated), { type: 'success' })
        setConfirmationModalOpen(true)
        onSuccess?.()
      },
      onError: (error: any) => {
        console.error('Failed to update subscription', error)
        sendToast(intl.formatMessage(CHECKOUT_MESSAGES.updateFailed), { type: 'error' })
        setIsRetry(true)
      },
    })

  const selectedMethod = useMemo(
    () => paymentMethods?.find((pm) => pm.id === selectedPaymentMethodId),
    [selectedPaymentMethodId, paymentMethods],
  )

  const addressOptions = buildAddressOptions(selectedMethod)
  const shouldRenderAddressElement =
    !isAddCardModalOpen && !isLoadingMethods && (paymentMethods?.length ?? 0) > 0
  const isNotReady =
    isLoadingMethods || isErrorMethods || isLoadingProduct || isErrorProduct || !product

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
                const message = getErrorMessage(error)
                sendToast(
                  intl.formatMessage(CHECKOUT_MESSAGES.paymentConfirmationFailed, { message }),
                  { type: 'error' },
                )
                setPendingClientSecret(clientSecret)
                setIsRetry(true)
                return
              }
              setOrderNumber(paymentIntent?.id ?? null)
              setPendingClientSecret(null)
              if (paymentMethods?.length && paymentMethods.length > 0) {
                setSelectedPaymentMethodId(paymentMethods[0]?.id ?? '')
              }
              // One filter per key: a single queryKey holding two key arrays matches no query at all.
              queryClient.invalidateQueries({
                queryKey: [STRIPE_API_KEY.listPaymentMethods(entityId)],
              })
              queryClient.invalidateQueries({
                queryKey: [STRIPE_API_KEY.getCustomer(entityId)],
              })
            }
            setConfirmationModalOpen(true)
            setIsRetry(false)
            onSuccess?.()
          },
          onError: (error: any) => {
            console.error('Failed to create subscription', error)
            const message = getErrorMessage(error)
            sendToast(message, { type: 'error' })
            setIsRetry(true)
          },
        },
      )
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        intl.formatMessage(PAYMENTS_MESSAGES.tryAgain)
      sendToast(intl.formatMessage(CHECKOUT_MESSAGES.createFailed, { message }), {
        type: 'error',
      })
      setIsRetry(true)
    }
  }

  const handleRetry = async () => {
    if (!pendingClientSecret) {
      setIsRetry(false)
      await handlePlaceOrder()
      return
    }
    try {
      const paymentIntent = await confirmCardPayment({
        clientSecret: pendingClientSecret,
        paymentMethodId: selectedPaymentMethodId,
      })
      setOrderNumber(paymentIntent?.id ?? null)
      setPendingClientSecret(null)
      setIsRetry(false)
      setConfirmationModalOpen(true)
      onSuccess?.()
    } catch (error) {
      const message = getErrorMessage(error)
      sendToast(intl.formatMessage(CHECKOUT_MESSAGES.paymentConfirmationFailed, { message }), {
        type: 'error',
      })
    }
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
    // A newly added card comes back with isDefault false, so fall back to the first available
    // method - matching SubscriptionManagement - instead of leaving the selection empty.
    const defaultPaymentMethod = paymentMethods.find((pm) => pm.isDefault) ?? paymentMethods[0]
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
                {!!product.images?.length && (
                  <Box sx={{ display: 'flex', borderRadius: 1, overflow: 'hidden' }}>
                    <Image
                      src={product.images[0] ?? ''}
                      alt={product.name}
                      width={PRODUCT_THUMBNAIL_SIZE}
                      height={PRODUCT_THUMBNAIL_SIZE}
                    />
                  </Box>
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
                        intl.locale,
                        product?.defaultPrice?.currency,
                      )}
                    </Typography>
                  </Box>
                )}
                <Typography variant="body2" color="text.secondary">
                  <FormattedMessage
                    id="payments.checkout.taxesPerMonth"
                    defaultMessage="+ taxes /month"
                  />
                </Typography>
              </Box>
            </ProductContainer>
            <Box>
              <Typography variant="caption" color="text.primary">
                <FormattedMessage
                  id="payments.checkout.consent"
                  defaultMessage="By completing your purchase, you consent to BaseApp storing your payment method for future charges. You can change your payment method at any time in your account settings."
                />
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
                {isRetry ? (
                  <FormattedMessage id="payments.checkout.retry" defaultMessage="Retry" />
                ) : (
                  <FormattedMessage
                    id="payments.checkout.placeOrder"
                    defaultMessage="Place Order"
                  />
                )}
              </StyledLoadingButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box minWidth={{ md: 400 }}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="subtitle2">
                <FormattedMessage {...PAYMENTS_MESSAGES.payment} />
              </Typography>
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
                    <Typography variant="subtitle2">
                      <FormattedMessage id="payments.checkout.address" defaultMessage="Address" />
                    </Typography>
                    <Typography variant="caption" color="text.primary">
                      <FormattedMessage
                        id="payments.checkout.addressHelper"
                        defaultMessage="Used to calculate taxes."
                      />
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
        planDetailsHref={planDetailsUrl}
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
  planDetailsUrl,
}) => (
  <Elements stripe={getStripePromise(stripePublishableKey)}>
    <CheckoutComponent
      entityId={entityId}
      productId={productId}
      ConfirmationSubscriptionModal={ConfirmationSubscriptionModal}
      ConfirmationSubscriptionModalProps={ConfirmationSubscriptionModalProps}
      onSuccess={onSuccess}
      planDetailsUrl={planDetailsUrl}
    />
  </Elements>
)

export default CheckoutComponentWithElements
