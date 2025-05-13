import { Stripe, StripeElements } from '@stripe/stripe-js'
import { StripePaymentMethod } from '../../types'


export interface PaymentDropdownProps {
  paymentMethods: StripePaymentMethod[]
  selectedPaymentMethodId: string
  setSelectedPaymentMethodId: (id: string) => void
  stripe: Stripe
  elements: StripeElements
  setIsAddCardModalOpen: (isOpen: boolean) => void
  isAddCardModalOpen: boolean
  customerId: string
  handleSetupSuccess: () => void
}
