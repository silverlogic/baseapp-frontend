import { useState } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useRouter } from 'next/router'

import useStripeHook from '../hooks/useStripeHook'
import { IProduct } from '../types'
import SubscriptionCard from './SubscriptionCard'

const AvailableSubscriptions = () => {
  const [selectedTerm, setSelectedTerm] = useState<'monthly' | 'yearly'>('monthly')

  const { useListProducts } = useStripeHook()
  const { data: products, isLoading: isLoadingProducts } = useListProducts()
  const smDown = useResponsive('down', 'sm')
  const router = useRouter()

  const monthlySubs = products?.filter((sub) => sub.defaultPrice?.recurring?.interval === 'month')
  const yearlySubs = products?.filter((sub) => sub.defaultPrice?.recurring?.interval === 'year')
  const subs = selectedTerm === 'monthly' ? monthlySubs : yearlySubs
  const isActive = true // TODO: implement this

  if (isLoadingProducts) {
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
      <Box display="flex" gap={2} width="100%" height="100%" flexWrap="wrap">
        {subs?.map((sub) => (
          <SubscriptionCard
            key={sub.id}
            sub={sub as IProduct}
            isActive={isActive}
            smDown={smDown}
            selectedTerm={selectedTerm}
            onClick={() => router.push('/user/settings?tab=subscription')}
          />
        ))}
      </Box>
    </>
  )
}

export default AvailableSubscriptions
