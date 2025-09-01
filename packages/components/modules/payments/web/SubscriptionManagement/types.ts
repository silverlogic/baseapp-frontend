import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export interface SubscriptionManagementWithElementsProps {
  stripePublishableKey: string
  entityId: string
  router: AppRouterInstance
}

export interface SubscriptionManagementProps {
  entityId: string
  router: AppRouterInstance
}

export interface CancelSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}
