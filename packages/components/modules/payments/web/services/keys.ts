import { QueryKey } from '@tanstack/react-query'

export const PAYMENT_METHOD_API_KEY = {
  default: ['paymentMethod'] as QueryKey,
  get: (...params: string[]) => [...PAYMENT_METHOD_API_KEY.default, ...params] as QueryKey,
}

export const PRODUCT_API_KEY = {
  default: ['product'] as QueryKey,
  get: (...params: string[]) => [...PRODUCT_API_KEY.default, ...params] as QueryKey,
}

export const CONFIRM_CARD_PAYMENT_API_KEY = {
  default: ['confirmCardPayment'] as QueryKey,
  get: (...params: string[]) => [...CONFIRM_CARD_PAYMENT_API_KEY.default, ...params] as QueryKey,
}

export const CUSTOMER_API_KEY = {
  default: ['useGetCustomer'] as QueryKey,
  get: (...params: string[]) => [...CUSTOMER_API_KEY.default, ...params] as QueryKey,
}
