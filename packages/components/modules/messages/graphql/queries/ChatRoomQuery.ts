import { graphql } from 'react-relay'

export const ChatRoomQuery = graphql`
  query ChatRoomQuery($roomId: ID!) {
    chatRoom(id: $roomId) {
      id
      unreadMessagesCount
      participants {
        edges {
          node {
            profile {
              id
              __typename
              name
              image(width: 100, height: 100) {
                url
              }
            }
          }
        }
      }
      unreadMessagesCount
      ...MessagesListFragment
    }
  }
`
