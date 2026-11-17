/** Rendered size of a card-brand icon, in px. Larger than the surrounding body text so
 * the brand stays recognisable at a glance. */
export const CARD_ICON_FONT_SIZE = 28

/** Plan-selection screen. Known at render, so it is linked rather than pushed. */
export const SUBSCRIPTIONS_URL = '/subscriptions'

/** Checkout screen. Takes `?productId=`; also known at render. */
export const CHECKOUT_URL = '/subscriptions/checkout'

/** How often a pending one-time purchase is re-read while waiting for Stripe's webhook, in ms. */
export const PURCHASE_POLL_INTERVAL_MS = 2000
