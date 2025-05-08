export interface BillingDetails {
  name?: string
  email?: string
  phone?: string
  address?: {
    line1?: string
    line2?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
  }
}

export interface ISetupIntent {
  clientSecret: string
}

export interface IStripePaymentMethod {
  id: string
  card?: {
    brand: string
    last4: string
    expMonth: number
    expYear: number
  }
  billingDetails?: BillingDetails
  isDefault?: boolean
}

export interface IProduct {
  id: string
  name: string
  images: string[]
  description: string
  defaultPrice: {
    id: string
    unitAmount: number
    currency: string
    recurring: {
      interval: string
      intervalCount: number
      usageType: string
      aggregateUsage: string
    }
  }
  marketingFeatures?: {
    name: string
  }[]
}

export interface ISubscription {
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
  billingDetails?: {
    name?: string
    address?: {
      line1?: string
      line2?: string
      city?: string
      state?: string
      postalCode?: string
      country?: string
    }
  }
}
