'use client'

import { FC, useState } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { CHECKOUT_URL } from '../constants'
import useStripeHook from '../hooks/useStripeHook'
import SubscriptionCard from './SubscriptionCard'
import { AvailableSubscriptionsProps } from './types'

const AvailableSubscriptions: FC<AvailableSubscriptionsProps> = ({
  manageSubscriptionUrl = '/user/settings?tab=subscription',
}) => {
  const [selectedTerm, setSelectedTerm] = useState<'monthly' | 'yearly'>('monthly')

  const { useListProducts, useGetCustomer } = useStripeHook()
  const { data: products, isLoading: isLoadingProducts } = useListProducts()
  const { data: customer, isLoading: isLoadingCustomer } = useGetCustomer()
  const smDown = useResponsive('down', 'sm')

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
            <ToggleButton value="monthly">
              <FormattedMessage id="payments.plans.monthly" defaultMessage="Monthly" />
            </ToggleButton>
          )}
          {yearlySubs?.length && yearlySubs?.length > 0 && (
            <ToggleButton value="yearly">
              <FormattedMessage id="payments.plans.yearly" defaultMessage="Yearly" />
            </ToggleButton>
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
              manageHref={manageSubscriptionUrl}
              subscribeHref={`${CHECKOUT_URL}?productId=${product.id}`}
            />
          )
        })}
      </Box>
    </>
  )
}

export default AvailableSubscriptions
