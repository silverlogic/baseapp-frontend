import { graphql } from 'react-relay'

// A separate document from NotificationsListFragment so that the default list never sends the
// `group` argument, which backends without notification setting groups reject.
export const GroupNotificationsListFragmentQuery = graphql`
  fragment GroupNotificationsList_user on User
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 }
    cursor: { type: "String" }
    group: { type: "String!" }
  )
  @refetchable(queryName: "GroupNotificationsListPaginationQuery") {
    id
    notificationsUnreadCount
    notifications(first: $count, after: $cursor, group: $group)
      @connection(key: "GroupNotificationsList_notifications") {
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
