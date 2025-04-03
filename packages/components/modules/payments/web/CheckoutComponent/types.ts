import { IProduct, IStripePaymentMethod } from '../types'

export interface CheckoutComponentProps {
  paymentMethods: IStripePaymentMethod[]
  product: IProduct
  setupClientSecret: string
  onPaymentSuccess?: (subscriptionId: string) => void
  onPaymentError?: (error: string) => void
}

export interface BillingDetails {
  name?: string
  address?: {
    line1?: string
    line2?: string
    city?: string
    state?: string
    postal_code?: string
    country?: string
  }
}

export interface CheckoutProps {
  checkoutCustomerId: string
  paymentMethods: IStripePaymentMethod[]
  product: IProduct
  setupClientSecret: string
}
