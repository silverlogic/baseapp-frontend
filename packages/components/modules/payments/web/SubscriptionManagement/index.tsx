'use client'

import { FC, useEffect } from 'react'

import { Box, LinearProgress } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js'

import { getStripePromise } from '../../stripe'
import useStripeHook from '../hooks/useStripeHook'
import ManagementComponent from './ManagementComponent'
import { ISubscriptionManagement } from './types'

const SubscriptionManagement: FC<ISubscriptionManagement> = ({
  subscriptionId,
  customerId,
  stripePublishableKey,
}) => {
  const { useSetupIntent } = useStripeHook()
  const { mutate: createSetupIntent, data: setupIntent, isPending, isError } = useSetupIntent()

  useEffect(() => {
    if (customerId) {
      createSetupIntent(customerId)
    }
  }, [createSetupIntent])

  const handleSetupSuccess = () => {
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
      />
    </Elements>
  )
}
export default SubscriptionManagement
