import { graphql } from 'react-relay'

export const NotificationSettingToggleMutation = graphql`
  mutation NotificationSettingToggleMutation($input: NotificationSettingToggleInput!) {
    notificationSettingToggle(input: $input) {
      notificationSetting {
        user {
          ...NotificationsSettingsFragment
        }
      }
    }
  }
`
