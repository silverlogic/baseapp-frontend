import { graphql } from 'react-relay'

export const UserMembersListFragment = graphql`
  fragment UserMembersListFragment on Profile
  @refetchable(queryName: "userMembersListPaginationRefetchable")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 }
    cursor: { type: "String" }
    orderBy: { type: "String" }
    q: { type: "String" }
  ) {
    canChangeRole: hasPerm(perm: "baseapp_profiles.change_profileuserrole")
    ...ProfileItemFragment
    members(first: $count, after: $cursor, orderBy: $orderBy, q: $q)
      @connection(key: "UserMembersFragment_members", filters: ["orderBy", "q"]) {
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
