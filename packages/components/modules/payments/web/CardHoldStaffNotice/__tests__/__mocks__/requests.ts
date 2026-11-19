/**
 * Deterministic fixtures — no `faker`, so the spec imports them directly for expected values.
 * Every `resolve*` fixture is a whole GraphQL response (`{ data }` / `{ errors }`).
 */
export const CARD_HOLD_ID = 'Q2FyZEhvbGQ6MQ=='

export const FAILURE_REASON = 'card_declined'

/** Stripe's code when a retry is declined again. */
export const RETRY_FAILURE_REASON = 'insufficient_funds'

export const RETRIES_LEFT = 3

export const GRAPHQL_ERROR_MESSAGE = 'This card hold has already been decided.'

export const TRANSPORT_ERROR_MESSAGE = 'Network request failed'

export interface CardHoldMock {
  status: string
  kept: boolean
  failureReason: string | null
  retriesLeft: number | null
  paymentStatus: string
  /** Whether the viewer holds `change_cardhold`. */
  canDecide: boolean
}

export const failedHoldMock: CardHoldMock = {
  status: 'failed',
  kept: false,
  failureReason: FAILURE_REASON,
  retriesLeft: RETRIES_LEFT,
  paymentStatus: 'unpaid',
  canDecide: true,
}

/** Captured, but the charge for the difference above the hold was declined. */
export const partiallyPaidHoldMock: CardHoldMock = {
  status: 'captured',
  kept: false,
  failureReason: null,
  retriesLeft: null,
  paymentStatus: 'partially_paid',
  canDecide: true,
}

const cardHoldNode = (hold: CardHoldMock) => ({ __typename: 'CardHold', id: CARD_HOLD_ID, ...hold })

export const cardHoldQueryMockData = (hold: CardHoldMock) => ({
  data: { cardHold: cardHoldNode(hold) },
})

export const cardHoldKeepSuccessMockData = {
  data: {
    cardHoldKeep: {
      cardHold: cardHoldNode({ ...failedHoldMock, kept: true }),
      errors: null,
    },
  },
}

export const cardHoldCancelSuccessMockData = {
  data: {
    cardHoldCancel: {
      cardHold: cardHoldNode({ ...failedHoldMock, status: 'released' }),
      errors: null,
    },
  },
}

/** What graphene answers for a forbidden or already-decided hold: a null payload plus `errors`. */
export const cardHoldKeepGraphqlErrorMockData = {
  data: { cardHoldKeep: null },
  errors: [{ message: GRAPHQL_ERROR_MESSAGE, path: ['cardHoldKeep'] }],
}

export const cardHoldCancelGraphqlErrorMockData = {
  data: { cardHoldCancel: null },
  errors: [{ message: GRAPHQL_ERROR_MESSAGE, path: ['cardHoldCancel'] }],
}

/** The retry was placed: the hold is no longer failed, so it has no retries count. */
export const cardHoldRetryAuthorizedMockData = {
  data: {
    cardHoldRetry: {
      cardHold: cardHoldNode({
        ...failedHoldMock,
        status: 'authorized',
        failureReason: null,
        retriesLeft: null,
      }),
      errors: null,
    },
  },
}

/** The order's hold date moved into the future: the retry scheduled the hold for later. */
export const cardHoldRetryScheduledMockData = {
  data: {
    cardHoldRetry: {
      cardHold: cardHoldNode({
        ...failedHoldMock,
        status: 'scheduled',
        failureReason: null,
        retriesLeft: null,
      }),
      errors: null,
    },
  },
}

/** The retry ran and the card was declined again: still failed, one retry fewer. */
export const cardHoldRetryFailedAgainMockData = {
  data: {
    cardHoldRetry: {
      cardHold: cardHoldNode({
        ...failedHoldMock,
        failureReason: RETRY_FAILURE_REASON,
        retriesLeft: RETRIES_LEFT - 1,
      }),
      errors: null,
    },
  },
}

export const cardHoldRetryGraphqlErrorMockData = {
  data: { cardHoldRetry: null },
  errors: [{ message: GRAPHQL_ERROR_MESSAGE, path: ['cardHoldRetry'] }],
}

export const cardHoldMarkPaidSuccessMockData = {
  data: {
    cardHoldMarkPaid: {
      cardHold: cardHoldNode({ ...partiallyPaidHoldMock, paymentStatus: 'paid' }),
      errors: null,
    },
  },
}

export const cardHoldMarkPaidGraphqlErrorMockData = {
  data: { cardHoldMarkPaid: null },
  errors: [{ message: GRAPHQL_ERROR_MESSAGE, path: ['cardHoldMarkPaid'] }],
}
