import { graphql } from 'react-relay'

export const ActivityLogSubscription = graphql`
  subscription ActivityLogSubscription {
    activityLog {
      id
      createdAt
      verb
      url
      user {
        id
        fullName
        email
        avatar(width: 48, height: 48) {
          url
        }
      }
    }
  }
`
