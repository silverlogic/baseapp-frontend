'use client'

import { useMemo } from 'react'

import { useStripe } from '@stripe/react-stripe-js'

import {
  type CardHoldPlacementPayload,
  type UseCardHoldPlacementOptions,
  type UseCardHoldPlacementReturn,
  useCardHoldPlacement,
} from '../../common'
import { createStripeJsCardHoldAuthenticator } from '../utils/cardHolds'

/**
 * `useCardHoldPlacement` with Stripe.js as the authenticator. Must render inside
 * `<Elements>` (the card form's provider), where `useStripe()` resolves.
 */
const useStripeCardHoldPlacement = <
  TPayload extends CardHoldPlacementPayload = CardHoldPlacementPayload,
>(
  options: Omit<UseCardHoldPlacementOptions<TPayload>, 'authenticate'>,
): UseCardHoldPlacementReturn<TPayload> => {
  const stripe = useStripe()
  const authenticate = useMemo(() => createStripeJsCardHoldAuthenticator(stripe), [stripe])
  return useCardHoldPlacement<TPayload>({ ...options, authenticate })
}

export default useStripeCardHoldPlacement
