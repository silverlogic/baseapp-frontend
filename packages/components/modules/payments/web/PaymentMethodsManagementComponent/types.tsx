import { PaymentMethod } from '../types'

export interface PaymentMethodsManagementComponentProps {
  entityId?: string
}

export interface PaymentMethodsItemProps {
  paymentMethod: PaymentMethod
  setIsMenuOpen: (isMenuOpen: boolean) => void
  setSelectedPaymentMethodId: (selectedPaymentMethodId: string) => void
  setAnchorEl: (anchorEl: HTMLElement) => void
  isLast: boolean
}
