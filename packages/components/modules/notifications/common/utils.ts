import { ConnectionHandler } from 'react-relay'
import { RecordSourceProxy } from 'relay-runtime'

import { GROUP_NOTIFICATIONS_LIST_CONNECTION_KEY } from './constants'
import {
  NotificationSettingChange,
  NotificationSettingChannel,
  NotificationSettingGroup,
} from './types'

// An app-relative path, but not `//host` or `/\host`, which browsers read as another host.
const SAFE_URL_PATTERN = /^(\/(?![/\\])|https?:\/\/)/i
// URL parsers drop tabs and newlines, so `/\t/host` would also reach another host.
// eslint-disable-next-line no-control-regex
const CONTROL_CHARACTER_PATTERN = /[\u0000-\u001f\u007f]/

/**
 * Reads the conventional `data.url` of a notification: where clicking the notification takes the
 * user. Only app-relative paths (`/path`) and http(s) URLs are returned; anything else, such as a
 * `javascript:` URL, is ignored.
 */
export const getNotificationUrl = (data: unknown): string | undefined => {
  if (!data || typeof data !== 'object') return undefined

  const { url } = data as { url?: unknown }
  if (typeof url !== 'string') return undefined

  const trimmedUrl = url.trim()
  if (CONTROL_CHARACTER_PATTERN.test(trimmedUrl)) return undefined
  return SAFE_URL_PATTERN.test(trimmedUrl) ? trimmedUrl : undefined
}

/** The channels offered by any of the groups, in the order they first appear. */
export const getNotificationSettingChannels = (
  groups: ReadonlyArray<Pick<NotificationSettingGroup, 'channels'>>,
): NotificationSettingChannel[] => {
  const channels = new Set<NotificationSettingChannel>()
  groups.forEach((group) => group.channels.forEach(({ channel }) => channels.add(channel)))
  return Array.from(channels)
}

/** Flattens groups into one change per group channel, e.g. to apply a mutation payload. */
export const toNotificationSettingChanges = (
  groups: ReadonlyArray<{
    key: string
    channels: ReadonlyArray<{ channel: NotificationSettingChannel; isActive: boolean }>
  }>,
): NotificationSettingChange[] =>
  groups.flatMap((group) =>
    group.channels.map(({ channel, isActive }) => ({ group: group.key, channel, isActive })),
  )

/**
 * Writes channel states onto the `notificationSettingGroups` the store holds for a user. The groups
 * have no `id`, so a mutation payload cannot be normalized onto them and this is how both the
 * optimistic update and the server response reach the settings on screen.
 */
export const setNotificationSettingChannels = (
  store: RecordSourceProxy,
  userId: string,
  changes: ReadonlyArray<NotificationSettingChange>,
) => {
  const groupRecords = store.get(userId)?.getLinkedRecords('notificationSettingGroups')

  groupRecords?.forEach((groupRecord) => {
    const groupKey = groupRecord?.getValue('key')

    groupRecord?.getLinkedRecords('channels')?.forEach((channelRecord) => {
      const change = changes.find(
        ({ group, channel }) =>
          group === groupKey && channel === channelRecord?.getValue('channel'),
      )
      if (change) channelRecord?.setValue(change.isActive, 'isActive')
    })
  })
}

/** The id of the connection a `NotificationsList` filtered by `group` reads, e.g. for an updater. */
export const getGroupNotificationsConnectionId = (userId: string, group: string): string =>
  ConnectionHandler.getConnectionID(userId, GROUP_NOTIFICATIONS_LIST_CONNECTION_KEY, { group })
