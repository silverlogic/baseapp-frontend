import { graphql } from 'react-relay'

export const MessagesListFragment = graphql`
  fragment MessagesListFragment on ChatRoom
  @argumentDefinitions(count: { type: "Int", defaultValue: 20 }, cursor: { type: "String" })
  @refetchable(queryName: "ChatRoomMessagesListPaginationQuery") {
    id
    allMessages(first: $count, after: $cursor) @connection(key: "chatRoom_allMessages") {
      edges {
        node {
          id
          content
          created
          profile {
            id
          }
          ...MessageItemFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
