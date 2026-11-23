import { OrderLine } from '../types'

export interface OrderLineRowProps {
  line: OrderLine
  currency?: string
  disabled?: boolean
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}
