import { graphql } from 'react-relay'

export const ProfilesListQuery = graphql`
  query ProfilesListQuery($count: Int!, $cursor: String) {
    me {
      id
      ...ProfilesListFragment @arguments(count: $count, cursor: $cursor)
    }
  }
`
