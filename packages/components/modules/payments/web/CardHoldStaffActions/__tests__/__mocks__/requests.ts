/**
 * Deterministic fixtures — no `faker`, so the spec imports them directly for expected values.
 * Every `resolve*` fixture is a whole GraphQL response (`{ data }` / `{ errors }`).
 */
export const CARD_HOLD_ID = 'Q2FyZEhvbGQ6MQ=='

export const FAILURE_REASON = 'card_declined'

export const GRAPHQL_ERROR_MESSAGE = 'This card hold has already been decided.'

export const TRANSPORT_ERROR_MESSAGE = 'Network request failed'

export interface CardHoldMock {
  status: string
  kept: boolean
  failureReason: string | null
}

export const failedHoldMock: CardHoldMock = {
  status: 'failed',
  kept: false,
  failureReason: FAILURE_REASON,
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
