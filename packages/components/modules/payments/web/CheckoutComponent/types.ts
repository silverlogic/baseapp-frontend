import { IProduct, StripePaymentMethod } from '../types'

export interface CheckoutComponentProps {
  paymentMethods: StripePaymentMethod[]
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
    postalCode?: string
    country?: string
  }
}

export interface CheckoutProps {
  isLoadingMethods: boolean
  checkoutCustomerId: string
  paymentMethods: StripePaymentMethod[]
  product: IProduct
  setupClientSecret: string
  handleSetupSuccess: () => void
}
