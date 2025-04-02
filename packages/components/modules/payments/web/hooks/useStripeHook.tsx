import { useNotification } from '@baseapp-frontend/utils'

import { useMutation, useQuery } from '@tanstack/react-query'

import PaymentMethodApi from '../services/stripe'
import { CreateSubscriptionOptions, ISubscription } from '../types'

const useStripeHook = () => {
  const { sendToast } = useNotification()

  const useSetupIntent = (customerId?: string) =>
    useMutation({
      mutationFn: (id: string = customerId || '') => PaymentMethodApi.createSetupIntent(id),
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
      },
      mutationKey: ['useSetupIntent', customerId],
    })

  const useGetPaymentMethod = (customerId: string) =>
    useQuery({
      queryKey: ['useGetPaymentMethod', customerId],
      queryFn: () => PaymentMethodApi.getPaymentMethod(customerId),
      enabled: !!customerId,
    })

  const useGetProduct = (customerId: string) =>
    useQuery({
      queryKey: ['useGetProduct', customerId],
      queryFn: () => PaymentMethodApi.getProduct(customerId),
      enabled: !!customerId,
    })

  const useCreationSubscription = () =>
    useMutation({
      mutationFn: (options: CreateSubscriptionOptions) =>
        PaymentMethodApi.createSubscription(options),
      onSuccess: () => {
        console.log('Subscription created successfully:')
      },
      onError: (error) => {
        sendToast(`Failed to create subscription: ${error.message}`, { type: 'error' })
      },
      mutationKey: ['useCreationSubscription'],
    })

  const useGetSubscription = (subscriptionId: string) =>
    useQuery({
      queryKey: ['useGetSubscription', subscriptionId],
      queryFn: () => PaymentMethodApi.getSubscription(subscriptionId),
      enabled: !!subscriptionId,
    })

  const useCancelSubscription = (subscriptionId: string, refetch: () => void) =>
    useMutation({
      mutationFn: () => PaymentMethodApi.cancelSubscription(subscriptionId),
      onSuccess: () => {
        sendToast('Subscription cancelled successfully.', { type: 'success' })
        refetch()
      },
      onError: () => {
        sendToast(`Failed to cancel subscription`, { type: 'error' })
      },
      mutationKey: ['useCancelSubscription', subscriptionId],
    })

  const useUpdateSubscription = (
    subscriptionId: string,
    refetch: () => void,
    options: {
      onSuccess?: (response: any, variables: Partial<ISubscription>, context: any) => void
      onError?: (error: any, variables: Partial<ISubscription>, context: any) => void
    } = {},
  ) =>
    useMutation({
      mutationFn: (updateData: Partial<ISubscription>) =>
        PaymentMethodApi.updateSubscription(subscriptionId, updateData),
      onSuccess: (response, variables, context) => {
        sendToast('Subscription updated successfully.', { type: 'success' })
        refetch()
        options?.onSuccess?.(response, variables, context)
      },
      onError: (error, variables, context) => {
        sendToast(`Failed to update subscription: ${error.message}`, { type: 'error' })
        options?.onError?.(error, variables, context)
      },
      mutationKey: ['useUpdateSubscription', subscriptionId],
      ...options,
    })

  return {
    useGetPaymentMethod,
    useSetupIntent,
    useGetProduct,
    useCreationSubscription,
    useGetSubscription,
    useCancelSubscription,
    useUpdateSubscription,
  }
}

export default useStripeHook
