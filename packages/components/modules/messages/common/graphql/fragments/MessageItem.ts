import { graphql } from 'react-relay'

export const MessageItemFragment = graphql`
  fragment MessageItemFragment on Message {
    id
    content
    created
    deleted
    extraData
    inReplyTo {
      id
    }
    isRead
    profile {
      id
    }
    verb
  }
`
