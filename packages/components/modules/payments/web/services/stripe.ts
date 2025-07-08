import { axios } from '@baseapp-frontend/utils'

import {
  CreateSubscriptionOptions,
  Customer,
  PaymentMethod,
  Product,
  SetupIntent,
  Subscription,
} from '../types'
import { SubscriptionRequestBody, UpdatePaymentMethodRequestBody } from './types'

const baseUrl = '/payments'

class StripeApi {
  static getCustomer = (userId?: string): Promise<Customer> =>
    axios.get(`${baseUrl}/stripe/customers/${userId ?? 'me'}`)

  static createCustomer = (userId?: string): Promise<Customer> =>
    axios.post(`${baseUrl}/stripe/customers`, {
      ...(userId && { userId }),
    })

  static createSetupIntent = (customerId: string): Promise<SetupIntent> =>
    axios.post(`${baseUrl}/stripe/payment-methods`, {
      customerId,
    })

  static listPaymentMethods = (customerId: string): Promise<PaymentMethod[]> =>
    axios.get(`${baseUrl}/stripe/payment-methods?customer_id=${customerId}`)

  static updatePaymentMethod = (
    paymentMethodId: string,
    payload: UpdatePaymentMethodRequestBody,
  ): Promise<PaymentMethod> =>
    axios.put(`${baseUrl}/stripe/payment-methods/${paymentMethodId}`, payload)

  static deletePaymentMethod = (
    paymentMethodId: string,
    customerId: string,
    isDefault: boolean,
  ): Promise<void> =>
    axios.delete(`${baseUrl}/stripe/payment-methods/${paymentMethodId}`, {
      params: { customerId, isDefault },
    })

  static getProduct = (productId: string): Promise<Product> =>
    axios.get(`${baseUrl}/stripe/products/${productId}`)

  static createSubscription = ({
    customerId,
    priceId,
    paymentMethodId,
    allowIncomplete,
    billingDetails,
  }: CreateSubscriptionOptions): Promise<Subscription> => {
    const requestBody: SubscriptionRequestBody = {
      remoteCustomerId: customerId,
      priceId,
      ...(paymentMethodId && { paymentMethodId }),
      ...(allowIncomplete !== undefined && { allowIncomplete }),
      ...(billingDetails && { billingDetails }),
    }

    return axios.post(`${baseUrl}/stripe/subscriptions`, requestBody)
  }

  static getSubscription = (subscriptionId: string): Promise<Subscription> =>
    axios.get(`${baseUrl}/stripe/subscriptions/${subscriptionId}`, {})

  static cancelSubscription = (subscriptionId: string): Promise<void> =>
    axios.delete(`${baseUrl}/stripe/subscriptions`, {
      params: {
        remoteSubscriptionId: subscriptionId,
      },
    })

  static updateSubscription = (
    subscriptionId: string,
    updateData: Partial<Subscription>,
  ): Promise<Subscription> =>
    axios.patch(`${baseUrl}/stripe/subscriptions/${subscriptionId}`, updateData)
}

export default StripeApi
