import { graphql } from 'react-relay'

export const RoomFragment = graphql`
  fragment RoomFragment on ChatRoom {
    id
    unreadMessagesCount
    image(width: 100, height: 100) {
      url
    }
    lastMessageTime
    lastMessage {
      id
      content
    }
    title
    participants {
      totalCount
      edges {
        node {
          id
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
    ...MessagesListFragment
  }
`
