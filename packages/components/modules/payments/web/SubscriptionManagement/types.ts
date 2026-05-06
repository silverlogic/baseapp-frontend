export interface SubscriptionManagementWithElementsProps {
  stripePublishableKey: string
  entityId: string
}

export interface SubscriptionManagementProps {
  entityId: string
}

export interface CancelSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}
