import { useEffect, useRef } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { STRIPE_API_KEY } from '../services/stripe'
import { Customer } from '../types'
import useStripeHook from './useStripeHook'

const useEnsureStripeCustomer = (entityId: string) => {
  const queryClient = useQueryClient()
  // Never reset: a persistent failure would otherwise re-trigger this effect on every
  // `isCreatingCustomer` transition.
  const hasAttemptedCreate = useRef(false)
  const { useGetCustomer, useCreateCustomer } = useStripeHook()
  // Scoped to `entityId`, not the default `me`. The settings pages run this for the
  // profile in the URL, so checking `me` let an existing personal customer suppress
  // creation for a profile that had none, leaving that page permanently on a 404.
  const {
    data: customer,
    isLoading: isLoadingCustomer,
    isFetching: isFetchingCustomer,
  } = useGetCustomer(entityId, { enabled: Boolean(entityId) })
  const { mutate: createCustomerMutation, isPending: isCreatingCustomer } = useCreateCustomer()

  useEffect(() => {
    if (!entityId || isLoadingCustomer || isFetchingCustomer || isCreatingCustomer) return
    if (customer || hasAttemptedCreate.current) return

    hasAttemptedCreate.current = true
    createCustomerMutation(entityId, {
      onSuccess: (createdCustomer: Customer) => {
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
