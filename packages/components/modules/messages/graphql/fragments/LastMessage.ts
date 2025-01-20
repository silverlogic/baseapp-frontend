import { graphql } from 'react-relay'

export const LastMessageFragment = graphql`
  fragment LastMessageFragment on ChatRoom {
    id
    lastMessageTime
    lastMessage {
      id
      content
    }
  }
`
