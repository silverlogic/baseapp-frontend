import { graphql } from 'react-relay'

export const GroupNotificationsListQuery = graphql`
  query GroupNotificationsListQuery($count: Int!, $cursor: String, $group: String!) {
    me {
      id
      ...GroupNotificationsList_user @arguments(count: $count, cursor: $cursor, group: $group)
    }
  }
`
