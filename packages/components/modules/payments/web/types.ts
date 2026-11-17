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
  quantity?: number
  /** `subscription` for a plan's line, `invoiceitem` for an item added to the invoice. */
  type?: 'subscription' | 'invoiceitem' | string
}

export interface Invoice {
  id: string
  amountDue: number
  status: string
  webhooksDeliveredAt: string
  hostedInvoiceUrl: string
  lines: InvoiceLines[]
}

export type PurchaseStatus = 'pending' | 'paid' | 'failed'

export interface PurchaseLine {
  productId: string
  priceId: string
  description: string
  /** Minor units of the purchase's currency, as every amount below. */
  unitAmount: number
  quantity: number
  amount: number
}

export interface Purchase {
  id: number
  /** Turns `paid` or `failed` only once Stripe's webhook arrives, so it can lag the payment. */
  status: PurchaseStatus
  currency: string
  subtotal: number
  tax: number
  total: number
  invoiceId: string | null
  created: string
  paidAt: string | null
  failedAt: string | null
  lines: PurchaseLine[]
}

export interface CreatedPurchase extends Purchase {
  /** Confirms the invoice's payment in the browser; only returned on creation. */
  clientSecret: string
}

export interface PurchaseItem {
  productId: string
  quantity: number
  /** The price the buyer saw. The server rejects the purchase if it no longer matches. */
  unitAmount?: number
}

export interface CreatePurchaseOptions {
  entityId: string
  items: PurchaseItem[]
  /** A saved card of the customer, confirmed in the browser with the returned client secret. */
  paymentMethodId?: string
}
