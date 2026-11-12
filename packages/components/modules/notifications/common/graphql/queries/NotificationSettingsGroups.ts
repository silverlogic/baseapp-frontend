import { graphql } from 'react-relay'

export const NotificationSettingsGroupsQuery = graphql`
  query NotificationSettingsGroupsQuery {
    me {
      ...NotificationSettingsGroups_user
    }
  }
`
