import { FC } from 'react'

import { ConfirmationSubscriptionModalProps } from './ConfirmationSubscriptionModal/types'

export interface CheckoutComponentProps {
  entityId: string
  productId: string
  /**
   * Where the confirmation modal's "Plan Details" action navigates. The subscription settings route
   * is defined by the host app, so it must be supplied here; the default is kept only for
   * backwards compatibility.
   */
  planDetailsUrl?: string
  ConfirmationSubscriptionModal?: FC<ConfirmationSubscriptionModalProps>
  ConfirmationSubscriptionModalProps?: ConfirmationSubscriptionModalProps
  onSuccess?: () => void
}

export interface CheckoutComponentWithElementProps {
  entityId: string
  productId: string
  stripePublishableKey: string
  /**
   * Where the confirmation modal's "Plan Details" action navigates. The subscription settings route
   * is defined by the host app, so it must be supplied here; the default is kept only for
   * backwards compatibility.
   */
  planDetailsUrl?: string
  ConfirmationSubscriptionModal?: FC<ConfirmationSubscriptionModalProps>
  ConfirmationSubscriptionModalProps?: ConfirmationSubscriptionModalProps
  onSuccess?: () => void
}
