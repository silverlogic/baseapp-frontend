export interface ManagementComponentProps {
  subscriptionId: string
  entityId: string
  handleSetupSuccess: (id: string) => void
  lastAddedPaymentMethodIdDuringSession: string | null
}
export interface SubscriptionManagementProps {
  stripePublishableKey: string
  subscriptionId: string
  entityId: string
}

export interface CancelSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}
