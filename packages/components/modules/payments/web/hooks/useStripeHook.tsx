import { useNotification } from '@baseapp-frontend/utils'

import { Stripe } from '@stripe/stripe-js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  CONFIRM_CARD_PAYMENT_API_KEY,
  CUSTOMER_API_KEY,
  INVOICE_API_KEY,
  PAYMENT_METHOD_API_KEY,
  PRODUCT_API_KEY,
} from '../services/keys'
import StripeApi from '../services/stripe'
import { CreateSubscriptionOptions } from '../types'

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
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
      },
      mutationKey: ['useSetupIntent', customerId],
    })

  const useListPaymentMethods = (customerId: string) =>
    useQuery({
      queryKey: [PAYMENT_METHOD_API_KEY.get(customerId)],
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
      queryKey: [PRODUCT_API_KEY.get(customerId)],
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

  const useListInvoices = ({ page = 1 }) =>
    useQuery({
      queryKey: [INVOICE_API_KEY.get(page.toString())],
      queryFn: () => StripeApi.listInvoices(page),
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
    useListInvoices,
  }
}

export default useStripeHook
