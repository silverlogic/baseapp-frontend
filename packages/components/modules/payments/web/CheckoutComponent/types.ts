import { FC } from 'react'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { ConfirmationSubscriptionModalProps } from './ConfirmationSubscriptionModal/types'

export interface CheckoutComponentProps {
  entityId: string
  productId: string
  ConfirmationSubscriptionModal?: FC<ConfirmationSubscriptionModalProps>
  ConfirmationSubscriptionModalProps?: ConfirmationSubscriptionModalProps
  onSuccess?: () => void
  router: AppRouterInstance
}

export interface CheckoutComponentWithElementProps {
  entityId: string
  productId: string
  stripePublishableKey: string
  ConfirmationSubscriptionModal?: FC<ConfirmationSubscriptionModalProps>
  ConfirmationSubscriptionModalProps?: ConfirmationSubscriptionModalProps
  onSuccess?: () => void
  router: AppRouterInstance
}
