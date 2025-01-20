import { graphql } from 'react-relay'

export const MembersListFragment = graphql`
  fragment MembersListFragment on ChatRoom
  @argumentDefinitions(cursor: { type: "String" }, count: { type: "Int", defaultValue: 5 })
  @refetchable(queryName: "ChatRoomParticipantsPaginationQuery") {
    id
    participants(first: $count, after: $cursor) @connection(key: "ChatRoom_participants") {
      edges {
        node {
          id
          profile {
            id
            ...ProfileItemFragment
          }
          role
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
