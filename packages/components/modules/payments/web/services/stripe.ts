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
} from '../types'

const baseUrl = '/payments'

class StripeApi {
  static getCustomer = (entityId?: number): Promise<Customer> =>
    axios.get(`${baseUrl}/stripe/customers/${entityId ?? 'me'}`)

  static createCustomer = (): Promise<Customer> => axios.post(`${baseUrl}/stripe/customers`)

  static createSetupIntent = (entityId: number): Promise<SetupIntent> =>
    axios.post(`${baseUrl}/stripe/customers/${entityId}/payment-methods`)

  static listPaymentMethods = (entityId: number): Promise<PaymentMethod[]> =>
    axios.get(`${baseUrl}/stripe/customers/${entityId}/payment-methods`)

  static updatePaymentMethod = (
    entityId: number,
    paymentMethodId: string,
    payload: UpdatePaymentMethodRequestBody,
  ): Promise<PaymentMethod> =>
    axios.put(`${baseUrl}/stripe/customers/${entityId}/payment-methods/${paymentMethodId}`, payload)

  static deletePaymentMethod = (
    entityId: number,
    paymentMethodId: string,
    isDefault: boolean,
  ): Promise<void> =>
    axios.delete(`${baseUrl}/stripe/customers/${entityId}/payment-methods/${paymentMethodId}`, {
      params: { isDefault },
    })

  static listInvoices = (
    page: number,
    entityId?: number,
  ): Promise<DjangoPaginatedResponse<Invoice>> =>
    axios.get(`${baseUrl}/stripe/customers/${entityId ?? 'me'}/list-invoices`, { params: { page } })

  static getProduct = (productId: string): Promise<Product> =>
    axios.get(`${baseUrl}/stripe/products`, { params: { productId } })

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

    return axios.post(`${baseUrl}/stripe/subscriptions`, requestBody)
  }

  static getSubscription = (subscriptionId: string): Promise<Subscription> =>
    axios.get(`${baseUrl}/stripe/subscriptions/${subscriptionId}`, {})

  static cancelSubscription = (subscriptionId: string): Promise<void> =>
    axios.delete(`${baseUrl}/stripe/subscriptions/${subscriptionId}`)

  static updateSubscription = (
    subscriptionId: string,
    updateData: Partial<Subscription>,
  ): Promise<Subscription> =>
    axios.patch(`${baseUrl}/stripe/subscriptions/${subscriptionId}`, updateData)
}

export default StripeApi
