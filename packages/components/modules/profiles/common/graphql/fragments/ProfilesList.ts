import { graphql } from 'react-relay'

export const ProfilesListFragment = graphql`
  fragment ProfilesListFragment on User
  @argumentDefinitions(count: { type: "Int", defaultValue: 10 }, cursor: { type: "String" })
  @refetchable(queryName: "profilesListRefetchable") {
    id
    profiles(first: $count, after: $cursor) @connection(key: "ProfilesListFragment_profiles") {
      edges {
        cursor
        node {
          id
          ...ProfileItemFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
