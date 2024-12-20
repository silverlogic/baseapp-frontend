import { graphql } from 'react-relay'

export const MessagesListFragment = graphql`
  fragment MessagesListFragment on ChatRoom
  @argumentDefinitions(count: { type: "Int", defaultValue: 20 }, cursor: { type: "String" })
  @refetchable(queryName: "ChatRoomMessagesListPaginationQuery") {
    id
    participants {
      totalCount
    }
    unreadMessages {
      count
      markedUnread
    }
    allMessages(first: $count, after: $cursor) @connection(key: "chatRoom_allMessages") {
      totalCount
      edges {
        node {
          id
          created
          profile {
            id
            name
            image(height: 32, width: 32) {
              url
            }
          }
          isRead
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
