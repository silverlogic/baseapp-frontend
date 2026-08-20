import { FC } from 'react'

import { ConfirmationSubscriptionModalProps } from './ConfirmationSubscriptionModal/types'

export interface CheckoutComponentProps {
  entityId: string
  productId: string
  /** Defined by the host app's routing; the default is kept only for backwards compatibility. */
  planDetailsUrl?: string
  ConfirmationSubscriptionModal?: FC<ConfirmationSubscriptionModalProps>
  ConfirmationSubscriptionModalProps?: ConfirmationSubscriptionModalProps
  onSuccess?: () => void
}

export interface CheckoutComponentWithElementProps {
  entityId: string
  productId: string
  stripePublishableKey: string
  /** Defined by the host app's routing; the default is kept only for backwards compatibility. */
  planDetailsUrl?: string
  ConfirmationSubscriptionModal?: FC<ConfirmationSubscriptionModalProps>
  ConfirmationSubscriptionModalProps?: ConfirmationSubscriptionModalProps
  onSuccess?: () => void
}
