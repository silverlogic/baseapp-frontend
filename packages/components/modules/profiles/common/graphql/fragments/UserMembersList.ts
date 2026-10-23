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
    id
    # No app label: the backend prefixes the Profile model's own, so these also work when the
    # project swaps the profile models into its own app. A project that swaps ProfileUserRole into
    # an app other than Profile's passes its own membersListFragment with labelled perms.
    canChangeRole: hasPerm(perm: "change_profileuserrole")
    canAddMember: hasPerm(perm: "add_profileuserrole")
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
      # Client-only id of this connection, so the invite dialog prepends into the list shown.
      __id
      totalCount
      edges {
        cursor
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
