import { graphql } from 'react-relay'

export const ActivityLogsQuery = graphql`
  query ActivityLogsQuery($first: Int, $after: String) {
    activityLogGroups(intervalMinutes: 15) {
      lastActivityTimestamp
      logs {
        id
        verb
        createdAt
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
  }
`
