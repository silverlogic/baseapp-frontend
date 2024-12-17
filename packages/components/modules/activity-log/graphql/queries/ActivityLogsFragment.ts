import { graphql } from 'react-relay'

export const ActivityLogFragment = graphql`
  fragment ActivityLogsFragment on Query
  @refetchable(queryName: "ActivityLogsPaginationQuery")
  @argumentDefinitions(count: { type: "Int", defaultValue: 10 }, cursor: { type: "String" }) {
    activityLogs(first: $count, after: $cursor) @connection(key: "ActivityLogs_activityLogs") {
      edges {
        node {
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`
