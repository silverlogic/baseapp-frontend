import { graphql } from 'react-relay'

export const ActivityLogsQuery = graphql`
  query ActivityLogsQuery($first: Int, $after: String) {
    ...ActivityLogsFragment @arguments(count: $first, cursor: $after)
  }
`
