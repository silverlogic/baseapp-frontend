'use client'

import { FC, useEffect, useState } from 'react'

import { Box, LinearProgress } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js'

import useStripeHook from '../hooks/useStripeHook'
import { getStripePromise } from '../utils/stripe'
import ManagementComponent from './ManagementComponent'
import { SubscriptionManagementProps } from './types'

const SubscriptionManagement: FC<SubscriptionManagementProps> = ({
  subscriptionId,
  entityId,
  stripePublishableKey,
}) => {
  const { useSetupIntent } = useStripeHook()
  const {
    mutate: createSetupIntent,
    data: setupIntent,
    isPending,
    isError,
  } = useSetupIntent(entityId)
  const [lastAddedPaymentMethodIdDuringSession, setLastAddedPaymentMethodIdDuringSession] =
    useState<string | null>(null)

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

  return isPending || isError || !setupIntent?.clientSecret ? (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  ) : (
    <Elements
      stripe={getStripePromise(stripePublishableKey)}
      options={{ clientSecret: setupIntent?.clientSecret }}
    >
      <ManagementComponent
        subscriptionId={subscriptionId}
        entityId={entityId}
        handleSetupSuccess={handleSetupSuccess}
        lastAddedPaymentMethodIdDuringSession={lastAddedPaymentMethodIdDuringSession}
      />
    </Elements>
  )
}
export default SubscriptionManagement
