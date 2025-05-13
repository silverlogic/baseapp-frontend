import { axios } from '@baseapp-frontend/utils'

import {
  CreateSubscriptionOptions,
  ICustomer,
  IProduct,
  ISetupIntent,
  IStripePaymentMethod,
  ISubscription,
} from '../types'
import { SubscriptionRequestBody, UpdatePaymentMethodRequestBody } from './types'

const baseUrl = '/payments'

class StripeApi {
  static getCustomer = (userId?: string): Promise<ICustomer> =>
    axios.get(`${baseUrl}/stripe/customers/${userId ?? 'me'}`)

  static createCustomer = (userId?: string): Promise<ICustomer> =>
    axios.post(`${baseUrl}/stripe/customers`, {
      ...(userId && { user_id: userId }),
    })

  static createSetupIntent = (customerId: string): Promise<ISetupIntent> =>
    axios.post(`${baseUrl}/stripe/payment-methods`, {
      customer_id: customerId,
    })

  static listPaymentMethods = (customerId: string): Promise<IStripePaymentMethod[]> =>
    axios.get(`${baseUrl}/stripe/payment-methods?customer_id=${customerId}`)

  static updatePaymentMethod = (
    paymentMethodId: string,
    payload: UpdatePaymentMethodRequestBody,
  ): Promise<IStripePaymentMethod> =>
    axios.put(`${baseUrl}/stripe/payment-methods/${paymentMethodId}`, payload)

  static deletePaymentMethod = (
    paymentMethodId: string,
    customerId: string,
    isDefault: boolean,
  ): Promise<void> =>
    axios.delete(`${baseUrl}/stripe/payment-methods/${paymentMethodId}`, {
      params: { customer_id: customerId, is_default: isDefault },
    })

  static getProduct = (productId: string): Promise<IProduct> =>
    axios.get(`${baseUrl}/stripe/products/${productId}`)

  static createSubscription = ({
    customerId,
    priceId,
    paymentMethodId,
    allowIncomplete,
    billingDetails,
  }: CreateSubscriptionOptions): Promise<ISubscription> => {
    const requestBody: SubscriptionRequestBody = {
      remote_customer_id: customerId,
      price_id: priceId,
      ...(paymentMethodId && { payment_method_id: paymentMethodId }),
      ...(allowIncomplete !== undefined && { allow_incomplete: allowIncomplete }),
      ...(billingDetails && { billing_details: billingDetails }),
    }

    return axios.post(`${baseUrl}/stripe/subscriptions`, requestBody)
  }
}

export default StripeApi
