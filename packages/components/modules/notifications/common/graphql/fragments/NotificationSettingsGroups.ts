import { graphql } from 'react-relay'

export const NotificationSettingsGroupsUserFragmentQuery = graphql`
  fragment NotificationSettingsGroups_user on User {
    id
    notificationSettingGroups {
      key
      label
      description
      isLocked
      channels {
        channel
        isActive
      }
    }
  }
`
