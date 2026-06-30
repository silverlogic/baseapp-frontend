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
    canAddMember: hasPerm(perm: "baseapp_profiles.add_profileuserrole")
    ...ProfileItemFragment
    # The owner row must show the owner *user's* profile, not the org profile itself.
    owner {
      id
      profile {
        ...ProfileItemFragment
      }
    }
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
