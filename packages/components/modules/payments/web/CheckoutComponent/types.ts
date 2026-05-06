import { FC } from 'react'

import { ConfirmationSubscriptionModalProps } from './ConfirmationSubscriptionModal/types'

export interface CheckoutComponentProps {
  entityId: string
  productId: string
  ConfirmationSubscriptionModal?: FC<ConfirmationSubscriptionModalProps>
  ConfirmationSubscriptionModalProps?: ConfirmationSubscriptionModalProps
  onSuccess?: () => void
}

export interface CheckoutComponentWithElementProps {
  entityId: string
  productId: string
  stripePublishableKey: string
  ConfirmationSubscriptionModal?: FC<ConfirmationSubscriptionModalProps>
  ConfirmationSubscriptionModalProps?: ConfirmationSubscriptionModalProps
  onSuccess?: () => void
}
