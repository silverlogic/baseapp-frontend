import { Product } from '../types'

export interface AvailableSubscriptionsProps {
  /**
   * Where the "Manage Subscription" action navigates. The subscription settings route is defined by
   * the host app, so it must be supplied here; the default is kept only for backwards compatibility.
   */
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
