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

  const useGetCustomer = (entityId?: number) =>
    useQuery({
      queryKey: [CUSTOMER_API_KEY.get(entityId?.toString() ?? 'me')],
      queryFn: () => StripeApi.getCustomer(entityId),
    })

  const useCreateCustomer = () =>
    useMutation({
      mutationFn: () => StripeApi.createCustomer(),
    })

  const useSetupIntent = (entityId: number) =>
    useMutation({
      mutationFn: (id: number) => StripeApi.createSetupIntent(id),
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
      },
      mutationKey: ['useSetupIntent', entityId],
    })

  const useListPaymentMethods = (entityId: number) =>
    useQuery({
      queryKey: [PAYMENT_METHOD_API_KEY.get(entityId.toString())],
      queryFn: () => StripeApi.listPaymentMethods(entityId),
      enabled: !!entityId,
    })

  const useUpdatePaymentMethod = (options: {
    onSuccess?: () => void
    onError?: (error: any) => void
  }) =>
    useMutation({
      mutationFn: ({
        paymentMethodId,
        entityId,
        defaultPaymentMethodId,
      }: {
        paymentMethodId: string
        entityId: number
        defaultPaymentMethodId?: string
      }) =>
        StripeApi.updatePaymentMethod(entityId, paymentMethodId, {
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
        entityId,
        isDefault,
      }: {
        paymentMethodId: string
        entityId: number
        isDefault: boolean
      }) => StripeApi.deletePaymentMethod(entityId, paymentMethodId, isDefault),
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

  const useListInvoices = ({ page = 1, entityId }: { page?: number; entityId?: number }) =>
    useQuery({
      queryKey: [INVOICE_API_KEY.get(page.toString())],
      queryFn: () => StripeApi.listInvoices(page, entityId),
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
