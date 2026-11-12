import { PaymentMethod } from '../types'

export const maskEmail = (
  email: string | undefined,
  maskDomain: boolean = false,
  visibleUsernameChars: number = 3,
  visibleDomainChars: number = 2,
  maskChar: string = '*',
): string => {
  if (!email?.includes('@')) return ''

  const [username, domain] = email.split('@')

  if (!username) return ''

  const visibleLength = Math.min(visibleUsernameChars, username.length)
  const maskedUsername =
    username.slice(0, visibleLength) + maskChar.repeat(username.length - visibleLength)

  if (maskDomain && domain?.includes('.')) {
    const [domainName, ...tldParts] = domain.split('.')
    const topLevelDomain = tldParts.join('.')

    if (!domainName) return `${maskedUsername}@${domain}`

    const visibleDomainLength = Math.min(visibleDomainChars, domainName.length)
    const maskedDomainName =
      domainName.slice(0, visibleDomainLength) +
      maskChar.repeat(domainName.length - visibleDomainLength)

    return `${maskedUsername}@${maskedDomainName}.${topLevelDomain}`
  }

  return `${maskedUsername}@${domain}`
}

/** Prefill the Stripe Address Element from the card the customer already has selected. */
export const buildAddressOptions = (selectedMethod?: PaymentMethod) => ({
  mode: 'billing' as const,
  defaultValues: {
    name: selectedMethod?.billingDetails?.name || '',
    address: {
      line1: selectedMethod?.billingDetails?.address?.line1 || '',
      line2: selectedMethod?.billingDetails?.address?.line2 || '',
      city: selectedMethod?.billingDetails?.address?.city || '',
      state: selectedMethod?.billingDetails?.address?.state || '',
      postal_code: selectedMethod?.billingDetails?.address?.postalCode || '',
      country: selectedMethod?.billingDetails?.address?.country || 'US',
    },
  },
})

/**
 * The first human-readable message out of an API error.
 *
 * DRF answers general errors as `{"non_field_errors": ["..."]}` (camelized to
 * `nonFieldErrors` on the way in) and some viewsets as `{"error": "..."}`; packages that
 * have not been migrated yet still answer a bare list, hence the positional fallback.
 */
export const extractErrorMessage = (
  error: any,
  fallbackMessage: string = 'An unexpected error occurred. Please try again.',
): string =>
  error?.response?.data?.nonFieldErrors?.[0] ||
  error?.response?.data?.error ||
  (Array.isArray(error?.response?.data) && error?.response?.data[0]) ||
  error?.message ||
  fallbackMessage
