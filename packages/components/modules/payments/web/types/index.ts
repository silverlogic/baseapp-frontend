import { BillingDetails, PaymentMethod } from '@stripe/stripe-js'

export interface ISetupIntent {
  clientSecret: string
}

export interface StripePaymentMethod extends PaymentMethod {
  isDefault?: boolean
  card?: PaymentMethod.Card & {
    expMonth?: number
    expYear?: number
  }
  billingDetails?: BillingDetails & {
    address?: {
      postalCode?: string
    }
  }
}

export interface IProduct {
  id: string
  name: string
  images: string[]
  defaultPrice: {
    id: string
    unitAmount: number
    currency?: string
    locale?: string
  }
}

export interface ISubscription {
  id: string
  clientSecret?: string
  status: string
}

export interface CreateSubscriptionOptions {
  customerId: string
  priceId: string
  paymentMethodId?: string
  allowIncomplete?: boolean
  billingDetails?: BillingDetails
}
