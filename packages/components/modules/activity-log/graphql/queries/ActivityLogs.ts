import { graphql } from 'react-relay'

export const ActivityLogsQuery = graphql`
  query ActivityLogsQuery($first: Int, $after: String) {
    activityLogGroups(intervalMinutes: 15) {
      logs {
        edges {
          node {
            id
            verb
            createdAt
            url
            user {
              id
              fullName
              email
              avatar(height: 48, width: 48) {
                url
              }
            }
          }
        }
      }
    }
  }
`
