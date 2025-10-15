import { graphql } from 'react-relay'

export const MembersListFragment = graphql`
  fragment MembersListFragment on ChatRooms
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 5 }
    q: { type: "String", defaultValue: "" }
    orderBy: { type: "String", defaultValue: "name" }
  )
  @refetchable(queryName: "ChatRoomParticipantsPaginationQuery") {
    id
    memberList: participants(first: $count, after: $cursor, q: $q)
      @connection(key: "ChatRoom_memberList") {
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
