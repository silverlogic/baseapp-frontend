import { BillingDetails, PaymentMethod as StripePaymentMethod } from '@stripe/stripe-js'

export interface SimplifiedCustomerSubscription {
  id: string
  status: string
  productsIds: string[]
}

export interface Customer {
  remoteCustomerId: string
  entityType: string
  entityId: number
  subscriptions: SimplifiedCustomerSubscription[]
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

interface MarketingFeatures {
  name: string
}

export interface Price {
  id: string
  unitAmount: number
  currency?: string
  locale?: string
  recurring?: {
    interval: string
  }
}

export interface Product {
  id: string
  name: string
  images: string[]
  description: string
  defaultPrice: Price
  marketingFeatures?: MarketingFeatures[]
}

export interface Subscription {
  id: string
  clientSecret?: string
  defaultPaymentMethod?: string
  status: string
  product?: Product
  currentPeriodEnd?: string
  upcomingInvoice?: {
    amountDue: number
    nextPaymentAttempt: string
  }
}

export interface CreateSubscriptionOptions {
  entityId: string
  priceId: string
  paymentMethodId?: string
  allowIncomplete?: boolean
  billingDetails?: BillingDetails
}

export interface UpdateSubscriptionOptions {
  priceId?: string
  paymentMethodId?: string
  billingDetails?: BillingDetails
  defaultPaymentMethod?: string
}

export interface SubscriptionRequestBody {
  entityId: string
  priceId: string
  paymentMethodId?: string
  allowIncomplete?: boolean
  billingDetails?: CreateSubscriptionOptions['billingDetails']
}

export type UpdatePaymentMethodRequestBody = Partial<PaymentMethod> & {
  paymentMethodId?: string
  defaultPaymentMethodId?: string
}

export interface InvoiceLines {
  description: string
  amount: number
}

export interface Invoice {
  id: string
  amountDue: number
  status: string
  webhooksDeliveredAt: string
  hostedInvoiceUrl: string
  lines: InvoiceLines[]
}
