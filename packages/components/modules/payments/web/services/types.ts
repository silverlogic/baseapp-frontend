import { CreateSubscriptionOptions, PaymentMethod } from '../types'

export interface SubscriptionRequestBody {
  remoteCustomerId: string
  priceId: string
  paymentMethod_id?: string
  allowIncomplete?: boolean
  billingDetails?: CreateSubscriptionOptions['billingDetails']
}

export type UpdatePaymentMethodRequestBody = Partial<PaymentMethod> & {
  customerId: string
  defaultPaymentMethodId?: string
}
