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

      ... on User {
        avatar(width: 48, height: 48) {
          url
        }
        firstName
        lastName
      }
    }

    target {
      id
      __typename
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
