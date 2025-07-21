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

interface MarketingFeatures {
  name: string
}

export interface Price {
  id: string
  unitAmount: number
  currency?: string
  locale?: string
}

export interface Product {
  id: string
  name: string
  images: string[]
  description: string
  defaultPrice: Price
  marketingFeatures?: MarketingFeatures[]
}

interface Plan {
  product: string
  amount: number
}

interface Items {
  data: {
    currentPeriodEnd: number
  }[]
}

export interface Subscription {
  id: string
  clientSecret?: string
  defaultPaymentMethod?: string
  remoteCustomerId: string
  invoiceId: string
  plan?: Plan
  status: string
  items?: Items
}

export interface CreateSubscriptionOptions {
  entityId: number
  priceId: string
  paymentMethodId?: string
  allowIncomplete?: boolean
  billingDetails?: BillingDetails
}

export interface SubscriptionRequestBody {
  entityId: number
  priceId: string
  paymentMethodId?: string
  allowIncomplete?: boolean
  billingDetails?: CreateSubscriptionOptions['billingDetails']
}

export type UpdatePaymentMethodRequestBody = Partial<PaymentMethod> & {
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
