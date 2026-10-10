import { defineMessages } from 'react-intl'

/** Rendered size of a card-brand icon, in px. Larger than the surrounding body text so
 * the brand stays recognisable at a glance. */
export const CARD_ICON_FONT_SIZE = 28

/** Plan-selection screen. Known at render, so it is linked rather than pushed. */
export const SUBSCRIPTIONS_URL = '/subscriptions'

/** Checkout screen. Takes `?productId=`; also known at render. */
export const CHECKOUT_URL = '/subscriptions/checkout'

export const PAYMENTS_MESSAGES = defineMessages({
  addPaymentMethod: {
    id: 'payments.addPaymentMethod',
    defaultMessage: 'Add payment method',
  },
  active: {
    id: 'payments.status.active',
    defaultMessage: 'Active',
  },
  subscription: {
    id: 'payments.subscription.title',
    defaultMessage: 'Subscription',
  },
  changePlan: {
    id: 'payments.subscription.changePlan',
    defaultMessage: 'Change Plan',
  },
  cancelSubscription: {
    id: 'payments.subscription.cancel',
    defaultMessage: 'Cancel Subscription',
  },
  subscriptionUpdated: {
    id: 'payments.subscription.updated',
    defaultMessage: 'Subscription updated successfully.',
  },
  payment: {
    id: 'payments.payment',
    defaultMessage: 'Payment',
  },
  remove: {
    id: 'payments.paymentMethods.remove',
    defaultMessage: 'Remove',
  },
  expired: {
    id: 'payments.card.expired',
    defaultMessage: 'Expired',
  },
  cardExpires: {
    id: 'payments.card.expires',
    defaultMessage: 'Expires: {month}/{year}',
  },
  cardExpired: {
    id: 'payments.card.expiredOn',
    defaultMessage: 'Expired: {month}/{year}',
  },
  tryAgain: {
    id: 'payments.errors.tryAgain',
    defaultMessage: 'Please try again.',
  },
})
