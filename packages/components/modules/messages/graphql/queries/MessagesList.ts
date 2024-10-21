import { graphql } from 'react-relay'

export const fragmentQuery = graphql`
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
