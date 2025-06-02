import { FC } from 'react'

import { Product, PaymentMethod } from '../types'
import { ConfirmationSubscriptionModalProps } from './ConfirmationSubscriptionModal/types'

export interface CheckoutProps {
  lastAddedPaymentMethodIdDuringSession: string | null
  isLoadingMethods: boolean
  checkoutCustomerId: string
  paymentMethods: PaymentMethod[]
  product: Product
  setupClientSecret: string
  handleSetupSuccess: (id: string) => void
  ConfirmationSubscriptionModal?: FC<ConfirmationSubscriptionModalProps>
  ConfirmationSubscriptionModalProps?: ConfirmationSubscriptionModalProps
}

export interface CheckoutComponentProps {
  checkoutCustomerId: string
  checkoutProductId: string
  stripePublishableKey: string
  ConfirmationSubscriptionModal?: FC<ConfirmationSubscriptionModalProps>
  ConfirmationSubscriptionModalProps?: ConfirmationSubscriptionModalProps
}
