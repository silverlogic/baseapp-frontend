import { useMemo } from 'react'

import { createTestEnvironment } from '@baseapp-frontend/graphql'

import {
  TRANSPORT_ERROR_MESSAGE,
  currentProfileMock,
  sendMessageBodyErrorsMockData,
  sendMessageEmptyErrorsMockData,
  sendMessageInputFieldErrorsMockData,
  sendMessageSuccessMockData,
} from '../__mocks__/requests'
import SendMessageForTesting from './SendMessageForTesting'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * `SendMessage` bails out of `onSubmit` when there is no current profile, so the
 * profile is seeded through the harness's `context.parameters.initialProfile` —
 * the injection point `withAuthenticationTestProviders` reads.
 *
 * The Relay environment is created here in the browser and every resolution
 * point a spec needs is exposed on `window.__sendMessageControls`. The key is
 * namespaced per component: `Comments.story.tsx` already owns `__relayControls`,
 * and two stories declaring the same key with different shapes is a collision
 * only `tsc` catches.
 */
export interface SendMessageControls {
  /** The operation Relay has in flight, or `null` before anything is committed. */
  getLastOperation: () => { name: string; variables: Record<string, any> } | null
  /** How many operations are still unresolved — 0 once every one has been answered. */
  pendingOperationCount: () => number
  /** Answers the send with `errors: null`. */
  resolveWithoutErrors: () => void
  /** Answers the send with `errors: []` — a success the component may misread. */
  resolveWithEmptyErrors: () => void
  /** Answers with a payload error naming the form field `body`. */
  resolveWithBodyFieldError: () => void
  /** Answers with a payload error naming the GraphQL input field `content`. */
  resolveWithInputFieldError: () => void
  /** Fails the send at the transport layer. */
  rejectWithTransportError: () => void
}

declare global {
  interface Window {
    __sendMessageControls: SendMessageControls
  }
}

type TestEnvironment = ReturnType<typeof createTestEnvironment>

const makeControls = ({
  environment,
  resolveMostRecentOperation,
  rejectMostRecentOperation,
}: TestEnvironment): SendMessageControls => ({
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
  resolveWithoutErrors: () => resolveMostRecentOperation({ data: sendMessageSuccessMockData }),
  resolveWithEmptyErrors: () =>
    resolveMostRecentOperation({ data: sendMessageEmptyErrorsMockData }),
  resolveWithBodyFieldError: () =>
    resolveMostRecentOperation({ data: sendMessageBodyErrorsMockData }),
  resolveWithInputFieldError: () =>
    resolveMostRecentOperation({ data: sendMessageInputFieldErrorsMockData }),
  rejectWithTransportError: () => rejectMostRecentOperation(TRANSPORT_ERROR_MESSAGE),
})

/** Installs the control bridge and hands the environment to the harness. */
const useBridgedEnvironment = () =>
  useMemo(() => {
    const testEnvironment = createTestEnvironment()

    window.__sendMessageControls = makeControls(testEnvironment)

    return testEnvironment.environment
  }, [])

/** A signed-in profile and an empty message field. */
export const Default = () => {
  const environment = useBridgedEnvironment()

  return (
    <SendMessageForTesting
      environment={environment}
      context={{ parameters: { initialProfile: currentProfileMock } } as any}
    />
  )
}

/** No current profile — `onSubmit` bails out before committing anything. */
export const WithoutProfile = () => {
  const environment = useBridgedEnvironment()

  return <SendMessageForTesting environment={environment} />
}
