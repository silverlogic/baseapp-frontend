import { axios } from '@baseapp-frontend/utils'

import {
  CreateSubscriptionOptions,
  IProduct,
  ISetupIntent,
  IStripePaymentMethod,
  ISubscription,
} from '../types'
import { SubscriptionRequestBody } from './types'

const baseUrl = '/payments'

class StripeApi {
  static createSetupIntent = (customerId: string): Promise<ISetupIntent> =>
    axios.post(`${baseUrl}/stripe/payment-methods`, {
      customer_id: customerId,
    })

  static getPaymentMethod = (customerId: string): Promise<IStripePaymentMethod[]> =>
    axios.get(`${baseUrl}/stripe/payment-methods?customer_id=${customerId}`, {})

  static getProduct = (productId: string): Promise<IProduct> =>
    axios.get(`${baseUrl}/stripe/products/${productId}`, {})

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
    }
    if (paymentMethodId) {
      requestBody.payment_method_id = paymentMethodId
    }

    if (allowIncomplete !== undefined) {
      requestBody.allow_incomplete = allowIncomplete
    }

    if (billingDetails) {
      requestBody.billing_details = billingDetails
    }

    return axios.post(`${baseUrl}/stripe/subscriptions`, requestBody)
  }
}

export default StripeApi
