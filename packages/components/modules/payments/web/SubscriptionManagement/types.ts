export interface ManagementComponentProps {
  subscriptionId: string
  customerId: string
  handleSetupSuccess: (id: string) => void
  lastAddedPaymentMethodIdDuringSession: string | null
}
export interface SubscriptionManagementProps {
  stripePublishableKey: string
  subscriptionId: string
  customerId: string
}

export interface CancelSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}
