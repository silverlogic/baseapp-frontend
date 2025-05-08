import { Stripe, StripeElements } from '@stripe/stripe-js'

export interface AddCardModalProps {
  customerId: string
  open: boolean
  onClose: () => void
  stripe: Stripe
  elements: StripeElements
  handleSetupSuccess: () => void
}
