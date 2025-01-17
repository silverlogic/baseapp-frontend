import { graphql } from 'react-relay'

export const MessageItemFragment = graphql`
  fragment MessageItemFragment on Message {
    id
    content
    contentLinkedProfile {
      id
      name
    }
    created
    extraData
    inReplyTo {
      id
    }
    isRead
    messageType
    pk
    profile {
      id
    }
    verb
  }
`
