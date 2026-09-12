import { useMemo } from 'react'

import { createTestEnvironment } from '@baseapp-frontend/graphql'

import { GroupDetailsQuery } from '../../../../common'
import {
  TEST_ROOM_ID,
  TRANSPORT_ERROR_MESSAGE,
  addAlanMockData,
  addParticipantsErrorMockData,
  chatRoomsMockData,
  currentProfileMock,
  currentProfileRemovedSubscriptionMockData,
  groupDetailsMockData,
  groupWhereCurrentProfileIsMemberMockData,
  groupWithoutImageMockData,
  groupWithoutMembersMockData,
  nextParticipantsPageMockData,
  otherProfileRemovedSubscriptionMockData,
  paginatedGroupDetailsMockData,
  participantsRefetchMockData,
  profilesSearchEmptyMockData,
  profilesSearchMatchMockData,
  removeAdaMockData,
  removeParticipantErrorMockData,
  updateEmptyErrorsMockData,
  updateSuccessMockData,
  updateTitleErrorMockData,
  updateTopLevelErrorsMockData,
  updateUnknownFieldErrorMockData,
} from '../__mocks__/requests'
import GroupChatEditForTesting from './GroupChatEditForTesting'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * Each story seeds a different `GroupDetailsQuery` payload, since the group's
 * participants, roles and image are what select most of the branches under
 * test. `ChatRoomsQuery` is identical everywhere — the harness runs it only to
 * obtain `allProfilesRef`.
 *
 * Resolvers are queued in dispatch order, and the order is load-bearing:
 * `queueOperationResolver` only ever consults the *head* of its queue, and a
 * resolver that declines an operation stays at the head. The harness renders
 * `useLazyLoadQuery(ChatRoomsQuery)` first and loads `GroupDetailsQuery` from
 * an effect, so queueing them the other way round leaves both pending forever.
 *
 * Everything after mount is resolved by operation *name* rather than by
 * recency. `useRoomListSubscription` receives a fresh `connections: []` array
 * on every render, so it resubscribes on every keystroke — which means the most
 * recent pending operation is frequently a subscription rather than the
 * mutation just committed.
 */
export interface PendingOperation {
  /** The generated operation name, e.g. `UpdateChatRoomMutation`. */
  name: string
  /** What Relay sent, including variables the document never declared. */
  variables: Record<string, any>
  /**
   * The variables the compiled document actually declares. The gap between
   * this and `variables` is how a refetch that cannot filter is observable.
   */
  declaredVariables: string[]
}

export interface GroupChatEditControls {
  /** Every operation Relay still has in flight, oldest first. */
  pendingOperations: () => PendingOperation[]
  /** Answers the group update with `errors: null`. */
  resolveUpdateWithoutErrors: () => void
  /** Answers it with `errors: []` — a success the component may misread. */
  resolveUpdateWithEmptyErrors: () => void
  /** Answers with a payload error naming the form field `title`. */
  resolveUpdateWithTitleError: () => void
  /** Answers with a payload error naming a field the form does not have. */
  resolveUpdateWithUnknownFieldError: () => void
  /** Answers with a GraphQL-level error and a payload reporting none. */
  resolveUpdateWithTopLevelErrors: () => void
  /** Fails the group update at the transport layer. */
  rejectUpdateWithTransportError: () => void
  /** Confirms the removal, deleting the participant edge. */
  resolveMemberRemoval: () => void
  /** Fails the removal with a payload error. */
  resolveMemberRemovalWithPayloadError: () => void
  /** Confirms the addition of the selected profiles. */
  resolveAddParticipants: () => void
  /** Fails the addition with a payload error naming `participants`. */
  resolveAddParticipantsWithPayloadError: () => void
  /** Answers a next-page request for the participants list. */
  resolveParticipantsPage: () => void
  /** Answers a participants refetch with the membership unchanged. */
  resolveParticipantsRefetch: () => void
  /** Answers the profiles refetch with one match. */
  resolveProfilesWithMatch: () => void
  /** Answers the profiles refetch with nothing. */
  resolveProfilesWithNoMatch: () => void
  /** Pushes a room update that removed the signed-in profile. */
  pushRemovalOfCurrentProfile: () => void
  /** Pushes a room update that removed somebody else. */
  pushRemovalOfAnotherProfile: () => void
}

declare global {
  interface Window {
    __groupChatEditControls: GroupChatEditControls
  }
}

type TestEnvironment = ReturnType<typeof createTestEnvironment>

const UPDATE_MUTATION = 'UpdateChatRoomMutation'
const PARTICIPANTS_QUERY = 'ChatRoomParticipantsPaginationQuery'
const PROFILES_QUERY = 'AllProfilesListPaginationQuery'
const ROOM_SUBSCRIPTION = 'useRoomListSubscription'

