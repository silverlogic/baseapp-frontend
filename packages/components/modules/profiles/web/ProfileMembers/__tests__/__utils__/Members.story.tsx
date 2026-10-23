import { useMemo } from 'react'

import { createTestEnvironment } from '@baseapp-frontend/graphql'

import {
  DEACTIVATE_MEMBER_OPTION,
  MEMBER_ACTIONS,
  inactiveMemberActionOptions,
  roleOptions,
} from '../../constants'
import {
  addableMembersListMockData,
  allRolesMembersListMockData,
  deactivateMemberMockData,
  fullMembersListMockData,
  fullMembersListNextPageMockData,
  ownerlessMembersListMockData,
  projectFragmentMembersListMockData,
  reactivateMemberMockData,
  simpleMembersListMockData,
  updateMemberRoleMockData,
} from '../__mocks__/requests'
import MembersForTesting from './MembersForTesting'
import {
  MembersWithProjectFragmentListFragment,
  MembersWithProjectFragmentQuery,
  ProjectMemberItem,
} from './MembersWithProjectFragment'

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
  resolveDeactivateMember: () => void
  resolveReactivateMember: () => void
}

declare global {
  interface Window {
    __membersControls: MembersControls
    /** The variables the members query was sent with (`ProjectFragment` story). */
    __membersQueryVariables?: Record<string, unknown>
  }
}

/** The signed-in profile is the owner and may change other members' roles. */
const ownerContext = {
  parameters: {
    initialProfile: {
      canChangeRole: true,
      id: 'UHJvZmlsZTox',
      name: 'Owner Profile',
      image: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/react.svg',
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
      resolveDeactivateMember: () =>
        testEnvironment.resolveMostRecentOperation({ data: deactivateMemberMockData }),
      resolveReactivateMember: () =>
        testEnvironment.resolveMostRecentOperation({ data: reactivateMemberMockData }),
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

/** A profile without an owner: no owner row, only its admin. */
export const Ownerless = () => {
  const environment = useSeededEnvironment(ownerlessMembersListMockData)

  return <MembersForTesting environment={environment} context={ownerContext} />
}

/** Project labels, the opt-in Deactivate entry and the opt-in menu of an INACTIVE member. */
export const DeactivationWithLabels = () => {
  const environment = useSeededEnvironment(simpleMembersListMockData)

  return (
    <MembersForTesting
      environment={environment}
      context={ownerContext}
      roleOptions={[
        ...roleOptions.filter(({ value }) => value !== MEMBER_ACTIONS.remove),
        DEACTIVATE_MEMBER_OPTION,
      ]}
      inactiveMemberOptions={inactiveMemberActionOptions}
      roleLabels={{ OWNER: 'Proprietor', MANAGER: 'Member' }}
      statusLabels={{ INACTIVE: 'Deactivated' }}
    />
  )
}

const StubInviteMemberDialog = ({ open, connections }: { open: boolean; connections: string[] }) =>
  open ? (
    <div role="dialog" data-connections={connections.join(' ')}>
      Project invite dialog for {connections.length} list
    </div>
  ) : null

/** "Add Member" opens the dialog the project injects. */
export const CustomInviteDialog = () => {
  const environment = useSeededEnvironment(addableMembersListMockData)

  return (
    <MembersForTesting
      environment={environment}
      context={ownerContext}
      InviteMemberDialog={StubInviteMemberDialog}
    />
  )
}

/**
 * A project members query and fragment (with a `status` argument and the project's own row
 * fragment) and a custom `MemberItem` that reads the row fragment from `memberRef`.
 */
export const ProjectFragment = () => {
  const environment = useMemo(() => {
    const testEnvironment = createTestEnvironment()

    testEnvironment.environment.mock.queueOperationResolver((operation) => {
      window.__membersQueryVariables = operation.request.variables
      return projectFragmentMembersListMockData
    })

    return testEnvironment.environment
  }, [])

  return (
    <MembersForTesting
      environment={environment}
      context={ownerContext}
      membersQuery={MembersWithProjectFragmentQuery}
      membersQueryVariables={{ status: 'ACTIVE' }}
      membersListFragment={MembersWithProjectFragmentListFragment}
      MemberItem={ProjectMemberItem}
      InviteMemberDialog={StubInviteMemberDialog}
    />
  )
}
