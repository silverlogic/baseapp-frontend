import { useNotification } from '@baseapp-frontend/utils'

import { Stripe } from '@stripe/stripe-js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  CONFIRM_CARD_PAYMENT_API_KEY,
  CUSTOMER_API_KEY,
  INVOICE_API_KEY,
  PAYMENT_METHOD_API_KEY,
  PRODUCT_API_KEY,
  SETUP_INTENT_API_KEY,
  SUBSCRIPTION_API_KEY,
  StripeApi,
} from '../services/stripe'
import { CreateSubscriptionOptions, SetupIntent, UpdateSubscriptionOptions } from '../types'

const useStripeHook = () => {
  const { sendToast } = useNotification()
  const queryClient = useQueryClient()

  const useGetCustomer = (entityId?: string) =>
    useQuery({
      queryKey: [CUSTOMER_API_KEY.get(entityId?.toString() ?? 'me')],
      queryFn: () => StripeApi.getCustomer(entityId),
    })

  const useCreateCustomer = () =>
    useMutation({
      mutationFn: (entityId?: string) => StripeApi.createCustomer(entityId),
    })

  const useSetupIntent = (
    entityId: string,
    options: {
      onSuccess?: (setupIntent: SetupIntent) => void
      onError?: (error: any) => void
    } = {},
  ) =>
    useMutation({
      mutationFn: () => StripeApi.createSetupIntent(entityId),
      onSuccess: (setupIntent: SetupIntent) => {
        options.onSuccess?.(setupIntent)
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
        options.onError?.(error)
      },
      mutationKey: [SETUP_INTENT_API_KEY.get(entityId)],
    })

  const useListPaymentMethods = (entityId: string) =>
    useQuery({
      queryKey: [PAYMENT_METHOD_API_KEY.list(entityId.toString())],
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
        entityId: string
        defaultPaymentMethodId?: string
      }) =>
        StripeApi.updatePaymentMethod(entityId, paymentMethodId, {
          defaultPaymentMethodId,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [PAYMENT_METHOD_API_KEY.default] })
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
        entityId: string
        isDefault: boolean
      }) => StripeApi.deletePaymentMethod(entityId, paymentMethodId, isDefault),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [PAYMENT_METHOD_API_KEY.default] })
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

  const useListProducts = () =>
    useQuery({
      queryKey: [PRODUCT_API_KEY.list()],
      queryFn: () => StripeApi.listProducts(),
    })

  const useGetProduct = (productId: string) =>
    useQuery({
      queryKey: [PRODUCT_API_KEY.get(productId)],
      queryFn: () => StripeApi.getProduct(productId),
      enabled: !!productId,
    })

  const useCreateSubscription = () =>
    useMutation({
      mutationFn: (options: CreateSubscriptionOptions) => StripeApi.createSubscription(options),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CUSTOMER_API_KEY.default, SUBSCRIPTION_API_KEY.default],
        })
      },
      mutationKey: [SUBSCRIPTION_API_KEY.create()],
    })

  const useGetSubscription = (subscriptionId: string) =>
    useQuery({
      queryKey: [SUBSCRIPTION_API_KEY.get(subscriptionId)],
      queryFn: () => StripeApi.getSubscription(subscriptionId),
      enabled: !!subscriptionId,
    })

  const useUpdateSubscription = (
    subscriptionId: string,
    options: {
      onSuccess?: () => void
      onError?: (error: any) => void
    } = {},
  ) =>
    useMutation({
      mutationFn: (updateData: UpdateSubscriptionOptions) =>
        StripeApi.updateSubscription(subscriptionId, updateData),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CUSTOMER_API_KEY.get(), SUBSCRIPTION_API_KEY.get()],
        })
        options?.onSuccess?.()
      },
      onError: (error) => {
        options?.onError?.(error)
      },
      mutationKey: [SUBSCRIPTION_API_KEY.update(subscriptionId)],
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
      mutationKey: [SUBSCRIPTION_API_KEY.cancel(subscriptionId)],
    })

  const useListInvoices = ({ page = 1, entityId }: { page?: number; entityId?: string }) =>
    useQuery({
      queryKey: [INVOICE_API_KEY.list(page.toString())],
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
    useListProducts,
    useGetProduct,
    useCreateSubscription,
    useGetSubscription,
    useCancelSubscription,
    useUpdateSubscription,
    useListInvoices,
  }
}

export default useStripeHook
