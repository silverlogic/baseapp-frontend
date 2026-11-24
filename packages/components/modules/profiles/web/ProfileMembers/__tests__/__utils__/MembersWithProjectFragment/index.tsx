import { Typography } from '@mui/material'
import { graphql, useFragment } from 'react-relay'

import { MembersWithProjectFragmentRowFragment$key } from '../../../../../../../__generated__/MembersWithProjectFragmentRowFragment.graphql'
import DefaultMemberItem from '../../../MemberItem'
import type { MemberItemProps } from '../../../MemberItem/types'

/**
 * What a project writes to show its own `ProfileUserRole` fields on each row: a members
 * pagination fragment (with an extra `status` argument) that spreads the project's row fragment,
 * the query that loads it, and a `MemberItem` reading the row fragment from `memberRef`.
 */
export const MembersWithProjectFragmentListFragment = graphql`
  fragment MembersWithProjectFragmentListFragment on Profile
  @refetchable(queryName: "MembersWithProjectFragmentListPaginationQuery")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 }
    cursor: { type: "String" }
    orderBy: { type: "String" }
    q: { type: "String" }
    status: { type: "ProfileRoleStatus" }
  ) {
    id
    canChangeRole: hasPerm(perm: "change_profileuserrole")
    canAddMember: hasPerm(perm: "add_profileuserrole")
    ...ProfileItemFragment
    owner {
      id
      profile {
        ...ProfileItemFragment
      }
    }
    members(first: $count, after: $cursor, orderBy: $orderBy, q: $q, status: $status)
      @connection(key: "MembersWithProjectFragment_members", filters: ["orderBy", "q", "status"]) {
      __id
      totalCount
      edges {
        cursor
        node {
          ...MemberItemFragment
          ...MembersWithProjectFragmentRowFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

export const MembersWithProjectFragmentQuery = graphql`
  query MembersWithProjectFragmentQuery(
    $count: Int = 10
    $cursor: String
    $orderBy: String
    $profileId: ID!
    $q: String
    $status: ProfileRoleStatus
  ) {
    profile(id: $profileId) {
      id
      ...MembersWithProjectFragmentListFragment
        @arguments(count: $count, cursor: $cursor, orderBy: $orderBy, q: $q, status: $status)
    }
  }
`

const MembersWithProjectFragmentRowFragment = graphql`
  fragment MembersWithProjectFragmentRowFragment on ProfileUserRole {
    invitedFirstName
    invitedLastName
  }
`

export const ProjectMemberItem = ({ memberRef, ...props }: MemberItemProps) => {
  const row = useFragment(
    MembersWithProjectFragmentRowFragment,
    memberRef as MembersWithProjectFragmentRowFragment$key | null | undefined,
  )

  return (
    <>
      <DefaultMemberItem {...props} />
      {row?.invitedFirstName && (
        <Typography variant="caption">
          Invited as {row.invitedFirstName} {row.invitedLastName}
        </Typography>
      )}
    </>
  )
}
