import { Product } from '../types'
import { MAX_LINE_QUANTITY } from './constants'
import { CheckoutItem, OrderLine, OrderSummary } from './types'

/** A one-time product has a fixed price that does not recur; the others belong to subscriptions. */
export const isOneTimeProduct = (product?: Product): product is Product =>
  !!product?.defaultPrice &&
  !product.defaultPrice.recurring &&
  Number.isFinite(product.defaultPrice.unitAmount)

/** Typed or pasted quantities, kept to a whole number the backend accepts. */
export const clampQuantity = (value: number): number => {
  if (!Number.isFinite(value)) return 1
  return Math.min(MAX_LINE_QUANTITY, Math.max(1, Math.trunc(value)))
}

/** The cart priced with the products' current one-time prices. */
export const buildOrderSummary = (items: CheckoutItem[], products: Product[]): OrderSummary => {
  const productsById = new Map(products.map((product) => [product.id, product]))
  const lines: OrderLine[] = []
  const unavailableProductIds: string[] = []

  items.forEach(({ productId, quantity }) => {
    const product = productsById.get(productId)
    if (!isOneTimeProduct(product)) {
      unavailableProductIds.push(productId)
      return
    }
    const { unitAmount } = product.defaultPrice
    lines.push({ product, quantity, unitAmount, amount: unitAmount * quantity })
  })

  const currencies = new Set(
    lines.map((line) => (line.product.defaultPrice.currency ?? 'usd').toLowerCase()),
  )
  const [currency] = currencies

  return {
    lines,
    unavailableProductIds,
    currency,
    hasMixedCurrencies: currencies.size > 1,
    subtotal: lines.reduce((sum, line) => sum + line.amount, 0),
  }
}
