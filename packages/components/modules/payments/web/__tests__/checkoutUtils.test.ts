import { buildAddressOptions, extractErrorMessage, maskEmail } from '../CheckoutComponent/utils'
import { PaymentMethod } from '../types'

const paymentMethod = (billingDetails: any): PaymentMethod =>
  ({ id: 'pm_1', billingDetails }) as unknown as PaymentMethod

describe('extractErrorMessage', () => {
  test('prefers the DRF object shape', () => {
    // What this package now answers: {"non_field_errors": [...]}, camelized on the way in.
    const error = { response: { data: { nonFieldErrors: ['Card declined.'] } } }

    expect(extractErrorMessage(error)).toBe('Card declined.')
  })

  test('falls back to the bare-list shape other packages still use', () => {
    expect(extractErrorMessage({ response: { data: ['Legacy message.'] } })).toBe('Legacy message.')
  })

  test('reads the viewset {error: ...} shape', () => {
    expect(extractErrorMessage({ response: { data: { error: 'Payment service down' } } })).toBe(
      'Payment service down',
    )
  })

  test('falls back to the transport error before the generic message', () => {
    expect(extractErrorMessage({ message: 'Network Error' })).toBe('Network Error')
  })

  test('never returns empty, so the toast always says something', () => {
    expect(extractErrorMessage(undefined)).toBe('An unexpected error occurred. Please try again.')
    expect(extractErrorMessage({ response: { data: {} } })).toBe(
      'An unexpected error occurred. Please try again.',
    )
  })
})

describe('buildAddressOptions', () => {
  test('prefills every field from the selected card', () => {
    const options = buildAddressOptions(
      paymentMethod({
        name: 'Ada Lovelace',
        address: {
          line1: 'Av. Paulista 1000',
          line2: 'Apt 1',
          city: 'Sao Paulo',
          state: 'SP',
          postalCode: '01310-100',
          country: 'BR',
        },
      }),
    )

    expect(options.mode).toBe('billing')
    expect(options.defaultValues).toEqual({
      name: 'Ada Lovelace',
      address: {
        line1: 'Av. Paulista 1000',
        line2: 'Apt 1',
        city: 'Sao Paulo',
        state: 'SP',
        // Stripe's Address Element expects snake_case here, unlike the camelized API.
        postal_code: '01310-100',
        country: 'BR',
      },
    })
  })

  test('answers empty strings rather than undefined when there is no card', () => {
    // Undefined would make the Address Element uncontrolled and warn on first input.
    const { defaultValues } = buildAddressOptions(undefined)

    expect(defaultValues.name).toBe('')
    expect(Object.values(defaultValues.address)).not.toContain(undefined)
  })

  test('defaults country to US when the card has no address', () => {
    expect(buildAddressOptions(paymentMethod({})).defaultValues.address.country).toBe('US')
  })
})

describe('maskEmail', () => {
  test('keeps the first characters and masks the rest', () => {
    expect(maskEmail('ada.lovelace@example.com')).toBe('ada*********@example.com')
  })

  test('answers empty for anything that is not an email', () => {
    expect(maskEmail(undefined)).toBe('')
    expect(maskEmail('not-an-email')).toBe('')
  })
})
