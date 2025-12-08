import { graphql } from 'react-relay'

export const NotificationItemFragment = graphql`
  fragment NotificationItemFragment on Notification {
    id
    pk
    unread
    timestamp
    level
    verb
    description
    data

    actor {
      id
      name
      image(width: 48, height: 48) {
        url
      }
    }

    target {
      id
      __typename

      ... on Comment {
        id
        body
      }
    }

    actionObject {
      id
      __typename

      ... on Comment {
        id
        body
      }
    }
  }
`
