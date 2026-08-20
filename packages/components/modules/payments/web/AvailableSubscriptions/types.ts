import { Product } from '../types'

export interface AvailableSubscriptionsProps {
  /** Defined by the host app's routing; the default is kept only for backwards compatibility. */
  manageSubscriptionUrl?: string
}

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
