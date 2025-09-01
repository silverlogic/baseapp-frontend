import { DjangoPaginatedResponse, axios } from '@baseapp-frontend/utils'

import {
  CreateSubscriptionOptions,
  Customer,
  Invoice,
  PaymentMethod,
  Product,
  SetupIntent,
  Subscription,
  SubscriptionRequestBody,
  UpdatePaymentMethodRequestBody,
  UpdateSubscriptionOptions,
} from '../types'

const baseUrl = '/payments'

class StripeApi {
  static getCustomer = (entityId?: string): Promise<Customer> =>
    axios.get(`${baseUrl}/stripe/customers/${entityId ?? 'me'}`)

  static createCustomer = (entityId?: string): Promise<Customer> =>
    axios.post(`${baseUrl}/stripe/customers/`, { entityId })

  static createSetupIntent = (entityId: string): Promise<SetupIntent> =>
    axios.post(`${baseUrl}/stripe/customers/${entityId}/payment-methods/`)

  static listPaymentMethods = (entityId?: string): Promise<PaymentMethod[]> =>
    axios.get(`${baseUrl}/stripe/customers/${entityId ?? 'me'}/payment-methods`)

  static updatePaymentMethod = (
    entityId: string,
    paymentMethodId: string,
    payload: UpdatePaymentMethodRequestBody,
  ): Promise<PaymentMethod> =>
    axios.put(
      `${baseUrl}/stripe/customers/${entityId}/payment-methods/${paymentMethodId}/`,
      payload,
    )

  static deletePaymentMethod = (
    entityId: string,
    paymentMethodId: string,
    isDefault: boolean,
  ): Promise<void> =>
    axios.delete(`${baseUrl}/stripe/customers/${entityId}/payment-methods/${paymentMethodId}/`, {
      params: { isDefault },
    })

  static listInvoices = (
    page: number,
    entityId?: string,
  ): Promise<DjangoPaginatedResponse<Invoice>> =>
    axios.get(`${baseUrl}/stripe/customers/${entityId ?? 'me'}/invoices`, {
      params: { page },
    })

  static listProducts = (): Promise<Product[]> => axios.get(`${baseUrl}/stripe/products`)

  static getProduct = (productId: string): Promise<Product> =>
    axios.get(`${baseUrl}/stripe/products/${productId}`)

  static createSubscription = ({
    entityId,
    priceId,
    paymentMethodId,
    allowIncomplete,
    billingDetails,
  }: CreateSubscriptionOptions): Promise<Subscription> => {
    const requestBody: SubscriptionRequestBody = {
      entityId,
      priceId,
      ...(paymentMethodId && { paymentMethodId }),
      ...(allowIncomplete !== undefined && { allowIncomplete }),
      ...(billingDetails && { billingDetails }),
    }

    return axios.post(`${baseUrl}/stripe/subscriptions/`, requestBody)
  }

  static getSubscription = (subscriptionId: string): Promise<Subscription> =>
    axios.get(`${baseUrl}/stripe/subscriptions/${subscriptionId}`, {})

  static cancelSubscription = (subscriptionId: string): Promise<void> =>
    axios.delete(`${baseUrl}/stripe/subscriptions/${subscriptionId}/`)

  static updateSubscription = (
    subscriptionId: string,
    updateData: UpdateSubscriptionOptions,
  ): Promise<Subscription> =>
    axios.patch(`${baseUrl}/stripe/subscriptions/${subscriptionId}/`, updateData)
}

export default StripeApi
