import { graphql } from 'react-relay'

export const NotificationsListQuery = graphql`
  query NotificationsListQuery($count: Int!, $cursor: String, $verbs: String) {
    me {
      id
      ...NotificationsListFragment @arguments(count: $count, cursor: $cursor, verbs: $verbs)
    }
  }
`

export const NotificationsListFragment = graphql`
  fragment NotificationsListFragment on User
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 }
    cursor: { type: "String" }
    verbs: { type: "String" }
  )
  @refetchable(queryName: "notificationsListRefetchable") {
    id
    notificationsUnreadCount
    notifications(first: $count, after: $cursor, verbs: $verbs)
      @connection(key: "user_notifications") {
      edges {
        cursor
        node {
          id
          unread
          ...NotificationItemFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
