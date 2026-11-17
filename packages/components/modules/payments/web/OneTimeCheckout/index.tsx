'use client'

import { FC, useEffect, useMemo, useState } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { Alert, Box, Button, Divider, Grid, Typography } from '@mui/material'
import { Elements, useStripe } from '@stripe/react-stripe-js'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'

import PaymentDropdown from '../PaymentDropDown'
import useStripeHook from '../hooks/useStripeHook'
import { STRIPE_API_KEY } from '../services/stripe'
import { formatPrice } from '../utils'
import { extractErrorMessage, getCheckoutElementsOptions } from '../utils/checkout'
import { getStripePromise } from '../utils/stripe'
import OrderLineRow from './OrderLine'
import { StyledLoadingButton, SummaryContainer, TotalRow } from './styled'
import { OneTimeCheckoutProps, OneTimeCheckoutWithElementsProps } from './types'
import { buildOrderSummary } from './utils'

const OneTimeCheckout: FC<OneTimeCheckoutProps> = ({
  entityId,
  items,
  onItemsChange,
  onSuccess,
  continueShoppingUrl,
}) => {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false)
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [purchaseId, setPurchaseId] = useState<number | null>(null)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  const stripe = useStripe()
  const queryClient = useQueryClient()
  const {
    useListPaymentMethods,
    useListProducts,
    useCreatePurchase,
    useConfirmCardPayment,
    useGetPurchase,
  } = useStripeHook()
  const { data: paymentMethods, isLoading: isLoadingMethods } = useListPaymentMethods(entityId)
  const { data: products } = useListProducts()
  const { mutateAsync: createPurchase } = useCreatePurchase()
  const { mutateAsync: confirmCardPayment } = useConfirmCardPayment(stripe)
  const { data: purchase } = useGetPurchase(purchaseId ?? undefined)

  const summary = useMemo(() => buildOrderSummary(items, products ?? []), [items, products])
  const { lines, currency, subtotal, unavailableProductIds, hasMixedCurrencies } = summary

  const isAwaitingConfirmation = !!purchaseId && purchase?.status !== 'failed'
  const isPaid = purchase?.status === 'paid'
  const isLocked = isSubmitting || isAwaitingConfirmation
  const canPlaceOrder =
    !isLocked &&
    lines.length > 0 &&
    !hasMixedCurrencies &&
    !!selectedPaymentMethodId &&
    (paymentMethods?.length ?? 0) > 0

  useEffect(() => {
    if (!paymentMethods || paymentMethods.length === 0) return
    // Keep the card the buyer picked or just added while it is still listed; otherwise fall
    // back to the default card, or the first one.
    setSelectedPaymentMethodId((current) => {
      if (paymentMethods.some((pm) => pm.id === current)) return current
      return (paymentMethods.find((pm) => pm.isDefault) ?? paymentMethods[0])?.id ?? ''
    })
  }, [paymentMethods])

  useEffect(() => {
    if (!purchase) return
    if (purchase.status === 'paid') {
      queryClient.invalidateQueries({ queryKey: [STRIPE_API_KEY.listInvoices()] })
      onSuccess?.(purchase)
    } else if (purchase.status === 'failed') {
      setPaymentError('The payment failed and nothing was charged. Please try another card.')
      setPurchaseId(null)
    }
    // onSuccess runs once per status change, not on every new callback identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchase?.status])

  const updateQuantity = (productId: string, quantity: number) =>
    onItemsChange(
      items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    )

  const removeItem = (productId: string) =>
    onItemsChange(items.filter((item) => item.productId !== productId))

  const handlePlaceOrder = async () => {
    setPaymentError(null)
    setIsSubmitting(true)
    try {
      let created
      try {
        created = await createPurchase({
          entityId,
          paymentMethodId: selectedPaymentMethodId,
          // The prices on screen: the backend refuses the order if any has changed since.
          items: lines.map((line) => ({
            productId: line.product.id,
            quantity: line.quantity,
            unitAmount: line.unitAmount,
          })),
        })
      } catch (error) {
        // Most rejections mean a price or product changed under the buyer, so show the current
        // ones. Refetched on any failure: the shared axios error keeps the body but drops the
        // HTTP status, so a 400 cannot be told apart here.
        queryClient.invalidateQueries({ queryKey: [STRIPE_API_KEY.listProducts()] })
        setPaymentError(extractErrorMessage(error))
        return
      }
      try {
        // Handles 3D Secure as well; the hook already toasts Stripe's own error message.
        await confirmCardPayment({
          clientSecret: created.clientSecret,
          paymentMethodId: selectedPaymentMethodId,
        })
      } catch (error) {
        setPaymentError(extractErrorMessage(error))
        return
      }
      // Paid in the browser; the purchase turns `paid` once Stripe's webhook reaches the backend.
      setPurchaseId(created.id)
    } finally {
      setIsSubmitting(false)
    }
  }

  // entityId arrives after the first render in some hosts; without it no card list is loaded yet.
  if (!entityId || isLoadingMethods || !products) return <LoadingState />

  if (isPaid && purchase) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={2} padding={4}>
        <Typography variant="h5">Thank you for your order!</Typography>
        <Typography variant="body1" color="text.secondary">
          Order #{purchase.id} - {formatPrice(purchase.total, undefined, purchase.currency)} paid.
        </Typography>
        {continueShoppingUrl && (
          <Button
            component={Link}
            href={continueShoppingUrl}
            variant="contained"
            sx={{ width: 'auto' }}
          >
            Continue shopping
          </Button>
        )}
      </Box>
    )
  }

  return (
    <Box width="100%" padding={2}>
      <Grid container spacing={{ xs: 3, md: 8 }} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="subtitle2">Payment</Typography>
            <Divider variant="fullWidth" sx={{ backgroundColor: 'divider' }} />
            {stripe && (
              <PaymentDropdown
                entityId={entityId}
                paymentMethods={paymentMethods ?? []}
                selectedPaymentMethodId={selectedPaymentMethodId}
                setSelectedPaymentMethodId={setSelectedPaymentMethodId}
                stripe={stripe}
                isAddCardModalOpen={isAddCardModalOpen}
                setIsAddCardModalOpen={setIsAddCardModalOpen}
                handleSetupSuccess={(id) => id && setSelectedPaymentMethodId(id)}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <SummaryContainer>
            <Typography variant="subtitle2">Order summary</Typography>
            {unavailableProductIds.length > 0 && (
              <Alert severity="warning">
                {unavailableProductIds.length === 1
                  ? 'One item is no longer available and was left out.'
                  : `${unavailableProductIds.length} items are no longer available and were left out.`}
              </Alert>
            )}
            {lines.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Your cart is empty.
              </Typography>
            ) : (
              lines.map((line) => (
                <OrderLineRow
                  key={line.product.id}
                  line={line}
                  currency={currency}
                  disabled={isLocked}
                  onQuantityChange={(quantity) => updateQuantity(line.product.id, quantity)}
                  onRemove={() => removeItem(line.product.id)}
                />
              ))
            )}
            {hasMixedCurrencies && (
              <Alert severity="error">
                These products are priced in different currencies and cannot be bought together.
              </Alert>
            )}
            <Divider />
            <TotalRow>
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="subtitle1" fontWeight={700}>
                {formatPrice(subtotal, undefined, currency)}
              </Typography>
            </TotalRow>
            <Typography variant="caption" color="text.secondary">
              Any applicable taxes are added to the invoice when the order is placed.
            </Typography>
            {paymentError && <Alert severity="error">{paymentError}</Alert>}
            {isAwaitingConfirmation && (
              <Alert severity="info">
                Payment received. Waiting for confirmation from the payment provider...
              </Alert>
            )}
            <StyledLoadingButton
              variant="contained"
              color="primary"
              loading={isLocked}
              disabled={!canPlaceOrder}
              onClick={handlePlaceOrder}
            >
              {paymentError ? 'Try again' : 'Place Order'}
            </StyledLoadingButton>
            {continueShoppingUrl && !isLocked && (
              <Button component={Link} href={continueShoppingUrl} variant="text">
                Continue shopping
              </Button>
            )}
          </SummaryContainer>
        </Grid>
      </Grid>
    </Box>
  )
}

const OneTimeCheckoutWithElements: FC<OneTimeCheckoutWithElementsProps> = ({
  stripePublishableKey,
  ...props
}) => {
  // Same query the checkout runs, so React Query serves both from one request.
  const { useListProducts } = useStripeHook()
  const { data: products, isLoading, isError } = useListProducts()
  const { currency } = useMemo(
    () => buildOrderSummary(props.items, products ?? []),
    [props.items, products],
  )
  // Elements needs the currency at mount; an empty cart still mounts, in the default one.
  const elementsOptions = useMemo(() => getCheckoutElementsOptions(currency ?? 'usd'), [currency])

  if (isLoading) return <LoadingState />
  if (isError && !products) {
    return (
      <Typography variant="body1" color="error">
        We could not load the products. Please try again later.
      </Typography>
    )
  }

  return (
    <Elements
      key={currency ?? 'usd'}
      stripe={getStripePromise(stripePublishableKey)}
      options={elementsOptions}
    >
      <OneTimeCheckout {...props} />
    </Elements>
  )
}

export default OneTimeCheckoutWithElements
