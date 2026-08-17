import { useMemo } from 'react'

import { createTestEnvironment } from '@baseapp-frontend/graphql'

import {
  allRolesMembersListMockData,
  fullMembersListMockData,
  fullMembersListNextPageMockData,
  simpleMembersListMockData,
  updateMemberRoleMockData,
} from '../__mocks__/requests'
import MembersForTesting from './MembersForTesting'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * Ported from `__tests__/Members.cy.tsx`. Each of its four tests seeds a
 * different `UserMembersListPaginationQuery` payload, so each becomes one story.
 *
 * The mocks here are deterministic (no faker), so the spec imports them directly
 * rather than reading fixtures back from the browser — see AccountPopover.story
 * for the faker case that does need a bridge.
 *
 * Controls are namespaced per component: two stories declaring the same
 * `window` key with different shapes is a type collision the tests cannot catch.
 */
export interface MembersControls {
  resolveUpdateMemberRole: () => void
  resolveNextPage: () => void
}

declare global {
  interface Window {
    __membersControls: MembersControls
  }
}

/** The signed-in profile is the owner and may change other members' roles. */
const ownerContext = {
  parameters: {
    initialProfile: {
      canChangeRole: true,
      id: 'UHJvZmlsZTox',
      name: 'Owner Profile',
      image: { url: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/react.svg' },
      urlPath: null,
    },
  },
} as any

const useSeededEnvironment = (data: unknown) =>
  useMemo(() => {
    const testEnvironment = createTestEnvironment()

    testEnvironment.queueOperationResolver({
      queryName: 'UserMembersListPaginationQuery',
      data,
    })

    window.__membersControls = {
      resolveUpdateMemberRole: () =>
        testEnvironment.resolveMostRecentOperation({ data: updateMemberRoleMockData }),
      resolveNextPage: () =>
        testEnvironment.resolveMostRecentOperation({ data: fullMembersListNextPageMockData }),
    }

    return testEnvironment.environment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

/** Pending, inactive, owner and active members — covers every status badge. */
export const AllRoles = () => {
  const environment = useSeededEnvironment(allRolesMembersListMockData)

  return <MembersForTesting environment={environment} context={ownerContext} />
}

/** Two members, with the owner able to change roles. */
export const RoleChange = () => {
  const environment = useSeededEnvironment(simpleMembersListMockData)

  return <MembersForTesting environment={environment} context={ownerContext} />
}

/** Six members with a next page available, for the pagination test. */
export const Paginated = () => {
  const environment = useSeededEnvironment(fullMembersListMockData)

  return <MembersForTesting environment={environment} />
}

/** Two members and no current profile, for the search test. */
export const Searchable = () => {
  const environment = useSeededEnvironment(simpleMembersListMockData)

  return <MembersForTesting environment={environment} />
}
