import { defineMessages } from 'react-intl'

/**
 * Rendered size of the product thumbnail, in px.
 *
 * next/image needs explicit intrinsic dimensions — they are what lets it serve a
 * correctly-sized WebP/AVIF and reserve the space before the image lands.
 */
export const PRODUCT_THUMBNAIL_SIZE = 48

export const CHECKOUT_MESSAGES = defineMessages({
  updateFailed: {
    id: 'payments.checkout.updateFailed',
    defaultMessage: 'Failed to update subscription',
  },
  paymentConfirmationFailed: {
    id: 'payments.checkout.paymentConfirmationFailed',
    defaultMessage: 'Payment confirmation failed: {message}',
  },
  createFailed: {
    id: 'payments.checkout.createFailed',
    defaultMessage: 'Failed to create subscription: {message}',
  },
  unexpectedError: {
    id: 'payments.checkout.unexpectedError',
    defaultMessage: 'An unexpected error occurred. Please try again.',
  },
})
