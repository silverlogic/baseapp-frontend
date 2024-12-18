import { graphql } from 'react-relay'

export const RoomFragment = graphql`
  fragment RoomFragment on ChatRoom {
    id
    unreadMessagesCount
    lastMessageTime
    lastMessage {
      id
      content
    }
    ...ChatRoomHeaderFragment
    ...MessagesListFragment
  }
`
