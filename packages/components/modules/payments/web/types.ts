import { BillingDetails, PaymentMethod as StripePaymentMethod } from '@stripe/stripe-js'

export interface Customer {
  remoteCustomerId: string
  entityType: string
  entityId: number
}

export interface SetupIntent {
  clientSecret: string
}

export interface PaymentMethod {
  id: string
  isDefault?: boolean
  card?: StripePaymentMethod.Card & {
    expMonth?: number
    expYear?: number
  }
  billingDetails?: BillingDetails & {
    address?: {
      postalCode?: string
    }
  }
}

export interface Product {
  id: string
  name: string
  images: string[]
  description: string
  defaultPrice: {
    id: string
    unitAmount: number
    currency?: string
    locale?: string
  }
  marketingFeatures?: {
    name: string
  }[]
}

export interface Subscription {
  id: string
  clientSecret?: string
  defaultPaymentMethod?: string
  remoteCustomerId: string
  invoiceId: string
  plan?: {
    product?: string
    amount?: number
  }
  status: string
  items?: {
    data: {
      currentPeriodEnd: number
    }[]
  }
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
