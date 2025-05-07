import { IStripePaymentMethod } from '../types'

export interface PaymentMethodsManagementComponentProps {
  customerId: string
}

export interface PaymentMethodsManagementComponentWithElementsProps
  extends PaymentMethodsManagementComponentProps {
  customerId: string
  stripePublishableKey: string
}

export interface PaymentMethodsItemProps {
  paymentMethod: IStripePaymentMethod
  setIsMenuOpen: (isMenuOpen: boolean) => void
  setSelectedPaymentMethodId: (selectedPaymentMethodId: string) => void
  setAnchorEl: (anchorEl: HTMLElement) => void
  isLast: boolean
}
