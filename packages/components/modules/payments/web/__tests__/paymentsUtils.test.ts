import { getChipLabelAndColorByStatus } from '../SubscriptionManagement/utils'
import { formatPrice } from '../utils'

describe('getChipLabelAndColorByStatus', () => {
  test.each([
    ['active', 'Active', 'success'],
    ['trialing', 'Active', 'success'],
    ['past_due', 'Past Due', 'warning'],
    ['unpaid', 'Unpaid', 'error'],
    ['canceled', 'Canceled', 'error'],
    ['incomplete_expired', 'Canceled', 'error'],
  ])('maps %s to %s/%s', (status, label, color) => {
    expect(getChipLabelAndColorByStatus(status)).toEqual({ label, color })
  })

  test('incomplete is Pending, not Active', () => {
    // It is the state checkout itself produces, via allow_incomplete. Labelling it
    // Active told a customer their first payment had cleared when it had not.
    expect(getChipLabelAndColorByStatus('incomplete')).toEqual({
      label: 'Pending',
      color: 'warning',
    })
  })

  test('an unknown status yields no chip rather than a mislabelled one', () => {
    expect(getChipLabelAndColorByStatus('paused')).toEqual({ label: '', color: '' })
  })
})

describe('formatPrice', () => {
  test('divides by 100 for a currency with minor units', () => {
    expect(formatPrice(1050, 'en-US', 'USD')).toBe('$10.50')
  })

  test('does not divide zero-decimal currencies', () => {
    // Stripe quotes ¥500 as 500, not 50000. Dividing rendered it as ¥5.
    expect(formatPrice(500, 'en-US', 'JPY')).toBe('¥500')
  })

  test.each(['BIF', 'CLP', 'JPY', 'KRW', 'VND', 'XAF'])(
    '%s is treated as zero-decimal',
    (currency) => {
      expect(formatPrice(500, 'en-US', currency)).toContain('500')
    },
  )

  test('matches the zero-decimal list case-insensitively', () => {
    expect(formatPrice(500, 'en-US', 'jpy')).toBe(formatPrice(500, 'en-US', 'JPY'))
  })

  test('answers empty for a missing amount rather than rendering a zero price', () => {
    expect(formatPrice(undefined, 'en-US', 'USD')).toBe('')
  })
})
