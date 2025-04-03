'use client'

import { FC, useEffect } from 'react'

import { Box, LinearProgress } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js'

import { stripePromise } from '../../stripe'
import useStripeHook from '../hooks/useStripeHook'
import Checkout from './Checkout'

interface CheckoutWrapperProps {
  checkoutCustomerId: string
  checkoutProductId: string
}

const CheckoutWrapper: FC<CheckoutWrapperProps> = ({ checkoutCustomerId, checkoutProductId }) => {
  const { UseSetupIntent, useGetPaymentMethod, useGetProduct } = useStripeHook()
  const { mutate: createSetupIntent, data: setupIntent, isPending, isError } = UseSetupIntent()

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
      ``
    </Box>
  ) : (
    <Elements stripe={stripePromise} options={{ clientSecret: setupIntent?.clientSecret }}>
      <Checkout
        checkoutCustomerId={checkoutCustomerId}
        paymentMethods={paymentMethods || []}
        product={product}
        setupClientSecret={setupIntent.clientSecret}
      />
    </Elements>
  )
}
export default CheckoutWrapper
