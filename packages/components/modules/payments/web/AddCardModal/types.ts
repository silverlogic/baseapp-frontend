import { Stripe } from '@stripe/stripe-js'

export interface AddCardModalProps {
  entityId?: string
  open: boolean
  onClose: () => void
  stripe: Stripe
  /** The SetupIntent's client secret; the card form mounts once it is known. */
  clientSecret?: string
  handleSetupSuccess: (id: string) => void
}
