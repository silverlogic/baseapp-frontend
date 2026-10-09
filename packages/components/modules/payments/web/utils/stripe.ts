import { type Stripe, loadStripe } from '@stripe/stripe-js'

// Cached per key. Called straight from the render of three components, so a fresh
// loadStripe promise on every render made react-stripe-js log "You cannot change the
// stripe prop after setting it" each time. It pins the first resolved instance, so
// nothing was recreated - but Stripe's guidance is to keep this out of the render path.
const stripePromises = new Map<string, Promise<Stripe | null>>()

export const getStripePromise = (key: string) => {
  if (!key) {
    return Promise.reject(new Error('Stripe publishable key is not defined'))
  }
  const cached = stripePromises.get(key)
  if (cached) {
    return cached
  }
  const promise = loadStripe(key)
  stripePromises.set(key, promise)
  return promise
}
