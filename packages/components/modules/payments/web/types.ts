import { BillingDetails, PaymentMethod as StripePaymentMethod} from '@stripe/stripe-js'

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
  defaultPrice: {
    id: string
    unitAmount: number
    currency?: string
    locale?: string
  }
}

export interface Subscription {
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

export type UpdatePaymentMethodRequestBody = Partial<PaymentMethod> & {
  customer_id: string
  default_payment_method_id?: string
}

export interface Invoice {
  id: string
  amountDue: number
  status: string
  webhooksDeliveredAt: string
  hostedInvoiceUrl: string
  lines: {
    description: string
    amount: number
  }[]
}
