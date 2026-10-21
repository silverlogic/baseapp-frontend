import { FC, Suspense } from 'react'

import { LoadingState as DefaultLoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { Switch, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { NotificationSettingsGroupsQuery as NotificationSettingsGroupsQueryType } from '../../../../__generated__/NotificationSettingsGroupsQuery.graphql'
import { NotificationSettingsGroupsQuery, useNotificationSettingsGroups } from '../../common'
import {
  DEFAULT_EMPTY_STATE_TEXT,
  DEFAULT_GROUP_COLUMN_LABEL,
  DEFAULT_LOCKED_HINT,
  DEFAULT_NOTIFICATION_CHANNEL_LABELS,
  defaultGetSwitchLabel,
} from './constants'
import { ChannelCell, SettingsContainer } from './styled'
import { NotificationSettingsGroupsContentProps, NotificationSettingsGroupsProps } from './types'

const NotificationSettingsGroupsContent: FC<NotificationSettingsGroupsContentProps> = ({
  user,
  channelLabels = {},
  groupColumnLabel = DEFAULT_GROUP_COLUMN_LABEL,
  lockedHint = DEFAULT_LOCKED_HINT,
  emptyStateText = DEFAULT_EMPTY_STATE_TEXT,
  getSwitchLabel = defaultGetSwitchLabel,
  Container = SettingsContainer,
}) => {
  const { groups, channels, setChannelActive } = useNotificationSettingsGroups({ user })

  if (groups.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        {emptyStateText}
      </Typography>
    )
  }

  const getChannelLabel = (channel: string) =>
    channelLabels[channel] ?? DEFAULT_NOTIFICATION_CHANNEL_LABELS[channel] ?? channel

  return (
    <Container>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{groupColumnLabel}</TableCell>
            {channels.map((channel) => (
              <ChannelCell key={channel}>{getChannelLabel(channel)}</ChannelCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.map((group) => (
            <TableRow key={group.key}>
              <TableCell>
                <Typography variant="subtitle2">{group.label}</Typography>
                {group.description && (
                  <Typography variant="body2" color="text.secondary">
                    {group.description}
                  </Typography>
                )}
                {group.isLocked && (
                  <Typography variant="caption" color="text.disabled">
                    {lockedHint}
                  </Typography>
                )}
              </TableCell>
              {channels.map((channel) => {
                const groupChannel = group.channels.find((item) => item.channel === channel)

                return (
                  <ChannelCell key={channel}>
                    {groupChannel && (
                      <Switch
                        checked={groupChannel.isActive}
                        disabled={group.isLocked}
                        onChange={(event) =>
                          setChannelActive(group.key, channel, event.target.checked)
                        }
                        inputProps={{
                          'aria-label': getSwitchLabel(group.label, getChannelLabel(channel)),
                        }}
                      />
                    )}
                  </ChannelCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
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
 * Lists the notification setting groups the viewer can manage, one row per group and one switch per
 * channel. Changes apply at once and go back if the server rejects them; locked groups are shown
 * disabled with a hint.
 */
const NotificationSettingsGroups: FC<NotificationSettingsGroupsProps> = ({
  user,
  LoadingState = DefaultLoadingState,
  LoadingStateProps = {},
  ...props
}) => {
  if (user) return <NotificationSettingsGroupsContent user={user} {...props} />

  return (
    <Suspense fallback={<LoadingState {...LoadingStateProps} />}>
      <NotificationSettingsGroupsWithQuery {...props} />
    </Suspense>
  )
}

export default NotificationSettingsGroups
