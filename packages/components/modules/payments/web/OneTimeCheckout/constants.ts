import { defineMessages } from 'react-intl'

/** Stripe caps an invoice item's quantity well above this; the backend enforces the same limit. */
export const MAX_LINE_QUANTITY = 9999

/** Rendered size of a line's product thumbnail, in px (next/image needs it explicitly). */
export const LINE_THUMBNAIL_SIZE = 48

export const ONE_TIME_CHECKOUT_MESSAGES = defineMessages({
  paymentFailed: {
    id: 'payments.oneTimeCheckout.paymentFailed',
    defaultMessage: 'The payment failed and nothing was charged. Please try another card.',
  },
  thankYou: {
    id: 'payments.oneTimeCheckout.thankYou',
    defaultMessage: 'Thank you for your order!',
  },
  orderPaid: {
    id: 'payments.oneTimeCheckout.orderPaid',
    defaultMessage: 'Order #{id} - {total} paid.',
  },
  continueShopping: {
    id: 'payments.oneTimeCheckout.continueShopping',
    defaultMessage: 'Continue shopping',
  },
  orderSummary: {
    id: 'payments.oneTimeCheckout.orderSummary',
    defaultMessage: 'Order summary',
  },
  unavailableItems: {
    id: 'payments.oneTimeCheckout.unavailableItems',
    defaultMessage:
      '{count, plural, one {One item is no longer available and was left out.} other {# items are no longer available and were left out.}}',
  },
  emptyCart: {
    id: 'payments.oneTimeCheckout.emptyCart',
    defaultMessage: 'Your cart is empty.',
  },
  mixedCurrencies: {
    id: 'payments.oneTimeCheckout.mixedCurrencies',
    defaultMessage:
      'These products are priced in different currencies and cannot be bought together.',
  },
  subtotal: {
    id: 'payments.oneTimeCheckout.subtotal',
    defaultMessage: 'Subtotal',
  },
  taxesNotice: {
    id: 'payments.oneTimeCheckout.taxesNotice',
    defaultMessage: 'Any applicable taxes are added to the invoice when the order is placed.',
  },
  awaitingConfirmation: {
    id: 'payments.oneTimeCheckout.awaitingConfirmation',
    defaultMessage: 'Payment received. Waiting for confirmation from the payment provider...',
  },
  tryAgain: {
    id: 'payments.oneTimeCheckout.tryAgain',
    defaultMessage: 'Try again',
  },
  loadFailed: {
    id: 'payments.oneTimeCheckout.loadFailed',
    defaultMessage: 'We could not load the products. Please try again later.',
  },
  unitPrice: {
    id: 'payments.oneTimeCheckout.line.unitPrice',
    defaultMessage: '{price} each',
  },
  quantityLabel: {
    id: 'payments.oneTimeCheckout.line.quantityLabel',
    defaultMessage: 'Quantity of {name}',
  },
  removeLabel: {
    id: 'payments.oneTimeCheckout.line.removeLabel',
    defaultMessage: 'Remove {name}',
  },
})
