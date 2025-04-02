import { loadStripe } from '@stripe/stripe-js'

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

export const stripePromise = loadStripe(stripePublishableKey!)

export interface ISetupIntent {
  id: string
  clientSecret: string
}
