import { graphql } from 'react-relay'

export const NotificationItemFragment = graphql`
  fragment NotificationItemFragment on Notification {
    id
    unread
    timestamp
    level
    verb
    description
    data

    actor {
      id

      ... on User {
        avatar(width: 48, height: 48) {
          url
        }
        fullName
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
