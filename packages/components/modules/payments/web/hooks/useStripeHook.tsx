import { useNotification } from '@baseapp-frontend/utils'

import { Stripe } from '@stripe/stripe-js'
import { useMutation, useQuery } from '@tanstack/react-query'

import {
  CONFIRM_CARD_PAYMENT_API_KEY,
  PAYMENT_METHOD_API_KEY,
  PRODUCT_API_KEY,
} from '../services/keys'
import StripeApi from '../services/stripe'
import { CreateSubscriptionOptions } from '../types'

const useStripeHook = () => {
  const { sendToast } = useNotification()

  const useSetupIntent = (customerId?: string) =>
    useMutation({
      mutationFn: (id: string = customerId || '') => StripeApi.createSetupIntent(id),
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
      },
      mutationKey: ['useSetupIntent', customerId],
    })

  const useGetPaymentMethod = (customerId: string) =>
    useQuery({
      queryKey: [PAYMENT_METHOD_API_KEY.get(), customerId],
      queryFn: () => StripeApi.getPaymentMethod(customerId),
      enabled: !!customerId,
    })

  const useGetProduct = (customerId: string) =>
    useQuery({
      queryKey: [PRODUCT_API_KEY.get(), customerId],
      queryFn: () => StripeApi.getProduct(customerId),
      enabled: !!customerId,
    })

  const useCreationSubscription = () =>
    useMutation({
      mutationFn: (options: CreateSubscriptionOptions) =>
        StripeApi.createSubscription(options),
      onError: (error) => {
        sendToast(`Failed to create subscription: ${error.message}`, { type: 'error' })
      },
      mutationKey: ['useCreationSubscription'],
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

  const useListInvoices = ({ page = 1 }) =>
    useQuery({
      queryKey: ['useListInvoices'],
      queryFn: () => StripeApi.listInvoices(page),
    })

  return {
    useGetPaymentMethod,
    useSetupIntent,
    useGetProduct,
    useCreationSubscription,
    useConfirmCardPayment,
    useListInvoices,
  }
}

export default useStripeHook
