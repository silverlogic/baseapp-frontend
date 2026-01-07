import { graphql } from 'react-relay'

export const profilesListQuery = graphql`
  query CreateRoomPageQuery($count: Int, $cursor: String) {
    ...AllProfilesListFragment @arguments(count: $count, cursor: $cursor)
  }
`
