import { graphql } from 'react-relay'

export const MessageItemFragment = graphql`
  fragment MessageItemFragment on Message {
    id
    content
    created
    extraData
    inReplyTo {
      id
    }
    isRead
    pk
    profile {
      id
    }
    verb
  }
`
