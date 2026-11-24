import { Product, Purchase } from '../types'

/** One product in the cart. The price is always the product's current one-time price. */
export interface CheckoutItem {
  productId: string
  quantity: number
}

export interface OrderLine {
  product: Product
  quantity: number
  /** Minor units of the price's currency. */
  unitAmount: number
  amount: number
}

export interface OrderSummary {
  lines: OrderLine[]
  /** Ids in the cart that are not, or no longer, sold as a one-time purchase. */
  unavailableProductIds: string[]
  currency?: string
  /** True when the lines' prices use different currencies; Stripe cannot invoice them together. */
  hasMixedCurrencies: boolean
  subtotal: number
}

export interface OneTimeCheckoutProps {
  entityId: string
  items: CheckoutItem[]
  /** Called with the new cart when the buyer changes a quantity or removes a line. */
  onItemsChange: (items: CheckoutItem[]) => void
  /** Called once the purchase is confirmed as paid. */
  onSuccess?: (purchase: Purchase) => void
  /** Where "Continue shopping" leads; defined by the host app's routing. */
  continueShoppingUrl?: string
}

export interface OneTimeCheckoutWithElementsProps extends OneTimeCheckoutProps {
  stripePublishableKey: string
}
