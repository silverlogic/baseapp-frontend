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

export const SUBSCRIPTION_API_KEY = {
  default: ['useGetSubscription'] as QueryKey,
  get: (...params: string[]) => [...SUBSCRIPTION_API_KEY.default, ...params] as QueryKey,
}
export const CREATION_SUBSCRIPTION_API_KEY = {
  default: ['useCreationSubscription'] as QueryKey,
  get: (...params: string[]) => [...CREATION_SUBSCRIPTION_API_KEY.default, ...params] as QueryKey,
}

export const UPDATE_SUBSCRIPTION_API_KEY = {
  default: ['useCreationSubscription'] as QueryKey,
  get: (...params: string[]) => [...UPDATE_SUBSCRIPTION_API_KEY.default, ...params] as QueryKey,
}
export const CANCEL_SUBSCRIPTION_API_KEY = {
  default: ['useCancelSubscription'] as QueryKey,
  get: (...params: string[]) => [...CANCEL_SUBSCRIPTION_API_KEY.default, ...params] as QueryKey,
}
export const SETUP_INTENT_API_KEY = {
  default: ['useSetupIntent'] as QueryKey,
  get: (...params: string[]) => [...SETUP_INTENT_API_KEY.default, ...params] as QueryKey,
}
