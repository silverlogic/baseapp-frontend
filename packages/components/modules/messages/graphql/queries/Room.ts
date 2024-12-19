import { graphql } from 'react-relay'

export const RoomFragment = graphql`
  fragment RoomFragment on ChatRoom {
    id
    unreadMessages {
      count
      markedUnread
    }
    lastMessageTime
    lastMessage {
      id
      content
    }
    ...ChatRoomHeaderFragment
    ...MessagesListFragment
  }
`
