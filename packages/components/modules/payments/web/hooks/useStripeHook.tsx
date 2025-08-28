import { useNotification } from '@baseapp-frontend/utils'

import { Stripe } from '@stripe/stripe-js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { CONFIRM_CARD_PAYMENT_API_KEY, PRODUCT_API_KEY } from '../services/keys'
import StripeApi from '../services/stripe'
import { CreateSubscriptionOptions } from '../types'

const useStripeHook = () => {
  const { sendToast } = useNotification()
  const queryClient = useQueryClient()

  const useGetCustomer = () =>
    useQuery({
      queryKey: ['useGetCustomer'],
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
          customer_id: customerId,
          default_payment_method_id: defaultPaymentMethodId,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PRODUCT_API_KEY.get() })
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
        queryClient.invalidateQueries({ queryKey: PRODUCT_API_KEY.get() })
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

  const useListProducts = () =>
    useQuery({
      queryKey: ['products'],
      queryFn: () => StripeApi.listProducts(),
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

  return {
    useGetCustomer,
    useCreateCustomer,
    useListPaymentMethods,
    useUpdatePaymentMethod,
    useDeletePaymentMethod,
    useSetupIntent,
    useConfirmCardPayment,
    useGetProduct,
    useListProducts,
    useCreationSubscription,
  }
}

export default useStripeHook
