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
  /** Where the card navigates. Hrefs rather than handlers: both are known at render,
   * so they can be links that prefetch instead of buttons that push. */
  manageHref: string
  subscribeHref: string
}

export interface SubscriptionCardWrapperProps {
  smDown: boolean
}
