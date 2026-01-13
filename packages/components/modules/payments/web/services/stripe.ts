import { DjangoPaginatedResponse, axios } from '@baseapp-frontend/utils'

import { QueryKey } from '@tanstack/react-query'

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

export const STRIPE_API_KEY = {
  default: ['stripe'],
  getCustomer: (entityId?: string) =>
    [...STRIPE_API_KEY.default, 'getCustomer', entityId ?? 'me'] as QueryKey,
  createSetupIntent: (...params: string[]) =>
    [...STRIPE_API_KEY.default, 'createSetupIntent', ...params] as QueryKey,
  listPaymentMethods: (...params: string[]) =>
    [...STRIPE_API_KEY.default, 'listPaymentMethods', ...params] as QueryKey,
  getPaymentMethod: (...params: string[]) =>
    [...STRIPE_API_KEY.default, 'getPaymentMethod', ...params] as QueryKey,
  getProduct: (...params: string[]) =>
    [...STRIPE_API_KEY.default, 'getProduct', ...params] as QueryKey,
  listProducts: () => [...STRIPE_API_KEY.default, 'listProducts'] as QueryKey,
  confirmCardPayment: (...params: string[]) =>
    [...STRIPE_API_KEY.default, 'confirmCardPayment', ...params] as QueryKey,
  getSubscription: (...params: string[]) =>
    [...STRIPE_API_KEY.default, 'getSubscription', ...params] as QueryKey,
  createSubscription: (...params: string[]) =>
    [...STRIPE_API_KEY.default, 'createSubscription', ...params] as QueryKey,
  updateSubscription: (...params: string[]) =>
    [...STRIPE_API_KEY.default, 'updateSubscription', ...params] as QueryKey,
  cancelSubscription: (...params: string[]) =>
    [...STRIPE_API_KEY.default, 'cancelSubscription', ...params] as QueryKey,
  getInvoice: (...params: string[]) =>
    [...STRIPE_API_KEY.default, 'getInvoice', ...params] as QueryKey,
  listInvoices: (...params: string[]) =>
    [...STRIPE_API_KEY.default, 'listInvoices', ...params] as QueryKey,
}

export class StripeApi {
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
