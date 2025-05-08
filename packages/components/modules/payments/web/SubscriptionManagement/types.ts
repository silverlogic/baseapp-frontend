export interface IManagementComponent {
  subscriptionId: string
  customerId: string
  handleSetupSuccess: () => void
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
