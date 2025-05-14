import { FC } from 'react'

import { IProduct, StripePaymentMethod } from '../types'
import { ConfirmationSubscriptionModalProps } from './ConfirmationSubscriptionModal/types'

export interface CheckoutProps {
  isLoadingMethods: boolean
  checkoutCustomerId: string
  paymentMethods: StripePaymentMethod[]
  product: IProduct
  setupClientSecret: string
  handleSetupSuccess: () => void
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
