import { ReactElement } from 'react'

import { PaymentMethod } from '../../types'

export interface PaymentMethodDisplayProps {
  pm: PaymentMethod
  getCardIcon: (brand?: string) => ReactElement
  isSelected?: boolean
}
