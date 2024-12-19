import { graphql } from 'react-relay'

export const UserMembersListPaginationQuery = graphql`
  query UserMembersListPaginationQuery(
    $count: Int = 10
    $cursor: String
    $orderBy: String
    $profileId: ID!
  ) {
    profile(id: $profileId) {
      pk
      ...UserMembersListFragment @arguments(count: $count, cursor: $cursor, orderBy: $orderBy)
    }
  }
`

export const UserMembersListFragment = graphql`
  fragment UserMembersListFragment on Profile
  @refetchable(queryName: "userMembersListPaginationRefetchable")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 }
    cursor: { type: "String" }
    orderBy: { type: "String" }
  ) {
    canChangeRole: hasPerm(perm: "baseapp_profiles.change_profileuserrole")
    ...ProfileItemFragment
    members(first: $count, after: $cursor, orderBy: $orderBy)
      @connection(key: "UserMembersFragment_members", filters: ["orderBy"]) {
      totalCount
      edges {
        node {
          ...MemberItemFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`
