'use client'

import { FC, useEffect, useState } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { Elements } from '@stripe/react-stripe-js'

import useStripeHook from '../hooks/useStripeHook'
import { getStripePromise } from '../utils/stripe'
import Checkout from './Checkout'
import { StyledBox, StyledContainer } from './styled'
import { CheckoutComponentProps } from './types'

const CheckoutComponent: FC<CheckoutComponentProps> = ({
  checkoutCustomerId,
  checkoutProductId,
  stripePublishableKey,
  ConfirmationSubscriptionModal,
  ConfirmationSubscriptionModalProps,
}) => {
  const [lastAddedPaymentMethodIdDuringSession, setLastAddedPaymentMethodIdDuringSession] =
    useState<string | null>(null)

  const { useSetupIntent, useListPaymentMethods, useGetProduct } = useStripeHook()
  const { mutate: createSetupIntent, data: setupIntent, isPending, isError } = useSetupIntent()

  const {
    data: paymentMethods,
    isLoading: isLoadingMethods,
    isError: isErrorMethods,
  } = useListPaymentMethods(checkoutCustomerId || '')

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

  const handleSetupSuccess = (paymentMethodId: string) => {
    if (paymentMethodId) {
      setLastAddedPaymentMethodIdDuringSession(paymentMethodId)
    }
    createSetupIntent(checkoutCustomerId)
  }

  const isNotReady =
    isPending ||
    isError ||
    isLoadingMethods ||
    isErrorMethods ||
    isLoadingProduct ||
    isErrorProduct ||
    !product ||
    !setupIntent?.clientSecret

  if (isNotReady) return <LoadingState />

  return (
    <Elements
      stripe={getStripePromise(stripePublishableKey)}
      options={{ clientSecret: setupIntent?.clientSecret }}
    >
      <StyledContainer>
        <StyledBox>
          <Checkout
            lastAddedPaymentMethodIdDuringSession={lastAddedPaymentMethodIdDuringSession}
            checkoutCustomerId={checkoutCustomerId}
            paymentMethods={paymentMethods || []}
            product={product}
            setupClientSecret={setupIntent.clientSecret}
            isLoadingMethods={isLoadingMethods}
            handleSetupSuccess={handleSetupSuccess}
            ConfirmationSubscriptionModal={ConfirmationSubscriptionModal}
            ConfirmationSubscriptionModalProps={ConfirmationSubscriptionModalProps}
          />
        </StyledBox>
      </StyledContainer>
    </Elements>
  )
}
export default CheckoutComponent
