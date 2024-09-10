import { graphql } from 'react-relay'

export const NotificationsPopoverQuery = graphql`
  query NotificationsPopoverQuery {
    me {
      ...NotificationUserMenuFragment
    }
  }
`
