import { graphql } from 'react-relay'

export const NotificationUserMenuFragment = graphql`
  fragment NotificationUserMenuFragment on User {
    id
    notificationsUnreadCount
  }
`
