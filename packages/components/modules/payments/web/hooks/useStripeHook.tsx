import { useNotification } from '@baseapp-frontend/utils'

import { useMutation, useQuery } from '@tanstack/react-query'

import PaymentMethodApi from '../services/stripe'
import { CreateSubscriptionOptions } from '../types'

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

  return {
    useGetPaymentMethod,
    useSetupIntent,
    useGetProduct,
    useCreationSubscription,
  }
}

export default useStripeHook
