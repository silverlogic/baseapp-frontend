import { IProduct, IStripePaymentMethod } from '../types'

export interface CheckoutComponentProps {
  paymentMethods: IStripePaymentMethod[]
  product: IProduct
  setupClientSecret: string
  onPaymentSuccess?: (subscriptionId: string) => void
  onPaymentError?: (error: string) => void
}

export interface CheckoutProps {
  isLoadingMethods: boolean
  checkoutCustomerId: string
  paymentMethods: IStripePaymentMethod[]
  product: IProduct
  setupClientSecret: string
  handleSetupSuccess: () => void
}
