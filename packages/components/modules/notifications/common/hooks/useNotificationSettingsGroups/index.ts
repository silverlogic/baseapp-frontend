import { useMemo } from 'react'

import { useFragment } from 'react-relay'

import { NotificationSettingsGroupsUserFragmentQuery } from '../../graphql/fragments/NotificationSettingsGroups'
import { useNotificationSettingsUpdateMutation } from '../../graphql/mutations/NotificationSettingsUpdate'
import {
  getNotificationSettingChannels,
  setNotificationSettingChannels,
  toNotificationSettingChanges,
} from '../../utils'
import { UseNotificationSettingsGroupsOptions, UseNotificationSettingsGroupsReturn } from './types'

const useNotificationSettingsGroups = ({
  user: userRef,
}: UseNotificationSettingsGroupsOptions): UseNotificationSettingsGroupsReturn => {
  const user = useFragment(NotificationSettingsGroupsUserFragmentQuery, userRef)
  const [commitMutation, isMutationInFlight] = useNotificationSettingsUpdateMutation()

  const groups = user.notificationSettingGroups
  const channels = useMemo(() => getNotificationSettingChannels(groups), [groups])

  const setChannelActive: UseNotificationSettingsGroupsReturn['setChannelActive'] = (
    groupKey,
    channel,
    isActive,
  ) => {
    const group = groups.find(({ key }) => key === groupKey)
    if (!group || group.isLocked) return

    const changes = [{ group: groupKey, channel, isActive }]
    // the server sets every channel of the group when the change is for ALL
    const optimisticChanges =
      channel === 'ALL'
        ? group.channels.map((item) => ({ group: groupKey, channel: item.channel, isActive }))
        : changes

    commitMutation({
      variables: { input: { settings: changes } },
      // An optimisticUpdater rather than an optimisticResponse: the groups have no id, so a payload
      // cannot be normalized onto the user's groups. Relay drops it when the server answers, then
      // applies the updater below; a rejected change therefore leaves the switch where it was.
      optimisticUpdater: (store) =>
        setNotificationSettingChannels(store, user.id, optimisticChanges),
      updater: (store, data) => {
        const updatedGroups = data?.notificationSettingsUpdate?.groups
        if (updatedGroups) {
          setNotificationSettingChannels(
            store,
            user.id,
            toNotificationSettingChanges(updatedGroups),
          )
        }
      },
    })
  }

  return { groups, channels, setChannelActive, isMutationInFlight }
}

export default useNotificationSettingsGroups
