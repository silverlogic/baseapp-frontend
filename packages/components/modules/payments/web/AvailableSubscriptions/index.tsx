'use client'

import { useState } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useRouter } from 'next/navigation'

import useStripeHook from '../hooks/useStripeHook'
import SubscriptionCard from './components/SubscriptionCard'

const AvailableSubscriptions = () => {
  const [selectedTerm, setSelectedTerm] = useState<'monthly' | 'yearly'>('monthly')

  const { useListProducts, useGetCustomer } = useStripeHook()
  const { data: products, isLoading: isLoadingProducts } = useListProducts()
  const { data: customer, isLoading: isLoadingCustomer } = useGetCustomer()
  const smDown = useResponsive('down', 'sm')
  const router = useRouter()

  const monthlySubs = products?.filter(
    (product) => product.defaultPrice?.recurring?.interval === 'month',
  )
  const yearlySubs = products?.filter(
    (product) => product.defaultPrice?.recurring?.interval === 'year',
  )
  const selectedProducts = selectedTerm === 'monthly' ? monthlySubs : yearlySubs

  if (isLoadingProducts || isLoadingCustomer) {
    return <LoadingState />
  }

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        <ToggleButtonGroup
          value={selectedTerm}
          onChange={(event, value) => setSelectedTerm(value)}
          exclusive
          color="primary"
          sx={{
            border: 'none',
          }}
        >
          {monthlySubs?.length && monthlySubs?.length > 0 && (
            <ToggleButton value="monthly">Monthly</ToggleButton>
          )}
          {yearlySubs?.length && yearlySubs?.length > 0 && (
            <ToggleButton value="yearly">Yearly</ToggleButton>
          )}
        </ToggleButtonGroup>
      </Box>
      <Box
        display="flex"
        gap={2}
        width="100%"
        height="100%"
        flexWrap="wrap"
        justifyContent="center"
      >
        {selectedProducts?.map((product) => {
          const isActive = customer?.subscriptions?.find(
            (subscription) =>
              subscription.status === 'active' && subscription.productsIds.includes(product.id),
          )
          return (
            <SubscriptionCard
              key={product.id}
              sub={product}
              isActive={!!isActive}
              smDown={smDown}
              selectedTerm={selectedTerm}
              onManageClick={() => router.push('/user/settings?tab=subscription')}
              onSubscribeClick={() => router.push(`/subscriptions/checkout?product=${product.id}`)}
            />
          )
        })}
      </Box>
    </>
  )
}

export default AvailableSubscriptions
