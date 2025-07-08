import { useNotification } from '@baseapp-frontend/utils'

import { Stripe } from '@stripe/stripe-js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  CONFIRM_CARD_PAYMENT_API_KEY,
  CUSTOMER_API_KEY,
  PAYMENT_METHOD_API_KEY,
} from '../services/keys'
import StripeApi from '../services/stripe'
import { CreateSubscriptionOptions, Subscription } from '../types'

const useStripeHook = () => {
  const { sendToast } = useNotification()
  const queryClient = useQueryClient()

  const useGetCustomer = () =>
    useQuery({
      queryKey: [CUSTOMER_API_KEY.get()],
      queryFn: () => StripeApi.getCustomer(),
    })

  const useCreateCustomer = () =>
    useMutation({
      mutationFn: (userId?: string) => StripeApi.createCustomer(userId),
    })

  const useSetupIntent = (customerId?: string) =>
    useMutation({
      mutationFn: (id: string = customerId || '') => StripeApi.createSetupIntent(id),
      onSuccess: () => {
        console.log('Setup intent created successfully:')
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
      },
      mutationKey: ['useSetupIntent', customerId],
    })

  const useListPaymentMethods = (customerId: string) =>
    useQuery({
      queryKey: ['listPaymentMethods', customerId],
      queryFn: () => StripeApi.listPaymentMethods(customerId),
      enabled: !!customerId,
    })

  const useUpdatePaymentMethod = (options: {
    onSuccess?: () => void
    onError?: (error: any) => void
  }) =>
    useMutation({
      mutationFn: ({
        paymentMethodId,
        customerId,
        defaultPaymentMethodId,
      }: {
        paymentMethodId: string
        customerId: string
        defaultPaymentMethodId?: string
      }) =>
        StripeApi.updatePaymentMethod(paymentMethodId, {
          customerId,
          defaultPaymentMethodId,
        }),
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({
          queryKey: [PAYMENT_METHOD_API_KEY.get(), variables.customerId],
        })
        options.onSuccess?.()
      },
      onError: (error) => {
        options.onError?.(error)
      },
    })

  const useDeletePaymentMethod = (options: {
    onSuccess?: () => void
    onError?: (error: any) => void
  }) =>
    useMutation({
      mutationFn: ({
        paymentMethodId,
        customerId,
        isDefault,
      }: {
        paymentMethodId: string
        customerId: string
        isDefault: boolean
      }) => StripeApi.deletePaymentMethod(paymentMethodId, customerId, isDefault),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PAYMENT_METHOD_API_KEY.get() })
        options.onSuccess?.()
      },
      onError: (error) => {
        options.onError?.(error)
      },
    })

  const useConfirmCardPayment = (stripe: Stripe | null) =>
    useMutation({
      mutationFn: async ({
        clientSecret,
        paymentMethodId,
      }: {
        clientSecret: string
        paymentMethodId: string
      }) => {
        if (!stripe) {
          throw new Error('Stripe is not initialized.')
        }
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethodId,
        })
        if (result.error) {
          throw new Error(result.error.message || 'Failed to confirm card payment.')
        }
        return result.paymentIntent
      },
      onError: (error) => {
        sendToast(`Failed to confirm card payment: ${error.message}`, { type: 'error' })
      },
      mutationKey: [CONFIRM_CARD_PAYMENT_API_KEY.get()],
    })

  const useGetProduct = (customerId: string) =>
    useQuery({
      queryKey: ['useGetProduct', customerId],
      queryFn: () => StripeApi.getProduct(customerId),
      enabled: !!customerId,
    })

  const useCreationSubscription = () =>
    useMutation({
      mutationFn: (options: CreateSubscriptionOptions) => StripeApi.createSubscription(options),
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
      queryFn: () => StripeApi.getSubscription(subscriptionId),
      enabled: !!subscriptionId,
    })

  const useCancelSubscription = (subscriptionId: string, refetch: () => void) =>
    useMutation({
      mutationFn: () => StripeApi.cancelSubscription(subscriptionId),
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
      onSuccess?: (response: any, variables: Partial<Subscription>, context: any) => void
      onError?: (error: any, variables: Partial<Subscription>, context: any) => void
    } = {},
  ) =>
    useMutation({
      mutationFn: (updateData: Partial<Subscription>) =>
        StripeApi.updateSubscription(subscriptionId, updateData),
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ['listPaymentMethods'] })

        sendToast('Subscription updated successfully.', { type: 'success' })
        refetch()
        options?.onSuccess?.(response, variables, context)
      },
      onError: (error, variables, context) => {
        sendToast(`Failed to update subscription: ${error.message}`, { type: 'error' })
        options?.onError?.(error, variables, context)
      },
      mutationKey: ['useUpdateSubscription', subscriptionId],
    })

  return {
    useGetCustomer,
    useCreateCustomer,
    useListPaymentMethods,
    useUpdatePaymentMethod,
    useDeletePaymentMethod,
    useSetupIntent,
    useConfirmCardPayment,
    useGetProduct,
    useCreationSubscription,
    useGetSubscription,
    useCancelSubscription,
    useUpdateSubscription,
  }
}

export default useStripeHook
