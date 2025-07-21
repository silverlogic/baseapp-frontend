export interface ManagementComponentProps {
  subscriptionId: string
  entityId: number
  handleSetupSuccess: (id: string) => void
  lastAddedPaymentMethodIdDuringSession: string | null
}
export interface SubscriptionManagementProps {
  stripePublishableKey: string
  subscriptionId: string
  entityId: number
}

export interface CancelSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}
