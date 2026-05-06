import { Product } from '../types'

export interface SubscriptionCardProps {
  sub: Product
  isActive: boolean
  smDown: boolean
  selectedTerm: string
  onManageClick: () => void
  onSubscribeClick: () => void
}

export interface SubscriptionCardWrapperProps {
  smDown: boolean
}
