export interface SubscriptionManagementProps {
  entityId: string
}

export interface CancelSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}
