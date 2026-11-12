import { FC, Suspense } from 'react'

import { LoadingScreen } from '@baseapp-frontend/design-system/components/native/displays'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { Switch } from 'react-native-paper'
import { useLazyLoadQuery } from 'react-relay'

import { NotificationSettingsGroupsQuery as NotificationSettingsGroupsQueryType } from '../../../../__generated__/NotificationSettingsGroupsQuery.graphql'
import {
  DEFAULT_EMPTY_STATE_TEXT,
  DEFAULT_GROUP_COLUMN_LABEL,
  DEFAULT_LOCKED_HINT,
  DEFAULT_NOTIFICATION_CHANNEL_LABELS,
  NotificationSettingsGroupsQuery,
  defaultGetSwitchLabel,
  useNotificationSettingsGroups,
} from '../../common'
import { createStyles } from './styles'
import { NotificationSettingsGroupsContentProps, NotificationSettingsGroupsProps } from './types'

const NotificationSettingsGroupsContent: FC<NotificationSettingsGroupsContentProps> = ({
  user,
  channelLabels = {},
  groupColumnLabel = DEFAULT_GROUP_COLUMN_LABEL,
  lockedHint = DEFAULT_LOCKED_HINT,
  emptyStateText = DEFAULT_EMPTY_STATE_TEXT,
  getSwitchLabel = defaultGetSwitchLabel,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const { groups, setChannelActive } = useNotificationSettingsGroups({ user })

  if (groups.length === 0) {
    return (
      <Text variant="body2" color="low">
        {emptyStateText}
      </Text>
    )
  }

  const getChannelLabel = (channel: string) =>
    channelLabels[channel] ?? DEFAULT_NOTIFICATION_CHANNEL_LABELS[channel] ?? channel

  return (
    <View style={styles.container}>
      <Text variant="overline" color="low">
        {groupColumnLabel}
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
              {lockedHint}
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
                  accessibilityLabel={getSwitchLabel(group.label, channelLabel)}
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
