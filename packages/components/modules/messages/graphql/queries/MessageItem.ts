import { graphql } from 'react-relay'

export const MessageItemFragment = graphql`
  fragment MessageItemFragment on Message {
    id
    inReplyTo {
      id
    }
    content
    pk
    created
  }
`
