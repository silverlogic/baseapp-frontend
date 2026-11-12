import { useMemo, useState } from 'react'

import { createTestEnvironment } from '@baseapp-frontend/graphql'

import {
  type CardHoldMock,
  TRANSPORT_ERROR_MESSAGE,
  cardHoldCancelGraphqlErrorMockData,
  cardHoldCancelSuccessMockData,
  cardHoldKeepGraphqlErrorMockData,
  cardHoldKeepSuccessMockData,
  cardHoldQueryMockData,
  failedHoldMock,
} from '../__mocks__/requests'
import type { CardHoldStaffDecision } from '../../types'
import CardHoldStaffActionsForTesting from './CardHoldStaffActionsForTesting'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * The hold is seeded from `mount()` props into a Relay environment created here in the
 * browser; the mutation answers are driven through `window.__cardHoldStaffActionsControls`.
 * `onDecided` calls are recorded into a hidden form, as a count and the last decision.
 */
export interface CardHoldStaffActionsControls {
  /** The operation Relay has in flight, or `null` before anything is committed. */
  getLastOperation: () => { name: string; variables: Record<string, any> } | null
  /** How many operations are still unresolved. */
  pendingOperationCount: () => number
  resolveKeep: () => void
  resolveCancel: () => void
  resolveKeepWithGraphqlError: () => void
  resolveCancelWithGraphqlError: () => void
  rejectWithTransportError: () => void
}

declare global {
  interface Window {
    __cardHoldStaffActionsControls: CardHoldStaffActionsControls
  }
}

type TestEnvironment = ReturnType<typeof createTestEnvironment>

const makeControls = ({
  environment,
  resolveMostRecentOperation,
  rejectMostRecentOperation,
}: TestEnvironment): CardHoldStaffActionsControls => ({
  getLastOperation: () => {
    try {
      const operation = environment.mock.getMostRecentOperation()
      return {
        name: operation.fragment.node.name,
        variables: operation.request.variables,
      }
    } catch {
      return null
    }
  },
  pendingOperationCount: () => environment.mock.getAllOperations().length,
  resolveKeep: () => resolveMostRecentOperation({ data: cardHoldKeepSuccessMockData }),
  resolveCancel: () => resolveMostRecentOperation({ data: cardHoldCancelSuccessMockData }),
  resolveKeepWithGraphqlError: () =>
    resolveMostRecentOperation({ data: cardHoldKeepGraphqlErrorMockData }),
  resolveCancelWithGraphqlError: () =>
    resolveMostRecentOperation({ data: cardHoldCancelGraphqlErrorMockData }),
  rejectWithTransportError: () => rejectMostRecentOperation(TRANSPORT_ERROR_MESSAGE),
})

const useSeededEnvironment = (hold: CardHoldMock) =>
  useMemo(() => {
    const testEnvironment = createTestEnvironment()

    testEnvironment.queueOperationResolver({
      queryName: 'CardHoldStaffActionsForTestingQuery',
      data: cardHoldQueryMockData(hold),
    })

    window.__cardHoldStaffActionsControls = makeControls(testEnvironment)

    return testEnvironment.environment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

/** A hold seeded from props (a failed, undecided one by default). */
export const Default = (props: Partial<CardHoldMock>) => {
  const environment = useSeededEnvironment({ ...failedHoldMock, ...props })
  const [decidedCount, setDecidedCount] = useState(0)
  const [lastDecision, setLastDecision] = useState('')

  return (
    <div style={{ padding: 16, maxWidth: 480 }}>
      <CardHoldStaffActionsForTesting
        environment={environment}
        onDecided={(decision: CardHoldStaffDecision) => {
          setDecidedCount((count) => count + 1)
          setLastDecision(decision)
        }}
      />
      <form hidden>
        <input data-testid="decided-count" readOnly value={String(decidedCount)} />
        <input data-testid="last-decision" readOnly value={lastDecision} />
      </form>
    </div>
  )
}
