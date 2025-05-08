import { CreateSubscriptionOptions, IStripePaymentMethod } from '../types'

export interface SubscriptionRequestBody {
  remote_customer_id: string
  price_id: string
  payment_method_id?: string
  allow_incomplete?: boolean
  billing_details?: CreateSubscriptionOptions['billingDetails']
}

export type UpdatePaymentMethodRequestBody = Partial<IStripePaymentMethod> & {
  customer_id: string
  default_payment_method_id?: string
}
