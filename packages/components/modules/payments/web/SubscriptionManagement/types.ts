export interface IManagementComponent {
  subscriptionId: string
  customerId: string
  handleSetupSuccess: (id: string) => void
  lastAddedPaymentMethodIdDuringSession: string | null
}
export interface ISubscriptionManagement {
  stripePublishableKey: string
  subscriptionId: string
  customerId: string
}

export interface ICancelSubscriptionModal {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}
