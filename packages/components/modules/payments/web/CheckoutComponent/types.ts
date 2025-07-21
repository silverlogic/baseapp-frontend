import { FC } from 'react'

import { PaymentMethod, Product } from '../types'
import { ConfirmationSubscriptionModalProps } from './ConfirmationSubscriptionModal/types'

export interface CheckoutProps {
  lastAddedPaymentMethodIdDuringSession: string | null
  isLoadingMethods: boolean
  entityId: number
  paymentMethods: PaymentMethod[]
  product: Product
  setupClientSecret: string
  handleSetupSuccess: (id: string) => void
  ConfirmationSubscriptionModal?: FC<ConfirmationSubscriptionModalProps>
  ConfirmationSubscriptionModalProps?: ConfirmationSubscriptionModalProps
}

export interface CheckoutComponentProps {
  entityId: number
  checkoutProductId: string
  stripePublishableKey: string
  ConfirmationSubscriptionModal?: FC<ConfirmationSubscriptionModalProps>
  ConfirmationSubscriptionModalProps?: ConfirmationSubscriptionModalProps
}