const makeControls = ({ environment }: TestEnvironment): GroupChatEditControls => {
  const operationNamed = (name: string) =>
    environment.mock.findOperation((operation) => operation.fragment.node.name === name)

  const resolveNamed = (name: string, data: Parameters<typeof environment.mock.resolve>[1]) =>
    environment.mock.resolve(operationNamed(name), data)

  return {
    pendingOperations: () =>
      environment.mock.getAllOperations().map((operation) => ({
        name: operation.fragment.node.name,
        variables: operation.request.variables,
        declaredVariables: (operation.request.node.operation.argumentDefinitions ?? []).map(
          (argument) => argument.name,
        ),
      })),
    resolveUpdateWithoutErrors: () => resolveNamed(UPDATE_MUTATION, updateSuccessMockData),
    resolveUpdateWithEmptyErrors: () => resolveNamed(UPDATE_MUTATION, updateEmptyErrorsMockData),
    resolveUpdateWithTitleError: () => resolveNamed(UPDATE_MUTATION, updateTitleErrorMockData),
    resolveUpdateWithUnknownFieldError: () =>
      resolveNamed(UPDATE_MUTATION, updateUnknownFieldErrorMockData),
    resolveUpdateWithTopLevelErrors: () =>
      resolveNamed(UPDATE_MUTATION, updateTopLevelErrorsMockData),
    rejectUpdateWithTransportError: () =>
      environment.mock.reject(operationNamed(UPDATE_MUTATION), new Error(TRANSPORT_ERROR_MESSAGE)),
    resolveMemberRemoval: () => resolveNamed(UPDATE_MUTATION, removeAdaMockData),
    resolveMemberRemovalWithPayloadError: () =>
      resolveNamed(UPDATE_MUTATION, removeParticipantErrorMockData),
    resolveAddParticipants: () => resolveNamed(UPDATE_MUTATION, addAlanMockData),
    resolveAddParticipantsWithPayloadError: () =>
      resolveNamed(UPDATE_MUTATION, addParticipantsErrorMockData),
    resolveParticipantsPage: () => resolveNamed(PARTICIPANTS_QUERY, nextParticipantsPageMockData),
    resolveParticipantsRefetch: () => resolveNamed(PARTICIPANTS_QUERY, participantsRefetchMockData),
    resolveProfilesWithMatch: () => resolveNamed(PROFILES_QUERY, profilesSearchMatchMockData),
    resolveProfilesWithNoMatch: () => resolveNamed(PROFILES_QUERY, profilesSearchEmptyMockData),
    pushRemovalOfCurrentProfile: () =>
      environment.mock.nextValue(
        operationNamed(ROOM_SUBSCRIPTION),
        currentProfileRemovedSubscriptionMockData,
      ),
    pushRemovalOfAnotherProfile: () =>
      environment.mock.nextValue(
        operationNamed(ROOM_SUBSCRIPTION),
        otherProfileRemovedSubscriptionMockData,
      ),
  }
}

/** Seeds both mount-time queries and installs the control bridge. */
const useBridgedEnvironment = (groupDetails: unknown) =>
  useMemo(() => {
    const testEnvironment = createTestEnvironment()

    // `loadQuery` calls the network *before* `executeWithSource` registers the
    // operation, so a preloaded query is invisible to the resolver queue and
    // stays pending forever. Pre-registering the descriptor is what lets the
    // queue match it — the same workaround the Relay docs give for preloading.
    testEnvironment.environment.mock.queuePendingOperation(GroupDetailsQuery, {
      roomId: TEST_ROOM_ID,
    })

    testEnvironment.queueOperationResolver({ queryName: 'ChatRoomsQuery', data: chatRoomsMockData })
    testEnvironment.queueOperationResolver({ queryName: 'GroupDetailsQuery', data: groupDetails })

    window.__groupChatEditControls = makeControls(testEnvironment)

    return testEnvironment.environment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

/** The signed-in profile is the group's only admin, and the group has an avatar. */
export const Default = () => {
  const environment = useBridgedEnvironment(groupDetailsMockData)

  return (
    <GroupChatEditForTesting
      environment={environment}
      context={{ parameters: { initialProfile: currentProfileMock } } as any}
      roomId={TEST_ROOM_ID}
    />
  )
}

/** A group with no avatar, so the upload button offers to add one. */
export const WithoutImage = () => {
  const environment = useBridgedEnvironment(groupWithoutImageMockData)

  return (
    <GroupChatEditForTesting
      environment={environment}
      context={{ parameters: { initialProfile: currentProfileMock } } as any}
      roomId={TEST_ROOM_ID}
    />
  )
}

/** No `roomId`, which makes every submit handler bail out before committing. */
export const WithoutRoomId = () => {
  const environment = useBridgedEnvironment(groupDetailsMockData)

  return (
    <GroupChatEditForTesting
      environment={environment}
      context={{ parameters: { initialProfile: currentProfileMock } } as any}
    />
  )
}

/** No current profile — `WrappedEditGroup` renders nothing at all. */
export const WithoutProfile = () => {
  const environment = useBridgedEnvironment(groupDetailsMockData)

  return <GroupChatEditForTesting environment={environment} roomId={TEST_ROOM_ID} />
}

/** A group whose participants connection came back empty. */
export const WithoutMembers = () => {
  const environment = useBridgedEnvironment(groupWithoutMembersMockData)

  return (
    <GroupChatEditForTesting
      environment={environment}
      context={{ parameters: { initialProfile: currentProfileMock } } as any}
      roomId={TEST_ROOM_ID}
    />
  )
}

/** A full first page of participants with another page behind it. */
export const PaginatedMembers = () => {
  const environment = useBridgedEnvironment(paginatedGroupDetailsMockData)

  return (
    <GroupChatEditForTesting
      environment={environment}
      context={{ parameters: { initialProfile: currentProfileMock } } as any}
      roomId={TEST_ROOM_ID}
    />
  )
}

/** The signed-in profile is a plain member and somebody else is the admin. */
export const CurrentProfileIsMember = () => {
  const environment = useBridgedEnvironment(groupWhereCurrentProfileIsMemberMockData)

  return (
    <GroupChatEditForTesting
      environment={environment}
      context={{ parameters: { initialProfile: currentProfileMock } } as any}
      roomId={TEST_ROOM_ID}
    />
  )
}
