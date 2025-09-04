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
  entityId,
  checkoutProductId,
  ConfirmationSubscriptionModal,
  ConfirmationSubscriptionModalProps,
}) => {
  const [lastAddedPaymentMethodIdDuringSession, setLastAddedPaymentMethodIdDuringSession] =
    useState<string | null>(null)

  const { useSetupIntent, useListPaymentMethods, useGetProduct } = useStripeHook()
  const {
    mutate: createSetupIntent,
    data: setupIntent,
    isPending,
    isError,
  } = useSetupIntent(entityId)
  const {
    data: paymentMethods,
    isLoading: isLoadingMethods,
    isError: isErrorMethods,
  } = useListPaymentMethods(entityId)
  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
  } = useGetProduct(checkoutProductId || '')

  useEffect(() => {
    if (entityId) {
      createSetupIntent(entityId)
    }
  }, [createSetupIntent])

  const handleSetupSuccess = (paymentMethodId: string) => {
    if (paymentMethodId) {
      setLastAddedPaymentMethodIdDuringSession(paymentMethodId)
    }
    createSetupIntent(entityId)
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
      stripe={getStripePromise(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)}
      options={{ clientSecret: setupIntent?.clientSecret }}
    >
      <StyledContainer>
        <StyledBox>
          <Checkout
            lastAddedPaymentMethodIdDuringSession={lastAddedPaymentMethodIdDuringSession}
            entityId={entityId}
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
