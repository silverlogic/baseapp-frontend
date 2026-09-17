import { loadStripe } from '@stripe/stripe-js'

export const getStripePromise = (key: string) =>
  key ? loadStripe(key) : Promise.reject(new Error('Stripe publishable key is not defined'))
