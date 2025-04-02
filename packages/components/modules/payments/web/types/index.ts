export interface ISetupIntent {
  clientSecret: string
}

export interface IStripePaymentMethod {
  id: string
  isDefault: boolean
  card?: {
    brand: string
    last4: string
    expMonth: number
    expYear: number
  }
  billingDetails?: {
    address?: {
      line1?: string
      line2?: string
      city?: string
      state?: string
      postalCode?: string
      country?: string
    }
    name?: string
    email?: string
    phone?: string
  }
}

export interface IProduct {
  id: string
  name: string
  images: string[]
  defaultPrice: {
    id: string
    unitAmount: number
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
