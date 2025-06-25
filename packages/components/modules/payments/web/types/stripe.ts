import { CreateSubscriptionOptions } from '.'

export interface SubscriptionRequestBody {
  remote_customer_id: string
  price_id: string
  payment_method_id?: string
  allow_incomplete?: boolean
  billing_details?: CreateSubscriptionOptions['billingDetails']
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
