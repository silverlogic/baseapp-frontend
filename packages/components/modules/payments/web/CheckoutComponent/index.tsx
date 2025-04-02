'use client'

import { FC, useEffect } from 'react'

import { Box, LinearProgress } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js'

import { getStripePromise } from '../../stripe'
import useStripeHook from '../hooks/useStripeHook'
import Checkout from './Checkout'

interface CheckoutWrapperProps {
  checkoutCustomerId: string
  checkoutProductId: string
  stripePublishableKey: string
}

const CheckoutWrapper: FC<CheckoutWrapperProps> = ({
  checkoutCustomerId,
  checkoutProductId,
  stripePublishableKey,
}) => {
  const { useSetupIntent, useGetPaymentMethod, useGetProduct } = useStripeHook()
  const { mutate: createSetupIntent, data: setupIntent, isPending, isError } = useSetupIntent()

  const {
    data: paymentMethods,
    isLoading: isLoadingMethods,
    isError: isErrorMethods,
  } = useGetPaymentMethod(checkoutCustomerId || '')

  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
  } = useGetProduct(checkoutProductId || '')

  useEffect(() => {
    if (checkoutCustomerId) {
      createSetupIntent(checkoutCustomerId)
    }
  }, [createSetupIntent])

  const handleSetupSuccess = () => {
    createSetupIntent(checkoutCustomerId)
  }

  return isPending ||
    isError ||
    isLoadingMethods ||
    isErrorMethods ||
    isLoadingProduct ||
    isErrorProduct ||
    !product ||
    !setupIntent?.clientSecret ? (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  ) : (
    <Elements
      stripe={getStripePromise(stripePublishableKey)}
      options={{ clientSecret: setupIntent?.clientSecret }}
    >
      <Checkout
        checkoutCustomerId={checkoutCustomerId}
        paymentMethods={paymentMethods || []}
        product={product}
        setupClientSecret={setupIntent.clientSecret}
        isLoadingMethods={isLoadingMethods}
        handleSetupSuccess={handleSetupSuccess}
      />
    </Elements>
  )
}
export default CheckoutWrapper
