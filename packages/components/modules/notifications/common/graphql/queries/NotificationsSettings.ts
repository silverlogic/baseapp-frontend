import { graphql } from 'react-relay'

export const NotificationsSettingsQuery = graphql`
  query NotificationsSettingsQuery {
    me {
      ...NotificationsSettingsFragment
    }
  }
`

export const NotificationsSettingsFragment = graphql`
  fragment NotificationsSettingsFragment on User {
    AllPush: isNotificationSettingActive(verb: "ALL", channel: PUSH)
    AllApp: isNotificationSettingActive(verb: "ALL", channel: IN_APP)
    AllEmail: isNotificationSettingActive(verb: "ALL", channel: EMAIL)
    commentsPush: isNotificationSettingActive(verb: "COMMENTS", channel: PUSH)
    reactionsPush: isNotificationSettingActive(verb: "REACTIONS", channel: PUSH)
    commentsApp: isNotificationSettingActive(verb: "COMMENTS", channel: IN_APP)
    reactionsApp: isNotificationSettingActive(verb: "REACTIONS", channel: IN_APP)
    commentsEmail: isNotificationSettingActive(verb: "COMMENTS", channel: EMAIL)
    reactionsEmail: isNotificationSettingActive(verb: "REACTIONS", channel: EMAIL)
  }
`
