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
  customerId,
  stripePublishableKey,
}) => {
  const { useSetupIntent } = useStripeHook()
  const { mutate: createSetupIntent, data: setupIntent, isPending, isError } = useSetupIntent()
  const [lastAddedPaymentMethodIdDuringSession, setLastAddedPaymentMethodIdDuringSession] =
    useState<string | null>(null)

  useEffect(() => {
    if (customerId) {
      createSetupIntent(customerId)
    }
  }, [createSetupIntent])

  const handleSetupSuccess = (paymentMethodId: string) => {
    if (paymentMethodId) {
      setLastAddedPaymentMethodIdDuringSession(paymentMethodId)
    }
    createSetupIntent(customerId)
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
        customerId={customerId}
        handleSetupSuccess={handleSetupSuccess}
        lastAddedPaymentMethodIdDuringSession={lastAddedPaymentMethodIdDuringSession}
      />
    </Elements>
  )
}
export default SubscriptionManagement
