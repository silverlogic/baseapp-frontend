import { graphql } from 'react-relay'

export const UnreadMessagesCountFragment = graphql`
  fragment UnreadMessagesCountFragment on ChatRoom {
    id
    unreadMessages {
      count
      markedUnread
    }
  }
`
