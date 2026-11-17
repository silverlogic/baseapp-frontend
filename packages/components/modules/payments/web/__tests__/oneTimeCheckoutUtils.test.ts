import { buildOrderSummary, clampQuantity, isOneTimeProduct } from '../OneTimeCheckout/utils'
import { Product } from '../types'
import { extractErrorMessage } from '../utils/checkout'

const product = (id: string, unitAmount: number, extra: Partial<Product['defaultPrice']> = {}) =>
  ({
    id,
    name: id,
    images: [],
    description: '',
    defaultPrice: { id: `price_${id}`, unitAmount, currency: 'usd', ...extra },
  }) as Product

describe('isOneTimeProduct', () => {
  it('accepts a fixed, non-recurring price', () => {
    expect(isOneTimeProduct(product('a', 1000))).toBe(true)
  })

  it('rejects subscriptions and products without a price', () => {
    expect(isOneTimeProduct(product('a', 1000, { recurring: { interval: 'month' } }))).toBe(false)
    expect(isOneTimeProduct({ ...product('a', 1000), defaultPrice: undefined } as any)).toBe(false)
    expect(isOneTimeProduct(undefined)).toBe(false)
  })
})

describe('clampQuantity', () => {
  it('keeps whole numbers between 1 and 9999', () => {
    expect(clampQuantity(3)).toBe(3)
    expect(clampQuantity(0)).toBe(1)
    expect(clampQuantity(-4)).toBe(1)
    expect(clampQuantity(2.7)).toBe(2)
    expect(clampQuantity(100000)).toBe(9999)
    expect(clampQuantity(Number.NaN)).toBe(1)
  })
})

describe('buildOrderSummary', () => {
  it('prices each line by quantity and sums the subtotal', () => {
    const summary = buildOrderSummary(
      [
        { productId: 'a', quantity: 3 },
        { productId: 'b', quantity: 2 },
      ],
      [product('a', 1000), product('b', 450)],
    )
    expect(summary.lines.map((line) => line.amount)).toEqual([3000, 900])
    expect(summary.subtotal).toBe(3900)
    expect(summary.currency).toBe('usd')
    expect(summary.hasMixedCurrencies).toBe(false)
    expect(summary.unavailableProductIds).toEqual([])
  })

  it('leaves out unknown and recurring products', () => {
    const summary = buildOrderSummary(
      [
        { productId: 'a', quantity: 1 },
        { productId: 'gone', quantity: 1 },
        { productId: 'plan', quantity: 1 },
      ],
      [product('a', 1000), product('plan', 500, { recurring: { interval: 'month' } })],
    )
    expect(summary.lines).toHaveLength(1)
    expect(summary.unavailableProductIds).toEqual(['gone', 'plan'])
    expect(summary.subtotal).toBe(1000)
  })

  it('flags lines priced in different currencies', () => {
    const summary = buildOrderSummary(
      [
        { productId: 'a', quantity: 1 },
        { productId: 'b', quantity: 1 },
      ],
      [product('a', 1000), product('b', 1000, { currency: 'EUR' })],
    )
    expect(summary.hasMixedCurrencies).toBe(true)
  })

  it('is empty for an empty cart', () => {
    const summary = buildOrderSummary([], [product('a', 1000)])
    expect(summary).toMatchObject({ lines: [], subtotal: 0, currency: undefined })
  })
})

describe('extractErrorMessage field errors', () => {
  it('reads the first message of a DRF field error', () => {
    const error = { response: { data: { items: ['The price of a has changed.'] } } }
    expect(extractErrorMessage(error)).toBe('The price of a has changed.')
  })
})
