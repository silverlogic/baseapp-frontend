import { BillingDetails, PaymentMethod } from '@stripe/stripe-js'

export interface ICustomer {
  remoteCustomerId: string
  entityType: string
  entityId: number
}

export interface ISetupIntent {
  clientSecret: string
}

export interface IStripePaymentMethod {
  id: string
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

export interface SubscriptionRequestBody {
  remote_customer_id: string
  price_id: string
  payment_method_id?: string
  allow_incomplete?: boolean
  billing_details?: CreateSubscriptionOptions['billingDetails']
}
