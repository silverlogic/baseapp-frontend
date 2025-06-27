import { IProduct } from '../types'

export interface SubscriptionCardProps {
  sub: IProduct
  isActive: boolean
  smDown: boolean
  selectedTerm: string
  onManageClick: () => void
  onSubscribeClick: () => void
}
