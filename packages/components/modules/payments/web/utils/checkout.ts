import type { StripeElementsOptions } from '@stripe/stripe-js'

/** The first message of a DRF field error, e.g. `{"items": ["The price of ... has changed."]}`. */
const firstFieldError = (data: unknown): string | undefined => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return undefined
  const messages = Object.values(data).find(
    (value): value is string[] => Array.isArray(value) && typeof value[0] === 'string',
  )
  return messages?.[0]
}

/**
 * The first human-readable message out of an API error.
 *
 * DRF answers general errors as `{"non_field_errors": ["..."]}` (camelized to
 * `nonFieldErrors` on the way in), field errors as `{"<field>": ["..."]}`, and some viewsets
 * as `{"error": "..."}`; packages that have not been migrated yet still answer a bare list,
 * hence the positional fallback.
 */
export const extractErrorMessage = (error: any): string =>
  error?.response?.data?.nonFieldErrors?.[0] ||
  error?.response?.data?.error ||
  (Array.isArray(error?.response?.data) && error?.response?.data[0]) ||
  firstFieldError(error?.response?.data) ||
  error?.message ||
  'An unexpected error occurred. Please try again.'

/**
 * Options for the checkout's Elements group, or undefined while the price's currency is unknown.
 *
 * The checkouts have no intent when they mount - the subscription or purchase and its payment are
 * created on "Place Order" and confirmed with the invoice's secret - so Elements runs in deferred-intent
 * "setup" mode. Without a mode, Stripe.js (endive) logs "Unable to select session" from the
 * AddressElement; and setup mode needs the currency when the account uses dynamic payment
 * methods, or Elements never initializes.
 */
export const getCheckoutElementsOptions = (
  currency: string | undefined,
): StripeElementsOptions | undefined =>
  currency ? { mode: 'setup', currency: currency.toLowerCase() } : undefined
