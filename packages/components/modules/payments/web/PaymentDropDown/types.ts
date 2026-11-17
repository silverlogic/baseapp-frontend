import { Stripe } from '@stripe/stripe-js'

import { PaymentMethod } from '../types'

export interface PaymentDropdownProps {
  paymentMethods: PaymentMethod[]
  selectedPaymentMethodId: string
  setSelectedPaymentMethodId: (id: string) => void
  stripe: Stripe
  setIsAddCardModalOpen: (isOpen: boolean) => void
  isAddCardModalOpen: boolean
  entityId: string
  handleSetupSuccess: (id: string) => void
}
