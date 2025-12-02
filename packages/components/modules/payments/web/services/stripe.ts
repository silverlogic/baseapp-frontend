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

export const CUSTOMER_API_KEY = {
  default: ['customer'] as QueryKey,
  get: (...params: string[]) => [...CUSTOMER_API_KEY.default, ...params] as QueryKey,
}

export const PAYMENT_METHOD_API_KEY = {
  default: ['paymentMethod'] as QueryKey,
  get: (...params: string[]) => [...PAYMENT_METHOD_API_KEY.default, ...params] as QueryKey,
  list: (...params: string[]) => [...PAYMENT_METHOD_API_KEY.default, ...params] as QueryKey,
}

export const PRODUCT_API_KEY = {
  default: ['product'] as QueryKey,
  get: (...params: string[]) => [...PRODUCT_API_KEY.default, ...params] as QueryKey,
  list: (...params: string[]) => [...PRODUCT_API_KEY.default, ...params] as QueryKey,
}

export const CONFIRM_CARD_PAYMENT_API_KEY = {
  default: ['confirmCardPayment'] as QueryKey,
  get: (...params: string[]) => [...CONFIRM_CARD_PAYMENT_API_KEY.default, ...params] as QueryKey,
}

export const INVOICE_API_KEY = {
  default: ['invoice'] as QueryKey,
  get: (...params: string[]) => [...INVOICE_API_KEY.default, ...params] as QueryKey,
  list: (...params: string[]) => [...INVOICE_API_KEY.default, ...params] as QueryKey,
}

export const SUBSCRIPTION_API_KEY = {
  default: ['subscription'] as QueryKey,
  get: (...params: string[]) => [...SUBSCRIPTION_API_KEY.default, ...params] as QueryKey,
  create: (...params: string[]) => [...SUBSCRIPTION_API_KEY.default, ...params] as QueryKey,
  update: (...params: string[]) => [...SUBSCRIPTION_API_KEY.default, ...params] as QueryKey,
  cancel: (...params: string[]) => [...SUBSCRIPTION_API_KEY.default, ...params] as QueryKey,
}

// export const CREATION_SUBSCRIPTION_API_KEY = {
//   default: ['useCreateSubscription'] as QueryKey,
//   get: (...params: string[]) => [...CREATION_SUBSCRIPTION_API_KEY.default, ...params] as QueryKey,
// }

// export const UPDATE_SUBSCRIPTION_API_KEY = {
//   default: ['useCreateSubscription'] as QueryKey,
//   get: (...params: string[]) => [...UPDATE_SUBSCRIPTION_API_KEY.default, ...params] as QueryKey,
// }
// export const CANCEL_SUBSCRIPTION_API_KEY = {
//   default: ['useCancelSubscription'] as QueryKey,
//   get: (...params: string[]) => [...CANCEL_SUBSCRIPTION_API_KEY.default, ...params] as QueryKey,
// }

export const SETUP_INTENT_API_KEY = {
  default: ['useSetupIntent'] as QueryKey,
  get: (...params: string[]) => [...SETUP_INTENT_API_KEY.default, ...params] as QueryKey,
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
