import { Stripe, StripeElements } from '@stripe/stripe-js'

export interface AddCardModalProps {
  entityId?: string
  open: boolean
  onClose: () => void
  stripe: Stripe
  elements: StripeElements
  handleSetupSuccess: (id: string) => void
}
