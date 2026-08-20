import { useEffect, useRef } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { STRIPE_API_KEY } from '../services/stripe'
import { Customer } from '../types'
import useStripeHook from './useStripeHook'

/**
 * Ensures a Stripe customer exists for `entityId`, creating one if the lookup comes back empty and
 * seeding the customer cache with the result so consumers see it without a reload.
 *
 * Both the default (`me`) and entity-scoped cache entries are written: `AvailableSubscriptions`
 * reads `useGetCustomer()` while `CheckoutComponent` and `SubscriptionManagement` read
 * `useGetCustomer(entityId)`.
 */
const useEnsureStripeCustomer = (entityId: string) => {
  const queryClient = useQueryClient()
  // Guards against a second create while the first is in flight. Never reset - a persistent
  // failure would otherwise re-trigger this effect on every `isCreatingCustomer` transition.
  const hasAttemptedCreate = useRef(false)
  const { useGetCustomer, useCreateCustomer } = useStripeHook()
  const {
    data: customer,
    isLoading: isLoadingCustomer,
    isFetching: isFetchingCustomer,
  } = useGetCustomer()
  const { mutate: createCustomerMutation, isPending: isCreatingCustomer } = useCreateCustomer()

  useEffect(() => {
    if (!entityId || isLoadingCustomer || isFetchingCustomer || isCreatingCustomer) return
    if (customer || hasAttemptedCreate.current) return

    hasAttemptedCreate.current = true
    createCustomerMutation(entityId, {
      onSuccess: (createdCustomer: Customer) => {
        queryClient.setQueryData([STRIPE_API_KEY.getCustomer()], createdCustomer)
        queryClient.setQueryData([STRIPE_API_KEY.getCustomer(entityId)], createdCustomer)
        // Anything that ran before the customer existed resolved to a 404, and react-query does not
        // retry a settled error. Without this, `useListPaymentMethods` stays in its error state and
        // CheckoutComponent's `isNotReady` guard keeps the page on a spinner until a manual reload.
        queryClient.invalidateQueries({ queryKey: [STRIPE_API_KEY.default] })
      },
    })
  }, [
    entityId,
    customer,
    isLoadingCustomer,
    isFetchingCustomer,
    isCreatingCustomer,
    createCustomerMutation,
    queryClient,
  ])
}

export default useEnsureStripeCustomer
