import { FC } from 'react'

import { IProduct, IStripePaymentMethod } from '../types'
import { ConfirmationSubscriptionModalProps } from './ConfirmationSubscriptionModal/types'

export interface CheckoutProps {
  lastAddedPaymentMethodIdDuringSession: string | null
  isLoadingMethods: boolean
  checkoutCustomerId: string
  paymentMethods: IStripePaymentMethod[]
  product: IProduct
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
