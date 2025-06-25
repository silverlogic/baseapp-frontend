import { DjangoPaginatedResponse, axios } from '@baseapp-frontend/utils'

import {
  CreateSubscriptionOptions,
  IProduct,
  ISetupIntent,
  ISubscription,
  StripePaymentMethod,
} from '../types'
import { Invoice, SubscriptionRequestBody } from '../types/stripe'

const baseUrl = '/payments'

class StripeApi {
  static createSetupIntent = (customerId: string): Promise<ISetupIntent> =>
    axios.post(`${baseUrl}/stripe/payment-methods`, {
      customer_id: customerId,
    })

  static getPaymentMethod = (customerId: string): Promise<StripePaymentMethod[]> =>
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
      ...(paymentMethodId && { payment_method_id: paymentMethodId }),
      ...(allowIncomplete !== undefined && { allow_incomplete: allowIncomplete }),
      ...(billingDetails && { billing_details: billingDetails }),
    }

    return axios.post(`${baseUrl}/stripe/subscriptions`, requestBody)
  }

  static listInvoices = (page: number): Promise<DjangoPaginatedResponse<Invoice>> =>
    axios.get(`${baseUrl}/stripe/invoices`, { params: { page } })
}

export default StripeApi
