import { FC, Suspense } from 'react'

import { LoadingScreen } from '@baseapp-frontend/design-system/components/native/displays'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { useIntl } from 'react-intl'
import { Switch } from 'react-native-paper'
import { useLazyLoadQuery } from 'react-relay'

import { NotificationSettingsGroupsQuery as NotificationSettingsGroupsQueryType } from '../../../../__generated__/NotificationSettingsGroupsQuery.graphql'
import {
  NOTIFICATION_CHANNEL_MESSAGES as CHANNEL_MESSAGES,
  NOTIFICATION_SETTINGS_GROUPS_MESSAGES as MESSAGES,
  NotificationSettingsGroupsQuery,
  useNotificationSettingsGroups,
} from '../../common'
import { createStyles } from './styles'
import { NotificationSettingsGroupsContentProps, NotificationSettingsGroupsProps } from './types'

const NotificationSettingsGroupsContent: FC<NotificationSettingsGroupsContentProps> = ({
  user,
  channelLabels = {},
  groupColumnLabel,
  lockedHint,
  emptyStateText,
  getSwitchLabel,
}) => {
  const intl = useIntl()
  const theme = useTheme()
  const styles = createStyles(theme)
  const { groups, setChannelActive } = useNotificationSettingsGroups({ user })

  if (groups.length === 0) {
    return (
      <Text variant="body2" color="low">
        {emptyStateText ?? intl.formatMessage(MESSAGES.emptyState)}
      </Text>
    )
  }

  const getChannelLabel = (channel: string) =>
    channelLabels[channel] ??
    (CHANNEL_MESSAGES[channel] ? intl.formatMessage(CHANNEL_MESSAGES[channel]) : channel)
  const switchLabel = (groupLabel: string, channelLabel: string) =>
    getSwitchLabel?.(groupLabel, channelLabel) ??
    intl.formatMessage(MESSAGES.switchLabel, { group: groupLabel, channel: channelLabel })

  return (
    <View style={styles.container}>
      <Text variant="overline" color="low">
        {groupColumnLabel ?? intl.formatMessage(MESSAGES.groupColumn)}
      </Text>
      {groups.map((group) => (
        <View key={group.key} style={styles.group}>
          <Text variant="subtitle2" color="high">
            {group.label}
          </Text>
          {!!group.description && (
            <Text variant="body2" color="low">
              {group.description}
            </Text>
          )}
          {group.isLocked && (
            <Text variant="caption" color="disabled">
              {lockedHint ?? intl.formatMessage(MESSAGES.lockedHint)}
            </Text>
          )}
          {group.channels.map(({ channel, isActive }) => {
            const channelLabel = getChannelLabel(channel)

            return (
              <View key={channel} style={styles.channel}>
                <Text variant="body2" color="high">
                  {channelLabel}
                </Text>
                <Switch
                  value={isActive}
                  disabled={group.isLocked}
                  onValueChange={(value) => setChannelActive(group.key, channel, value)}
                  accessibilityLabel={switchLabel(group.label, channelLabel)}
                />
              </View>
            )
          })}
        </View>
      ))}
    </View>
  )
}

const NotificationSettingsGroupsWithQuery: FC<
  Omit<NotificationSettingsGroupsContentProps, 'user'>
> = (props) => {
  const { me } = useLazyLoadQuery<NotificationSettingsGroupsQueryType>(
    NotificationSettingsGroupsQuery,
    {},
    { fetchPolicy: 'store-and-network' },
  )

  if (!me) return null

  return <NotificationSettingsGroupsContent user={me} {...props} />
}

/**
 * Lists the notification setting groups the viewer can manage, one section per group and one switch
 * per channel. Changes apply at once and go back if the server rejects them; locked groups are shown
 * disabled with a hint.
 */
const NotificationSettingsGroups: FC<NotificationSettingsGroupsProps> = ({
  user,
  LoadingState = LoadingScreen,
  ...props
}) => {
  if (user) return <NotificationSettingsGroupsContent user={user} {...props} />

  return (
    <Suspense fallback={<LoadingState />}>
      <NotificationSettingsGroupsWithQuery {...props} />
    </Suspense>
  )
}

export default NotificationSettingsGroups
